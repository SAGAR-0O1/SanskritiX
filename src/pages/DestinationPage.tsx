import { useParams, Link } from 'react-router-dom';
import Section from '../components/Section';
import MotifDivider from '../components/MotifDivider';
import VideoPlayer from '../components/VideoPlayer';
import PlaceCard from '../components/PlaceCard';
import StreetCard from '../components/StreetCard';
import FoodCard from '../components/FoodCard';
import FestivalCard from '../components/FestivalCard';
import RitualCard from '../components/RitualCard';
import ActivityCard from '../components/ActivityCard';
import LocalStoryCard from '../components/LocalStoryCard';
import NotFoundBlock from '../components/NotFoundBlock';
import AskAI from '../components/AskAI';
import { useLanguage } from '../context/LanguageContext';
import {
  getDestinationById,
  getPlacesByIds,
  getGuidesByDestination,
} from '../data/repository';

export default function DestinationPage() {
  const { destinationId } = useParams();
  const { t } = useLanguage();
  const destination = destinationId
    ? getDestinationById(destinationId)
    : undefined;

  if (!destination) {
    return (
      <NotFoundBlock
        title="Destination not found"
        description="This destination isn't available right now."
        backTo="/explore"
        backLabel="Back to Explore"
      />
    );
  }

  const places = getPlacesByIds(destination.placeIds);
  const hiddenGemPlaces = getPlacesByIds(destination.hiddenGemIds);
  const guides = getGuidesByDestination(destination.id);

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">
            Explore {destination.name}
          </p>

          <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
            {destination.name}
          </h1>

          <p className="mt-3 max-w-2xl text-inksoft">
            {destination.intro}
          </p>
        </div>
      </div>

      <Section title={`Experience ${destination.name}`}>
        <VideoPlayer video={destination.video} />
      </Section>

      <MotifDivider />

      {destination.id === 'agra' && (
        <>
          <Section
            title="Discover Agra"
            subtitle="Explore Agra through its places, streets, culture, festivals and local experiences."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="#agra-places"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🏛️</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Places
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Discover famous monuments, heritage sites and important
                  attractions of Agra.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Explore Places →
                </span>
              </a>

              <a
                href="#agra-streets"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🚶</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Streets
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Walk through old markets, local streets and neighbourhoods
                  that show the everyday side of Agra.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Explore Streets →
                </span>
              </a>

              <a
                href="#agra-festivals"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🎉</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Festivals
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Discover festivals, fairs, celebrations and cultural events
                  connected with Agra.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Explore Festivals →
                </span>
              </a>

              <Link
                to="/agra/culture"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🪔</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Culture & Traditions
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Learn about Agra's traditions, crafts, food culture, heritage
                  and local lifestyle.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Discover Culture →
                </span>
              </Link>

              <Link
                to="/agra/arts-crafts"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🎨</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Arts & Crafts
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Explore marble inlay, embroidery, leather craft and other
                  traditional skills.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Explore Crafts →
                </span>
              </Link>

              <Link
                to="/agra/local-stories"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">📖</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Local Stories
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Discover legends, local history, food heritage and stories
                  connected with Agra.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Read Stories →
                </span>
              </Link>

              <Link
                to="/agra/hidden"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">💎</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  Hidden Agra
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Find quieter places and lesser-known experiences beyond the
                  main tourist attractions.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Discover Hidden Agra →
                </span>
              </Link>

              <Link
                to="/agra/planner"
                className="group rounded-2xl border border-marigold bg-marigold p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-4xl">🧳</div>
                <h3 className="mt-4 font-display text-xl font-semibold text-white">
                  Make My Trip
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/90">
                  Build a simple 1, 2 or 3-day Agra travel plan.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-white">
                  Plan My Trip →
                </span>
              </Link>
            </div>
          </Section>

          <Section
            title="Ask SanskritiX"
            subtitle="Get quick answers about Agra before you decide where to go."
          >
            <div className="rounded-3xl border border-stoneline bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">Your travel companion</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-ink">Ask anything about Agra</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-inksoft">Ask about food, heritage, quieter places, local culture, transport or how to plan your day.</p>
                </div>
                <button onClick={() => document.querySelector('[aria-label="Ask SanskritiX Assistant"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }))} className="rounded-full bg-madder px-6 py-3 text-sm font-bold text-white hover:bg-madderdark">✨ Ask SanskritiX</button>
              </div>
            </div>
          </Section>

          <Section
            title="What's Happening in Agra"
            subtitle="Find festivals, cultural programmes, exhibitions, fairs and other local events."
          >
            <div className="rounded-2xl border border-stoneline bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Link
                  to="/agra/events"
                  className="rounded-xl border border-stoneline bg-paper p-5 transition hover:border-marigold hover:shadow-sm"
                >
                  <div className="text-3xl">📅</div>
                  <h3 className="mt-3 font-semibold text-ink">
                    Upcoming Events
                  </h3>
                  <p className="mt-1 text-sm text-inksoft">
                    See upcoming cultural and local events.
                  </p>
                </Link>

                <Link
                  to="/agra/events?filter=festival"
                  className="rounded-xl border border-stoneline bg-paper p-5 transition hover:border-marigold hover:shadow-sm"
                >
                  <div className="text-3xl">🎊</div>
                  <h3 className="mt-3 font-semibold text-ink">
                    Festivals & Fairs
                  </h3>
                  <p className="mt-1 text-sm text-inksoft">
                    Explore celebrations and traditional fairs.
                  </p>
                </Link>

                <Link
                  to="/agra/events?filter=culture"
                  className="rounded-xl border border-stoneline bg-paper p-5 transition hover:border-marigold hover:shadow-sm"
                >
                  <div className="text-3xl">🎭</div>
                  <h3 className="mt-3 font-semibold text-ink">
                    Cultural Shows
                  </h3>
                  <p className="mt-1 text-sm text-inksoft">
                    Music, dance, theatre and heritage programmes.
                  </p>
                </Link>

                <Link
                  to="/agra/events?filter=workshop"
                  className="rounded-xl border border-stoneline bg-paper p-5 transition hover:border-marigold hover:shadow-sm"
                >
                  <div className="text-3xl">🎨</div>
                  <h3 className="mt-3 font-semibold text-ink">
                    Workshops
                  </h3>
                  <p className="mt-1 text-sm text-inksoft">
                    Crafts, art, food and cultural learning experiences.
                  </p>
                </Link>
              </div>

              <div className="mt-6">
                <Link
                  to="/agra/events"
                  className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-madder"
                >
                  Explore What's Happening →
                </Link>
              </div>
            </div>
          </Section>

          <MotifDivider variant="ink" />
        </>
      )}

      <Section
        title={t('places')}
        subtitle="The core sights, and a few worth the extra effort."
        id="agra-places"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </Section>

      <Section
        title={t('streets')}
        className="pt-0"
        id="agra-streets"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destination.streets.map((s) => (
            <StreetCard key={s.id} item={s} />
          ))}
        </div>
      </Section>

      <Section title={t('food')} className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destination.food.map((f) => (
            <FoodCard key={f.id} item={f} />
          ))}
        </div>
      </Section>

      <Section
        title={t('festivals')}
        className="pt-0"
        id="agra-festivals"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destination.festivals.map((f) => (
            <FestivalCard key={f.id} item={f} />
          ))}
        </div>
      </Section>

      <Section title={t('rituals')} className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {destination.rituals.map((r) => (
            <RitualCard key={r.id} item={r} />
          ))}
        </div>
      </Section>

      <Section title={t('activities')} className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destination.activities.map((a) => (
            <ActivityCard key={a.id} item={a} />
          ))}
        </div>
      </Section>

      {destination.id === 'agra' && (
        <>
          <MotifDivider />

          <Section
            title="Plan Your Agra Experience"
            subtitle="Useful tools to make your Agra visit easier and more enjoyable."
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                to="/agra/planner"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl">🗓️</div>
                <h3 className="mt-4 font-semibold text-ink">
                  Make My Trip
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Plan your Agra visit for 1, 2 or 3 days.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Plan Trip →
                </span>
              </Link>

              <Link
                to="/agra/money"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl">💰</div>
                <h3 className="mt-4 font-semibold text-ink">
                  Fair Price Guide
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Check typical prices for autos, taxis, guides and food.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Check Prices →
                </span>
              </Link>

              <Link
                to="/agra/stay-eat"
                className="group rounded-2xl border border-stoneline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-3xl">🏨</div>
                <h3 className="mt-4 font-semibold text-ink">
                  Stay & Eat
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-inksoft">
                  Explore accommodation areas and local food options.
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-marigold">
                  Explore Stay & Eat →
                </span>
              </Link>
            </div>
          </Section>
        </>
      )}

      <MotifDivider variant="ink" />

      <Section title={t('hidden')} subtitle={destination.hiddenGemsNote}>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hiddenGemPlaces.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </Section>

      <Section title={t('history')} className="pt-0">
        <p className="max-w-3xl leading-relaxed text-inksoft">
          {destination.history}
        </p>
      </Section>

      <Section title={t('stories')} className="pt-0">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {destination.localStories.map((s) => (
            <LocalStoryCard key={s.id} story={s} />
          ))}
        </div>
      </Section>

      {guides.length > 0 && (
        <Section
          title={t('guides')}
          subtitle={`Local guides based in and around ${destination.name}.`}
        >
          <div className="flex flex-wrap gap-4">
            {guides.map((g) => (
              <Link
                key={g.id}
                to={`/guides/${g.id}`}
                className="rounded-full border border-stoneline bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:border-madder/50"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </Section>
      )}
      <AskAI city={destination.name} />
    </div>
  );
}