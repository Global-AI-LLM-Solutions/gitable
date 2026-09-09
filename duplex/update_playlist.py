#!/usr/bin/env python3
import json
import os
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urljoin, urlparse

import requests

SOURCE_PLAYLISTS = [
    "https://raw.githubusercontent.com/freecasthub/public-iptv/main/playlist.m3u",
]

CURATED = [
    ("#EXTINF:-1 tvg-name=\"FashionTV - Midnight Secrets\" group-title=\"Adult 18+\",FashionTV - Midnight Secrets", "https://fash1043.cloudycdn.services/slive/_definst_/ftv_midnite_secrets_adaptive.smil/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Miami TV - Jenny For You 18+\" group-title=\"Adult 18+\",Miami TV - Jenny For You 18+", "https://59ec5453559f0.streamlock.net/JennyForYou/smil:WEB3131/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"VISIT-X TV\" group-title=\"Adult 18+\",VISIT-X TV", "https://stream.visit-x.tv/vxtv/live/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Crime 360\" group-title=\"True Crime\",Crime 360", "https://dab88d35ef5b44ec99be60adef855bf2.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung_Crime360/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"True Crime Now\" group-title=\"True Crime\",True Crime Now", "https://alliantcontent-truecrimenow-3-nz.samsung.wurl.tv/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Real Crime TV\" group-title=\"True Crime\",Real Crime TV", "https://lds-realcrimebeta-rakuten.amagi.tv/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Total Crime\" group-title=\"True Crime\",Total Crime", "https://bam-totalcrime-lg-us.amagi.tv/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"CrimeTime\" group-title=\"True Crime\",CrimeTime", "https://amg00090-bamcanada-crimetime-rokuca-i3v64.amagi.tv/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Law & Crime\" group-title=\"True Crime\",Law & Crime", "https://4e8223185173454299fbf03581b6dd7b.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Samsung_LawAndCrime/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"TV One Crime & Justice\" group-title=\"True Crime\",TV One Crime & Justice", "https://linear-593.frequency.stream/dist/xumo/593/hls/master/playlist.m3u8"),
    ("#EXTINF:-1 tvg-name=\"Universal Crime\" group-title=\"True Crime\",Universal Crime", "https://xumo-xumoent-vc-107-xmuvk.fast.nbcuni.com/live/master.m3u8"),
]

UA = "Mozilla/5.0 (Linux; SmartTV) AppleWebKit/537.36 HomeSpycam-Duplex-Validator/1.0"
TIMEOUT = (8, 15)
RETRIES = 3
MAX_WORKERS = 10

session = requests.Session()
session.headers.update({"User-Agent": UA, "Accept": "application/vnd.apple.mpegurl,application/x-mpegURL,*/*"})


def parse_m3u(text):
    entries = []
    extinf = None
    for raw in text.replace("\r", "").split("\n"):
        line = raw.strip()
        if not line:
            continue
        if line.startswith("#EXTINF:"):
            extinf = line
        elif not line.startswith("#") and extinf:
            entries.append((extinf, line))
            extinf = None
    return entries


def fetch_text(url):
    last = None
    for attempt in range(RETRIES):
        try:
            r = session.get(url, timeout=TIMEOUT, allow_redirects=True)
            if r.status_code != 200:
                raise RuntimeError(f"HTTP {r.status_code}")
            return r.url, r.text, r.headers.get("content-type", "")
        except Exception as e:
            last = e
            time.sleep(1.0 + attempt)
    raise last


def first_media_url(base, text):
    lines = [x.strip() for x in text.splitlines() if x.strip()]
    for i, line in enumerate(lines):
        if line.startswith("#EXT-X-STREAM-INF"):
            for nxt in lines[i+1:]:
                if not nxt.startswith("#"):
                    return urljoin(base, nxt)
    return None


def first_segment_url(base, text):
    for line in text.splitlines():
        s = line.strip()
        if s and not s.startswith("#"):
            return urljoin(base, s)
    return None


def validate_hls(url):
    parsed = urlparse(url)
    if parsed.scheme != "https":
        return False, "non-HTTPS"
    if not url.lower().split("?",1)[0].endswith(".m3u8"):
        return False, "not HLS m3u8"
    try:
        final_url, text, ctype = fetch_text(url)
        if "#EXTM3U" not in text[:4096]:
            return False, f"not M3U8 ({ctype})"
        upper = text.upper()
        if "KEYFORMAT=\"COM.APPLE.STREAMINGKEYDELIVERY\"" in upper or "KEYFORMAT=\"COM.WIDEVINE\"" in upper or "SAMPLE-AES" in upper:
            return False, "DRM/encrypted format"
        media_url = first_media_url(final_url, text)
        media_text = text
        media_final = final_url
        if media_url:
            media_final, media_text, _ = fetch_text(media_url)
            if "#EXTM3U" not in media_text[:4096]:
                return False, "variant not M3U8"
            up2 = media_text.upper()
            if "SAMPLE-AES" in up2 or "KEYFORMAT=\"COM.APPLE.STREAMINGKEYDELIVERY\"" in up2 or "KEYFORMAT=\"COM.WIDEVINE\"" in up2:
                return False, "variant DRM"
        seg = first_segment_url(media_final, media_text)
        if not seg:
            return False, "no media segment"
        r = session.get(seg, timeout=TIMEOUT, allow_redirects=True, stream=True, headers={"Range":"bytes=0-4095"})
        if r.status_code not in (200, 206):
            return False, f"segment HTTP {r.status_code}"
        chunk = next(r.iter_content(chunk_size=1024), b"")
        if len(chunk) < 64:
            return False, "segment too small"
        return True, f"OK final={final_url} segment={r.url}"
    except Exception as e:
        return False, str(e)[:240]


def normalize_name(extinf):
    return extinf.rsplit(",",1)[-1].strip().lower()


def main():
    candidates = []
    provenance = {}

    for src in SOURCE_PLAYLISTS:
        try:
            _, text, _ = fetch_text(src)
        except Exception as e:
            print(f"SOURCE FAILED {src}: {e}", file=sys.stderr)
            continue
        for extinf, url in parse_m3u(text):
            # Duplex/Tizen compatibility: HTTPS HLS only.
            if url.startswith("https://") and ".m3u8" in url.lower():
                candidates.append((extinf, url))
                provenance[url] = src

    for extinf, url in CURATED:
        candidates.append((extinf, url))
        provenance[url] = "curated"

    # De-duplicate exact URLs and then names, preserving curated true-crime/adult preference.
    unique_by_url = {}
    for extinf, url in candidates:
        unique_by_url[url] = (extinf, url)
    ordered = list(unique_by_url.values())
    ordered.sort(key=lambda x: (0 if provenance.get(x[1]) == "curated" else 1, normalize_name(x[0])))
    unique = []
    seen_names = set()
    for extinf, url in ordered:
        name = normalize_name(extinf)
        if name in seen_names:
            continue
        seen_names.add(name)
        unique.append((extinf, url))

    results = []
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as ex:
        futs = {ex.submit(validate_hls, url):(extinf,url) for extinf,url in unique}
        for fut in as_completed(futs):
            extinf, url = futs[fut]
            ok, detail = fut.result()
            results.append({"name": extinf.rsplit(",",1)[-1], "extinf": extinf, "url": url, "ok": ok, "detail": detail, "source": provenance.get(url)})
            print(("PASS" if ok else "FAIL"), extinf.rsplit(",",1)[-1], url, detail)

    passed = [x for x in results if x["ok"]]
    passed.sort(key=lambda x: (x["extinf"].split('group-title="',1)[1].split('"',1)[0] if 'group-title="' in x["extinf"] else "ZZZ", x["name"].lower()))

    # Safety rule: never publish an untested entry.
    out = ["#EXTM3U"]
    for x in passed:
        out.extend([x["extinf"], x["url"]])
    with open("duplex/legal-adult-playlist.m3u", "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(out) + "\n")

    report = {
        "generated_at_utc": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "candidate_count": len(unique),
        "active_count": len(passed),
        "failed_count": len(results)-len(passed),
        "policy": "Only HTTPS HLS streams that returned a valid M3U8 manifest and a retrievable media segment during this run are published. DRM-like HLS is rejected.",
        "results": sorted(results, key=lambda x: x["name"].lower()),
    }
    with open("duplex/channel-health-report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
        f.write("\n")

    if not passed:
        print("No channels validated; refusing to publish empty playlist", file=sys.stderr)
        return 2
    print(f"Validated and published {len(passed)} working channels from {len(unique)} candidates.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
