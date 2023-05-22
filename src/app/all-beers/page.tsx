import { api } from "../api/api.server";
import { PageTitle } from "../ui/typography";
import { BeerPreview } from "./beerPreview";
import { BeerPreviewContainer } from "./beerPreviewContainer";
import { MorePagesOfBeer } from "./morePagesOfBeer";
const IMAGE_SIZE = 75;

export default async function AllBeerPage() {
  const beers = await api.getFirstPageOfBeerData();

  if (!beers) {
    return null;
  }
  return (
    <main>
      <PageTitle>All Beers</PageTitle>
      <BeerPreviewContainer>
        {beers.map((beer) => (
          <BeerPreview key={beer.id} beer={beer} />
        ))}
      </BeerPreviewContainer>
      <MorePagesOfBeer />
    </main>
  );
}
