import { BASE_API_URL } from "@/constants";
import { BeerInformation } from "@/types";

export const fetchPageOfBeerData = async (
  pageNumber = 1
): Promise<BeerInformation[]> => {
  // 80 beers at a timie is the maximum that can be requested
  const res = await fetch(
    `${BASE_API_URL}/beers?page=${pageNumber}&per_page=80`
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
