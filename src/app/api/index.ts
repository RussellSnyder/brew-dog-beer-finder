import { cache } from "react";
import "server-only";

import { BeerInformation } from "../types";
import { BASE_API_URL } from "../constants";

const fetchPageOfBeerData = async (
  pageNumber = 1
): Promise<BeerInformation[]> => {
  // 80 beers at a timie is the maximum that can be requested
  const res = await fetch(
    `${BASE_API_URL}/beers?page=${pageNumber}&per_page=80`
  );
  const json = await res.json();

  return json;
};

const preloadBeerData = () => {
  void fetchPageOfBeerData();
};

const getAllBeerData = cache(async () => {
  return fetchPageOfBeerData();
});

const preloadData = () => {
  preloadBeerData();
};

export const api = {
  getAllBeerData,
  preloadData,
};
