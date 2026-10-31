import csv
import json
import re
import os
import hashlib
from datetime import datetime, timedelta

CSV_PATH = 'd:/KSTI Ms. Nir/GABUNGAN_DATASET_PANTAI.csv'
OUT_DIR = 'd:/KSTI Ms. Nir/src/data'
os.makedirs(OUT_DIR, exist_ok=True)
OUT_PATH = os.path.join(OUT_DIR, 'beaches.json')

# High quality curated beach photos pool for realistic visuals
BEACH_PHOTOS = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=1200&q=80"
]

TODAY = datetime(2026, 10, 31)

def slugify(text):
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text.strip('-')

def hash_str(s):
    return int(hashlib.md5(s.encode('utf-8')).hexdigest(), 16)

def process():
    with open(CSV_PATH, encoding='utf-8', errors='replace') as f:
        reader = csv.DictReader(f)
        raw_rows = list(reader)

    print(f"Total raw records: {len(raw_rows)}")
    beaches = []

    PROVINCE_NORMALIZATION = {
        'Ambon': ('Maluku', 'Kota Ambon / Pulau Ambon'),
        'Pulau Buru': ('Maluku', 'Pulau Buru'),
        'Pulau Seram': ('Maluku', 'Pulau Seram'),
        'Pulau Wetar': ('Maluku', 'Pulau Wetar'),
        'Ternate': ('Maluku Utara', 'Kota Ternate'),
        'Bangka Belitung': ('Kepulauan Bangka Belitung', 'Kepulauan Bangka Belitung'),
    }

    for idx, row in enumerate(raw_rows):
        name = row.get('Nama Pantai', '').strip()
        if not name:
            continue
        
        raw_province = row.get('Provinsi', '').strip() or 'Indonesia'
        if raw_province in PROVINCE_NORMALIZATION:
            province, sub_region = PROVINCE_NORMALIZATION[raw_province]
        else:
            province, sub_region = raw_province, raw_province
        try:
            rating = float(row.get('Rating Angka', 0.0) or 0.0)
        except ValueError:
            rating = 4.0
            
        try:
            lat = float(row.get('Latitude', 0.0) or 0.0)
            lng = float(row.get('Longitude', 0.0) or 0.0)
        except ValueError:
            lat, lng = 0.0, 0.0

        try:
            review_count = int(float(row.get('Jumlah Ulasan', 0) or 0))
        except ValueError:
            review_count = 0

        # Collect reviews & tags
        tags = set()
        reviews = []
        for i in range(1, 6):
            u = row.get(f'Ulasan {i}', '').strip()
            if u:
                reviews.append(u)
                # some reviews are tag words like 'waves', 'white sand'
                if len(u.split()) <= 4:
                    tags.add(u.lower())
            k = row.get(f'Kategori {i}', '').strip()
            if k:
                tags.add(k.lower())

        kp = row.get('Kategori Pantai', '').strip()
        if kp:
            tags.add(kp.lower())

        if sub_region != province:
            tags.add(sub_region.lower())
            tags.add(raw_province.lower())
        tags.add(province.lower())

        tag_list = sorted(list(tags))
        if not tag_list:
            tag_list = ["pemandangan laut", "pantai alami", "wisata pesisir"]

        # Deterministic generation for tariff, freshness, and maritime data
        h = hash_str(f"{name}_{province}_{idx}")
        
        # Photo assignment
        photo = BEACH_PHOTOS[h % len(BEACH_PHOTOS)]

        # Pricing calculation
        price_tier = h % 4
        if price_tier == 0:
            entrance_fee = 0 # Free beach
            parking_r2 = 2000
            parking_r4 = 5000
            facility_fee = 10000
            owner_type = "BUMDes / Desa Adat"
            legal_basis = f"Perdes No. { (h % 12) + 1 } Tahun 2024"
        elif price_tier == 1:
            entrance_fee = 5000
            parking_r2 = 2000
            parking_r4 = 5000
            facility_fee = 15000
            owner_type = "Resmi Pemda (Perda)"
            legal_basis = f"Perda Kab. {province.split()[-1]} No. { (h % 15) + 1 } Tahun 2023"
        elif price_tier == 2:
            entrance_fee = 10000
            parking_r2 = 3000
            parking_r4 = 5000
            facility_fee = 20000
            owner_type = "Resmi Pemda (Perda)"
            legal_basis = f"Perda Provinsi {province} No. { (h % 20) + 1 } Tahun 2023"
        else:
            entrance_fee = 15000
            parking_r2 = 5000
            parking_r4 = 10000
            facility_fee = 25000
            owner_type = "Usaha Warga Lokal Terdaftar"
            legal_basis = f"SK Pengelolaan Wisata No. { (h % 30) + 10 }/2024"

        # Freshness days calculation (PRD: <30d fresh, 31-90d review, >90d expired)
        freshness_mod = h % 100
        if freshness_mod < 60:
            # 60% are fresh
            days_ago = (h % 28) + 1
            freshness_status = "fresh" # Hijau
        elif freshness_mod < 85:
            # 25% needs review
            days_ago = 31 + (h % 55)
            freshness_status = "review" # Kuning
        else:
            # 15% expired
            days_ago = 92 + (h % 60)
            freshness_status = "expired" # Merah

        verified_date = TODAY - timedelta(days=days_ago)

        # Maritime condition simulation
        wave_height = round(0.5 + ((h % 35) / 10.0), 1) # 0.5m to 4.0m
        if wave_height <= 1.25:
            alert_level = "Tenang"
            alert_color = "emerald"
        elif wave_height <= 2.5:
            alert_level = "Sedang"
            alert_color = "amber"
        elif wave_height <= 4.0:
            alert_level = "Tinggi"
            alert_color = "orange"
        else:
            alert_level = "Ekstrem"
            alert_color = "rose"

        wind_speed = 8 + (h % 22)
        wave_period = 6 + (h % 8)
        directions = ["Barat", "Barat Daya", "Selatan", "Tenggara", "Timur"]
        wave_dir = directions[h % len(directions)]
        tide_statuses = ["Menuju Pasang", "Pasang Tertinggi", "Menuju Surut", "Surut Terendah"]
        tide_status = tide_statuses[h % len(tide_statuses)]

        # Accessibility & Facilities
        road_types = ["Aspal Mulus", "Aspal Bergelombang", "Makadam Halus", "Campuran Rabat Beton"]
        road_surface = road_types[h % len(road_types)]
        
        has_surf = any('wave' in t or 'ombak' in t or 'surf' in t for t in tag_list) or wave_height >= 1.8
        has_white_sand = any('white' in t or 'putih' in t for t in tag_list)
        has_cliff = any('cliff' in t or 'tebing' in t or 'karang' in t for t in tag_list)
        has_sunset = any('sunset' in t for t in tag_list) or (h % 3 == 0)

        # Persona scoring
        surf_score = min(100, int(wave_height * 25 + (20 if has_surf else 5)))
        family_score = 95 if (entrance_fee <= 10000 and wave_height <= 1.5) else 75 if wave_height <= 2.0 else 50
        budget_score = 95 if entrance_fee <= 5000 else 80 if entrance_fee <= 10000 else 60

        beaches.append({
            "id": f"beach-{idx + 1:04d}",
            "slug": f"{slugify(name)}-{idx + 1}",
            "name": name,
            "province": province,
            "subRegion": sub_region,
            "rawProvince": raw_province,
            "rating": rating,
            "reviewCount": review_count,
            "gmapsUrl": row.get('Link Google Maps', ''),
            "latitude": lat,
            "longitude": lng,
            "predicate": row.get('Predikat', 'biasa'),
            "tags": tag_list[:6],
            "photo": photo,
            "features": {
                "hasSurf": has_surf,
                "hasWhiteSand": has_white_sand,
                "hasCliff": has_cliff,
                "hasSunset": has_sunset,
                "isFamilyFriendly": family_score >= 70
            },
            "tariff": {
                "entranceFee": entrance_fee,
                "parkingR2": parking_r2,
                "parkingR4": parking_r4,
                "facilityFee": facility_fee,
                "ownerType": owner_type,
                "legalBasis": legal_basis,
                "verifiedAt": verified_date.strftime("%Y-%m-%d"),
                "verifiedDateFormatted": verified_date.strftime("%d %b %Y"),
                "freshness": freshness_status,
                "freshnessDays": days_ago
            },
            "maritime": {
                "waveHeight": wave_height,
                "wavePeriod": wave_period,
                "waveDirection": wave_dir,
                "windSpeed": wind_speed,
                "tideStatus": tide_status,
                "alertLevel": alert_level,
                "alertColor": alert_color,
                "source": "Stasiun Maritim BMKG (Simulasi)",
                "updatedAt": "31 Okt 2026, 14:00 WIB"
            },
            "accessibility": {
                "roadSurface": road_surface,
                "vehicles": ["Motor", "Mobil"] + (["Bus Pariwisata"] if (h % 2 == 0) else [])
            },
            "facilities": {
                "toilet": True,
                "rinseWater": True,
                "mushola": (h % 3 != 0),
                "parkingArea": True,
                "gazebo": (h % 2 == 0),
                "lifeguard": (wave_height >= 2.0 and (h % 2 == 0)),
                "foodStalls": True
            },
            "personas": {
                "surfing": surf_score,
                "family": family_score,
                "budget": budget_score
            },
            "publicationStatus": "published"
        })

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(beaches, f, ensure_ascii=False)

    print(f"Successfully processed and generated {len(beaches)} beaches to {OUT_PATH}")

if __name__ == '__main__':
    process()

