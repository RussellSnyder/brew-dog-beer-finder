import { api } from "../api";
import { BeerPreview } from "../ui/beerPreview";
import { PageTitle } from "../ui/typography";

export default async function AllBeerPage() {
  const beers = await api.getAllBeerData();

  if (!beers) {
    return null;
  }
  return (
    <main>
      <PageTitle>All Beers</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beers.map((beer) => (
          <BeerPreview key={beer.id} beer={beer} />
        ))}
      </div>
    </main>
  );
}
