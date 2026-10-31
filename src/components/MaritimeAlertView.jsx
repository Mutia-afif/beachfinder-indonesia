import React, { useState, useMemo } from 'react';
import { 
  AlertTriangle, 
  Waves, 
  Wind, 
  Clock, 
  ShieldAlert, 
  MapPin, 
  Info, 
  ArrowRight,
  Filter
} from 'lucide-react';

export default function MaritimeAlertView({ beaches, onSelectBeach }) {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Filter beaches by wave condition
  const highWaveBeaches = useMemo(() => {
    return beaches
      .filter(b => {
        if (selectedSeverity === 'all') return true;
        return b.maritime.alertLevel.toLowerCase() === selectedSeverity.toLowerCase();
      })
      .sort((a, b) => b.maritime.waveHeight - a.maritime.waveHeight);
  }, [beaches, selectedSeverity]);

  // Statistics
  const stats = useMemo(() => {
    let tenang = 0, sedang = 0, tinggi = 0, ekstrem = 0;
    beaches.forEach(b => {
      if (b.maritime.alertLevel === 'Tenang') tenang++;
      else if (b.maritime.alertLevel === 'Sedang') sedang++;
      else if (b.maritime.alertLevel === 'Tinggi') tinggi++;
      else if (b.maritime.alertLevel === 'Ekstrem') ekstrem++;
    });
    return { tenang, sedang, tinggi, ekstrem, total: beaches.length };
  }, [beaches]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-ocean-navy via-brand-deep to-brand rounded-3xl p-6 sm:p-10 text-white shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Pusat Peringatan & Telemetri Maritim BMKG (Simulasi Demo)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Pantauan Gelombang Laut & Keselamatan Pesisir
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed">
            Data kondisi maritim terkonsolidasi dari stasiun pemantauan gelombang untuk keselamatan pelayaran, wisatawan keluarga, dan komunitas peselancar di seluruh Nusantara.
          </p>
        </div>

        {/* Decorative Water Symbol */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">waves</span>
        </div>
      </div>

      {/* 4 Warning Category Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        
        <div 
          onClick={() => setSelectedSeverity('tenang')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedSeverity === 'tenang' ? 'border-emerald-500 bg-emerald-50/50' : 'border-emerald-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">Tenang / Rendah</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          </div>
          <p className="text-2xl font-extrabold text-ocean-navy mt-2">{stats.tenang}</p>
          <p className="text-[11px] text-ocean-muted">Gelombang 0,5 - 1,25 m (Aman)</p>
        </div>

        <div 
          onClick={() => setSelectedSeverity('sedang')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedSeverity === 'sedang' ? 'border-amber-500 bg-amber-50/50' : 'border-amber-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">Sedang</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          </div>
          <p className="text-2xl font-extrabold text-ocean-navy mt-2">{stats.sedang}</p>
          <p className="text-[11px] text-ocean-muted">Gelombang 1,25 - 2,5 m (Waspada)</p>
        </div>

        <div 
          onClick={() => setSelectedSeverity('tinggi')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedSeverity === 'tinggi' ? 'border-orange-500 bg-orange-50/50' : 'border-orange-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-700">Tinggi</span>
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          </div>
          <p className="text-2xl font-extrabold text-ocean-navy mt-2">{stats.tinggi}</p>
          <p className="text-[11px] text-ocean-muted">Gelombang 2,5 - 4,0 m (Khusus Surfer)</p>
        </div>

        <div 
          onClick={() => setSelectedSeverity('ekstrem')}
          className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
            selectedSeverity === 'ekstrem' ? 'border-rose-500 bg-rose-50/50' : 'border-rose-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700">Ekstrem / Bahaya</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
          </div>
          <p className="text-2xl font-extrabold text-ocean-navy mt-2">{stats.ekstrem}</p>
          <p className="text-[11px] text-ocean-muted">Gelombang &gt; 4,0 m (Dilarang Berenang)</p>
        </div>

      </div>

      {/* Safety Guideline Box */}
      <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/30 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-brand shrink-0 mt-0.5" />
        <div className="text-xs text-ocean-navy space-y-1">
          <p className="font-bold">Pedoman Keselamatan Pesisir (SOP BPBD / Balawista):</p>
          <p className="text-ocean-muted">
            1. Perhatikan bendera peringatan di tepi pantai (Hijau = Aman, Kuning = Waspada, Merah = Larangan Aktivitas Air).<br/>
            2. Waspadai bahaya <strong>Rip Current</strong> (arus balik mematikan). Jika terseret arus, jangan melawan arus ke pantai, melainkan berenanglah menyamping (sejajar pantai).<br/>
            3. Selalu awasi anak-anak dalam jarak pandang dan jangkauan tangan.
          </p>
        </div>
      </div>

      {/* Table / List of beaches by severity */}
      <div className="bg-white rounded-3xl border border-ocean-outline/30 overflow-hidden shadow-xs">
        
        <div className="px-6 py-4 border-b border-ocean-outline/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-low/50">
          <div>
            <h3 className="text-base font-bold text-ocean-navy">
              Daftar Pantai Berdasarkan Kondisi Gelombang ({highWaveBeaches.length} Destinasi)
            </h3>
            <p className="text-xs text-ocean-muted">Data diperbarui: 31 Okt 2026, 14:00 WIB</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-ocean-muted font-medium">Filter Status:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="py-1.5 px-3 rounded-xl bg-white border border-ocean-outline/30 text-xs font-semibold focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
            >
              <option value="all">Semua Status ({stats.total})</option>
              <option value="tenang">Tenang (0.5 - 1.25m)</option>
              <option value="sedang">Sedang (1.25 - 2.5m)</option>
              <option value="tinggi">Tinggi (2.5 - 4.0m)</option>
              <option value="ekstrem">Ekstrem (&gt;4.0m)</option>
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-low border-b border-ocean-outline/20 text-ocean-muted uppercase font-semibold text-[11px]">
              <tr>
                <th className="py-3 px-6">Nama Pantai & Wilayah</th>
                <th className="py-3 px-4">Tinggi Gelombang</th>
                <th className="py-3 px-4">Arah & Kecepatan Angin</th>
                <th className="py-3 px-4">Periode Swell</th>
                <th className="py-3 px-4">Pasang / Surut</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ocean-outline/10 text-ocean-navy">
              {highWaveBeaches.slice(0, 50).map((beach) => {
                const isHigh = beach.maritime.waveHeight >= 2.5;
                return (
                  <tr key={beach.id} className="hover:bg-surface-low/60 transition-colors">
                    
                    <td className="py-3.5 px-6 font-bold">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-brand shrink-0" />
                        <div>
                          <p className="hover:text-brand transition-colors cursor-pointer" onClick={() => onSelectBeach(beach)}>
                            {beach.name}
                          </p>
                          <p className="text-[11px] text-ocean-muted font-normal">{beach.province}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-sm">
                      <span className={isHigh ? 'text-rose-600' : 'text-ocean-navy'}>
                        {beach.maritime.waveHeight} meter
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Wind className="w-3.5 h-3.5 text-cyan-600" />
                        <span>{beach.maritime.windSpeed} knot ({beach.maritime.waveDirection})</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium">
                      <span>{beach.maritime.wavePeriod} detik</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-surface-container text-ocean-muted text-[11px] font-medium">
                        {beach.maritime.tideStatus}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-1 rounded-md text-[11px] font-bold ${
                        beach.maritime.alertLevel === 'Tenang' ? 'bg-emerald-100 text-emerald-800' :
                        beach.maritime.alertLevel === 'Sedang' ? 'bg-amber-100 text-amber-800' :
                        beach.maritime.alertLevel === 'Tinggi' ? 'bg-orange-100 text-orange-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {beach.maritime.alertLevel}
                      </span>
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={() => onSelectBeach(beach)}
                        className="px-3 py-1.5 rounded-lg bg-surface-low hover:bg-brand hover:text-white text-brand-deep font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Cek Tarif & Detail</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

