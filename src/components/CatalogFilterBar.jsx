import React, { useState, useMemo, useRef } from 'react';
import { Search, MapPin, Tag, X, Sparkles } from 'lucide-react';

export default function CatalogFilterBar({
  searchQuery,
  setSearchQuery,
  selectedProvince,
  setSelectedProvince,
  provinces,
  activeFilterTag,
  setActiveFilterTag,
  beaches = [],
  onSelectBeach
}) {
  const [showLiveDropdown, setShowLiveDropdown] = useState(false);
  const searchInputRef = useRef(null);

  const quickFilters = [
    { id: 'all', label: 'Semua Pantai' },
    { id: 'surf', label: '🏄 Spot Surfing' },
    { id: 'white-sand', label: '🏖️ Pasir Putih' },
    { id: 'family', label: '👨‍👩‍👧‍👦 Ramah Keluarga' },
    { id: 'cliff', label: '🧗 Tebing Karang' },
    { id: 'sunset', label: '🌅 Sunset Spot' },
    { id: 'free', label: '🎟️ Tiket Gratis' },
  ];

  // Instant live search autocomplete results
  const liveResults = useMemo(() => {
    if (!searchQuery || searchQuery.trim().length < 2) return [];
    const q = searchQuery.toLowerCase().trim();
    return beaches.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.province.toLowerCase().includes(q) ||
      b.tags.some(t => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [beaches, searchQuery]);

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-ocean-outline/30 mb-8 transition-all">
      
      {/* Top Search & Province Row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Search Input with Live Dropdown */}
        <div className="md:col-span-6 relative">
          <label htmlFor="search-input" className="sr-only">Cari pantai</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-brand" />
          </div>
          <input
            ref={searchInputRef}
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowLiveDropdown(true);
            }}
            onFocus={() => setShowLiveDropdown(true)}
            placeholder="Cari nama pantai, kabupaten, atau daya tarik..."
            className="block w-full pl-10 pr-8 py-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy placeholder-ocean-muted/70 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowLiveDropdown(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-ocean-muted hover:text-ocean-navy text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Floating Live Search Results Dropdown */}
          {showLiveDropdown && liveResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 z-30 bg-white rounded-2xl shadow-xl border border-brand/30 overflow-hidden divide-y divide-ocean-outline/10 animate-fadeIn">
              <div className="p-2.5 bg-surface-low text-[10px] font-bold text-ocean-muted uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1 text-brand">
                  <Sparkles className="w-3 h-3" />
                  Saran Destinasi Cepat:
                </span>
                <span>{liveResults.length} hasil</span>
              </div>

              {liveResults.map((beach) => (
                <div
                  key={beach.id}
                  onClick={() => {
                    if (onSelectBeach) onSelectBeach(beach);
                    setShowLiveDropdown(false);
                  }}
                  className="p-3 hover:bg-brand-light/50 transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={beach.photo}
                      alt={beach.name}
                      className="w-10 h-10 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <p className="font-bold text-ocean-navy">{beach.name}</p>
                      <p className="text-[11px] text-ocean-muted">
                        📍 {beach.province} • Tiket: {beach.tariff.entranceFee === 0 ? 'Gratis' : `Rp ${beach.tariff.entranceFee.toLocaleString('id-ID')}`}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-brand text-white font-bold text-[10px] shrink-0">
                    Buka Detail ↵
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Province Dropdown */}
        <div className="md:col-span-4 relative">
          <label htmlFor="catalog-province-select" className="sr-only">Pilih Wilayah</label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <MapPin className="h-4 w-4 text-brand" />
          </div>
          <select
            id="catalog-province-select"
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="block w-full pl-10 pr-8 py-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all cursor-pointer appearance-none"
          >
            <option value="all">Seluruh Wilayah ({provinces.length} Provinsi)</option>
            {provinces.map((prov) => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-ocean-muted text-base">expand_more</span>
          </div>
        </div>

        {/* Reset Filter Button */}
        <div className="md:col-span-2">
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedProvince('all');
              setActiveFilterTag('all');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy hover:text-brand-deep border border-ocean-outline/30 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Reset Filter</span>
          </button>
        </div>

      </div>

      {/* Bottom Category Filter Chips Row */}
      <div className="mt-3.5 pt-3.5 border-t border-ocean-outline/20 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-semibold text-ocean-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-brand" /> Filter Kategori:
        </span>
        {quickFilters.map((qf) => {
          const isSelected = activeFilterTag === qf.id;
          return (
            <button
              key={qf.id}
              onClick={() => setActiveFilterTag(qf.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                isSelected 
                  ? 'bg-brand text-white shadow-xs font-semibold' 
                  : 'bg-surface-low hover:bg-surface-container text-ocean-navy border border-ocean-outline/30'
              }`}
            >
              <span>{qf.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

