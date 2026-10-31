import React from 'react';
import { Waves, Heart, ShieldCheck, MapPin } from 'lucide-react';

export default function Footer({ onSelectTab }) {
  return (
    <footer className="bg-ocean-navy text-white/80 border-t border-ocean-navy/80 pt-12 pb-8 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-0.5 flex items-center justify-center overflow-hidden shadow-xs">
                <img src="/logo-emblem.jpg" alt="BeachFinder Indonesia" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-white block">BeachFinder</span>
                <span className="text-[10px] text-cyan-300 font-semibold uppercase tracking-wider">Indonesia</span>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-white/70">
              Platform eksplorasi pesisir nusantara, transparansi dasar hukum retribusi tarif, dan pusat telemetri maritim Indonesia.
            </p>
            <p className="text-[10px] text-white/50">
              Official Platform • 38 Provinsi Nusantara
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Eksplorasi</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('catalog')} className="hover:text-cyan-400 transition-colors">
                  Katalog 1.572 Pantai
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="hover:text-cyan-400 transition-colors">
                  Peta GIS Nusantara
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('recommendation')} className="hover:text-cyan-400 transition-colors">
                  Rekomendasi Berbasis Persona
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('favorites')} className="hover:text-cyan-400 transition-colors">
                  Pantai Favorit Tersimpan
                </button>
              </li>
            </ul>
          </div>

          {/* Transparansi & Keselamatan */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Transparansi</h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <button onClick={() => onSelectTab('maritime')} className="hover:text-cyan-400 transition-colors">
                  Telemetri Gelombang BMKG
                </button>
              </li>
              <li>
                <span className="text-white/60">Verifikasi Dasar Hukum Perda</span>
              </li>
              <li>
                <span className="text-white/60">Audit Freshness 30 / 90 Hari</span>
              </li>
              <li>
                <button onClick={() => onSelectTab('admin')} className="text-amber-400 hover:underline">
                  Portal Back-Office Pengelola
                </button>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-brand" />
              <span>Pernyataan Resmi</span>
            </h4>
            <p className="text-[10px] text-white/60 leading-relaxed">
              Data maritim dan ombak disajikan sebagai simulasi referensi visual. Selalu perhatikan rambu bendera di lapangan dan ikuti instruksi petugas Balawista/penjaga pantai setempat demi keselamatan Anda.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/50">
          <p>© 2026 BeachFinder Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4">
            <span>Coastal Discovery Design System</span>
            <span>Plus Jakarta Sans</span>
            <span>Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

