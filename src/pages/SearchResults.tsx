import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import PlaceCard from '../components/PlaceCard';
import FoodCard from '../components/FoodCard';
import FestivalCard from '../components/FestivalCard';
import GuideCard from '../components/GuideCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import { getAllPlaces, getAllDestinations, getAllGuides } from '../data/repository';

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim().toLowerCase();

  const places = getAllPlaces();
  const destinations = getAllDestinations();
  const guides = getAllGuides();

  function matches(...values: (string | undefined)[]) {
    return values.some((v) => v?.toLowerCase().includes(query));
  }

  const matchedPlaces = query ? places.filter((p) => matches(p.name, p.location, p.category)) : [];
  const matchedFood = query ? destinations.flatMap((d) => d.food).filter((f) => matches(f.name, f.desc)) : [];
  const matchedFestivals = query ? destinations.flatMap((d) => d.festivals).filter((f) => matches(f.name, f.desc)) : [];
  const matchedGuides = query ? guides.filter((g) => matches(g.name, g.city, ...g.specialties)) : [];

  const total = matchedPlaces.length + matchedFood.length + matchedFestivals.length + matchedGuides.length;

  return (
    <div>
      <div className="border-b border-stoneline bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h1 className="font-display text-3xl font-semibold text-ink">Search results</h1>
          <p className="mt-2 text-inksoft">{query ? `Showing results for "${query}"` : 'Enter a search term to explore places, food, festivals and guides.'}</p>
          <div className="mt-5 max-w-lg">
            <SearchBar />
          </div>
        </div>
      </div>

      {query && total === 0 && (
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <EmptyState
            title="No results found"
            description={`Nothing here matches "${query}" yet. Try "Taj Mahal", "petha", "Rahul" or "festival".`}
          />
        </div>
      )}

      {matchedPlaces.length > 0 && (
        <Section title="Places">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matchedPlaces.map((p) => (
              <PlaceCard key={p.id} place={p} />
            ))}
          </div>
        </Section>
      )}

      {matchedFood.length > 0 && (
        <Section title="Food" className="pt-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matchedFood.map((f) => (
              <FoodCard key={f.id} item={f} />
            ))}
          </div>
        </Section>
      )}

      {matchedFestivals.length > 0 && (
        <Section title="Festivals" className="pt-0">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {matchedFestivals.map((f) => (
              <FestivalCard key={f.id} item={f} />
            ))}
          </div>
        </Section>
      )}

      {matchedGuides.length > 0 && (
        <Section title="Guides" className="pt-0">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {matchedGuides.map((g) => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
