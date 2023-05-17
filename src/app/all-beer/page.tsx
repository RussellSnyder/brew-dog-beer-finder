import { api } from "../api";
import { BeerPreview } from "../ui/beerPreview";
import { PageTitle } from "../ui/pageTitle";

export default async function AllBeerPage() {
  const beers = await api.getAllBeerData();

  return (
    <div>
      <PageTitle>All Beers</PageTitle>
      <div>
        {beers.map((beer) => (
          <BeerPreview key={beer.name} beer={beer} />
        ))}
      </div>
    </div>
  );
}
