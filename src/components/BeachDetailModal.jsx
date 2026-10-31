import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Heart,
  Share2,
  Navigation,
  MapPin,
  Star,
  ShieldCheck,
  Waves,
  Wind,
  Clock,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Copy,
  ExternalLink,
  Car,
  Compass,
  Check,
  AlertCircle
} from 'lucide-react';
import L from 'leaflet';
import ReportTariffModal from './ReportTariffModal';

export default function BeachDetailModal({
  beach,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onToast,
  onSubmitReport
}) {
  const [activeTab, setActiveTab] = useState('tariff');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Reset tab to tariff breakdown when modal opens or target beach changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab('tariff');
    }
  }, [isOpen, beach?.id]);

  useEffect(() => {
    if (!isOpen || !beach || activeTab !== 'map') return;

    // Initialize leaflet map when 'Peta Lokasi' tab becomes active
    const timer = setTimeout(() => {
      if (mapContainerRef.current) {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const lat = Number(beach.latitude) || -5.5;
        const lng = Number(beach.longitude) || 105.2;

        const map = L.map(mapContainerRef.current, {
          center: [lat, lng],
          zoom: 14,
          scrollWheelZoom: false
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Custom marker with coastal theme
        const customIcon = L.divIcon({
          className: 'custom-pin',
          html: `<div style="background-color: #0284c7; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(2,132,199,0.4); display: flex; align-items: center; justify-content: center; color: white;">
            <span class="material-symbols-outlined" style="font-size: 18px;">waves</span>
          </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 2px;">
            <p style="font-weight: 800; font-size: 13px; margin: 0; color: #0B1C30;">${beach.name}</p>
            <p style="font-size: 11px; margin: 2px 0 0; color: #64748b;">${beach.province}</p>
            <p style="font-size: 11px; margin: 4px 0 0; font-weight: 700; color: #0284c7;">Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}</p>
          </div>
        `).openPopup();

        mapInstanceRef.current = map;

        // Force leaflet to recalculate container geometry
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isOpen, beach, activeTab]);

  if (!isOpen || !beach) return null;

  const {
    name,
    province,
    rating,
    reviewCount,
    photo,
    latitude,
    longitude,
    tariff,
    maritime,
    accessibility,
    facilities,
    tags,
    gmapsUrl,
    predicate
  } = beach;

  const formatRupiah = (val) => {
    if (val === 0) return 'Gratis';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${name} — BeachFinder Indonesia`,
        text: `Cek informasi tarif resmi dan kondisi laut ${name}, ${province} di BeachFinder!`,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onToast) onToast('Tautan pantai berhasil disalin ke clipboard!');
    }
  };

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${latitude}, ${longitude}`);
    setCopiedCoords(true);
    if (onToast) onToast(`Koordinat ${latitude}, ${longitude} disalin!`);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-ocean-outline/30 overflow-hidden my-auto max-h-[92vh] flex flex-col">

          {/* Top Sticky Bar with Actions */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full bg-surface-low overflow-hidden shrink-0">
            <img
              src={photo}
              alt={name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 pointer-events-none" />

            {/* Floating Control Buttons */}
            <div className="absolute top-4 inset-x-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-md text-ocean-navy flex items-center gap-1.5 shadow-md">
                <MapPin className="w-3.5 h-3.5 text-brand" />
                <span>{beach.subRegion && beach.subRegion !== province ? `${province} (${beach.subRegion})` : province}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-ocean-navy shadow-md transition-transform hover:scale-105 cursor-pointer"
                  title="Bagikan"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onToggleFavorite(beach.id)}
                  className={`p-2 rounded-full shadow-md transition-transform hover:scale-105 cursor-pointer ${isFavorite ? 'bg-rose-500 text-white' : 'bg-white/90 hover:bg-white text-ocean-navy'
                    }`}
                  title="Simpan Favorit"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Bottom Title in Banner */}
            <div className="absolute bottom-4 inset-x-4 text-white">
              <div className="flex items-center gap-2 mb-1">
                {predicate === 'bagus' && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-400 text-ocean-navy">
                    ⭐ Destinasi Pilihan
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-brand text-white">
                  {tariff.ownerType}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">{name}</h2>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/90">
                <span className="flex items-center gap-1 font-semibold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{rating > 0 ? rating.toFixed(1) : '4.2'}</span>
                  <span className="text-white/70">({reviewCount.toLocaleString('id-ID')} ulasan Google Maps)</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <span>GPS: {latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
                  <button
                    onClick={handleCopyCoords}
                    className="p-1 hover:text-cyan-300 transition-colors"
                    title="Salin Koordinat"
                  >
                    {copiedCoords ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-ocean-outline/20 bg-surface px-6 pt-3 flex items-center gap-4 overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('tariff')}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'tariff'
                ? 'border-brand text-brand-deep'
                : 'border-transparent text-ocean-muted hover:text-ocean-navy'
                }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Transparansi Biaya & Retribusi</span>
            </button>
            <button
              onClick={() => setActiveTab('maritime')}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'maritime'
                ? 'border-brand text-brand-deep'
                : 'border-transparent text-ocean-muted hover:text-ocean-navy'
                }`}
            >
              <Waves className="w-4 h-4" />
              <span>Telemetri Maritim & BMKG</span>
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'facilities'
                ? 'border-brand text-brand-deep'
                : 'border-transparent text-ocean-muted hover:text-ocean-navy'
                }`}
            >
              <Car className="w-4 h-4" />
              <span>Akses & Fasilitas</span>
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors border-b-2 whitespace-nowrap cursor-pointer ${activeTab === 'map'
                ? 'border-brand text-brand-deep'
                : 'border-transparent text-ocean-muted hover:text-ocean-navy'
                }`}
            >
              <Compass className="w-4 h-4" />
              <span>Peta Lokasi</span>
            </button>
          </div>

          {/* Modal Content Scrollable Area */}
          <div className="p-6 overflow-y-auto space-y-6">

            {/* TAB 1: TRANSPARANSI TARIF & BIAYA */}
            {activeTab === 'tariff' && (
              <div className="space-y-5 animate-fadeIn">

                {/* Audit & Freshness Banner */}
                <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${tariff.freshness === 'fresh'
                  ? 'bg-emerald-50/70 border-emerald-200'
                  : tariff.freshness === 'review'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-rose-50/70 border-rose-200'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${tariff.freshness === 'fresh' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
                      }`}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ocean-navy">
                        {tariff.freshness === 'fresh' ? 'Status Tarif: Terverifikasi Resmi' : 'Status Tarif: Memerlukan Pembaruan'}
                      </h4>
                      <p className="text-xs text-ocean-muted">
                        Diverifikasi terakhir pada <strong>{tariff.verifiedDateFormatted}</strong> ({tariff.freshnessDays} hari lalu)
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setReportModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>Lapor Pungli / Tarif Berbeda</span>
                  </button>
                </div>

                {/* Tariff Components Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                    <p className="text-xs font-medium text-ocean-muted">Tiket Masuk Umum</p>
                    <p className="text-2xl font-extrabold text-brand-deep mt-1">{formatRupiah(tariff.entranceFee)}</p>
                    <p className="text-[11px] text-ocean-muted mt-0.5">Per orang (dewasa/anak)</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                    <p className="text-xs font-medium text-ocean-muted">Parkir Motor (R2)</p>
                    <p className="text-2xl font-extrabold text-ocean-navy mt-1">{formatRupiah(tariff.parkingR2)}</p>
                    <p className="text-[11px] text-ocean-muted mt-0.5">Area parkir terkelola</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                    <p className="text-xs font-medium text-ocean-muted">Parkir Mobil (R4)</p>
                    <p className="text-2xl font-extrabold text-ocean-navy mt-1">{formatRupiah(tariff.parkingR4)}</p>
                    <p className="text-[11px] text-ocean-muted mt-0.5">Kapasitas parkir resmi</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                    <p className="text-xs font-medium text-ocean-muted">Sewa Gazebo / Fasilitas</p>
                    <p className="text-2xl font-extrabold text-ocean-navy mt-1">{formatRupiah(tariff.facilityFee)}</p>
                    <p className="text-[11px] text-ocean-muted mt-0.5">Per saung / per kunjungan</p>
                  </div>
                </div>

                {/* Legal Basis & Ownership */}
                <div className="p-4 rounded-2xl bg-white border border-ocean-outline/30 space-y-3">
                  <h4 className="text-xs font-bold text-ocean-navy uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-brand" />
                    Entitas Pengelola & Rujukan Hukum
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-ocean-muted font-medium">Kategori Kepemilikan:</span>
                      <p className="font-bold text-ocean-navy text-sm mt-0.5">{tariff.ownerType}</p>
                    </div>
                    <div>
                      <span className="text-ocean-muted font-medium">Dasar Hukum Retribusi:</span>
                      <p className="font-bold text-ocean-navy text-sm mt-0.5">{tariff.legalBasis}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-ocean-muted border-t border-ocean-outline/20 pt-2">
                    💡 Pengunjung berhak meminta karcis atau bukti pembayaran resmi berstempel saat melakukan pembayaran di loket. Jika tarif yang ditagih melebihi nominal di atas, gunakan tombol aduan.
                  </p>
                </div>

              </div>
            )}

            {/* TAB 2: TELEMETRI MARITIM & BMKG */}
            {activeTab === 'maritime' && (
              <div className="space-y-5 animate-fadeIn">

                {/* Wave Alert Condition Card */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between ${maritime.alertLevel === 'Tenang'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : maritime.alertLevel === 'Sedang'
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white shadow-xs">
                      <Waves className="w-6 h-6 text-brand" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider">Status Keselamatan Ombak</p>
                      <h4 className="text-lg font-extrabold">Kondisi Gelombang: {maritime.alertLevel} ({maritime.waveHeight} meter)</h4>
                      <p className="text-xs opacity-90">
                        {maritime.alertLevel === 'Tenang' && 'Aman untuk aktivitas tepi pantai, berenang santai dengan pengawasan.'}
                        {maritime.alertLevel === 'Sedang' && 'Perlu kehati-hatian ekstra, disarankan tidak berenang ke tengah.'}
                        {maritime.alertLevel === 'Tinggi' && 'Gelombang tinggi! Khusus peselancar profesional atau pemantauan tepi.'}
                        {maritime.alertLevel === 'Ekstrem' && 'BAHAYA: Aktivitas laut dilarang oleh pihak berwenang.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Ocean Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3.5 rounded-2xl bg-surface-low border border-ocean-outline/20 text-center">
                    <span className="material-symbols-outlined text-brand text-2xl">water</span>
                    <p className="text-[11px] text-ocean-muted font-medium mt-1">Tinggi Gelombang</p>
                    <p className="text-xl font-extrabold text-ocean-navy">{maritime.waveHeight} m</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-surface-low border border-ocean-outline/20 text-center">
                    <Wind className="w-6 h-6 mx-auto text-cyan-600" />
                    <p className="text-[11px] text-ocean-muted font-medium mt-1">Kecepatan Angin</p>
                    <p className="text-xl font-extrabold text-ocean-navy">{maritime.windSpeed} knot</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-surface-low border border-ocean-outline/20 text-center">
                    <Clock className="w-6 h-6 mx-auto text-amber-600" />
                    <p className="text-[11px] text-ocean-muted font-medium mt-1">Periode Swell</p>
                    <p className="text-xl font-extrabold text-ocean-navy">{maritime.wavePeriod} detik</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-surface-low border border-ocean-outline/20 text-center">
                    <span className="material-symbols-outlined text-indigo-600 text-2xl">expand</span>
                    <p className="text-[11px] text-ocean-muted font-medium mt-1">Pasang / Surut</p>
                    <p className="text-xs font-bold text-ocean-navy mt-1">{maritime.tideStatus}</p>
                  </div>
                </div>

                {/* Metadata & Disclaimer */}
                <div className="p-3.5 rounded-xl bg-surface-low/70 border border-ocean-outline/20 text-xs text-ocean-muted flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ocean-navy">Sumber Data: {maritime.source}</p>
                    <p className="text-[11px] mt-0.5">
                      Pembaruan otomatis: {maritime.updatedAt}. Kondisi ombak lokal dapat dipengaruhi oleh perubahan pasang-surut mikro dan bentuk garis pantai setempat. Tetap patuhi arahan petugas Balawista/penjaga pantai di lokasi.
                    </p>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: AKSES & FASILITAS */}
            {activeTab === 'facilities' && (
              <div className="space-y-5 animate-fadeIn">

                {/* Road and Vehicle Access */}
                <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                  <h4 className="text-xs font-bold text-ocean-navy uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-brand" />
                    Akses Jalan & Transportasi
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-ocean-muted font-medium">Kondisi Permukaan Jalan:</p>
                      <p className="font-bold text-ocean-navy text-sm mt-0.5">{accessibility.roadSurface}</p>
                    </div>
                    <div>
                      <p className="text-ocean-muted font-medium">Kendaraan yang Dapat Menjangkau:</p>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {accessibility.vehicles.map((v, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-ocean-outline/30 font-semibold text-ocean-navy">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Facilities Checklist */}
                <div>
                  <h4 className="text-xs font-bold text-ocean-navy uppercase tracking-wider mb-3">
                    Fasilitas di Lokasi
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-ocean-navy">Toilet Umum</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-ocean-navy">Air Bilas / Air Tawar</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      {facilities.mushola ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-semibold text-ocean-navy">Mushola</span>
                        </>
                      ) : (
                        <>
                          <X className="w-4 h-4 text-ocean-muted" />
                          <span className="text-xs font-medium text-ocean-muted">Mushola (Belum ada)</span>
                        </>
                      )}
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-ocean-navy">Area Parkir</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-semibold text-ocean-navy">Warung Makan / Kuliner</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-ocean-outline/20 flex items-center gap-2.5">
                      {facilities.lifeguard ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-semibold text-ocean-navy">Penjaga Pantai (Lifeguard)</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span className="text-xs font-medium text-amber-700">Tanpa Lifeguard Tetap</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 4: PETA LOKASI */}
            {activeTab === 'map' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-ocean-navy flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand" />
                    Koordinat Geospasial: {latitude}, {longitude}
                  </span>
                  {gmapsUrl && (
                    <a
                      href={gmapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Buka di Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Leaflet Map container */}
                <div
                  ref={mapContainerRef}
                  className="w-full h-72 sm:h-80 rounded-2xl border border-ocean-outline/30 overflow-hidden shadow-inner"
                />
              </div>
            )}

          </div>

          {/* Modal Sticky Footer CTA */}
          <div className="border-t border-ocean-outline/20 bg-surface px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-center sm:text-left">
              <p className="text-xs text-ocean-muted">Estimasi Biaya Masuk & Parkir:</p>
              <p className="text-base font-extrabold text-brand-deep">
                {formatRupiah(tariff.entranceFee)} + Parkir {formatRupiah(tariff.parkingR2)}
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              {gmapsUrl ? (
                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-brand/30 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Petunjuk Arah Rute</span>
                </a>
              ) : (
                <button
                  onClick={handleCopyCoords}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-brand/30 transition-all cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Salin Koordinat GPS</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy text-xs font-semibold cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Lapor Pungli Sub-Modal */}
      <ReportTariffModal
        beach={beach}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmitReport={onSubmitReport}
      />
    </>
  );
}

