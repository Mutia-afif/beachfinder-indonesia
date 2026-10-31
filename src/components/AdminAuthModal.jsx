import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  User,
  X,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function AdminAuthModal({
  isOpen,
  onClose,
  onSuccessLogin
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Multi-Account Administrator & Regional Verifiers
    setTimeout(() => {
      const inputUser = username.trim().toLowerCase();
      const inputPass = password.trim();

      const ADMIN_ACCOUNTS = [
        {
          usernames: ['admin', 'admin@beachfinder.id'],
          passwords: ['admin123', 'tanyarehan', 'pantai2026'],
          displayName: 'Super Administrator',
          role: 'Verifikator Pusat Pesisir'
        },
        {
          usernames: ['dinas', 'dinas@beachfinder.id', 'dinaspariwisata'],
          passwords: ['pantai2026', 'admin123'],
          displayName: 'Dinas Pariwisata Daerah',
          role: 'Pengawas Regulasi & Perda'
        },
        {
          usernames: ['verifikator', 'verifikator@beachfinder.id', 'pokdarwis'],
          passwords: ['verifikator123', 'admin123', 'pantai2026'],
          displayName: 'Tim Verifikator & Pokdarwis',
          role: 'Petugas Validasi Lapangan'
        }
      ];

      const matchedAccount = ADMIN_ACCOUNTS.find(acc => 
        acc.usernames.includes(inputUser) && acc.passwords.includes(inputPass)
      );

      if (matchedAccount) {
        setIsLoading(false);
        const adminSession = {
          isAuthenticated: true,
          username: inputUser,
          displayName: matchedAccount.displayName,
          role: matchedAccount.role,
          loggedInAt: new Date().toISOString()
        };
        onSuccessLogin(adminSession, rememberMe);
      } else {
        setIsLoading(false);
        setErrorMessage('Username atau kata sandi tidak cocok. Akses ditolak.');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-ocean-outline/30 overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-brand-deep to-brand p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mb-3 shadow-inner">
            <Lock className="w-7 h-7 text-amber-300" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Gerbang Autentikasi Pengelola</span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight">Portal Administrator</h3>
          <p className="text-xs text-white/80 mt-1 max-w-xs mx-auto">
            Akses khusus tim verifikator tarif, pengelola BUMDes, & dinas pariwisata daerah.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6">

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">

            {/* Username / Email */}
            <div>
              <label className="block text-xs font-bold text-ocean-navy mb-1">
                Username / Email Petugas:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-ocean-muted" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@beachfinder.id / admin"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-ocean-navy mb-1">
                Kata Sandi Verifikator:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyRound className="w-4 h-4 text-ocean-muted" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface-low border border-ocean-outline/30 text-ocean-navy text-xs font-medium focus:ring-2 focus:ring-brand focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-ocean-muted hover:text-ocean-navy cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-ocean-muted hover:text-ocean-navy select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-brand focus:ring-brand w-3.5 h-3.5"
                />
                <span>Ingat Sesi Masuk di Perangkat Ini</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-brand hover:bg-brand-deep disabled:bg-brand/60 text-white text-xs font-bold transition-all shadow-md shadow-brand/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <span>Memverifikasi Otoritas...</span>
                ) : (
                  <>
                    <span>Masuk ke Portal Administrator</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

          {/* Security Note Box */}
          <div className="mt-5 p-3 rounded-xl bg-surface-low/80 border border-ocean-outline/20 text-[11px] text-ocean-muted text-center space-y-1">
            <p className="font-semibold text-ocean-navy">🔒 Keamanan Tingkat Kebijakan Publik</p>
            <p>
              Segala perubahan tarif retribusi, penambahan destinasi, dan penyelesaian laporan pungli tercatat dalam audit log sistem.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

