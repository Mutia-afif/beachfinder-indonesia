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
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1520483601560-389dff434fdf?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1509233725247-49e657c54213?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1504542982118-59308b40fe0c?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1501426026826-31c667bdf23d?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1488188840666-e2308741a62f?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1490349368154-73de9c9bc37c?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1455729552865-3658a5d39692?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1513553404607-988bf2703777?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=75",
    "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=75",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Bali_sunrise_in_Pantai_Saba11.jpg/960px-Bali_sunrise_in_Pantai_Saba11.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fe/Bali_sunrise_in_Pantai_Saba13.jpg/960px-Bali_sunrise_in_Pantai_Saba13.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Bali_sunrise_in_Pantai_Saba18.jpg/960px-Bali_sunrise_in_Pantai_Saba18.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Bali_sunrise_in_Pantai_Saba19.jpg/960px-Bali_sunrise_in_Pantai_Saba19.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Bali_sunrise_in_Pantai_Saba20.jpg/960px-Bali_sunrise_in_Pantai_Saba20.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Bali_sunrise_in_Pantai_Saba23.jpg/960px-Bali_sunrise_in_Pantai_Saba23.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/67/Bali_sunrise_in_Pantai_Saba25.jpg/960px-Bali_sunrise_in_Pantai_Saba25.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Bali_sunrise_in_Pantai_Saba27.jpg/960px-Bali_sunrise_in_Pantai_Saba27.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Bali_sunrise_in_Pantai_Saba3.jpg/960px-Bali_sunrise_in_Pantai_Saba3.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Bali_sunrise_in_Pantai_Saba33.jpg/960px-Bali_sunrise_in_Pantai_Saba33.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/Bali_sunrise_in_Pantai_Saba9.jpg/960px-Bali_sunrise_in_Pantai_Saba9.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/18/Pantai_Kelisut_Toboali.jpg/960px-Pantai_Kelisut_Toboali.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Pantai_Kolorai%2C_Maluku_Utara.jpg/960px-Pantai_Kolorai%2C_Maluku_Utara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/51/Pantai_sejile.jpg/960px-Pantai_sejile.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/70/Bali_sunrise_in_Pantai_Saba1.jpg/960px-Bali_sunrise_in_Pantai_Saba1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/30/Pantai_Sanur_di_waktu_terbit_matahari.jpg/960px-Pantai_Sanur_di_waktu_terbit_matahari.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Pemandangan_Pantai_Sanur.jpg/960px-Pemandangan_Pantai_Sanur.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Sanur_Beach_Bali.jpg/960px-Sanur_Beach_Bali.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Kincir_Angin_%28skala_kecil%29_di_Pantai_Kuta_Mandalika%2C_Lombok_Utara.jpg/960px-Kincir_Angin_%28skala_kecil%29_di_Pantai_Kuta_Mandalika%2C_Lombok_Utara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Kolaborasi_Pantai_dengan_Bukit_yang_indah.jpg/960px-Kolaborasi_Pantai_dengan_Bukit_yang_indah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Kuta_Lombok_View_from_hill_near_Pantai_Seger.JPG/960px-Kuta_Lombok_View_from_hill_near_Pantai_Seger.JPG?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Malibu_Beach%2C_Lombok_%282%29.jpg/960px-Malibu_Beach%2C_Lombok_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/PANTAI_KLUI.jpg/960px-PANTAI_KLUI.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/PANTAI_TANJUNG_AAN.jpg/960px-PANTAI_TANJUNG_AAN.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Pantai_Bumbang_di_Lombok%2C_Provinsi_Nusa_Tenggara_Barat.jpg/960px-Pantai_Bumbang_di_Lombok%2C_Provinsi_Nusa_Tenggara_Barat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Pantai_Kuta%2C_Lombok%2C_12022017.jpg/960px-Pantai_Kuta%2C_Lombok%2C_12022017.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Pantai_Selong_Belanak%2C_Lombok%2C_Indonesia.jpg/960px-Pantai_Selong_Belanak%2C_Lombok%2C_Indonesia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Pantai_Telawas_Lombok.jpg/960px-Pantai_Telawas_Lombok.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/74/Pasir_Pantai_kuta.jpg/960px-Pasir_Pantai_kuta.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Pesta_rakyat_putri_nyale_di_pantai_lombok.jpg/960px-Pesta_rakyat_putri_nyale_di_pantai_lombok.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Senja_di_Pantai_Senggigi%2C_Lombok.jpg/960px-Senja_di_Pantai_Senggigi%2C_Lombok.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c7/Pantai_Mliwis.jpg/960px-Pantai_Mliwis.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Pantai_Pangandaran_Jawa_Barat.jpg/960px-Pantai_Pangandaran_Jawa_Barat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/11._Pantai_pasir_putih%2C_Lampung_Selatan_2016_%281%29.jpg/960px-11._Pantai_pasir_putih%2C_Lampung_Selatan_2016_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/12._Pantai_pasir_putih%2C_Lampung_Selatan_2016_%282%29.jpg/960px-12._Pantai_pasir_putih%2C_Lampung_Selatan_2016_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/13._Pantai_pesisir_barat_Liwa%2C_Lampung_2016_%281%29.jpg/960px-13._Pantai_pesisir_barat_Liwa%2C_Lampung_2016_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/14._Pantai_pesisir_barat_Liwa%2C_Lampung_2016_%282%29.jpg/960px-14._Pantai_pesisir_barat_Liwa%2C_Lampung_2016_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/be/PANTAI_KLARA_LAMPUNG_2.jpg/960px-PANTAI_KLARA_LAMPUNG_2.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/85/Pantai_Batu_Tihang.jpg/960px-Pantai_Batu_Tihang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Pantai_Burong_Mandi_Belitung_Timur.jpg/960px-Pantai_Burong_Mandi_Belitung_Timur.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2f/Pantai_Burong_Mandi_Belitung_Timur_02.jpg/960px-Pantai_Burong_Mandi_Belitung_Timur_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Pantai_Lalang_Belitung_Timur_01.jpg/960px-Pantai_Lalang_Belitung_Timur_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Pantai_Lalang_Belitung_Timur_02.jpg/960px-Pantai_Lalang_Belitung_Timur_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7d/Pantai_Lalang_Belitung_Timur_03.jpg/960px-Pantai_Lalang_Belitung_Timur_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5e/Pantai_Mudong_Belitung_Timur.jpg/960px-Pantai_Mudong_Belitung_Timur.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Pantai_Mudong_Belitung_Timur_02.jpg/960px-Pantai_Mudong_Belitung_Timur_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Pantai_Serdang_Belitung_Timur_01.jpg/960px-Pantai_Serdang_Belitung_Timur_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Pantai_Serdang_Belitung_Timur_02.jpg/960px-Pantai_Serdang_Belitung_Timur_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Pantai_Serdang_Belitung_Timur_03.jpg/960px-Pantai_Serdang_Belitung_Timur_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Pantai_Serdang_Belitung_Timur_04.jpg/960px-Pantai_Serdang_Belitung_Timur_04.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Pantai_Serdang_Belitung_Timur_05.jpg/960px-Pantai_Serdang_Belitung_Timur_05.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Pantai_Tanjung_Tinggi_Belitung_01.jpg/960px-Pantai_Tanjung_Tinggi_Belitung_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ce/Pantai_Tanjung_Tinggi_Belitung_02.jpg/960px-Pantai_Tanjung_Tinggi_Belitung_02.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Pantai_Tanjung_Tinggi_Belitung_03.jpg/960px-Pantai_Tanjung_Tinggi_Belitung_03.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Pantai_Bitunuris%2C_Kepulauan_Talaud%2C_Sulawesi_Utara.jpg/960px-Pantai_Bitunuris%2C_Kepulauan_Talaud%2C_Sulawesi_Utara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Pantai_Liang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032634628%29.jpg/960px-Pantai_Liang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032634628%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Pantai_Liang%2C_Pulau_Bunaken%2C_Sulawesi_%2815219195375%29.jpg/960px-Pantai_Liang%2C_Pulau_Bunaken%2C_Sulawesi_%2815219195375%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e7/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815031945958%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815031945958%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032172810%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032172810%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032261857%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815032261857%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/08/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815195655656%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815195655656%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815195862256%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815195862256%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815215747501%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815215747501%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815215773641%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815215773641%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815218523585%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815218523585%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815218795185%29.jpg/960px-Pantai_Pangalisang%2C_Pulau_Bunaken%2C_Sulawesi_%2815218795185%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Pantai_Tabako_Kabupaten_Bombana_Sulawesi_Tenggara.jpg/960px-Pantai_Tabako_Kabupaten_Bombana_Sulawesi_Tenggara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Pantai_Tanjung_Karang_Sulawesi_Tengah.jpg/960px-Pantai_Tanjung_Karang_Sulawesi_Tengah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Sunset_Pantai_Bira_Sulawesi_Selatan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2c/Foto_Selfie_di_Pantai_Kolorai%2C_Maluku_Utara.jpg/960px-Foto_Selfie_di_Pantai_Kolorai%2C_Maluku_Utara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/40/Pantai-Amalmoli.jpg/960px-Pantai-Amalmoli.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Pantai_Dobo_Kabupataen_Kepulauan_Aru_Maluku_Indonesia.jpg/960px-Pantai_Dobo_Kabupataen_Kepulauan_Aru_Maluku_Indonesia.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/Pantai_Liang%2C_Maluku.jpg/960px-Pantai_Liang%2C_Maluku.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Pantai_Liang%2C_Maluku_dengan_anak_kecil.jpg/960px-Pantai_Liang%2C_Maluku_dengan_anak_kecil.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/8/80/Pantai_Liang.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Pantai_Ohoililir_Tual_maluku_Tenggara_-_panoramio.jpg/960px-Pantai_Ohoililir_Tual_maluku_Tenggara_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Pantai_Ora.jpg/960px-Pantai_Ora.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/Pantai_Ora_%28Maluku%29_dari_Laut.jpg/960px-Pantai_Ora_%28Maluku%29_dari_Laut.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Pantai_Pulau_Ngele-Ngele%2C_Maluku_Utara.jpg/960px-Pantai_Pulau_Ngele-Ngele%2C_Maluku_Utara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/41/Pantai_ellar%2C_Danar_Maluku_tenggara.jpg/960px-Pantai_ellar%2C_Danar_Maluku_tenggara.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/3/3e/Pantai_pasir_putih_di_Sula%2C_Maluku_Utara.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://upload.wikimedia.org/wikipedia/commons/9/97/Wisata-pantai-yanain-di-maluku-tengah.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/PANTAI_HOLTEKAM.jpg/960px-PANTAI_HOLTEKAM.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Pantai_Base_G.jpg/960px-Pantai_Base_G.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d3/Pantai_Batu_Papan_Papua_Risen.jpg/960px-Pantai_Batu_Papan_Papua_Risen.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Pantai_Doromena_Depapre.jpg/960px-Pantai_Doromena_Depapre.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8c/Pantai_Inggandi_di_pesisir_Teluk_Manokwari%2C_Kabupaten_Manokwari_Provinsi_Papua_Barat.jpg/960px-Pantai_Inggandi_di_pesisir_Teluk_Manokwari%2C_Kabupaten_Manokwari_Provinsi_Papua_Barat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5a/Pantai_Lampu_Satu%2C_Merauke%2C_Papua.jpg/960px-Pantai_Lampu_Satu%2C_Merauke%2C_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7a/Pantai_Pasir_4.jpg/960px-Pantai_Pasir_4.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Pantai_Perbatasan_RI_dan_PNG.jpg/960px-Pantai_Perbatasan_RI_dan_PNG.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Pantai_Rouwor6.jpg/960px-Pantai_Rouwor6.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/Pantai_Waras_di_pulau_Adi%2C_Papua_Barat%2C_merupakan_tempat_yang_cocok_untuk_healing_karena_jauh_dari_kebisingan_kota.jpg/960px-Pantai_Waras_di_pulau_Adi%2C_Papua_Barat%2C_merupakan_tempat_yang_cocok_untuk_healing_karena_jauh_dari_kebisingan_kota.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Pantai_Wayob_Fakfak.jpg/960px-Pantai_Wayob_Fakfak.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Pantai_Yakoba%2C_Jayapura%2C_Papua.jpg/960px-Pantai_Yakoba%2C_Jayapura%2C_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/5/5c/Pantai_hamadi.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b8/Pantai_werur.jpg/960px-Pantai_werur.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Sunset_di_Pantai_Base_G%2C_Jayapura%2C_Papua.jpg/960px-Sunset_di_Pantai_Base_G%2C_Jayapura%2C_Papua.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Kantor_Desa_Pantai%2C_Kapuas.jpg/960px-Kantor_Desa_Pantai%2C_Kapuas.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Kantor_Desa_Pantai%2C_Kelumpang_Selatan%2C_Kotabaru.jpg/960px-Kantor_Desa_Pantai%2C_Kelumpang_Selatan%2C_Kotabaru.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/b/bd/Pantai-Manggar.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Pantai_Ambalat.jpg/960px-Pantai_Ambalat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Pantai_Gedambaan%2C_Kotabaru%2C_Kalimantan_Selatan.jpg/960px-Pantai_Gedambaan%2C_Kotabaru%2C_Kalimantan_Selatan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/f/f8/Pantai_Pasir_putih_di_Teluk_Tamiang%2C_Kalimantan_Selatan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Pantai_Sekerat.jpg/960px-Pantai_Sekerat.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Pantai_Selimpai_and_Pantai_Kampak_Indah_in_West_Kalimantan%2C_Indonesian_Borneo.jpg/960px-Pantai_Selimpai_and_Pantai_Kampak_Indah_in_West_Kalimantan%2C_Indonesian_Borneo.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c4/Pantai_Teluk_Prancis_Kalimantan_Timur_%281%29.jpg/960px-Pantai_Teluk_Prancis_Kalimantan_Timur_%281%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Pantai_Teluk_Prancis_Kalimantan_Timur_%282%29.jpg/960px-Pantai_Teluk_Prancis_Kalimantan_Timur_%282%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/97/Pantai_Teluk_Prancis_Kalimantan_Timur_%283%29.jpg/960px-Pantai_Teluk_Prancis_Kalimantan_Timur_%283%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d9/Pantai_Teluk_Prancis_Kalimantan_Timur_%284%29.jpg/960px-Pantai_Teluk_Prancis_Kalimantan_Timur_%284%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Pantai_Teluk_Tamiang%2C_Kotabaru%2C_Kalimantan_Selatan.png/960px-Pantai_Teluk_Tamiang%2C_Kotabaru%2C_Kalimantan_Selatan.png?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Sunset_Pantai_Pecal.jpg/960px-Sunset_Pantai_Pecal.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
    "https://upload.wikimedia.org/wikipedia/commons/7/74/Terumbu_Karang_di_pantai_pasir_putih_Teluk_Taniang_Kalimantan-selatan.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled"
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
        photo = BEACH_PHOTOS[(h + idx * 13) % len(BEACH_PHOTOS)]

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

