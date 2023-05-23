import { cache } from "react";
import "server-only";

import { fetchPageOfBeerData } from "./api";
import { slugify } from "../utils/slugify";

const preloadBeerData = () => {
  void fetchPageOfBeerData();
};

const getFirstPageOfBeerData = async () => {
  return fetchPageOfBeerData();
};

const getAllBeerData = cache(async () => {
  try {
    // There are currently 320 beers
    // because we are fetching on the server, we can fetch them all at once
    const page1 = await fetchPageOfBeerData();
    const page2 = await fetchPageOfBeerData(2);
    const page3 = await fetchPageOfBeerData(3);
    const page4 = await fetchPageOfBeerData(4);

    const beerData = await Promise.all([page1, page2, page3, page4]);

    return beerData.flat();
  } catch (error) {
    console.error(error);
  }
});

const getBeerBySlug = async (givenSlug: string) => {
  const beerData = await getAllBeerData();

  return beerData?.find(({ name }) => slugify(name) === givenSlug);
};

const preloadData = () => {
  preloadBeerData();
};

export const api = {
  getAllBeerData,
  preloadData,
  getBeerBySlug,
  getFirstPageOfBeerData,
};
