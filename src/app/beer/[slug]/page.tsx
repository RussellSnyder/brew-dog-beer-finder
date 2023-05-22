import Image from "next/image";
import { api } from "@/app/api/api.server";
import { PageSubtitle, PageTitle } from "@/app/ui/typography";
import beerFallback from "../../../assets/beer-fallback.jpeg";
const IMAGE_SIZE_LARGE = 150;
const IMAGE_SIZE_SMALL = 75;

interface Props {
  params: {
    slug: string;
  };
}

interface PropertyValueProps {
  property: string;
  value: string | number;
}

const PropertyValue = ({ property, value }: PropertyValueProps) => {
  if (!value || !value.toString().trim()) return null;

  return (
    <li>
      <strong>{property}:</strong> {value}
    </li>
  );
};

export default async function BeerPage({ params: { slug } }: Props) {
  const beer = await api.getBeerBySlug(slug);

  if (!beer) {
    return <p>no beer :-/</p>;
  }

  return (
    <main>
      <div className="flex justify-between">
        <div className="md:flex-1 mr-12">
          <div className="text-center md:text-left mb-4">
            <PageTitle>{beer.name}</PageTitle>
            <div className="md:hidden my-2">
              <Image
                className="block m-auto"
                width={IMAGE_SIZE_SMALL}
                height={IMAGE_SIZE_SMALL}
                src={beer.image_url || beerFallback}
                alt={`can or keg of ${beer.name}`}
              />
            </div>
            <PageSubtitle>&quot;{beer.tagline}&quot;</PageSubtitle>
          </div>
          <p className="text-lg mb-4">
            {beer.description} First brewed: {beer.first_brewed}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ul className="border-2 rounded p-4 bg-cyan-100">
              <h4 className="text-center text-lg underline">Stats</h4>
              <PropertyValue property="abv" value={beer.abv} />
              <PropertyValue property="ibu" value={beer.ibu} />
              <PropertyValue property="target fg" value={beer.target_fg} />
              <PropertyValue property="target og" value={beer.target_og} />
              <PropertyValue property="ebc" value={beer.ebc} />
              <PropertyValue property="srm" value={beer.srm} />
              <PropertyValue property="ph" value={beer.ph} />
              <PropertyValue
                property="attenuation level"
                value={beer.attenuation_level}
              />
              <PropertyValue
                property="volume"
                value={`${beer.volume.value} ${beer.volume.unit}`}
              />
              <PropertyValue
                property="boil volume"
                value={`${beer.boil_volume.value} ${beer.boil_volume.unit}`}
              />
            </ul>
            <ul className="border-2 rounded p-4 bg-cyan-100">
              <h4 className="text-center text-lg underline">Process</h4>
              <PropertyValue
                property="mash"
                value={beer.method.mash_temp
                  .map(
                    ({ temp, duration }) =>
                      `${temp.value} ${temp.unit} ${
                        duration ? `for ${duration}` : ""
                      }`
                  )
                  .join(", ")}
              />
              <PropertyValue
                property="fermentation"
                value={`${beer.method.fermentation.temp.value} ${beer.method.fermentation.temp.unit}`}
              />
              <PropertyValue property="twist" value={beer.method.twist} />

              <h4 className="text-center text-lg underline mt-4">
                Ingredients
              </h4>

              {beer.ingredients.malt.map(
                ({ name, amount: { value, unit } }) => (
                  <PropertyValue
                    key={name}
                    property={name}
                    value={`${value} ${unit}`}
                  />
                )
              )}
            </ul>
          </div>
        </div>
        <div className="hidden md:flex md:flex-5">
          <Image
            className="block m-auto"
            width={IMAGE_SIZE_LARGE}
            height={IMAGE_SIZE_LARGE}
            src={beer.image_url || beerFallback}
            alt={`can or keg of ${beer.name}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-8">
        <div className="mb-4">
          <h3 className="text-xl font-bold">Food Pairings</h3>
          <ul className="list-disc pl-4">
            {beer.food_pairing.map((food) => (
              <li key={food}>{food}</li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold">Brewers Tips</h3>
          <p>{beer.brewers_tips}</p>
        </div>
      </div>
      <div className="text-center">
        <p>
          <strong>contributed by</strong>: {beer.contributed_by}
        </p>
      </div>
    </main>
  );
}
