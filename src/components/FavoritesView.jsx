import React, { useMemo } from 'react';
import { Heart, Compass, Trash2, ArrowRight, DollarSign, Waves } from 'lucide-react';
import BeachCard from './BeachCard';

export default function FavoritesView({
  beaches,
  favorites,
  onToggleFavorite,
  onSelectBeach,
  onExploreClick
}) {
  const favoriteBeaches = useMemo(() => {
    return beaches.filter(b => favorites.includes(b.id));
  }, [beaches, favorites]);

  // Aggregate estimated costs
  const summary = useMemo(() => {
    let totalEntrance = 0;
    let totalParkingR2 = 0;
    let totalParkingR4 = 0;

    favoriteBeaches.forEach(b => {
      totalEntrance += b.tariff.entranceFee;
      totalParkingR2 += b.tariff.parkingR2;
      totalParkingR4 += b.tariff.parkingR4;
    });

    return { totalEntrance, totalParkingR2, totalParkingR4 };
  }, [favoriteBeaches]);

  const formatRupiah = (val) => {
    if (val === 0) return 'Gratis';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  if (favoriteBeaches.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-fadeIn">
        <div className="w-20 h-20 mx-auto rounded-full bg-surface-low border border-ocean-outline/30 flex items-center justify-center text-ocean-muted mb-4 shadow-inner">
          <Heart className="w-10 h-10 text-rose-400 stroke-1" />
        </div>
        <h3 className="text-xl font-extrabold text-ocean-navy">Belum Ada Pantai Favorit Tersimpan</h3>
        <p className="text-xs sm:text-sm text-ocean-muted mt-2 max-w-md mx-auto leading-relaxed">
          Tandai pantai impian Anda dengan menekan ikon hati pada kartu pantai untuk menyimpan destinasi liburan dan menghitung estimasi biaya perjalanan.
        </p>
        <button
          onClick={onExploreClick}
          className="mt-6 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-md shadow-brand/30 inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Compass className="w-4 h-4" />
          <span>Mulai Jelajahi 1.572 Pantai</span>
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Koleksi Destinasi Tersimpan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-navy">
            Pantai Favorit Saya ({favoriteBeaches.length} Destinasi)
          </h2>
          <p className="text-xs sm:text-sm text-ocean-muted mt-0.5">
            Tersimpan secara lokal di browser Anda tanpa perlu repot login.
          </p>
        </div>

        {/* Cost Summary Widget */}
        <div className="p-4 rounded-2xl bg-white border border-brand/20 shadow-xs flex items-center gap-4">
          <div>
            <p className="text-[11px] text-ocean-muted font-medium">Estimasi Tiket Masuk Total:</p>
            <p className="text-base font-extrabold text-brand-deep">{formatRupiah(summary.totalEntrance)}</p>
          </div>
          <div className="h-8 w-px bg-ocean-outline/20" />
          <div>
            <p className="text-[11px] text-ocean-muted font-medium">Estimasi Parkir (Mobil):</p>
            <p className="text-base font-extrabold text-ocean-navy">{formatRupiah(summary.totalParkingR4)}</p>
          </div>
        </div>
      </div>

      {/* Grid of Saved Favorites */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteBeaches.map(beach => (
          <BeachCard
            key={beach.id}
            beach={beach}
            isFavorite={true}
            onToggleFavorite={onToggleFavorite}
            onSelectBeach={onSelectBeach}
          />
        ))}
      </div>

    </div>
  );
}

