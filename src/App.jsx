import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSearch from './components/HeroSearch';
import CatalogFilterBar from './components/CatalogFilterBar';
import BeachCard from './components/BeachCard';
import BeachDetailModal from './components/BeachDetailModal';
import RecommendationWizard from './components/RecommendationWizard';
import GisMapView from './components/GisMapView';
import MaritimeAlertView from './components/MaritimeAlertView';
import AdminPortal from './components/AdminPortal';
import AdminAuthModal from './components/AdminAuthModal';
import FavoritesView from './components/FavoritesView';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Ingest generated dataset
import rawBeaches from './data/beaches.json';
import { 
  Compass, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight, 
  SlidersHorizontal, 
  MapPin, 
  Sparkles,
  Lock
} from 'lucide-react';

export default function App() {
  // Ingest dataset and merge with persisted admin customizations from LocalStorage
  const [beaches, setBeaches] = useState(() => {
    try {
      const savedCustom = localStorage.getItem('beachfinder_custom_beaches');
      if (savedCustom) {
        const customMap = JSON.parse(savedCustom);
        if (customMap && typeof customMap === 'object') {
          const rawIds = new Set(rawBeaches.map(b => b.id));
          const newlyCreated = Object.values(customMap).filter(b => b && b.id && !rawIds.has(b.id));
          const merged = rawBeaches.map(b => {
            if (customMap[b.id]) {
              return { ...b, ...customMap[b.id] };
            }
            return b;
          });
          return [...newlyCreated, ...merged];
        }
      }
    } catch (e) {
      console.error('Failed to load custom beaches from localStorage:', e);
    }
    return rawBeaches;
  });

  const [activeTab, setActiveTab] = useState('catalog');
  
  // Administrator session authentication state
  const [adminSession, setAdminSession] = useState(() => {
    try {
      const saved = localStorage.getItem('beachfinder_admin_session') || sessionStorage.getItem('beachfinder_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('all');
  const [activeFilterTag, setActiveFilterTag] = useState('all');
  const [sortBy, setSortBy] = useState('rating-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 24;

  // Modals & details
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Favorites in LocalStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('beachfinder_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Reports in LocalStorage
  const [reports, setReports] = useState(() => {
    try {
      const saved = localStorage.getItem('beachfinder_reports');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return [
        {
          ticketNumber: 'TKT-20261031-7701',
          beachName: 'Pantai Menganti Kebumen',
          province: 'Jawa Tengah',
          tariffType: 'parking_r4',
          demandedAmount: 25000,
          officialAmount: 10000,
          incidentDate: '2026-10-31',
          incidentLocation: 'Pos Masuk Pintu Gerbang Timur',
          description: 'Petugas loket memungut biaya parkir mobil Rp 25.000 tunai tanpa memberikan karcis resmi berporporasi Perda, padahal di papan tarif resmi Pemkab tertulis Rp 10.000.',
          photoProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
          reporterContact: '0812-9988-3412',
          status: 'Menunggu Tinjauan',
          resolutionNote: '',
          createdAt: '2026-10-31T08:30:00Z'
        }
      ];
    } catch {
      return [];
    }
  });

  // Save favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('beachfinder_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Save reports to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('beachfinder_reports', JSON.stringify(reports));
    } catch (e) {
      console.error(e);
    }
  }, [reports]);

  // Keyboard shortcut Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        } else {
          setActiveTab('catalog');
          setTimeout(() => {
            const el = document.getElementById('search-input');
            if (el) el.focus();
          }, 100);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Extract unique provinces
  const provinces = useMemo(() => {
    return Array.from(new Set(beaches.map(b => b.province))).sort();
  }, [beaches]);

  // Filter & Sort Beaches
  const filteredBeaches = useMemo(() => {
    return beaches
      .filter((beach) => {
        // Search query
        if (searchQuery) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = beach.name.toLowerCase().includes(q);
          const matchProv = beach.province.toLowerCase().includes(q);
          const matchTag = beach.tags.some(t => t.toLowerCase().includes(q));
          if (!matchName && !matchProv && !matchTag) return false;
        }

        // Province
        if (selectedProvince !== 'all' && beach.province !== selectedProvince) {
          return false;
        }

        // Quick Filter Tag
        if (activeFilterTag === 'surf' && !beach.features.hasSurf) return false;
        if (activeFilterTag === 'white-sand' && !beach.features.hasWhiteSand) return false;
        if (activeFilterTag === 'family' && !beach.features.isFamilyFriendly) return false;
        if (activeFilterTag === 'cliff' && !beach.features.hasCliff) return false;
        if (activeFilterTag === 'sunset' && !beach.features.hasSunset) return false;
        if (activeFilterTag === 'free' && beach.tariff.entranceFee > 0) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating-desc') return b.rating - a.rating;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'price-asc') return a.tariff.entranceFee - b.tariff.entranceFee;
        if (sortBy === 'price-desc') return b.tariff.entranceFee - a.tariff.entranceFee;
        return 0;
      });
  }, [beaches, searchQuery, selectedProvince, activeFilterTag, sortBy]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedProvince, activeFilterTag, sortBy]);

  // Pagination slice
  const paginatedBeaches = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBeaches.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBeaches, currentPage]);

  const totalPages = Math.ceil(filteredBeaches.length / ITEMS_PER_PAGE);

  // Toggle favorite
  const handleToggleFavorite = (beachId) => {
    setFavorites(prev => {
      const exists = prev.includes(beachId);
      if (exists) {
        showToast('Pantai dihapus dari daftar favorit');
        return prev.filter(id => id !== beachId);
      } else {
        showToast('Pantai berhasil disimpan ke favorit!');
        return [...prev, beachId];
      }
    });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
  };

  // Save edited or created beach from Admin with LocalStorage persistence
  const handleSaveBeach = (updatedBeach) => {
    setBeaches(prev => {
      const idx = prev.findIndex(b => b.id === updatedBeach.id);
      let nextBeaches;
      if (idx >= 0) {
        nextBeaches = [...prev];
        nextBeaches[idx] = updatedBeach;
      } else {
        nextBeaches = [updatedBeach, ...prev];
      }
      return nextBeaches;
    });

    // Update selected modal if currently inspecting this beach
    setSelectedBeach(prev => (prev && prev.id === updatedBeach.id ? updatedBeach : prev));

    // Persist modifications to localStorage so refreshes keep all edits
    try {
      const savedCustom = localStorage.getItem('beachfinder_custom_beaches');
      const customMap = savedCustom ? JSON.parse(savedCustom) : {};
      customMap[updatedBeach.id] = updatedBeach;
      localStorage.setItem('beachfinder_custom_beaches', JSON.stringify(customMap));
    } catch (e) {
      console.error('Failed to save custom beach to localStorage:', e);
    }
  };

  // Administrator login & session handlers
  const handleSuccessAdminLogin = (session, rememberMe) => {
    setAdminSession(session);
    setAuthModalOpen(false);
    setActiveTab('admin');
    if (rememberMe) {
      localStorage.setItem('beachfinder_admin_session', JSON.stringify(session));
    } else {
      sessionStorage.setItem('beachfinder_admin_session', JSON.stringify(session));
    }
    showToast(`Otoritas diverifikasi! Selamat datang, ${session.displayName}.`);
  };

  const handleLogoutAdmin = () => {
    setAdminSession(null);
    localStorage.removeItem('beachfinder_admin_session');
    sessionStorage.removeItem('beachfinder_admin_session');
    setActiveTab('catalog');
    showToast('Sesi administrator berhasil diakhiri.');
  };

  // Submit pungli complaint
  const handleSubmitReport = (newReport) => {
    setReports(prev => [newReport, ...prev]);
    showToast(`Laporan aduan ${newReport.ticketNumber} berhasil dicatat.`);
  };

  // Update report status
  const handleUpdateReportStatus = (ticketNumber, newStatus, resolutionNote, photoProof) => {
    setReports(prev => prev.map(r => {
      if (r.ticketNumber === ticketNumber) {
        return {
          ...r,
          status: newStatus,
          resolutionNote: resolutionNote !== undefined ? resolutionNote : r.resolutionNote,
          photoProof: photoProof !== undefined ? photoProof : r.photoProof,
          updatedAt: new Date().toISOString()
        };
      }
      return r;
    }));
    showToast(`Status laporan ${ticketNumber} diperbarui: ${newStatus}`);
  };

  // Delete/Archive report
  const handleDeleteReport = (ticketNumber) => {
    setReports(prev => prev.filter(r => r.ticketNumber !== ticketNumber));
    showToast(`Laporan ${ticketNumber} telah dihapus.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-bg text-ocean-navy font-sans antialiased">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'admin' && !adminSession) {
            setAuthModalOpen(true);
            return;
          }
          setActiveTab(tab);
        }}
        favoritesCount={favorites.length}
        onOpenSearch={() => {
          setActiveTab('catalog');
          setTimeout(() => {
            const el = document.getElementById('search-input');
            if (el) el.focus();
          }, 100);
        }}
        adminSession={adminSession}
        onLogoutAdmin={handleLogoutAdmin}
        onRequestAdminLogin={() => setAuthModalOpen(true)}
      />

      {/* Main App Content Viewport */}
      <main className="flex-1">
        
        {/* VIEW 1: CATALOG & EXPLORATION */}
        {activeTab === 'catalog' && (
          <div>
            {/* Cinematic Hero Header (Clean Scenic Background) */}
            <HeroSearch
              totalBeaches={beaches.length}
              beaches={beaches}
              onSelectBeach={(b) => setSelectedBeach(b)}
            />

            {/* Catalog Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              
              {/* Filter Bar (Placed cleanly above the destination list on solid surface) */}
              <CatalogFilterBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                provinces={provinces}
                activeFilterTag={activeFilterTag}
                setActiveFilterTag={setActiveFilterTag}
                beaches={beaches}
                onSelectBeach={(b) => setSelectedBeach(b)}
              />

              {/* Results Count & Sort Dropdown */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-ocean-outline/20">
                <div>
                  <h2 className="text-xl font-extrabold text-ocean-navy">
                    Daftar Destinasi Pesisir Nusantara
                  </h2>
                  <p className="text-xs text-ocean-muted mt-0.5">
                    Menampilkan <strong>{filteredBeaches.length.toLocaleString('id-ID')} pantai</strong> dari total {beaches.length.toLocaleString('id-ID')} data terdaftar
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-xs text-ocean-muted font-medium flex items-center gap-1">
                    <ArrowUpDown className="w-3.5 h-3.5 text-brand" /> Urutkan:
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="py-1.5 px-3 rounded-xl bg-white border border-ocean-outline/30 text-xs font-semibold focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
                  >
                    <option value="rating-desc">Rating Tertinggi ⭐</option>
                    <option value="name-asc">Nama Pantai (A - Z)</option>
                    <option value="price-asc">Tiket Masuk Termurah</option>
                    <option value="price-desc">Tiket Masuk Tertinggi</option>
                  </select>
                </div>
              </div>

              {/* Grid Cards */}
              {paginatedBeaches.length === 0 ? (
                <div className="p-16 text-center bg-white rounded-3xl border border-ocean-outline/30">
                  <div className="w-16 h-16 mx-auto rounded-full bg-surface-low flex items-center justify-center text-ocean-muted mb-3">
                    <Compass className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-ocean-navy">Tidak ada pantai yang sesuai kriteria</h3>
                  <p className="text-xs text-ocean-muted mt-1 max-w-sm mx-auto">
                    Coba ganti kata kunci pencarian atau reset filter untuk menampilkan kembali semua destinasi.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedProvince('all');
                      setActiveFilterTag('all');
                    }}
                    className="mt-4 px-4 py-2 rounded-xl bg-brand text-white text-xs font-bold"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {paginatedBeaches.map((beach) => (
                    <BeachCard
                      key={beach.id}
                      beach={beach}
                      isFavorite={favorites.includes(beach.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectBeach={(b) => setSelectedBeach(b)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-ocean-outline/20">
                  <p className="text-xs text-ocean-muted">
                    Halaman <strong className="text-ocean-navy">{currentPage}</strong> dari {totalPages} ({filteredBeaches.length} destinasi)
                  </p>
                  
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.max(1, p - 1));
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl bg-white border border-ocean-outline/30 text-ocean-navy hover:bg-surface-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      aria-label="Halaman Sebelumnya"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum = i + 1;
                        if (totalPages > 5 && currentPage > 3) {
                          pageNum = currentPage - 2 + i;
                          if (pageNum > totalPages) pageNum = totalPages - (4 - i);
                        }
                        return (
                          <button
                            key={pageNum}
                            onClick={() => {
                              setCurrentPage(pageNum);
                              window.scrollTo({ top: 380, behavior: 'smooth' });
                            }}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              currentPage === pageNum 
                                ? 'bg-brand text-white shadow-xs' 
                                : 'bg-white border border-ocean-outline/30 text-ocean-navy hover:bg-surface-low'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        setCurrentPage(p => Math.min(totalPages, p + 1));
                        window.scrollTo({ top: 380, behavior: 'smooth' });
                      }}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl bg-white border border-ocean-outline/30 text-ocean-navy hover:bg-surface-low disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                      aria-label="Halaman Selanjutnya"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* VIEW 2: INTERACTIVE GIS MAP */}
        {activeTab === 'map' && (
          <GisMapView
            beaches={beaches}
            onSelectBeach={(b) => setSelectedBeach(b)}
            onToast={showToast}
          />
        )}

        {/* VIEW 3: RECOMMENDATION ENGINE */}
        {activeTab === 'recommendation' && (
          <RecommendationWizard
            beaches={beaches}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectBeach={(b) => setSelectedBeach(b)}
          />
        )}

        {/* VIEW 4: FAVORITES VIEW */}
        {activeTab === 'favorites' && (
          <FavoritesView
            beaches={beaches}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectBeach={(b) => setSelectedBeach(b)}
            onExploreClick={() => setActiveTab('catalog')}
          />
        )}

        {/* VIEW 5: MARITIME & BMKG ALERTS */}
        {activeTab === 'maritime' && (
          <MaritimeAlertView
            beaches={beaches}
            onSelectBeach={(b) => setSelectedBeach(b)}
          />
        )}

        {/* VIEW 6: ADMIN BACK-OFFICE (GATED) */}
        {activeTab === 'admin' && (
          adminSession ? (
            <AdminPortal
              beaches={beaches}
              onSaveBeach={handleSaveBeach}
              reports={reports}
              onUpdateReportStatus={handleUpdateReportStatus}
              onDeleteReport={handleDeleteReport}
              onAddDemoReport={handleSubmitReport}
              adminSession={adminSession}
              onLogout={handleLogoutAdmin}
              onToast={showToast}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-ocean-outline/30 shadow-coastal text-center animate-fadeIn">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-ocean-navy">Akses Terbatas: Administrator</h3>
              <p className="text-xs text-ocean-muted mt-2 leading-relaxed">
                Halaman ini memerlukan autentikasi verifikator resmi untuk mengaudit retribusi dan menindaklanjuti laporan masyarakat.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="px-4 py-2.5 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy text-xs font-semibold cursor-pointer"
                >
                  Kembali
                </button>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold shadow-md shadow-brand/30 cursor-pointer"
                >
                  Buka Autentikasi
                </button>
              </div>
            </div>
          )
        )}

      </main>

      {/* Admin Authentication Gate Modal */}
      <AdminAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccessLogin={handleSuccessAdminLogin}
      />

      {/* Global Beach Detail Modal */}
      <BeachDetailModal
        beach={selectedBeach}
        isOpen={Boolean(selectedBeach)}
        onClose={() => setSelectedBeach(null)}
        isFavorite={selectedBeach ? favorites.includes(selectedBeach.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onToast={showToast}
        onSubmitReport={handleSubmitReport}
      />

      {/* Global Toast */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage('')}
      />

      {/* Footer */}
      <Footer onSelectTab={(t) => {
        if (t === 'admin' && !adminSession) {
          setAuthModalOpen(true);
          return;
        }
        setActiveTab(t);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }} />

    </div>
  );
}

