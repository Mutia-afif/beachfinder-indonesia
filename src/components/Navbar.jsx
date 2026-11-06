import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Heart, 
  AlertTriangle, 
  ShieldCheck, 
  Menu, 
  X, 
  Search,
  Lock,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  favoritesCount, 
  onOpenSearch,
  adminSession,
  onLogoutAdmin,
  onRequestAdminLogin
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const primaryNavItems = [
    { id: 'catalog', label: 'Jelajahi Pantai', shortLabel: 'Jelajahi', icon: Compass },
    { id: 'map', label: 'Peta GIS Nusantara', shortLabel: 'Peta GIS', icon: MapPin },
    { id: 'recommendation', label: 'Rekomendasi Pintar', shortLabel: 'Rekomendasi', icon: Sparkles },
    { 
      id: 'favorites', 
      label: 'Favorit', 
      shortLabel: 'Favorit',
      icon: Heart, 
      badge: favoritesCount > 0 ? favoritesCount : null 
    },
    { id: 'maritime', label: 'Telemetri BMKG', shortLabel: 'BMKG', icon: AlertTriangle },
  ];

  const handleSelectTab = (id) => {
    if (id === 'admin' && !adminSession) {
      if (onRequestAdminLogin) onRequestAdminLogin();
      setMobileMenuOpen(false);
      return;
    }
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-ocean-outline/30 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleSelectTab('catalog')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-ocean-outline/30 shadow-xs flex items-center justify-center overflow-hidden p-0.5 group-hover:scale-105 group-hover:border-brand/40 group-hover:shadow-md transition-all shrink-0">
              <img 
                src="/logo-emblem.jpg" 
                alt="BeachFinder Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-ocean-navy group-hover:text-brand transition-colors">
                BeachFinder
              </span>
              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-brand-light text-brand-deep tracking-wider uppercase">
                ID
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`relative px-2.5 xl:px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive 
                      ? 'text-brand-deep bg-brand-light/70 font-bold' 
                      : 'text-ocean-muted hover:text-ocean-navy hover:bg-surface-low'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand' : 'text-ocean-muted'}`} />
                  <span className="hidden xl:inline whitespace-nowrap">{item.label}</span>
                  <span className="xl:hidden inline whitespace-nowrap">{item.shortLabel || item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Admin Portal di Ujung */}
          <div className="hidden sm:flex items-center pl-4 lg:pl-6 border-l border-ocean-outline/30 shrink-0">
            {/* KSTI 26 Affiliation Pill in Navbar */}
            <div className="hidden 2xl:flex items-center gap-2 mr-3 px-2.5 py-1 rounded-xl bg-surface-low border border-ocean-outline/40 select-none">
              <span className="text-[10px] font-bold text-ocean-muted uppercase tracking-wider">KSTI '26</span>
              <span className="w-px h-3 bg-ocean-outline/40" />
              <img src="/logo-ksti.png" alt="KSTI 26" className="h-3.5 w-auto object-contain" title="Konvensi Sains, Teknologi, dan Industri Indonesia" />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleSelectTab('admin')}
                className={`px-4 py-2 rounded-xl text-xs xl:text-sm font-bold whitespace-nowrap shrink-0 flex items-center gap-2 transition-all border cursor-pointer ${
                  activeTab === 'admin' 
                    ? 'bg-brand text-white border-brand shadow-sm shadow-brand/30' 
                    : adminSession 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-surface-low text-ocean-navy border-ocean-outline/40 hover:bg-surface-container hover:border-brand/40'
                }`}
                title={adminSession ? `Akses Verifikator Aktif (${adminSession.displayName})` : 'Perlu Autentikasi Pengelola'}
              >
                {adminSession ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="whitespace-nowrap">Admin Portal</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-ocean-muted shrink-0" />
                    <span className="whitespace-nowrap">Admin Portal</span>
                  </>
                )}
              </button>

              {adminSession && (
                <button
                  onClick={onLogoutAdmin}
                  className="p-2 rounded-xl bg-surface-low hover:bg-rose-50 text-ocean-muted hover:text-rose-600 border border-ocean-outline/30 transition-colors cursor-pointer shrink-0"
                  title="Keluar dari sesi administrator"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-surface-low text-ocean-navy hover:bg-surface-container"
              aria-label="Cari"
            >
              <Search className="w-5 h-5 text-brand" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-surface-low text-ocean-navy hover:bg-surface-container transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface border-b border-ocean-outline/30 px-4 pt-2 pb-6 space-y-1.5 animate-fadeIn">
          {primaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                  isActive 
                    ? 'bg-brand-light text-brand-deep font-bold' 
                    : 'text-ocean-navy hover:bg-surface-low'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-brand' : 'text-ocean-muted'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-ocean-outline/20">
            <button
              onClick={() => handleSelectTab('admin')}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                activeTab === 'admin'
                  ? 'bg-brand text-white font-bold'
                  : 'text-ocean-navy hover:bg-surface-low'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-brand" />
                <span>Portal Administrator</span>
              </div>
              {adminSession && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </button>
          </div>

          {adminSession && (
            <button
              onClick={() => {
                onLogoutAdmin();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 flex items-center gap-2 mt-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi Admin ({adminSession.displayName})</span>
            </button>
          )}

          {/* Mobile Drawer Affiliations */}
          <div className="pt-3 mt-2 border-t border-ocean-outline/20 flex items-center justify-center gap-3 px-2">
            <img src="/logo-teknokrat.png" alt="UTI" className="h-5 w-auto object-contain" />
            <span className="w-px h-3 bg-ocean-outline/40" />
            <div className="bg-white px-2 py-0.5 rounded shadow-2xs flex items-center">
              <img src="/logo-ai-center.png" alt="AI Center" className="h-3.5 w-auto object-contain" />
            </div>
            <span className="w-px h-3 bg-ocean-outline/40" />
            <div className="bg-white px-2 py-0.5 rounded shadow-2xs flex items-center">
              <img src="/logo-ksti.png" alt="KSTI 26" className="h-3.5 w-auto object-contain" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

