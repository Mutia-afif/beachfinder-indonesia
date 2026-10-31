import React from 'react';
import { Heart, Star, MapPin, ShieldCheck, Waves, ExternalLink, ArrowRight } from 'lucide-react';

export default function BeachCard({ beach, isFavorite, onToggleFavorite, onSelectBeach }) {
  const {
    name,
    province,
    rating,
    reviewCount,
    photo,
    tariff,
    maritime,
    tags,
    features,
    predicate
  } = beach;

  // Format currency
  const formatRupiah = (val) => {
    if (val === 0) return 'Gratis';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  // Freshness badge info
  const getFreshnessBadge = (freshness, days) => {
    if (freshness === 'fresh') {
      return {
        bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
        text: `Terverifikasi (${days}h lalu)`
      };
    }
    if (freshness === 'review') {
      return {
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        text: `Perlu Audit (${days}h lalu)`
      };
    }
    return {
      bg: 'bg-rose-50 text-rose-700 border-rose-200',
      dot: 'bg-rose-500',
      text: `Kedaluwarsa (${days}h lalu)`
    };
  };

  const freshnessInfo = getFreshnessBadge(tariff.freshness, tariff.freshnessDays);

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-ocean-outline/30 hover:border-brand/40 shadow-xs hover:shadow-coastal transition-all duration-300 flex flex-col justify-between">
      
      {/* Visual Image Section (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-low">
        <img
          src={photo}
          alt={`Foto pemandangan ${name}`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
          }}
        />

        {/* Gradient Overlay for badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between">
          {/* Province Pill */}
          <span 
            className="px-2.5 py-1 rounded-full text-xs font-semibold bg-ocean-navy/85 backdrop-blur-xs text-white flex items-center gap-1 shadow-xs"
            title={beach.subRegion && beach.subRegion !== province ? `${province} (${beach.subRegion})` : province}
          >
            <MapPin className="w-3 h-3 text-brand shrink-0" />
            <span className="truncate max-w-[140px]">
              {beach.subRegion && beach.subRegion !== province ? `${province} • ${beach.subRegion}` : province}
            </span>
          </span>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(beach.id);
            }}
            aria-label={isFavorite ? `Hapus ${name} dari favorit` : `Simpan ${name} ke favorit`}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              isFavorite 
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-110' 
                : 'bg-white/80 hover:bg-white text-ocean-navy hover:text-rose-500 shadow-xs backdrop-blur-xs'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Badges: Wave height & Rating */}
        <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-xs text-white">
          {/* Rating */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>{rating > 0 ? rating.toFixed(1) : '4.2'}</span>
            <span className="text-white/70 text-[10px]">({reviewCount > 0 ? reviewCount.toLocaleString('id-ID') : '1.2k'})</span>
          </div>

          {/* Wave Alert */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/50 backdrop-blur-xs">
            <Waves className="w-3.5 h-3.5 text-cyan-300" />
            <span className="text-[11px] font-medium">{maritime.waveHeight}m ({maritime.alertLevel})</span>
          </div>
        </div>

      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Freshness Status Pill */}
          <div className="mb-2">
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-medium border ${freshnessInfo.bg}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${freshnessInfo.dot}`} />
              <span>{freshnessInfo.text}</span>
            </span>
          </div>

          {/* Beach Title */}
          <h3 
            onClick={() => onSelectBeach(beach)}
            className="text-base font-bold text-ocean-navy group-hover:text-brand transition-colors cursor-pointer line-clamp-1"
            title={name}
          >
            {name}
          </h3>

          {/* Tariff Breakdown preview */}
          <div className="mt-2.5 p-2.5 rounded-xl bg-surface-low border border-ocean-outline/20">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] text-ocean-muted font-medium">Tiket Masuk:</span>
              <span className="text-sm font-extrabold text-brand-deep">
                {formatRupiah(tariff.entranceFee)}
                {tariff.entranceFee > 0 && <span className="text-[10px] font-normal text-ocean-muted"> /org</span>}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-ocean-muted border-t border-ocean-outline/10 pt-1">
              <span>Parkir R2 / R4:</span>
              <span className="font-semibold text-ocean-navy">
                {formatRupiah(tariff.parkingR2)} / {formatRupiah(tariff.parkingR4)}
              </span>
            </div>
          </div>

          {/* Tags preview */}
          <div className="mt-3 flex flex-wrap gap-1">
            {tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-surface-container text-ocean-muted capitalize"
              >
                {tag}
              </span>
            ))}
            {predicate === 'bagus' && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                ⭐ Unggulan
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-3 border-t border-ocean-outline/20 flex items-center justify-between">
          <span className="text-[11px] text-ocean-muted flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand" />
            <span className="truncate max-w-[130px]">{tariff.ownerType}</span>
          </span>

          <button
            onClick={() => onSelectBeach(beach)}
            className="px-3 py-1.5 rounded-xl bg-brand text-white hover:bg-brand-deep text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <span>Detail & Tarif</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>

    </div>
  );
}

