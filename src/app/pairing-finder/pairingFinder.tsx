"use client";

import { BASE_API_URL } from "@/constants";
import { BeerInformation } from "@/types";
import { useCallback, useEffect, useState } from "react";
import slugify from "slugify";
import { useDebounce } from "../hooks/useDebounce";
import useFocus from "../hooks/useFocus";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Image from "next/image";
import beerFallback from "../../assets/beer-fallback.jpeg";
import { truncate } from "lodash";
const IMAGE_SIZE = 70;

interface EmptyStateProps {
  searchString: string;
  handleReset: () => void;
}
const EmptyState = ({ searchString, handleReset }: EmptyStateProps) => (
  <div>
    <h3>No Beers for search &quot;{searchString}&quot;</h3>

    <Button onClick={handleReset}>Reset</Button>
  </div>
);

interface BeerPairingProps {
  beer: BeerInformation;
  searchString: string;
}

enum ScreenState {
  Initial = "Initial",
  Loading = "Loading",
  Data = "Data",
  NoResults = "No Results",
}

const BeerPairing = ({ beer, searchString }: BeerPairingProps) => {
  const pairings = beer.food_pairing.filter((food) =>
    food.includes(searchString)
  );
  //  Might need to 'dangerously' parse  here
  const pairingsWithHighlightedText = pairings.map((pairing) => {
    const highlight = `<strong>${searchString}</strong>`;

    return pairing.replaceAll(searchString, highlight);
  });
  return (
    <Card
      size="sm"
      title={beer.name}
      cta={{
        href: `/beer/${slugify(beer.name, { lower: true })}`,
        label: "Check it out",
      }}
    >
      <div className="">
        {pairingsWithHighlightedText.length ? (
          <>
            <h4 className="font-bold">Pairs well with:</h4>
            <ul className="list-disc pl-8">
              {pairingsWithHighlightedText.map((pairingText) => (
                <li
                  key={pairingText}
                  dangerouslySetInnerHTML={{ __html: pairingText }}
                />
              ))}
            </ul>
          </>
        ) : null}
        <h4 className="font-bold mt-4">Description:</h4>
        <p className="">
          {truncate(beer.description, {
            length: 80,
          })}
        </p>
      </div>
    </Card>
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
  const [inputRef, setInputFocus] = useFocus<HTMLInputElement>();
  const [screenState, setScreenState] = useState<ScreenState>(
    ScreenState.Initial
  );

  const [beerPairings, setBeerPairings] = useState<BeerInformation[]>([]);
  const [searchString, setSearchString] = useState<string>("");

  const fetchBeerPairings = useCallback(async () => {
    if (!searchString.length) return;
    // The api states that spaces should be turned into underscores
    // https://punkapi.com/documentation/v2
    const foodQuery = searchString.replaceAll(" ", "_");

    const res = await fetch(`${BASE_API_URL}/beers?food=${foodQuery}`);

    const beers = await res.json();

    setBeerPairings(beers);

    setScreenState(beers.length ? ScreenState.Data : ScreenState.NoResults);
  }, [searchString]);

  const debouncedFetchBeerPairings = useDebounce(fetchBeerPairings, 500);

  useEffect(() => {
    if (!searchString.length) {
      setScreenState(ScreenState.Initial);
    }
  }, [searchString]);

  const handleSearchStringChange = useCallback(
    (event: React.FormEvent<HTMLInputElement>) => {
      const newValue = event.currentTarget.value;

      setSearchString(newValue);
      setScreenState(ScreenState.Loading);

      debouncedFetchBeerPairings();
    },
    [debouncedFetchBeerPairings]
  );

  const handleReset = useCallback(() => {
    setSearchString("");
    setBeerPairings([]);
    setInputFocus();
  }, [setInputFocus]);

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          className="mb-6 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:ring-cyan-600 block rounded-md sm:text-sm focus:ring-1"
          onChange={handleSearchStringChange}
          value={searchString}
          placeholder="example: chicken"
        />

        <div>
          {screenState === ScreenState.Loading ? <p>Loading</p> : null}
          {screenState === ScreenState.Initial ? (
            <p>What are you eating tonight?</p>
          ) : null}
          {screenState === ScreenState.Data ? (
            <BeerPairings
              searchString={searchString}
              beerPairings={beerPairings}
            />
          ) : null}
          {screenState === ScreenState.NoResults ? (
            <EmptyState searchString={searchString} handleReset={handleReset} />
          ) : null}
        </div>
      </div>
    </div>
  );
};
