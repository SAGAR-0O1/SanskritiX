import { getCityProfile } from '../data/cityProfiles';

type Props = {
  cityId: string;
  cityName: string;
  placeName?: string;
  placeBestTime?: string;
};

const CITY_DATA: Record<string, {
  bestMonths: string;
  transport: string;
  transportNote: string;
  restaurants: string[];
  stays: string[];
  fairPrices: { item: string; range: string }[];
}> = {
  agra: {
    bestMonths: "October–March",
    transport: "Available — auto, e-rickshaw, taxi, local buses and app-based cabs in many city areas.",
    transportNote: "For quieter outskirts and hidden places, last-mile availability can be limited; check the route before leaving.",
    restaurants: ["Taj Ganj & Fatehabad Road — many budget to premium options", "Sadar Bazaar — local food and street-food options", "Old Agra — Mughlai and local snacks"],
    stays: ["Taj Ganj — budget to premium hotels", "Fatehabad Road — broad hotel and restaurant choice", "Sanjay Place / central Agra — city access and business hotels"],
    fairPrices: [["E-rickshaw / short ride","₹20–₹80"],["Auto / short city ride","₹50–₹150"],["Local meal","₹100–₹400"],["Guide / short visit","₹500–₹1,500"]]
  },
  jaipur: {
    bestMonths: "October–March",
    transport: "Available — metro on selected corridors, buses, autos, e-rickshaws and taxis.",
    transportNote: "Historic lanes and outskirts may need an auto/cab for the last mile.",
    restaurants: ["Old City — local Rajasthani food and cafés", "MI Road / C-Scheme — broad dining choice", "Bapu Bazaar area — snacks and local food"],
    stays: ["Pink City — heritage and budget stays", "C-Scheme — mid-range and premium", "Near railway/MI Road — convenient city access"],
    fairPrices: [["E-rickshaw / short ride","₹30–₹100"],["Auto / local ride","₹60–₹180"],["Local meal","₹120–₹450"],["Guided visit","₹600–₹1,800"]]
  },
  varanasi: {
    bestMonths: "October–March",
    transport: "Available — autos, e-rickshaws, taxis and local buses; walking is common in old lanes.",
    transportNote: "Vehicles cannot enter many narrow heritage lanes; expect walking for the final stretch.",
    restaurants: ["Godowlia / old city — local vegetarian food", "Assi area — cafés and traveller-friendly options", "Cantt area — broader hotel dining"],
    stays: ["Assi — guesthouses and budget stays", "Dashashwamedh/Godowlia — central but busy", "Cantt — wider hotel selection"],
    fairPrices: [["E-rickshaw / short ride","₹30–₹100"],["Auto / local ride","₹60–₹180"],["Local meal","₹80–₹350"],["Boat / local experience","Confirm current fare locally"]]
  },
  delhi: {
    bestMonths: "October–March",
    transport: "Extensive — Metro, buses, autos, taxis and app-based cabs.",
    transportNote: "Metro is useful for major corridors; last-mile auto/cab connections may still be needed.",
    restaurants: ["Old Delhi — street food and traditional eateries", "Connaught Place — wide dining range", "Khan Market / central areas — mid-range to premium"],
    stays: ["Paharganj / New Delhi — budget", "Central Delhi — mid-range", "Aerocity / premium districts — premium"],
    fairPrices: [["Metro / short public-transport trip","₹10–₹60"],["Auto / short ride","₹50–₹200"],["Local meal","₹100–₹500"],["Guide / short visit","₹700–₹2,000"]]
  },
  mumbai: {
    bestMonths: "October–February",
    transport: "Extensive — local trains, Metro, buses, autos and taxis.",
    transportNote: "Public transport is strong, but travel time can vary significantly with traffic and crowds.",
    restaurants: ["Fort / Colaba — broad tourist dining", "Dadar — local food options", "Bandra — cafés and premium dining"],
    stays: ["Colaba/Fort — tourist access", "Dadar — central transport links", "Bandra/Andheri — broad hotel choice"],
    fairPrices: [["Local train / Metro","₹10–₹60"],["Auto / short ride","₹30–₹150"],["Local meal","₹100–₹500"],["Guide / experience","₹700–₹2,000"]]
  },
  udaipur: {
    bestMonths: "October–March",
    transport: "Available — autos, e-rickshaws, taxis and local buses.",
    transportNote: "Lake and old-city lanes may involve walking and short last-mile rides.",
    restaurants: ["Old City — local Rajasthani food", "Lake Pichola area — cafés and restaurants", "Surajpole — local and budget food"],
    stays: ["Old City — heritage/guesthouse options", "Lake Pichola — premium views", "Surajpole — budget to mid-range"],
    fairPrices: [["Auto / short ride","₹50–₹150"],["E-rickshaw","₹30–₹100"],["Local meal","₹120–₹450"],["Guide / short visit","₹600–₹1,800"]]
  },
  jodhpur: {
    bestMonths: "October–March",
    transport: "Available — autos, taxis and local buses; walking works well in old-city areas.",
    transportNote: "Fort and old-city lanes can require walking after vehicle drop-off.",
    restaurants: ["Old City — local snacks and Rajasthani food", "Sardarpura — broad dining choice", "Clock Tower area — street food"],
    stays: ["Old City — heritage stays", "Ratanada — mid-range", "Airport/central areas — broad hotel choice"],
    fairPrices: [["Auto / short ride","₹50–₹150"],["Local meal","₹100–₹400"],["Taxi / local sightseeing","₹1,200–₹2,500"],["Guide","₹600–₹1,800"]]
  },
  lucknow: {
    bestMonths: "October–March",
    transport: "Available — Metro on selected routes, buses, autos, e-rickshaws and taxis.",
    transportNote: "Old-city heritage areas can be easiest by short auto rides plus walking.",
    restaurants: ["Old Lucknow — Awadhi food", "Hazratganj — broad dining choice", "Chowk — local food and sweets"],
    stays: ["Hazratganj — central", "Gomti Nagar — broad hotel range", "Charbagh area — convenient transport"],
    fairPrices: [["Metro / local public transport","₹10–₹50"],["Auto / short ride","₹50–₹150"],["Local meal","₹100–₹400"],["Guide","₹600–₹1,800"]]
  },
  amritsar: {
    bestMonths: "October–March",
    transport: "Available — autos, e-rickshaws, buses and taxis.",
    transportNote: "Golden Temple/old-city core is walkable after a short drop-off.",
    restaurants: ["Old City — Amritsari food", "Lawrence Road — broad dining", "Near Golden Temple — vegetarian options"],
    stays: ["Golden Temple area — budget to mid-range", "Mall Road/Lawrence Road — mid-range", "Airport road — larger hotels"],
    fairPrices: [["Auto / short ride","₹50–₹150"],["Local meal","₹100–₹400"],["Taxi / local sightseeing","₹1,200–₹2,500"],["Guide","₹600–₹1,800"]]
  },
  kolkata: {
    bestMonths: "October–March",
    transport: "Extensive — Metro, local trains, buses, trams on selected routes, autos and taxis.",
    transportNote: "Heritage neighbourhoods are often best explored partly on foot.",
    restaurants: ["Park Street — broad dining", "College Street — cafés and snacks", "New Market/Esplanade — local food"],
    stays: ["Park Street — central", "Esplanade/New Market — budget to mid-range", "Salt Lake — modern hotels"],
    fairPrices: [["Metro / local public transport","₹10–₹50"],["Auto / short ride","₹40–₹150"],["Local meal","₹80–₹400"],["Guide","₹600–₹1,800"]]
  },
  kochi: {
    bestMonths: "October–February",
    transport: "Available — Metro on selected corridors, buses, autos, taxis and ferries in relevant areas.",
    transportNote: "Fort Kochi/Mattancherry is well suited to walking plus short local rides.",
    restaurants: ["Fort Kochi — cafés and Kerala food", "Mattancherry — local and spice-market food", "Ernakulam — broad dining"],
    stays: ["Fort Kochi — heritage/boutique", "Mattancherry — budget/guesthouses", "Ernakulam — wider hotel choice"],
    fairPrices: [["Metro / bus","₹10–₹50"],["Auto / short ride","₹50–₹150"],["Local meal","₹100–₹400"],["Guide","₹600–₹1,800"]]
  },
  chennai: {
    bestMonths: "November–February",
    transport: "Extensive — Metro, suburban rail, buses, autos and taxis.",
    transportNote: "Large city distances can make route planning important.",
    restaurants: ["Mylapore — traditional food", "T. Nagar — broad dining", "Besant Nagar — cafés and coastal options"],
    stays: ["T. Nagar — central", "Mylapore — heritage/culture access", "OMR — modern hotels"],
    fairPrices: [["Metro / rail","₹10–₹60"],["Auto / short ride","₹50–₹180"],["Local meal","₹80–₹350"],["Guide","₹600–₹1,800"]]
  },
  hyderabad: {
    bestMonths: "October–February",
    transport: "Available — Metro, buses, autos and taxis.",
    transportNote: "Old City heritage spots can be combined with short auto rides.",
    restaurants: ["Old City — Hyderabadi food", "Banjara Hills — broad dining", "Charminar area — local snacks"],
    stays: ["Old City — budget options", "Banjara Hills — mid-range/premium", "HITEC City — modern hotels"],
    fairPrices: [["Metro / public transport","₹10–₹60"],["Auto / short ride","₹50–₹180"],["Local meal","₹100–₹450"],["Guide","₹600–₹1,800"]]
  },
  bengaluru: {
    bestMonths: "October–February",
    transport: "Available — Metro, buses, autos and taxis.",
    transportNote: "Traffic can increase travel time; plan buffers between stops.",
    restaurants: ["Old Bengaluru — traditional breakfast", "Indiranagar — broad dining", "VV Puram — local food street"],
    stays: ["Central Bengaluru — broad range", "Indiranagar — cafés/hotels", "MG Road — central"],
    fairPrices: [["Metro / bus","₹10–₹60"],["Auto / short ride","₹50–₹180"],["Local meal","₹80–₹400"],["Guide","₹600–₹1,800"]]
  },
  srinagar: {
    bestMonths: "April–October",
    transport: "Available — taxis, autos and local buses; private cabs are common for sightseeing.",
    transportNote: "Mountain/lake excursions may need a dedicated vehicle and should be checked for seasonal conditions.",
    restaurants: ["Dal Lake/Boulevard — cafés and restaurants", "Old Srinagar — local cuisine", "Lal Chowk — broad dining"],
    stays: ["Dal Lake — houseboats/hotels", "Boulevard — tourist access", "Lal Chowk — central"],
    fairPrices: [["Local ride","₹50–₹200"],["Local meal","₹150–₹500"],["Sightseeing cab","Confirm current fare"],["Guide","₹700–₹2,000"]]
  },
  mathura: {
    bestMonths: "October–March",
    transport: "Available — autos, e-rickshaws, buses and taxis; walking is common around temple areas.",
    transportNote: "Temple lanes can be crowded and vehicle access can be restricted during festivals.",
    restaurants: ["Temple areas — vegetarian local food", "Holi Gate — local snacks", "Mathura city — sweets and North Indian food"],
    stays: ["Near Krishna Janmabhoomi — budget to mid-range", "Mathura Junction — convenient access", "Vrindavan side — wider tourist choice"],
    fairPrices: [["E-rickshaw / short ride","₹20–₹80"],["Auto / local ride","₹50–₹150"],["Local meal","₹80–₹350"],["Guide","₹500–₹1,500"]]
  }
};

const FALLBACK = {
  bestMonths: "October–March",
  transport: "Check local public transport and last-mile availability before travelling.",
  transportNote: "Availability can vary by neighbourhood, season and time of day.",
  restaurants: ["Local market area — local food options", "Central city — broader dining choice"],
  stays: ["Central city — budget to mid-range options", "Main tourist area — broader accommodation choice"],
  fairPrices: [["Local short ride","Check current local fare"],["Local meal","Check current menu"],["Guide","Confirm fee before booking"]]
};

export default function TravelEssentials({ cityId, cityName, placeName, placeBestTime }: Props) {
  const profile = getCityProfile(cityId);
  const data = CITY_DATA[cityId] ?? FALLBACK;
  const best = placeBestTime || data.bestMonths;

  return (
    <div className="space-y-5">
      {placeName && (
        <div className="rounded-2xl border border-marigold/20 bg-marigold/5 p-5">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-marigold">Best time for this place</p>
          <h3 className="mt-1 font-display text-xl font-semibold text-ink">{placeName}</h3>
          <p className="mt-1 text-sm text-inksoft">🌤️ {best}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-stoneline bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">🌤️ Best months</p>
          <p className="mt-2 font-semibold text-ink">{data.bestMonths}</p>
          <p className="mt-1 text-xs text-inksoft">Generally comfortable travel period; local weather and events can vary.</p>
        </div>
        <div className="rounded-2xl border border-stoneline bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">🚌 Transport</p>
          <p className="mt-2 text-sm font-semibold text-ink">{data.transport}</p>
          <p className="mt-1 text-xs text-inksoft">{data.transportNote}</p>
        </div>
        <div className="rounded-2xl border border-stoneline bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">🍽️ Restaurants</p>
          <ul className="mt-2 space-y-1 text-sm text-inksoft">{data.restaurants.map(x => <li key={x}>• {x}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-stoneline bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-marigold">🏨 Stays</p>
          <ul className="mt-2 space-y-1 text-sm text-inksoft">{data.stays.map(x => <li key={x}>• {x}</li>)}</ul>
        </div>
      </div>

      <div className="rounded-2xl border border-stoneline bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-marigold">💰 Fair Price Guide</p>
            <p className="mt-1 text-sm text-inksoft">Typical planning ranges — confirm current local prices before paying.</p>
          </div>
          {profile && <span className="rounded-full bg-cream2 px-3 py-1 text-xs font-semibold text-inksoft">{profile.theme}</span>}
        </div>
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {data.fairPrices.map(([item, range]) => (
            <div key={item} className="rounded-xl bg-cream p-3">
              <p className="text-xs font-semibold text-inksoft">{item}</p>
              <p className="mt-1 text-sm font-bold text-ink">{range}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
