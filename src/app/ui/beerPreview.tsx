import Image from "next/image";
import { BeerInformation } from "../../types";
import { Button } from "./button";

const IMAGE_SIZE = 75;

interface Props {
  beer: BeerInformation;
}

export const BeerPreview = ({ beer }: Props) => {
  return (
    <div className="border-2 p-4">
      <div className="flex flex-col h-96 justify-center content-middle">
        <h2 className="text-lg font-bold mb-2">{beer.name}</h2>
        <div className="relative m-auto">
          <img
            src={beer.image_url}
            alt={`can or keg of ${beer.name}`}
            className="w-20 h-auto"
          />
          {/* <Image
            className="block m-auto"
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            src={beer.image_url}
            alt={`can or keg of ${beer.name}`}
          /> */}
        </div>
      </div>
      <div className="flex justify-center">
        <Button href={`/beer/${beer.slug}`}>More details</Button>
      </div>
    </div>
  );
};
