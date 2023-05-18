import { api } from "../api";
import { Card } from "../ui/card";
import { PageTitle } from "../ui/typography";
import Image from "next/image";
import beerFallback from "../../assets/beer-fallback.jpeg";
const IMAGE_SIZE = 75;

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
          <Card
            key={beer.id}
            title={beer.name}
            cta={{
              href: `/beer/${beer.slug}`,
              label: "More details",
            }}
          >
            <Image
              className="block m-auto"
              width={IMAGE_SIZE}
              height={IMAGE_SIZE}
              src={beer.image_url || beerFallback}
              alt={`can or keg of ${beer.name}`}
            />
            {!beer.image_url ? <strong>Image not Available</strong> : null}
          </Card>
        ))}
      </div>
    </main>
  );
}
