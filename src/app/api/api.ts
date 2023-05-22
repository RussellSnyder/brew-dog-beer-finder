import { BASE_API_URL } from "@/constants";
import { BeerInformation } from "@/types";

export const fetchPageOfBeerData = async (
  pageNumber = 1
): Promise<BeerInformation[]> => {
  // 80 beers at a time is the maximum that can be requested
  // however, our design is responsive and we want to show rows of 4/3/2.
  // 72 is the nearest number below 80 that is divisible by 4, 3 and 2
  const res = await fetch(
    `${BASE_API_URL}/beers?page=${pageNumber}&per_page=72`
  );
  const json = await res.json();

  return json;
};

export const fetchFoodsForBeer = async (
  foodQuery: string
): Promise<BeerInformation[]> => {
  const res = await fetch(`${BASE_API_URL}/beers?food=${foodQuery}`);

  return await res.json();
};
