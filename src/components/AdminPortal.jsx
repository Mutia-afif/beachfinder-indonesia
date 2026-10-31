import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  FileText, 
  Upload, 
  X, 
  Eye, 
  Save, 
  Send,
  Camera,
  MapPin,
  Car,
  Database,
  Sparkles,
  LogOut,
  Lock
} from 'lucide-react';

export default function AdminPortal({ 
  beaches, 
  onSaveBeach, 
  reports = [], 
  onUpdateReportStatus,
  onDeleteReport,
  onAddDemoReport,
  adminSession,
  onLogout,
  onToast 
}) {
  const [adminSection, setAdminSection] = useState('inventory'); // 'inventory' | 'reports'
  const [searchAdmin, setSearchAdmin] = useState('');
  const [auditFilter, setAuditFilter] = useState('all');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingBeach, setEditingBeach] = useState(null);
  const [activeFormTab, setActiveFormTab] = useState('main');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoFilledInfo, setAutoFilledInfo] = useState(null);

  // Complaints / Reports State
  const [selectedReport, setSelectedReport] = useState(null);
  const [resolutionStatus, setResolutionStatus] = useState('Menunggu Tinjauan');
  const [resolutionNote, setResolutionNote] = useState('');
  const [searchReport, setSearchReport] = useState('');
  const [reportStatusFilter, setReportStatusFilter] = useState('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    province: 'Bali',
    latitude: -8.4095,
    longitude: 115.1889,
    roadSurface: 'Aspal Mulus',
    entranceFee: 10000,
    parkingR2: 2000,
    parkingR4: 5000,
    facilityFee: 15000,
    ownerType: 'Resmi Pemda (Perda)',
    legalBasis: 'Perda Kab. No. 2 Tahun 2024',
    verifiedDate: '2026-10-31',
    hasToilet: true,
    hasRinseWater: true,
    hasMushola: true,
    hasLifeguard: false,
    photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    photoAlt: 'Pemandangan garis pantai pasir putih alami'
  });

  // Calculate Metrics
  const stats = useMemo(() => {
    let fresh = 0, review = 0, expired = 0;
    beaches.forEach(b => {
      if (b.tariff.freshness === 'fresh') fresh++;
      else if (b.tariff.freshness === 'review') review++;
      else expired++;
    });
    return {
      total: beaches.length,
      fresh,
      review,
      expired,
      reportsCount: reports.length
    };
  }, [beaches, reports]);

  // Filter Table
  const filteredTable = useMemo(() => {
    return beaches.filter(b => {
      if (auditFilter !== 'all' && b.tariff.freshness !== auditFilter) return false;
      if (searchAdmin) {
        const q = searchAdmin.toLowerCase();
        return b.name.toLowerCase().includes(q) || b.province.toLowerCase().includes(q) || b.tariff.legalBasis.toLowerCase().includes(q);
      }
      return true;
    });
  }, [beaches, auditFilter, searchAdmin]);

  // Filter Reports Table
  const filteredReports = useMemo(() => {
    return reports.filter(r => {
      if (reportStatusFilter !== 'all') {
        if (reportStatusFilter === 'menunggu' && r.status !== 'Menunggu Tinjauan') return false;
        if (reportStatusFilter === 'proses' && r.status !== 'Dalam Pemeriksaan') return false;
        if (reportStatusFilter === 'selesai' && r.status !== 'Selesai (Ditindaklanjuti)') return false;
        if (reportStatusFilter === 'ditolak' && r.status !== 'Ditolak') return false;
      }
      if (searchReport) {
        const q = searchReport.toLowerCase();
        const matchTicket = r.ticketNumber?.toLowerCase().includes(q);
        const matchBeach = r.beachName?.toLowerCase().includes(q);
        const matchContact = r.reporterContact?.toLowerCase().includes(q);
        const matchDesc = r.description?.toLowerCase().includes(q);
        if (!matchTicket && !matchBeach && !matchContact && !matchDesc) return false;
      }
      return true;
    });
  }, [reports, reportStatusFilter, searchReport]);

  const openReportModal = (report) => {
    setSelectedReport(report);
    setResolutionStatus(report.status || 'Menunggu Tinjauan');
    setResolutionNote(report.resolutionNote || '');
  };

  const handleSaveReportResolution = (e) => {
    e.preventDefault();
    if (!selectedReport) return;
    if (onUpdateReportStatus) {
      onUpdateReportStatus(
        selectedReport.ticketNumber, 
        resolutionStatus, 
        resolutionNote,
        selectedReport.photoProof
      );
    }
    setSelectedReport(null);
  };

  const handleAddSampleReport = () => {
    if (onAddDemoReport) {
      const demoBeach = beaches.find(b => b.name.includes('Menganti')) || beaches[0];
      onAddDemoReport({
        ticketNumber: `BF-DEMO-${Math.floor(100000 + Math.random() * 900000)}`,
        beachId: demoBeach.id,
        beachName: demoBeach.name,
        province: demoBeach.province,
        tariffType: 'parking_r4',
        officialAmount: demoBeach.tariff?.parkingR4 || 5000,
        demandedAmount: 20000,
        incidentDate: '2026-10-31',
        incidentLocation: 'Pintu Gerbang Timur',
        description: 'Petugas loket mematok tarif parkir mobil Rp 20.000 secara sepihak dan tidak memberikan tiket resmi pemda berporporasi saat diminta pengunjung.',
        photoProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        reporterContact: '0812-9988-3412',
        status: 'Menunggu Tinjauan',
        resolutionNote: '',
        createdAt: new Date().toISOString()
      });
      if (onToast) onToast('Contoh aduan simulasi berhasil dibuat untuk pengujian!');
    }
  };

  const openAddModal = () => {
    setEditingBeach(null);
    setAutoFilledInfo(null);
    setShowSuggestions(false);
    setFormData({
      name: '',
      province: '',
      latitude: '',
      longitude: '',
      roadSurface: 'Aspal Mulus',
      entranceFee: 10000,
      parkingR2: 2000,
      parkingR4: 5000,
      facilityFee: 15000,
      ownerType: 'Resmi Pemda (Perda)',
      legalBasis: 'Perda Kab. No. 2 Tahun 2024',
      verifiedDate: '2026-10-31',
      hasToilet: true,
      hasRinseWater: true,
      hasMushola: true,
      hasLifeguard: false,
      photoUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      photoAlt: 'Pemandangan pantai pasir putih'
    });
    setActiveFormTab('main');
    setDrawerOpen(true);
  };

  const openEditModal = (beach) => {
    setEditingBeach(beach);
    setShowSuggestions(false);
    setAutoFilledInfo({
      name: beach.name,
      province: beach.province,
      lat: beach.latitude,
      lng: beach.longitude
    });
    setFormData({
      name: beach.name,
      province: beach.province,
      latitude: beach.latitude,
      longitude: beach.longitude,
      roadSurface: beach.accessibility.roadSurface,
      entranceFee: beach.tariff.entranceFee,
      parkingR2: beach.tariff.parkingR2,
      parkingR4: beach.tariff.parkingR4,
      facilityFee: beach.tariff.facilityFee,
      ownerType: beach.tariff.ownerType,
      legalBasis: beach.tariff.legalBasis,
      verifiedDate: beach.tariff.verifiedAt,
      hasToilet: beach.facilities.toilet,
      hasRinseWater: beach.facilities.rinseWater,
      hasMushola: beach.facilities.mushola,
      hasLifeguard: beach.facilities.lifeguard,
      photoUrl: beach.photo,
      photoAlt: `Foto dokumentasi ${beach.name}`
    });
    setActiveFormTab('main');
    setDrawerOpen(true);
  };

  // Autocomplete matching from 1,572 beaches
  const beachSuggestions = useMemo(() => {
    if (!formData.name || formData.name.trim().length < 1) return [];
    const q = formData.name.toLowerCase().trim();
    return beaches.filter(b => 
      b.name.toLowerCase().includes(q) || 
      b.province.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [beaches, formData.name]);

  // Autofill geographic & operational fields from master database
  const handleSelectMasterBeach = (b) => {
    setFormData(prev => ({
      ...prev,
      name: b.name,
      province: b.province,
      latitude: b.latitude,
      longitude: b.longitude,
      roadSurface: b.accessibility?.roadSurface || 'Aspal Mulus',
      entranceFee: b.tariff?.entranceFee ?? 10000,
      parkingR2: b.tariff?.parkingR2 ?? 2000,
      parkingR4: b.tariff?.parkingR4 ?? 5000,
      facilityFee: b.tariff?.facilityFee ?? 15000,
      ownerType: b.tariff?.ownerType || 'Resmi Pemda (Perda)',
      legalBasis: b.tariff?.legalBasis || `Perda Kab. ${b.province} No. 2/2024`,
      verifiedDate: b.tariff?.verifiedAt || '2026-10-31',
      hasToilet: b.facilities?.toilet ?? true,
      hasRinseWater: b.facilities?.rinseWater ?? true,
      hasMushola: b.facilities?.mushola ?? true,
      hasLifeguard: b.facilities?.lifeguard ?? false,
      photoUrl: b.photo || prev.photoUrl,
      photoAlt: `Dokumentasi resmi ${b.name}`
    }));
    setShowSuggestions(false);
    setAutoFilledInfo({
      name: b.name,
      province: b.province,
      lat: b.latitude,
      lng: b.longitude
    });
    if (onToast) onToast(`Data ${b.name} (${b.province}) berhasil dimuat otomatis!`);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) {
      if (onToast) onToast('Nama pantai wajib diisi!');
      return;
    }

    const updated = {
      ...(editingBeach || {
        id: `beach-${Date.now()}`,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        rating: 4.5,
        reviewCount: 1,
        tags: ['wisata baru', 'terverifikasi'],
        features: { hasSurf: false, hasWhiteSand: true, hasCliff: false, hasSunset: true },
        maritime: {
          waveHeight: 1.2,
          wavePeriod: 8,
          waveDirection: 'Selatan',
          windSpeed: 10,
          tideStatus: 'Menuju Pasang',
          alertLevel: 'Tenang',
          source: 'Stasiun Maritim BMKG',
          updatedAt: '31 Okt 2026'
        }
      }),
      name: formData.name,
      province: formData.province,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      photo: formData.photoUrl,
      accessibility: {
        roadSurface: formData.roadSurface,
        vehicles: ['Motor', 'Mobil']
      },
      tariff: {
        entranceFee: Number(formData.entranceFee),
        parkingR2: Number(formData.parkingR2),
        parkingR4: Number(formData.parkingR4),
        facilityFee: Number(formData.facilityFee),
        ownerType: formData.ownerType,
        legalBasis: formData.legalBasis,
        verifiedAt: formData.verifiedDate,
        verifiedDateFormatted: formData.verifiedDate,
        freshness: 'fresh',
        freshnessDays: 0
      },
      facilities: {
        toilet: formData.hasToilet,
        rinseWater: formData.hasRinseWater,
        mushola: formData.hasMushola,
        lifeguard: formData.hasLifeguard,
        parkingArea: true,
        foodStalls: true
      }
    };

    onSaveBeach(updated);
    setDrawerOpen(false);
    if (onToast) onToast(`Destinasi "${formData.name}" berhasil disimpan dan diverifikasi!`);
  };

  const formatRupiah = (val) => {
    if (val === 0) return 'Gratis';
    return `Rp ${val.toLocaleString('id-ID')}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Admin Title & CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Portal Back-Office BeachFinder • {adminSession?.displayName || 'Verifikator Resmi'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ocean-navy">
            Pengelolaan Data Pantai & Audit Tarif
          </h2>
          <p className="text-xs sm:text-sm text-ocean-muted mt-0.5">
            Kelola inventaris destinasi pesisir, validasi dasar hukum retribusi, dan tinjau laporan pungli masyarakat.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold shadow-md shadow-brand/30 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pantai Baru</span>
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2.5 rounded-xl bg-surface-low hover:bg-rose-50 text-ocean-navy hover:text-rose-600 border border-ocean-outline/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Keluar dari sesi administrator"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Keluar Sesi</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Interactive KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* KPI 1: Total Pantai */}
        <div 
          onClick={() => { setAdminSection('inventory'); setAuditFilter('all'); }}
          className={`p-5 rounded-3xl border transition-all cursor-pointer hover:shadow-coastal hover:-translate-y-0.5 ${
            adminSection === 'inventory' && auditFilter === 'all'
              ? 'bg-brand/5 border-brand ring-2 ring-brand/20 shadow-xs'
              : 'bg-white border-ocean-outline/30 shadow-xs'
          }`}
          title="Klik untuk tampilkan semua inventaris"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-ocean-muted">Total Pantai Terdata</p>
            <div className="p-2 rounded-xl bg-brand-light text-brand">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-ocean-navy mt-3">{stats.total.toLocaleString('id-ID')}</p>
          <p className="text-[11px] text-ocean-muted mt-1">38 Provinsi Resmi se-Nusantara</p>
        </div>

        {/* KPI 2: Tarif Terverifikasi */}
        <div 
          onClick={() => { setAdminSection('inventory'); setAuditFilter('fresh'); }}
          className={`p-5 rounded-3xl border transition-all cursor-pointer hover:shadow-coastal hover:-translate-y-0.5 ${
            adminSection === 'inventory' && auditFilter === 'fresh'
              ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400/30 shadow-xs'
              : 'bg-white border-ocean-outline/30 shadow-xs'
          }`}
          title="Klik untuk filter data fresh (<30h)"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-ocean-muted">Tarif Terverifikasi (&lt;30h)</p>
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 mt-3">{stats.fresh}</p>
          <p className="text-[11px] text-ocean-muted mt-1">Status Fresh & Legal Valid</p>
        </div>

        {/* KPI 3: Perlu Audit */}
        <div 
          onClick={() => { setAdminSection('inventory'); setAuditFilter('expired'); }}
          className={`p-5 rounded-3xl border transition-all cursor-pointer hover:shadow-coastal hover:-translate-y-0.5 ${
            adminSection === 'inventory' && (auditFilter === 'expired' || auditFilter === 'review')
              ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-400/30 shadow-xs'
              : 'bg-white border-ocean-outline/30 shadow-xs'
          }`}
          title="Klik untuk filter data kedaluwarsa (>90h)"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-ocean-muted">Perlu Audit (&gt;90h)</p>
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-rose-600 mt-3">{stats.expired}</p>
          <p className="text-[11px] text-ocean-muted mt-1">Memerlukan pembaruan Perda</p>
        </div>

        {/* KPI 4: Aduan Pungli Masuk (Clickable to switch to Complaints Table) */}
        <div 
          onClick={() => setAdminSection('reports')}
          className={`p-5 rounded-3xl border transition-all cursor-pointer hover:shadow-coastal hover:-translate-y-0.5 relative group ${
            adminSection === 'reports'
              ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400 shadow-md shadow-amber-500/10'
              : 'bg-white border-ocean-outline/30 shadow-xs hover:border-amber-400'
          }`}
          title="Klik untuk membuka kotak masuk aduan pungli"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-ocean-navy flex items-center gap-1.5">
              <span>Aduan Pungli Masuk</span>
            </p>
            <div className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold text-amber-600 mt-3">{stats.reportsCount}</p>
          <div className="mt-1 flex items-center justify-between text-[11px]">
            <span className="text-ocean-muted">Laporan masyarakat</span>
            <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full group-hover:scale-105 transition-transform flex items-center gap-1">
              Buka Kotak Masuk &rarr;
            </span>
          </div>
        </div>

      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setAdminSection('inventory')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            adminSection === 'inventory'
              ? 'bg-brand text-white shadow-md shadow-brand/20'
              : 'bg-white text-ocean-navy hover:bg-surface-low border border-ocean-outline/30'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Kelola Inventaris Pantai ({stats.total.toLocaleString('id-ID')})</span>
        </button>

        <button
          onClick={() => setAdminSection('reports')}
          className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            adminSection === 'reports'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
              : 'bg-white text-ocean-navy hover:bg-surface-low border border-ocean-outline/30'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Kotak Masuk Aduan Pungli ({stats.reportsCount})</span>
          {stats.reportsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white text-amber-700">
              {stats.reportsCount} Laporan
            </span>
          )}
        </button>
      </div>

      {/* VIEW SECTION A: INVENTARIS PANTAI TABLE */}
      {adminSection === 'inventory' && (
        <div className="bg-white rounded-3xl border border-ocean-outline/30 shadow-xs overflow-hidden animate-fadeIn">
          
          {/* Table Filters & Search */}
          <div className="p-4 sm:p-6 border-b border-ocean-outline/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-surface-low/30">
            
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-ocean-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchAdmin}
                onChange={(e) => setSearchAdmin(e.target.value)}
                placeholder="Cari nama pantai atau Perda..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-ocean-muted font-medium whitespace-nowrap">Filter Status:</span>
              <button
                onClick={() => setAuditFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  auditFilter === 'all' ? 'bg-brand text-white' : 'bg-surface-low text-ocean-navy'
                }`}
              >
                Semua ({beaches.length})
              </button>
              <button
                onClick={() => setAuditFilter('fresh')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  auditFilter === 'fresh' ? 'bg-emerald-600 text-white' : 'bg-surface-low text-emerald-700'
                }`}
              >
                Terverifikasi ({stats.fresh})
              </button>
              <button
                onClick={() => setAuditFilter('review')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  auditFilter === 'review' ? 'bg-amber-600 text-white' : 'bg-surface-low text-amber-700'
                }`}
              >
                Butuh Review ({stats.review})
              </button>
              <button
                onClick={() => setAuditFilter('expired')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  auditFilter === 'expired' ? 'bg-rose-600 text-white' : 'bg-surface-low text-rose-700'
                }`}
              >
                Kedaluwarsa ({stats.expired})
              </button>
            </div>

          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-low text-ocean-muted uppercase font-semibold text-[11px] border-b border-ocean-outline/20">
                <tr>
                  <th className="py-3 px-6">ID & Nama Destinasi</th>
                  <th className="py-3 px-4">Provinsi</th>
                  <th className="py-3 px-4">Tiket Masuk</th>
                  <th className="py-3 px-4">Entitas & Rujukan Legal</th>
                  <th className="py-3 px-4">Terakhir Audit</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ocean-outline/10 text-ocean-navy">
                {filteredTable.slice(0, 50).map((beach) => {
                  return (
                    <tr key={beach.id} className="hover:bg-surface-low/50 transition-colors">
                      
                      <td className="py-3.5 px-6 font-bold">
                        <div>
                          <p className="text-sm font-extrabold text-ocean-navy">{beach.name}</p>
                          <p className="text-[10px] font-mono text-ocean-muted">{beach.id}</p>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium">{beach.province}</td>

                      <td className="py-3.5 px-4 font-extrabold text-brand-deep">
                        {formatRupiah(beach.tariff.entranceFee)}
                      </td>

                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-ocean-navy">{beach.tariff.ownerType}</p>
                        <p className="text-[10px] text-ocean-muted truncate max-w-xs">{beach.tariff.legalBasis}</p>
                      </td>

                      <td className="py-3.5 px-4 text-ocean-muted">
                        <p className="font-medium text-ocean-navy">{beach.tariff.verifiedDateFormatted}</p>
                        <p className="text-[10px]">{beach.tariff.freshnessDays} hari yang lalu</p>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          beach.tariff.freshness === 'fresh' ? 'bg-emerald-100 text-emerald-800' :
                          beach.tariff.freshness === 'review' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {beach.tariff.freshness === 'fresh' ? 'Fresh / Valid' :
                           beach.tariff.freshness === 'review' ? 'Perlu Tinjauan' : 'Expired'}
                        </span>
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={() => openEditModal(beach)}
                          className="px-3 py-1.5 rounded-lg bg-surface-low hover:bg-brand hover:text-white text-ocean-navy font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                          title="Edit & Verifikasi"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit & Verifikasi</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-ocean-outline/20 text-center text-xs text-ocean-muted">
            Menampilkan {Math.min(50, filteredTable.length)} dari {filteredTable.length} baris inventaris pantai.
          </div>

        </div>
      )}

      {/* VIEW SECTION B: KOTAK MASUK ADUAN PUNGLI & TARIF TABLE */}
      {adminSection === 'reports' && (
        <div className="bg-white rounded-3xl border border-ocean-outline/30 shadow-xs overflow-hidden animate-fadeIn">
          
          {/* Header & Filter Controls for Reports */}
          <div className="p-4 sm:p-6 border-b border-ocean-outline/20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-amber-50/30">
            <div>
              <h3 className="text-base font-bold text-ocean-navy flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Kotak Masuk Aduan Ketidaksesuaian Tarif & Pungli</span>
              </h3>
              <p className="text-xs text-ocean-muted mt-0.5">
                Laporan masyarakat yang masuk dari kanal aduan di halaman detail pantai.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 text-ocean-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchReport}
                  onChange={(e) => setSearchReport(e.target.value)}
                  placeholder="Cari No. Tiket atau Pantai..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                />
              </div>

              <select
                value={reportStatusFilter}
                onChange={(e) => setReportStatusFilter(e.target.value)}
                className="py-1.5 px-3 rounded-xl bg-white border border-ocean-outline/30 text-xs font-semibold focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
              >
                <option value="all">Semua Status ({reports.length})</option>
                <option value="menunggu">Menunggu Tinjauan</option>
                <option value="proses">Dalam Pemeriksaan</option>
                <option value="selesai">Selesai (Ditindaklanjuti)</option>
                <option value="ditolak">Ditolak</option>
              </select>

              <button
                onClick={handleAddSampleReport}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer shrink-0"
                title="Buat data aduan contoh untuk simulasi pengujian"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Simulasi Aduan</span>
              </button>
            </div>
          </div>

          {/* Reports Table or Empty State */}
          {filteredReports.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-ocean-navy">Belum Ada Laporan Aduan Masuk</h4>
              <p className="text-xs text-ocean-muted mt-1 max-w-md mx-auto leading-relaxed">
                Saat pengunjung menemukan pungutan liar atau tarif yang berbeda di loket dan mengirim laporan lewat tombol <strong>"🚨 Lapor Ketidaksesuaian Tarif"</strong> di halaman detail pantai, laporan akan otomatis masuk ke tabel ini untuk ditinjau.
              </p>
              <button
                onClick={handleAddSampleReport}
                className="mt-4 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-sm shadow-amber-600/30 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Buat Contoh Aduan Simulasi</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-low text-ocean-muted uppercase font-semibold text-[11px] border-b border-ocean-outline/20">
                  <tr>
                    <th className="py-3 px-6">No. Tiket & Tanggal</th>
                    <th className="py-3 px-4">Pantai Terkait</th>
                    <th className="py-3 px-4">Jenis Tagihan</th>
                    <th className="py-3 px-4">Tarif Lapangan vs Resmi</th>
                    <th className="py-3 px-4">Lokasi Loket</th>
                    <th className="py-3 px-4">Status Aduan</th>
                    <th className="py-3 px-6 text-right">Aksi Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ocean-outline/10 text-ocean-navy">
                  {filteredReports.map((report) => {
                    const selisih = report.demandedAmount - (report.officialAmount || 0);
                    return (
                      <tr key={report.ticketNumber} className="hover:bg-amber-50/40 transition-colors">
                        
                        <td className="py-3.5 px-6 font-mono font-bold">
                          <p className="text-brand-deep text-xs">{report.ticketNumber}</p>
                          <p className="text-[10px] text-ocean-muted font-sans font-normal mt-0.5">
                            {report.incidentDate || '31 Okt 2026'}
                          </p>
                        </td>

                        <td className="py-3.5 px-4 font-bold">
                          <p className="text-sm text-ocean-navy">{report.beachName}</p>
                          <p className="text-[10px] text-ocean-muted font-normal">Pelapor: {report.reporterContact || 'Anonim'}</p>
                        </td>

                        <td className="py-3.5 px-4 capitalize font-medium">
                          {report.tariffType === 'entrance' ? 'Tiket Masuk' :
                           report.tariffType === 'parking_r2' ? 'Parkir Motor (R2)' :
                           report.tariffType === 'parking_r4' ? 'Parkir Mobil (R4)' :
                           report.tariffType === 'facility' ? 'Sewa Fasilitas' : 'Pungutan Liar'}
                        </td>

                        <td className="py-3.5 px-4 font-bold">
                          <div className="flex items-center gap-1.5">
                            <span className="text-rose-600 text-sm">{formatRupiah(report.demandedAmount)}</span>
                            <span className="text-ocean-muted text-[10px] font-normal">vs {formatRupiah(report.officialAmount || 0)}</span>
                          </div>
                          {selisih > 0 && (
                            <span className="text-[10px] text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.2 rounded">
                              Selisih +{formatRupiah(selisih)}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-ocean-muted">
                          <p className="font-medium text-ocean-navy">{report.incidentLocation || 'Loket Utama'}</p>
                          <p className="text-[10px] line-clamp-1 italic max-w-xs">{report.description || 'Tanpa keterangan'}</p>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            report.status === 'Selesai (Ditindaklanjuti)' ? 'bg-emerald-100 text-emerald-800' :
                            report.status === 'Dalam Pemeriksaan' ? 'bg-blue-100 text-blue-800' :
                            report.status === 'Ditolak' ? 'bg-gray-100 text-gray-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {report.status || 'Menunggu Tinjauan'}
                          </span>
                        </td>

                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={() => openReportModal(report)}
                            className="px-3.5 py-1.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Periksa Laporan</span>
                          </button>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-4 border-t border-ocean-outline/20 text-center text-xs text-ocean-muted bg-surface-low/30">
            Total {filteredReports.length} laporan aduan masyarakat tercatat di sistem.
          </div>

        </div>
      )}

      {/* DRAWER FORM MULTI-TAB (4 TABS) */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-slideIn">
            
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-brand-deep to-brand p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">
                  {editingBeach ? `Edit & Validasi: ${editingBeach.name}` : 'Tambah Destinasi Pantai Baru'}
                </h3>
                <p className="text-xs text-white/80">Sistem Informasi Pesisir & Formulir 4 Tab Standar SOP</p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Tab Navigator (4 Tabs) */}
            <div className="border-b border-ocean-outline/20 bg-surface-low px-5 pt-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                type="button"
                onClick={() => setActiveFormTab('main')}
                className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'main' ? 'border-brand text-brand-deep' : 'border-transparent text-ocean-muted'
                }`}
              >
                <span>1. Info & Lokasi</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('tariff')}
                className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'tariff' ? 'border-brand text-brand-deep' : 'border-transparent text-ocean-muted'
                }`}
              >
                <span>2. Biaya & Legalitas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('facilities')}
                className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'facilities' ? 'border-brand text-brand-deep' : 'border-transparent text-ocean-muted'
                }`}
              >
                <span>3. Fasilitas & Akses</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('media')}
                className={`pb-2.5 px-2 text-xs font-bold border-b-2 transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap ${
                  activeFormTab === 'media' ? 'border-brand text-brand-deep' : 'border-transparent text-ocean-muted'
                }`}
              >
                <span>4. Media & SOP Foto</span>
              </button>
            </div>

            {/* Drawer Form Body */}
            <form onSubmit={handleSaveSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* TAB 1: INFO & LOKASI */}
              {activeFormTab === 'main' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* Autocomplete Search Dropdown */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-ocean-navy">
                        Nama Pantai: <span className="text-rose-500">*</span>
                      </label>
                      <span className="text-[10px] text-brand font-semibold flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        Terhubung 1.572 Data Pantai
                      </span>
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Ketik nama pantai (contoh: Kunyit, Menganti, Kuta...)"
                        className="w-full p-2.5 pl-9 pr-8 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                      />
                      <Search className="w-4 h-4 text-brand absolute left-3 top-1/2 -translate-y-1/2" />
                      {formData.name && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, name: '', province: '', latitude: '', longitude: '' });
                            setAutoFilledInfo(null);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-ocean-muted hover:text-ocean-navy text-xs p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown Hasil Pencarian Autocomplete */}
                    {showSuggestions && beachSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full mt-1.5 z-40 bg-white rounded-2xl shadow-2xl border-2 border-brand/40 max-h-64 overflow-y-auto divide-y divide-ocean-outline/10 animate-fadeIn">
                        <div className="p-2 bg-brand-light/40 text-[10px] font-extrabold text-brand-deep uppercase tracking-wider flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-brand" />
                            Klik Pantai untuk Auto-Fill Daerah & GPS:
                          </span>
                          <span>{beachSuggestions.length} hasil</span>
                        </div>
                        {beachSuggestions.map((b) => (
                          <div
                            key={b.id}
                            onMouseDown={() => handleSelectMasterBeach(b)}
                            className="p-3 hover:bg-brand-light/60 transition-colors cursor-pointer flex items-center justify-between text-xs group"
                          >
                            <div>
                              <p className="font-bold text-ocean-navy group-hover:text-brand flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5 text-brand" />
                                <span>{b.name}</span>
                              </p>
                              <p className="text-[11px] text-ocean-muted mt-0.5">
                                📍 Provinsi: <strong className="text-ocean-navy">{b.province}</strong> • GPS: {b.latitude.toFixed(4)}, {b.longitude.toFixed(4)}
                              </p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-brand text-white shadow-xs group-hover:scale-105 transition-transform">
                              Pilih & Isi Otomatis ↵
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dropdown Select Cepat (Alternatif Dropdown) */}
                  <div>
                    <label className="block text-[11px] text-ocean-muted font-medium mb-1">
                      Atau pilih langsung dari menu dropdown database:
                    </label>
                    <select
                      onChange={(e) => {
                        const selected = beaches.find(b => b.id === e.target.value);
                        if (selected) handleSelectMasterBeach(selected);
                      }}
                      value={beaches.find(b => b.name.toLowerCase() === formData.name.toLowerCase())?.id || ''}
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
                    >
                      <option value="">-- Cari atau pilih destinasi pantai nusantara --</option>
                      {beaches.slice(0, 300).map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.province}) — Lat: {b.latitude.toFixed(2)}, Long: {b.longitude.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Alert Banner jika Data Terisi Otomatis */}
                  {autoFilledInfo && (
                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between shadow-xs animate-fadeIn">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <div>
                          <p className="font-extrabold text-emerald-950">
                            ✓ Data Geospasial Berhasil Terisi Otomatis!
                          </p>
                          <p className="text-[11px] text-emerald-800">
                            Provinsi: <strong>{autoFilledInfo.province}</strong> • Koordinat: <strong>{autoFilledInfo.lat}, {autoFilledInfo.lng}</strong>
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 shrink-0">
                        GPS Verified
                      </span>
                    </div>
                  )}

                  {/* Field Provinsi / Wilayah (Auto-Filled) */}
                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1 flex items-center justify-between">
                      <span>Provinsi / Wilayah: <span className="text-rose-500">*</span></span>
                      {autoFilledInfo && (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Terisi Otomatis
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Otomatis terisi saat memilih nama pantai..."
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                    />
                  </div>

                  {/* Field Latitude & Longitude (Auto-Filled) */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1 flex items-center justify-between">
                        <span>Latitude (Lintang):</span>
                        {autoFilledInfo && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Satelit GPS
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                        placeholder="Contoh: -5.4491"
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1 flex items-center justify-between">
                        <span>Longitude (Bujur):</span>
                        {autoFilledInfo && (
                          <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Satelit GPS
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        step="any"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                        placeholder="Contoh: 105.2820"
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Kondisi Akses Jalan */}
                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      Kondisi Akses Jalan:
                    </label>
                    <select
                      value={formData.roadSurface}
                      onChange={(e) => setFormData({ ...formData, roadSurface: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
                    >
                      <option value="Aspal Mulus">Aspal Mulus</option>
                      <option value="Aspal Bergelombang">Aspal Bergelombang</option>
                      <option value="Makadam Halus">Makadam Halus</option>
                      <option value="Campuran Barat Beton">Campuran Rabat Beton</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 2: BIAYA & LEGALITAS */}
              {activeFormTab === 'tariff' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1">
                        Tiket Masuk Umum (Rp):
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.entranceFee}
                        onChange={(e) => setFormData({ ...formData, entranceFee: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                      />
                      <p className="text-[10px] text-ocean-muted mt-0.5">Isi 0 jika gratis</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1">
                        Sewa Gazebo / Fasilitas (Rp):
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.facilityFee}
                        onChange={(e) => setFormData({ ...formData, facilityFee: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1">
                        Parkir Motor R2 (Rp):
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.parkingR2}
                        onChange={(e) => setFormData({ ...formData, parkingR2: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ocean-navy mb-1">
                        Parkir Mobil R4 (Rp):
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={formData.parkingR4}
                        onChange={(e) => setFormData({ ...formData, parkingR4: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      Kategori Pengelola:
                    </label>
                    <select
                      value={formData.ownerType}
                      onChange={(e) => setFormData({ ...formData, ownerType: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
                    >
                      <option value="Resmi Pemda (Perda)">Resmi Pemda (Perda)</option>
                      <option value="BUMDes / Desa Adat">BUMDes / Desa Adat</option>
                      <option value="Usaha Warga Lokal Terdaftar">Usaha Warga Lokal Terdaftar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      Dasar Hukum / Nomor Regulasi: <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.legalBasis}
                      onChange={(e) => setFormData({ ...formData, legalBasis: e.target.value })}
                      placeholder="Contoh: Perda Kab. Pesawaran No. 5 Tahun 2023"
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      Tanggal Audit Verifikasi:
                    </label>
                    <input
                      type="date"
                      value={formData.verifiedDate}
                      onChange={(e) => setFormData({ ...formData, verifiedDate: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: FASILITAS */}
              {activeFormTab === 'facilities' && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-bold text-ocean-navy uppercase tracking-wider">
                    Checklist Fasilitas Tersedia
                  </h4>
                  
                  <div className="space-y-3 p-4 rounded-2xl bg-surface-low border border-ocean-outline/20">
                    <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-ocean-navy">
                      <input
                        type="checkbox"
                        checked={formData.hasToilet}
                        onChange={(e) => setFormData({ ...formData, hasToilet: e.target.checked })}
                        className="rounded text-brand focus:ring-brand w-4 h-4"
                      />
                      <span>Toilet Umum Bersih</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-ocean-navy">
                      <input
                        type="checkbox"
                        checked={formData.hasRinseWater}
                        onChange={(e) => setFormData({ ...formData, hasRinseWater: e.target.checked })}
                        className="rounded text-brand focus:ring-brand w-4 h-4"
                      />
                      <span>Air Bilas / Air Tawar</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-ocean-navy">
                      <input
                        type="checkbox"
                        checked={formData.hasMushola}
                        onChange={(e) => setFormData({ ...formData, hasMushola: e.target.checked })}
                        className="rounded text-brand focus:ring-brand w-4 h-4"
                      />
                      <span>Mushola / Tempat Ibadah</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer text-xs font-semibold text-ocean-navy">
                      <input
                        type="checkbox"
                        checked={formData.hasLifeguard}
                        onChange={(e) => setFormData({ ...formData, hasLifeguard: e.target.checked })}
                        className="rounded text-brand focus:ring-brand w-4 h-4"
                      />
                      <span>Pos Penjaga Pantai / Balawista (Lifeguard)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 4: MEDIA & SOP FOTO */}
              {activeFormTab === 'media' && (
                <div className="space-y-4 animate-fadeIn">
                  
                  {/* SOP Photo Guideline Box */}
                  <div className="p-4 rounded-2xl bg-brand-light/50 border border-brand/20 text-xs space-y-1">
                    <p className="font-bold text-brand-deep flex items-center gap-1.5">
                      <Camera className="w-4 h-4" />
                      Pedoman SOP Foto Media BeachFinder
                    </p>
                    <ul className="list-disc list-inside text-ocean-muted space-y-0.5 text-[11px]">
                      <li>Rasio lanskap 16:9 direkomendasikan.</li>
                      <li>Resolusi minimal foto sampul: 1920 × 1080 px.</li>
                      <li>Ukuran file maksimal: 5 MB (JPG, PNG, WEBP).</li>
                      <li>Foto asli orisinal tanpa watermark komersial agresif.</li>
                    </ul>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      URL Foto Sampul (16:9):
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.photoUrl}
                      onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                    />
                  </div>

                  {/* Thumbnail Preview */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-ocean-outline/30 bg-surface-low">
                    <img
                      src={formData.photoUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
                      }}
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold">
                      Pratinjau Foto Sampul (16:9)
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ocean-navy mb-1">
                      Deskripsi Alt-Text (Aksesibilitas):
                    </label>
                    <input
                      type="text"
                      value={formData.photoAlt}
                      onChange={(e) => setFormData({ ...formData, photoAlt: e.target.value })}
                      placeholder="Jelaskan objek pada foto untuk pembaca layar..."
                      className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                    />
                  </div>

                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-ocean-outline/20 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-brand/30 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan & Terbitkan Data</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* MODAL TINJAUAN & RESOLUSI ADUAN PUNGLI */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-ocean-outline/30 overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-4 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
                  <AlertTriangle className="w-5 h-5 text-amber-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold">Pemeriksaan Aduan Pungli & Tarif</h3>
                    <span className="font-mono text-[11px] bg-black/25 px-2.5 py-0.5 rounded-full font-bold">
                      {selectedReport.ticketNumber}
                    </span>
                  </div>
                  <p className="text-xs text-white/80">Kanal Verifikasi & Tindak Lanjut Pengawasan Daerah</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Tutup Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              
              {/* Status Indicator Banner */}
              <div className="p-4 rounded-2xl bg-surface-low border border-ocean-outline/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-ocean-muted tracking-wider">Status Penanganan Saat Ini:</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                      selectedReport.status === 'Selesai (Ditindaklanjuti)' ? 'bg-emerald-100 text-emerald-800' :
                      selectedReport.status === 'Dalam Pemeriksaan' ? 'bg-blue-100 text-blue-800' :
                      selectedReport.status === 'Ditolak' ? 'bg-gray-100 text-gray-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedReport.status || 'Menunggu Tinjauan'}
                    </span>
                    <span className="text-xs text-ocean-muted font-medium">
                      Kejadian: {selectedReport.incidentDate || '31 Okt 2026'}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-ocean-muted tracking-wider">Kontak Pelapor:</span>
                  <p className="text-xs font-bold text-ocean-navy mt-0.5">
                    {selectedReport.reporterContact || 'Anonim (Masyarakat)'}
                  </p>
                  <span className="text-[10px] text-ocean-muted">🔒 Identitas Terlindungi</span>
                </div>
              </div>

              {/* Destinasi & Komparasi Selisih Finansial */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Informasi Destinasi & Loket */}
                <div className="p-4 rounded-2xl bg-brand-light/30 border border-brand/20">
                  <span className="text-[10px] uppercase font-bold text-ocean-muted tracking-wider">Destinasi Terlapor:</span>
                  <h4 className="text-base font-extrabold text-ocean-navy mt-1">{selectedReport.beachName}</h4>
                  <p className="text-xs text-ocean-muted">{selectedReport.province || 'Pesisir Indonesia'}</p>
                  
                  <div className="mt-3 text-xs text-ocean-muted space-y-1.5 pt-2 border-t border-brand/10">
                    <p>
                      <strong className="text-ocean-navy">Titik Lokasi:</strong> {selectedReport.incidentLocation || 'Pintu Gerbang / Loket Utama'}
                    </p>
                    <p>
                      <strong className="text-ocean-navy">Kategori:</strong> {
                        selectedReport.tariffType === 'entrance' ? 'Tiket Masuk Utama' :
                        selectedReport.tariffType === 'parking_r2' ? 'Parkir Motor (R2)' :
                        selectedReport.tariffType === 'parking_r4' ? 'Parkir Mobil (R4)' :
                        selectedReport.tariffType === 'facility' ? 'Sewa Fasilitas / Gazebo' : 'Pungutan Liar Tanpa Karcis'
                      }
                    </p>
                  </div>
                </div>

                {/* Komparasi Finansial */}
                <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-800 tracking-wider">Komparasi Tarif:</span>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-ocean-muted">Tarif Ditagih di Lapangan:</span>
                        <span className="font-extrabold text-rose-600 text-sm">
                          {formatRupiah(selectedReport.demandedAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-ocean-muted">Tarif Resmi Regulasi / Perda:</span>
                        <span className="font-extrabold text-ocean-navy text-sm">
                          {formatRupiah(selectedReport.officialAmount || 0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-rose-200/80 flex justify-between items-center mt-3">
                    <span className="text-xs font-bold text-rose-800">Indikasi Selisih Pungli:</span>
                    <span className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-extrabold text-xs shadow-xs">
                      +{formatRupiah(Math.max(0, selectedReport.demandedAmount - (selectedReport.officialAmount || 0)))}
                    </span>
                  </div>
                </div>

              </div>

              {/* Kronologi Pelapor */}
              <div className="p-4 rounded-2xl bg-white border border-ocean-outline/30 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-ocean-muted tracking-wider">
                  Uraian Kronologi Kejadian dari Pelapor:
                </span>
                <p className="text-xs text-ocean-navy leading-relaxed italic bg-surface-low/50 p-3.5 rounded-xl border border-ocean-outline/10">
                  "{selectedReport.description || 'Tidak ada uraian kronologi tambahan dari pelapor.'}"
                </p>
              </div>

              {/* Bukti Foto Karcis / Papan Tarif */}
              <div className="p-4 rounded-2xl bg-white border border-ocean-outline/30 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-ocean-navy tracking-wider flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-brand" />
                    <span>Bukti Foto Karcis / Papan Tarif dari Pelapor:</span>
                  </span>
                  {selectedReport.photoProof ? (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Foto Terlampir
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      Tanpa Lampiran Foto
                    </span>
                  )}
                </div>

                {selectedReport.photoProof ? (
                  <div className="space-y-2">
                    <div className="relative rounded-2xl overflow-hidden border border-ocean-outline/30 bg-surface-low max-h-72 flex items-center justify-center p-2 group">
                      <img
                        src={selectedReport.photoProof}
                        alt="Bukti foto karcis / retribusi"
                        className="max-h-64 w-auto max-w-full rounded-xl object-contain shadow-xs"
                      />
                      <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <a
                          href={selectedReport.photoProof}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-black/80 hover:bg-black text-white text-[11px] font-bold backdrop-blur-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Buka Foto Penuh</span>
                        </a>
                      </div>
                    </div>
                    <p className="text-[11px] text-ocean-muted flex items-center gap-1">
                      <span>🔍</span> Verifikator dapat memeriksa nomor seri karcis, stempel Pemda/BUMDes, atau nominal yang dicoret tangan pada foto bukti di atas.
                    </p>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-surface-low/60 border border-ocean-outline/20 text-center space-y-2.5">
                    <p className="text-xs text-ocean-muted">
                      Pelapor tidak melampirkan foto fisik karcis atau papan tarif pada saat pengiriman formulir aduan (kolom bukti foto bersifat opsional).
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <label className="px-3 py-1.5 rounded-xl bg-white border border-ocean-outline/30 hover:border-brand text-ocean-navy text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors">
                        <Upload className="w-3.5 h-3.5 text-brand" />
                        <span>Unggah Foto Bukti Karcis</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const raw = ev.target.result;
                                const img = new window.Image();
                                img.onload = () => {
                                  const maxDim = 900;
                                  let w = img.width, h = img.height;
                                  if (w > maxDim || h > maxDim) {
                                    if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
                                    else { w = Math.round((w * maxDim) / h); h = maxDim; }
                                  }
                                  const c = document.createElement('canvas');
                                  c.width = w; c.height = h;
                                  c.getContext('2d').drawImage(img, 0, 0, w, h);
                                  setSelectedReport(prev => ({ ...prev, photoProof: c.toDataURL('image/jpeg', 0.75) }));
                                };
                                img.onerror = () => {
                                  setSelectedReport(prev => ({ ...prev, photoProof: raw }));
                                };
                                img.src = raw;
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReport(prev => ({
                            ...prev,
                            photoProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80'
                          }));
                        }}
                        className="px-3 py-1.5 rounded-xl bg-brand-light text-brand hover:bg-brand hover:text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>+ Lampirkan Contoh Foto Bukti</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Tindak Lanjut Admin */}
              <form onSubmit={handleSaveReportResolution} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3.5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    Formulir Tindak Lanjut & Validasi Verifikator
                  </h5>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ocean-navy mb-1">
                    Perbarui Status Penanganan:
                  </label>
                  <select
                    value={resolutionStatus}
                    onChange={(e) => setResolutionStatus(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-white border border-ocean-outline/30 text-xs font-bold text-ocean-navy focus:ring-2 focus:ring-brand focus:outline-none cursor-pointer"
                  >
                    <option value="Menunggu Tinjauan">⏳ Menunggu Tinjauan (Belum Diproses)</option>
                    <option value="Dalam Pemeriksaan">🔍 Dalam Pemeriksaan (Investigasi Tim Lapangan / Dispar)</option>
                    <option value="Selesai (Ditindaklanjuti)">✅ Selesai (Ditindaklanjuti & Tarif Dikembalikan Sesuai Perda)</option>
                    <option value="Ditolak">❌ Ditolak (Laporan Tidak Terbukti / Salah Ketik)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ocean-navy mb-1">
                    Catatan Verifikator / Tindakan Pengawasan:
                  </label>
                  <textarea
                    rows={3}
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="Contoh: Tim Pokdarwis telah mengonfirmasi ke pengelola loket. Oknum yang memungut biaya di luar perda telah ditegur dan papan tarif resmi telah dipasang kembali di gerbang masuk."
                    className="w-full p-2.5 rounded-xl bg-white border border-ocean-outline/30 text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm(`Yakin ingin menghapus/mengarsipkan aduan ${selectedReport.ticketNumber}?`)) {
                        if (onDeleteReport) onDeleteReport(selectedReport.ticketNumber);
                        setSelectedReport(null);
                      }
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus / Arsipkan Aduan</span>
                  </button>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedReport(null)}
                      className="px-4 py-2 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy text-xs font-semibold cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold flex items-center gap-1.5 shadow-sm shadow-brand/30 cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Tindak Lanjut</span>
                    </button>
                  </div>
                </div>
              </form>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

