import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  ArrowRight,
  Sparkles,
  Camera,
  Compass,
  MapPin
} from 'lucide-react';

const HERO_SCENES = [
  {
    id: 'bali',
    name: 'Pantai Kelingking (Nusa Penida)',
    province: 'Bali',
    highlight: 'Tebing Karang T-Rex & Teluk Pirus',
    wave: '1.8 meter (Sedang)',
    ticket: 'Rp 10.000',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'lampung',
    name: 'Pantai Tanjung Setia',
    province: 'Lampung',
    highlight: 'Swell Samudera Hindia Legendaris',
    wave: '2.8 meter (Tinggi)',
    ticket: 'Rp 15.000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'jateng',
    name: 'Pantai Menganti (Kebumen)',
    province: 'Jawa Tengah',
    highlight: 'Bukit Karang Hijau & Pasir Putih',
    wave: '1.4 meter (Sedang)',
    ticket: 'Rp 12.500',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'ntt',
    name: 'Pink Beach (Pulau Komodo)',
    province: 'Nusa Tenggara Timur',
    highlight: 'Gradasi Pasir Merah Muda & Laguna Kristal',
    wave: '0.8 meter (Tenang)',
    ticket: 'Rp 20.000',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=2000&q=85',
  },
  {
    id: 'papua',
    name: 'Kepulauan Raja Ampat',
    province: 'Papua Barat Daya',
    highlight: 'Gugusan Karst & Terumbu Karang Dunia',
    wave: '0.6 meter (Tenang)',
    ticket: 'BUMDes Resmi',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=85',
  }
];

export default function HeroSearch({
  totalBeaches,
  beaches = [],
  onSelectBeach
}) {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-cycle background scenes every 7 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % HERO_SCENES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeScene = HERO_SCENES[currentSceneIndex];

  // Spotlight popular beaches from dataset
  const spotlightBeaches = useMemo(() => {
    return beaches.filter(b => 
      b.name.includes('Menganti') || 
      b.name.includes('Tanjung Setia') || 
      b.name.includes('Kuta') || 
      b.name.includes('Karang Bolong')
    ).slice(0, 4);
  }, [beaches]);

  const handleNextScene = () => {
    setIsAutoPlaying(false);
    setCurrentSceneIndex((prev) => (prev + 1) % HERO_SCENES.length);
  };

  const handlePrevScene = () => {
    setIsAutoPlaying(false);
    setCurrentSceneIndex((prev) => (prev - 1 + HERO_SCENES.length) % HERO_SCENES.length);
  };

  return (
    <section 
      className="relative overflow-hidden min-h-[480px] lg:min-h-[540px] flex flex-col justify-between pt-8 pb-16 transition-all duration-1000"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      
      {/* Dynamic Background Image Layers with Smooth Cross-fade */}
      {HERO_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
            idx === currentSceneIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
        >
          <img
            src={scene.image}
            alt={scene.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Atmospheric Overlays for Crystal Clear Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C30] via-black/40 to-black/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 pointer-events-none" />

      {/* Top Floating Scene Navigation Controller */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between mb-2">
        
        {/* Verified Dataset Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="material-symbols-outlined text-sm text-cyan-300">verified</span>
          <span>{totalBeaches.toLocaleString('id-ID')} Pantai Nusantara</span>
          <span className="text-white/40">•</span>
          <span className="text-white/80 font-normal">Audit Freshness 31 Okt 2026</span>
        </div>

        {/* Interactive Scene Switcher Controls */}
        <div className="hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs shadow-lg">
          <button
            onClick={handlePrevScene}
            className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Scene Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 px-1">
            {HERO_SCENES.map((scene, idx) => (
              <button
                key={scene.id}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentSceneIndex(idx);
                }}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSceneIndex ? 'w-6 bg-cyan-400' : 'w-2 bg-white/40 hover:bg-white/80'
                }`}
                title={scene.name}
              />
            ))}
          </div>

          <button
            onClick={handleNextScene}
            className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
            aria-label="Scene Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <span className="text-[11px] font-semibold text-cyan-200 ml-1 border-l border-white/20 pl-2">
            📍 {activeScene.province}
          </span>
        </div>

      </div>

      {/* Main Center Content (Clean, Beautiful, Uncluttered) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-6">
        
        {/* Official Brand Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-white text-xs font-semibold mb-3 shadow-md animate-fadeIn">
          <img src="/logo-emblem.jpg" alt="BeachFinder Logo" className="w-5 h-5 rounded-md object-cover bg-white shadow-2xs" />
          <span className="tracking-wide">BeachFinder Indonesia • Eksplorasi 38 Provinsi</span>
        </div>

        {/* Dynamic Location Badge */}
        <div className="block sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-cyan-400/40 text-cyan-300 text-xs font-bold mb-4 shadow-md animate-fadeIn">
          <Camera className="w-3.5 h-3.5 text-cyan-300" />
          <span>Latar Saat Ini: <strong>{activeScene.name}</strong> ({activeScene.province})</span>
          <span className="text-white/40">•</span>
          <span className="text-amber-300 font-medium">Ombak: {activeScene.wave}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          Eksplorasi Pantai Nusantara dengan <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-200">
            Kepastian Tarif Resmi & Keselamatan
          </span>
        </h1>
        
        <p className="mt-3.5 text-sm sm:text-base text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow">
          Temukan 1.572 destinasi pesisir di 38 provinsi se-Nusantara, verifikasi dasar hukum retribusi tiket & parkir resmi, pantau telemetri ombak BMKG, dan laporkan pungutan liar langsung di satu tempat.
        </p>

        {/* Interactive Spotlight Quick Cards (Trending Destinations) */}
        {spotlightBeaches.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs text-white/80 font-semibold flex items-center gap-1 mr-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Destinasi Pilihan:
            </span>
            {spotlightBeaches.map((beach) => (
              <button
                key={beach.id}
                onClick={() => {
                  if (onSelectBeach) onSelectBeach(beach);
                }}
                className="group px-3 py-1.5 rounded-2xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105 cursor-pointer shadow-lg"
              >
                <img
                  src={beach.photo}
                  alt={beach.name}
                  className="w-5 h-5 rounded-full object-cover border border-white/40"
                />
                <span>{beach.name}</span>
                <span className="text-[10px] text-amber-300 font-bold flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-300" />
                  {beach.rating > 0 ? beach.rating.toFixed(1) : '4.2'}
                </span>
                <ArrowRight className="w-3 h-3 text-cyan-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        )}

      </div>

      {/* Bottom Floating Bar & Organic Wave SVG Divider */}
      <div className="relative z-20 mt-4">
        
        {/* 4 Feature Pillars Badge (Glassmorphic) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto px-4 text-center mb-6">
          <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-white shadow-lg">
            <p className="text-xs font-bold flex items-center justify-center gap-1.5 text-cyan-300">
              <span className="material-symbols-outlined text-base">gavel</span>
              Transparansi Perda
            </p>
            <p className="text-[11px] text-white/70">Dasar hukum tarif resmi</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-white shadow-lg">
            <p className="text-xs font-bold flex items-center justify-center gap-1.5 text-cyan-300">
              <span className="material-symbols-outlined text-base">water</span>
              Telemetri BMKG
            </p>
            <p className="text-[11px] text-white/70">Gelombang & pasang-surut</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-white shadow-lg">
            <p className="text-xs font-bold flex items-center justify-center gap-1.5 text-emerald-300">
              <span className="material-symbols-outlined text-base">report</span>
              Kanal Anti-Pungli
            </p>
            <p className="text-[11px] text-white/70">Lapor ketidaksesuaian</p>
          </div>

          <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-white shadow-lg">
            <p className="text-xs font-bold flex items-center justify-center gap-1.5 text-amber-300">
              <span className="material-symbols-outlined text-base">explore</span>
              100% GPS Mapping
            </p>
            <p className="text-[11px] text-white/70">1.572 koordinat satelit</p>
          </div>
        </div>

        {/* Organic Ocean Wave SVG Transition to Clean Page Content */}
        <div className="w-full overflow-hidden leading-none -mb-16 pointer-events-none">
          <svg 
            className="relative block w-full h-12 sm:h-16 text-surface-bg fill-current" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"></path>
          </svg>
        </div>

      </div>

    </section>
  );
}
