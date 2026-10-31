import React, { useState, useEffect, useRef, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { 
  MapPin, 
  Layers, 
  Search, 
  Compass, 
  Waves, 
  DollarSign, 
  Star, 
  ArrowRight, 
  X, 
  ShieldCheck,
  Grid
} from 'lucide-react';

export default function GisMapView({ beaches, onSelectBeach, onToast }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const clusterGroupRef = useRef(null);

  const [selectedBeach, setSelectedBeach] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [mapSearch, setMapSearch] = useState('');
  const [useClustering, setUseClustering] = useState(true);

  // Extract unique provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(beaches.map(b => b.province))).sort();
  }, [beaches]);

  // Filter beaches with valid coordinates
  const filteredBeaches = useMemo(() => {
    return beaches.filter(b => {
      if (b.latitude === 0 && b.longitude === 0) return false;
      if (selectedProvince !== 'all' && b.province !== selectedProvince) return false;
      if (mapSearch) {
        const q = mapSearch.toLowerCase();
        const matchName = b.name.toLowerCase().includes(q);
        const matchProv = b.province.toLowerCase().includes(q);
        if (!matchName && !matchProv) return false;
      }
      return true;
    });
  }, [beaches, selectedProvince, mapSearch]);

  // Cleanup map instance on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      if (mapContainerRef.current._leaflet_id) {
        delete mapContainerRef.current._leaflet_id;
      }

      // Center of Indonesia archipelago
      const map = L.map(mapContainerRef.current, {
        center: [-2.5489, 118.0149],
        zoom: 5,
        zoomControl: false,
        preferCanvas: true
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // OpenStreetMap Tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove old layer/clusters
    if (clusterGroupRef.current) {
      map.removeLayer(clusterGroupRef.current);
      clusterGroupRef.current = null;
    }

    // Create Cluster Group or Feature Group
    const group = useClustering && L.markerClusterGroup 
      ? L.markerClusterGroup({
          showCoverageOnHover: false,
          maxClusterRadius: 45,
          iconCreateFunction: function(cluster) {
            const count = cluster.getChildCount();
            return L.divIcon({
              html: `<div style="background: linear-gradient(135deg, #0284c7, #006194); color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 11px; border: 2.5px solid white; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">${count}</div>`,
              className: 'custom-cluster-icon',
              iconSize: L.point(36, 36)
            });
          }
        })
      : L.featureGroup();

    // RENDER ALL 1,571 BEACHES ACROSS INDONESIA (NO TRUNCATION / NO SLICE)
    filteredBeaches.forEach(beach => {
      const isHighRating = beach.rating >= 4.5;
      const color = isHighRating ? '#0284c7' : '#006194';

      const pinIcon = L.divIcon({
        className: 'custom-gis-pin',
        html: `<div style="background-color: ${color}; width: 22px; height: 22px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
          <span class="material-symbols-outlined" style="font-size: 13px;">waves</span>
        </div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      const marker = L.marker([beach.latitude, beach.longitude], { icon: pinIcon })
        .on('click', () => {
          setSelectedBeach(beach);
          map.flyTo([beach.latitude, beach.longitude], 12, { duration: 1 });
        });

      group.addLayer(marker);
    });

    map.addLayer(group);
    clusterGroupRef.current = group;

    // If province is selected, fly to bounds of that province
    if (selectedProvince !== 'all' && filteredBeaches.length > 0) {
      const bounds = L.latLngBounds(filteredBeaches.map(b => [b.latitude, b.longitude]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11 });
    }

  }, [filteredBeaches, selectedProvince, useClustering]);

  const formatRupiah = (val) => {
    if (val === 0) return 'Gratis';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="relative w-full h-[calc(100vh-4.5rem)] flex flex-col overflow-hidden">
      
      {/* Floating Control Panel (Top) */}
      <div className="absolute top-4 inset-x-4 z-20 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-2 pointer-events-none">
        
        {/* Search & Filter Bar */}
        <div className="w-full bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-coastal border border-brand/20 flex flex-col sm:flex-row items-center gap-2 pointer-events-auto">
          
          {/* Keyword Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-brand absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Cari pantai atau pulau di peta..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
            />
          </div>

          {/* Province Selector */}
          <div className="w-full sm:w-60">
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="w-full py-2 px-3 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
            >
              <option value="all">Seluruh Indonesia ({filteredBeaches.length} Titik)</option>
              {provinces.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Clustering Toggle */}
          <button
            onClick={() => setUseClustering(!useClustering)}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
              useClustering ? 'bg-brand text-white shadow-xs' : 'bg-surface-low text-ocean-navy border border-ocean-outline/30'
            }`}
            title="Kelompokkan titik yang berdekatan"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{useClustering ? 'Cluster Aktif' : 'Semua Pin'}</span>
          </button>

          {/* Count Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-light text-brand-deep text-xs font-bold whitespace-nowrap">
            <MapPin className="w-3.5 h-3.5 text-brand" />
            <span>{filteredBeaches.length} Pantai Terpetakan</span>
          </div>

        </div>

      </div>

      {/* Main Map Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Selected Beach Preview Card / Bottom Sheet */}
      {selectedBeach && (
        <div className="absolute bottom-6 inset-x-4 sm:left-auto sm:right-6 sm:w-96 z-30 animate-fadeIn">
          <div className="bg-white rounded-3xl p-4 shadow-2xl border border-brand/30 relative overflow-hidden">
            
            {/* Close Preview */}
            <button
              onClick={() => setSelectedBeach(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Thumbnail */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-3 bg-surface-low">
              <img
                src={selectedBeach.photo}
                alt={selectedBeach.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
                }}
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-ocean-navy/80 text-white text-[10px] font-bold">
                {selectedBeach.province}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1 font-bold text-ocean-navy">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{selectedBeach.rating > 0 ? selectedBeach.rating.toFixed(1) : '4.2'}</span>
                </span>
                <span className="text-[11px] font-semibold text-brand">
                  Ombak: {selectedBeach.maritime.waveHeight}m ({selectedBeach.maritime.alertLevel})
                </span>
              </div>

              <h4 className="text-base font-extrabold text-ocean-navy mt-1 line-clamp-1">
                {selectedBeach.name}
              </h4>

              <div className="mt-2 p-2 rounded-xl bg-surface-low border border-ocean-outline/20 flex items-center justify-between text-xs">
                <span className="text-ocean-muted">Tiket Masuk:</span>
                <span className="font-extrabold text-brand-deep">
                  {formatRupiah(selectedBeach.tariff.entranceFee)}
                </span>
              </div>

              {/* Action */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => onSelectBeach(selectedBeach)}
                  className="flex-1 py-2 px-3 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-sm shadow-brand/30 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Lihat Detail Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

