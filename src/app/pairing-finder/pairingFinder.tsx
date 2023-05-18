"use client";

import { BASE_API_URL } from "@/constants";
import { BeerInformation } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { LinkButton } from "../ui/button";
import Link from "next/link";
import slugify from "slugify";

interface EmptyStateProps {
  searchString: string;
  handleReset: () => void;
}
const EmptyState = ({ searchString }: EmptyStateProps) => (
  <div>
    <h3>No Beers for search &quot;{searchString}&quot;</h3>

    <LinkButton href="">Reset</LinkButton>
  </div>
);

interface BeerPairingProps {
  beer: BeerInformation;
  searchString: string;
}

const BeerPairing = ({ beer, searchString }: BeerPairingProps) => {
  console.log(searchString);
  const pairings = beer.food_pairing.filter((food) =>
    food.includes(searchString)
  );
  //  Might need to 'dangerously' parse  here
  const pairingsWithHighlightedText = pairings.map((pairing) => {
    const highlight = `<strong>${searchString}</strong>`;

    return pairing.replaceAll(searchString, highlight);
  });
  return (
    <Link href={`/beer/${slugify(beer.name, { lower: true })}`}>
      <h4 className="font-bold">{beer.name}</h4>
      {pairingsWithHighlightedText.map((pairingText) => (
        <p
          key={pairingText}
          dangerouslySetInnerHTML={{ __html: pairingText }}
        />
      ))}
    </Link>
  );
};

interface BeerPairingsProps {
  beerPairings: BeerInformation[];
  searchString: string;
}

const BeerPairings = ({ beerPairings, searchString }: BeerPairingsProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {beerPairings.map((beer) => (
      <BeerPairing key={beer.id} beer={beer} searchString={searchString} />
    ))}
  </div>
);

export const PairingFinder = () => {
  const [beerPairings, setBeerPairings] = useState<BeerInformation[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  useEffect(() => {
    async function fetchBeers() {
      // The api states that spaces should be turned into underscores
      const foodQuery = searchString.replaceAll(" ", "_");

      const res = await fetch(`${BASE_API_URL}/beers?food=${foodQuery}`);

      const beers = await res.json();
      setBeerPairings(beers);
    }
    fetchBeers();
  }, [searchString]);

  const handleSearchStringChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      setSearchString(newValue);
      setBeerPairings([]);
    },
    []
  );

  const handleReset = useCallback(() => {
    setSearchString("");
  }, []);

  return (
    <div>
      <div>
        <input
          className="mb-6 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-cyan-600 block rounded-md sm:text-sm focus:ring-1"
          value={searchString}
          onChange={handleSearchStringChange}
          placeholder="example: chicken"
        />

        <div>
          {searchString && beerPairings ? (
            <BeerPairings
              searchString={searchString}
              beerPairings={beerPairings}
            />
          ) : null}
          {searchString && !beerPairings ? (
            <EmptyState searchString={searchString} handleReset={handleReset} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
