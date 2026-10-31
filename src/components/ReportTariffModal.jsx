import React, { useState } from 'react';
import { X, AlertCircle, Upload, CheckCircle2, ShieldAlert, Camera, Trash2, Image } from 'lucide-react';

export default function ReportTariffModal({ beach, isOpen, onClose, onSubmitReport }) {
  const [tariffType, setTariffType] = useState('entrance');
  const [demandedAmount, setDemandedAmount] = useState('');
  const [incidentDate, setIncidentDate] = useState('2026-10-31');
  const [incidentLocation, setIncidentLocation] = useState('Pintu Gerbang / Loket Utama');
  const [description, setDescription] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [fileName, setFileName] = useState('');
  const [photoProof, setPhotoProof] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  if (!isOpen || !beach) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5 MB!');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const rawDataUrl = event.target.result;
        // Compress image via canvas to prevent localStorage QuotaExceededError
        const img = new window.Image();
        img.onload = () => {
          const maxDim = 900;
          let w = img.width;
          let h = img.height;
          if (w > maxDim || h > maxDim) {
            if (w > h) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            } else {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.75);
          setPhotoProof(compressedDataUrl);
        };
        img.onerror = () => {
          setPhotoProof(rawDataUrl);
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSample = () => {
    setFileName('karcis-retribusi-tanpa-porporasi.jpg');
    setPhotoProof('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80');
  };

  const handleRemovePhoto = () => {
    setFileName('');
    setPhotoProof('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = `BF-LAPOR-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketNumber(newTicket);
    setIsSuccess(true);

    if (onSubmitReport) {
      let official = beach.tariff?.entranceFee ?? 10000;
      if (tariffType === 'parking_r2') official = beach.tariff?.parkingR2 ?? 2000;
      else if (tariffType === 'parking_r4') official = beach.tariff?.parkingR4 ?? 5000;
      else if (tariffType === 'facility') official = beach.tariff?.facilityFee ?? 15000;
      else if (tariffType === 'illegal') official = 0;

      onSubmitReport({
        ticketNumber: newTicket,
        beachId: beach.id,
        beachName: beach.name,
        province: beach.province,
        tariffType,
        officialAmount: official,
        demandedAmount: Number(demandedAmount) || 0,
        incidentDate,
        incidentLocation,
        description,
        photoProof,
        reporterContact,
        status: 'Menunggu Tinjauan',
        resolutionNote: '',
        createdAt: new Date().toISOString()
      });
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setDemandedAmount('');
    setDescription('');
    setFileName('');
    setPhotoProof('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-ocean-outline/30 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-brand-deep to-brand px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-xs">
              <ShieldAlert className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Lapor Ketidaksesuaian Tarif</h3>
              <p className="text-xs text-white/80">Kanal Pengaduan Pungli & Ketidaksesuaian Retribusi</p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-extrabold text-ocean-navy">Laporan Berhasil Terkirim!</h4>
              <p className="text-xs text-ocean-muted mt-1 max-w-sm mx-auto">
                Laporan Anda terkait <strong>{beach.name}</strong> telah masuk ke antrean verifikasi tim pengawas dan Pokdarwis daerah.
              </p>
              
              <div className="my-5 p-3.5 rounded-2xl bg-surface-low border border-brand/20 inline-block text-left">
                <p className="text-[11px] text-ocean-muted font-medium">Nomor Tiket Aduan:</p>
                <p className="text-base font-mono font-bold text-brand-deep">{ticketNumber}</p>
                <p className="text-[10px] text-ocean-muted mt-1">Status: <span className="font-semibold text-amber-600">Menunggu Tinjauan Verifikator</span></p>
              </div>

              <div>
                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-xs font-bold transition-all shadow-sm shadow-brand/30 cursor-pointer"
                >
                  Selesai
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Target Beach Info */}
              <div className="p-3 rounded-xl bg-surface-low border border-ocean-outline/20 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-ocean-muted font-medium">Destinasi Pantai:</p>
                  <p className="text-sm font-bold text-ocean-navy">{beach.name}</p>
                  <p className="text-[11px] text-ocean-muted">{beach.province}</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-ocean-muted font-medium">Tarif Resmi Tercatat:</p>
                  <p className="text-sm font-extrabold text-brand-deep">
                    {beach.tariff.entranceFee === 0 ? 'Gratis' : `Rp ${beach.tariff.entranceFee.toLocaleString('id-ID')}`}
                  </p>
                </div>
              </div>

              {/* Jenis Tarif */}
              <div>
                <label className="block text-xs font-bold text-ocean-navy mb-1">
                  Komponen Tarif yang Bermasalah:
                </label>
                <select
                  value={tariffType}
                  onChange={(e) => setTariffType(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                >
                  <option value="entrance">Tiket Masuk Utama</option>
                  <option value="parking_r2">Parkir Motor (R2)</option>
                  <option value="parking_r4">Parkir Mobil (R4)</option>
                  <option value="facility">Sewa Gazebo / Toilet / Fasilitas</option>
                  <option value="illegal">Pungutan Liar Tanpa Karcis / Pintu Masuk</option>
                </select>
              </div>

              {/* Nominal yang Diminta */}
              <div>
                <label className="block text-xs font-bold text-ocean-navy mb-1">
                  Nominal yang Ditagih di Lapangan (Rp): <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="1000"
                  placeholder="Misal: 25000"
                  value={demandedAmount}
                  onChange={(e) => setDemandedAmount(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                />
              </div>

              {/* Lokasi & Tanggal Kejadian */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ocean-navy mb-1">
                    Titik / Loket Pembayaran:
                  </label>
                  <input
                    type="text"
                    value={incidentLocation}
                    onChange={(e) => setIncidentLocation(e.target.value)}
                    placeholder="Contoh: Portal masuk desa"
                    className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ocean-navy mb-1">
                    Tanggal Kejadian:
                  </label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                  />
                </div>
              </div>

              {/* Kronologi */}
              <div>
                <label className="block text-xs font-bold text-ocean-navy mb-1">
                  Kronologi Singkat:
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan apakah diberikan karcis resmi dengan stempel Perda, atau ada pungutan tanpa bukti..."
                  className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none resize-none"
                ></textarea>
              </div>

              {/* Bukti Foto Upload */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-ocean-navy">
                    Bukti Foto Karcis / Papan Tarif (Opsional):
                  </label>
                  {!photoProof && (
                    <button
                      type="button"
                      onClick={handlePresetSample}
                      className="text-[10px] font-bold text-brand hover:text-brand-deep flex items-center gap-1 cursor-pointer"
                    >
                      <Camera className="w-3 h-3" />
                      <span>Contoh Foto Bukti</span>
                    </button>
                  )}
                </div>

                {photoProof ? (
                  <div className="relative rounded-2xl overflow-hidden border border-brand/40 bg-surface-low p-2">
                    <div className="relative aspect-video max-h-44 w-full rounded-xl overflow-hidden bg-black/5 flex items-center justify-center">
                      <img
                        src={photoProof}
                        alt="Bukti karcis"
                        className="w-full h-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePhoto}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all cursor-pointer"
                        title="Hapus / Ganti foto ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] px-1">
                      <span className="font-semibold text-ocean-navy truncate max-w-[220px]">
                        {fileName || 'Foto bukti siap dikirim'}
                      </span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Terlampir
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-ocean-outline/40 hover:border-brand/60 rounded-xl p-3.5 text-center bg-surface-low/50 cursor-pointer transition-colors relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-5 h-5 mx-auto text-ocean-muted group-hover:text-brand transition-colors mb-1" />
                    <p className="text-xs text-ocean-navy font-semibold">
                      Pilih foto atau drag karcis ke sini
                    </p>
                    <p className="text-[10px] text-ocean-muted mt-0.5">JPG, PNG, WEBP (Maks 5 MB)</p>
                  </div>
                )}
              </div>

              {/* Kontak Pelapor */}
              <div>
                <label className="block text-xs font-bold text-ocean-navy mb-1">
                  Kontak Pelapor (Email / WhatsApp untuk tindak lanjut):
                </label>
                <input
                  type="text"
                  value={reporterContact}
                  onChange={(e) => setReporterContact(e.target.value)}
                  placeholder="0812xxxx / nama@email.com"
                  className="w-full p-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none"
                />
                <p className="text-[10px] text-ocean-muted mt-1">
                  🔒 Identitas Anda dijamin kerahasiaannya dan hanya dapat dilihat oleh verifikator resmi.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-ocean-outline/20">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 rounded-xl bg-surface-low hover:bg-surface-container text-ocean-navy text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm shadow-rose-600/30 cursor-pointer"
                >
                  Kirim Laporan Resmi
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

