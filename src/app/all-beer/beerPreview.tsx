import { BeerInformation } from "@/types";
import { Card } from "../ui/card";
import Image from "next/image";
import beerFallback from "../../assets/beer-fallback.jpeg";
const IMAGE_SIZE = 75;

export const BeerPreview = ({ beer }: { beer: BeerInformation }) => (
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
);
