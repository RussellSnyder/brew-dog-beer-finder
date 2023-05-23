import { BeerInformation } from "@/types";
import { Card } from "../ui/card";
import Image from "next/image";
import beerFallback from "../../assets/beer-fallback.jpeg";
import { truncate } from "lodash";
import { slugify } from "../utils/slugify";
const IMAGE_SIZE = 75;

export const BeerPreview = ({ beer }: { beer: BeerInformation }) => (
  <Card
    testId="beer-preview"
    key={beer.id}
    title={truncate(beer.name, {
      length: 30,
      separator: " ",
    })}
    cta={{
      href: `/beer/${slugify(beer.name)}`,
      label: "More details",
    }}
  >
    <div className="flex content-center justify-center h-min-full sm:h-72 lg:h-96">
      <Image
        className="block m-auto"
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        src={beer.image_url || beerFallback}
        alt={`can or keg of ${beer.name}`}
      />
      {!beer.image_url ? <strong>Image not Available</strong> : null}
    </div>
  </Card>
);
