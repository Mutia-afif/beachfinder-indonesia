import React, { useState, useMemo } from 'react';
import { Sparkles, Compass, CheckCircle2, Sliders, Waves, Heart, DollarSign, Users, ShieldCheck } from 'lucide-react';
import BeachCard from './BeachCard';

export default function RecommendationWizard({ 
  beaches, 
  onSelectBeach, 
  favorites, 
  onToggleFavorite 
}) {
  const [selectedPersona, setSelectedPersona] = useState('family');
  const [maxBudget, setMaxBudget] = useState(25000);
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [wantsWhiteSand, setWantsWhiteSand] = useState(false);
  const [wantsLifeguard, setWantsLifeguard] = useState(false);

  const personas = [
    {
      id: 'family',
      title: 'Wisata Keluarga',
      subtitle: 'Air tenang, aman untuk anak, fasilitas lengkap (toilet, mushola)',
      icon: Users,
      badge: 'Prioritas: Fasilitas & Keamanan',
      weights: { wave: 0.10, cost: 0.30, facility: 0.40, access: 0.20 }
    },
    {
      id: 'surfing',
      title: 'Peselancar (Surfer)',
      subtitle: 'Ombak konsisten, break kuat, swell berperiode tinggi',
      icon: Waves,
      badge: 'Prioritas: Karakter Ombak',
      weights: { wave: 0.50, cost: 0.15, facility: 0.15, access: 0.20 }
    },
    {
      id: 'budget',
      title: 'Backpacker & Budget',
      subtitle: 'Tiket gratis/terjangkau, alami, ramah kantong',
      icon: DollarSign,
      badge: 'Prioritas: Biaya Rendah',
      weights: { wave: 0.10, cost: 0.50, facility: 0.15, access: 0.25 }
    }
  ];

  // Extract unique provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(beaches.map(b => b.province))).sort();
  }, [beaches]);

  // Scoring algorithm according to PRD FR-REC-02
  const rankedBeaches = useMemo(() => {
    const currentPersona = personas.find(p => p.id === selectedPersona) || personas[0];
    const { wave: wWave, cost: wCost, facility: wFac, access: wAcc } = currentPersona.weights;

    return beaches
      .filter(b => {
        if (selectedProvince !== 'all' && b.province !== selectedProvince) return false;
        if (b.tariff.entranceFee > maxBudget) return false;
        if (wantsWhiteSand && !b.features.hasWhiteSand) return false;
        if (wantsLifeguard && !b.facilities.lifeguard) return false;
        return true;
      })
      .map(b => {
        // Normalize sub-scores 0 - 100
        let sWave = 50;
        if (selectedPersona === 'surfing') {
          sWave = Math.min(100, Math.round(b.maritime.waveHeight * 25 + (b.features.hasSurf ? 20 : 0)));
        } else {
          // for family, lower calmer wave gives higher score
          sWave = b.maritime.waveHeight <= 1.25 ? 95 : b.maritime.waveHeight <= 2.0 ? 75 : 40;
        }

        let sCost = 100 - Math.min(100, (b.tariff.entranceFee / 30000) * 100);
        let sFac = (b.facilities.toilet ? 25 : 0) + 
                   (b.facilities.rinseWater ? 25 : 0) + 
                   (b.facilities.mushola ? 25 : 0) + 
                   (b.facilities.foodStalls ? 25 : 0);
        let sAcc = b.accessibility.roadSurface.includes('Aspal') ? 95 : 70;

        const totalScore = Math.round((wWave * sWave) + (wCost * sCost) + (wFac * sFac) + (wAcc * sAcc));

        let reason = '';
        if (selectedPersona === 'family') {
          reason = `Kondisi ombak ${b.maritime.waveHeight}m (${b.maritime.alertLevel}), fasilitas ${b.facilities.mushola ? 'toilet & mushola tersedia' : 'toilet tersedia'}.`;
        } else if (selectedPersona === 'surfing') {
          reason = `Tinggi ombak ${b.maritime.waveHeight}m, periode swell ${b.maritime.wavePeriod} detik, arah ${b.maritime.waveDirection}.`;
        } else {
          reason = `Tiket masuk ${b.tariff.entranceFee === 0 ? 'Gratis' : 'Rp ' + b.tariff.entranceFee.toLocaleString('id-ID')}, parkir terjangkau.`;
        }

        return {
          ...b,
          matchScore: Math.min(99, Math.max(60, totalScore)),
          matchReason: reason
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12); // Show top 12 matches
  }, [beaches, selectedPersona, maxBudget, selectedProvince, wantsWhiteSand, wantsLifeguard]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-deep text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <span>Mesin Rekomendasi Berbasis Aturan (FR-REC-01 & 02)</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-ocean-navy tracking-tight">
          Temukan Pantai yang Paling Cocok untuk Anda
        </h2>
        <p className="text-xs sm:text-sm text-ocean-muted mt-2">
          Algoritma BeachFinder menghitung kecocokan destinasi dari bobot karakteristik ombak, kepastian tarif, fasilitas, dan akses jalan.
        </p>
      </div>

      {/* Interactive Preference Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand/20 shadow-coastal mb-10">
        
        {/* Step 1: Persona Selection */}
        <div className="mb-6">
          <h3 className="text-xs font-bold text-ocean-navy uppercase tracking-wider mb-3">
            1. Pilih Gaya Perjalanan Anda:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {personas.map((p) => {
              const Icon = p.icon;
              const isSelected = selectedPersona === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected 
                      ? 'border-brand bg-brand-light/30 shadow-sm shadow-brand/20' 
                      : 'border-ocean-outline/30 hover:border-brand/40 bg-surface-low'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-brand text-white' : 'bg-white text-ocean-navy'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-brand text-white' : 'bg-surface-container text-ocean-muted'
                      }`}>
                        {p.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-ocean-navy">{p.title}</h4>
                    <p className="text-xs text-ocean-muted mt-1 leading-snug">{p.subtitle}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-ocean-outline/10 flex items-center justify-between text-[11px] font-semibold text-brand">
                    <span>{isSelected ? '✓ Terpilih' : 'Pilih Persona'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Fine Tuning Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-ocean-outline/20">
          
          {/* Budget Limit Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-ocean-navy">Maksimal Tiket Masuk:</label>
              <span className="text-xs font-extrabold text-brand-deep">
                {maxBudget === 0 ? 'Hanya Tiket Gratis' : `Maks Rp ${maxBudget.toLocaleString('id-ID')}`}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="50000"
              step="5000"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-brand"
            />
            <div className="flex justify-between text-[10px] text-ocean-muted mt-1">
              <span>Gratis</span>
              <span>Rp 25.000</span>
              <span>Rp 50.000+</span>
            </div>
          </div>

          {/* Wilayah / Provinsi Filter */}
          <div>
            <label className="block text-xs font-bold text-ocean-navy mb-2">Cakupan Wilayah:</label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
            >
              <option value="all">Seluruh Indonesia ({provinces.length} Provinsi)</option>
              {provinces.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Specific Preference Checkboxes */}
          <div>
            <label className="block text-xs font-bold text-ocean-navy mb-2">Kriteria Spesifik:</label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsWhiteSand}
                  onChange={(e) => setWantsWhiteSand(e.target.checked)}
                  className="rounded text-brand focus:ring-brand"
                />
                <span className="text-ocean-navy font-medium">Wajib Berpasir Putih</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={wantsLifeguard}
                  onChange={(e) => setWantsLifeguard(e.target.checked)}
                  className="rounded text-brand focus:ring-brand"
                />
                <span className="text-ocean-navy font-medium">Harus Ada Penjaga Pantai (Lifeguard)</span>
              </label>
            </div>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-ocean-navy">
            Hasil Rekomendasi Teratas ({rankedBeaches.length} Destinasi)
          </h3>
          <p className="text-xs text-ocean-muted">
            Diurutkan berdasarkan skor kesesuaian formula berbobot.
          </p>
        </div>
      </div>

      {/* Results Grid */}
      {rankedBeaches.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-ocean-outline/30">
          <Compass className="w-12 h-12 text-ocean-muted mx-auto mb-3" />
          <h4 className="text-base font-bold text-ocean-navy">Tidak ada pantai yang cocok</h4>
          <p className="text-xs text-ocean-muted mt-1 max-w-sm mx-auto">
            Coba naikkan batas anggaran tiket atau pilih seluruh provinsi untuk melihat lebih banyak pantai.
          </p>
          <button
            onClick={() => {
              setMaxBudget(30000);
              setSelectedProvince('all');
              setWantsWhiteSand(false);
              setWantsLifeguard(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold"
          >
            Reset Parameter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rankedBeaches.map((beach) => (
            <div key={beach.id} className="relative flex flex-col">
              {/* Match Score Badge on top */}
              <div className="absolute top-2 left-2 z-20 px-2.5 py-1 rounded-full bg-brand-deep text-white text-[11px] font-extrabold shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300" />
                <span>Kecocokan {beach.matchScore}%</span>
              </div>
              
              <BeachCard
                beach={beach}
                isFavorite={favorites.includes(beach.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectBeach={onSelectBeach}
              />

              {/* Recommendation explanation note */}
              <div className="mt-2 p-2.5 rounded-xl bg-white border border-ocean-outline/20 text-[11px] text-ocean-muted flex items-start gap-1.5 shadow-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug"><strong>Alasan:</strong> {beach.matchReason}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

