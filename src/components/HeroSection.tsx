import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from './SearchBar';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-stoneline bg-sandstone py-14 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div>
          <div className="mb-4 flex items-center gap-2.5 text-xs font-bold tracking-wide text-marigold">
            <span className="inline-block h-0.5 w-6 bg-marigold" aria-hidden="true" />
            {t('heroEyebrow')}
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            {t('heroTitle1')}
            <span className="block text-madder">{t('heroTitle2')}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-inksoft">{t('heroLede')}</p>

          <div className="mt-7 max-w-md">
            <SearchBar />
          </div>

          <div className="mt-6 flex flex-wrap gap-3.5">
            <Link to="/start" className="rounded-full bg-madder px-6 py-3 text-sm font-semibold text-white hover:bg-madderdark">
              ✨ Plan My Trip
            </Link>
            <Link to="/companion/agra" className="rounded-full border border-stoneline bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-marigold">
              🪔 Ask the City
            </Link>
          </div>

          <div className="mt-6 flex items-center gap-2.5 text-sm text-muted">
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-tealtint text-madder">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              </svg>
            </span>
            {t('trust')}
          </div>
        </div>

        <div
          className="relative hidden aspect-[4/5] w-full overflow-hidden rounded-[26px] p-6 md:block"
          style={{
            backgroundImage: "url('/images/india.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Dark overlay so the white quote card and icons stay readable over any photo */}
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

          <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M15 9l-2 6-6 2 2-6 6-2z" />
            </svg>
          </div>
          <div className="absolute -right-10 top-1/5 h-56 w-56 rounded-full bg-white/10" aria-hidden="true" />
          <div
            className="absolute left-[-40px] top-1/2 h-16 w-[160%] -rotate-[32deg] bg-white/10"
            aria-hidden="true"
          />
          <div className="absolute left-14 top-16 h-72 w-56 -rotate-3 rounded border border-white/30" aria-hidden="true" />
          <span className="absolute bottom-6 right-6 font-display text-3xl italic text-white/80" aria-hidden="true">
            &rdquo;
          </span>
          <div className="absolute bottom-6 left-6 right-24 rounded-2xl bg-white p-5 shadow-lg">
            <span className="mb-2 block text-xs font-bold tracking-wide text-marigold">{t('noteTag')}</span>
            <p className="font-display text-base italic leading-snug text-ink">&ldquo;{t('Note')}&rdquo;</p>
          </div>
        </div>
      </div>
    </section>
  );
}