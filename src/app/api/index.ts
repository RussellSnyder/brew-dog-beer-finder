import { cache } from "react";
import "server-only";

import { BeerInformation } from "../../types";
import { BASE_API_URL } from "../../constants";
import slugify from "slugify";

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
  try {
    // There are currently 320 beers
    // because we are fetching on the server, we can fetch them all at once
    const page1 = await fetchPageOfBeerData();
    const page2 = await fetchPageOfBeerData(2);
    const page3 = await fetchPageOfBeerData(3);
    const page4 = await fetchPageOfBeerData(4);

    const beerData = await Promise.all([page1, page2, page3, page4]);

    console.log(`${beerData.flat().length} fetched`);

    return beerData.flat().map((beer) => ({
      ...beer,
      // add slugs for readable urls
      slug: slugify(beer.name, { lower: true }),
    }));
  } catch (error) {
    console.error(error);
  }
});

const getBeerBySlug = async (givenSlug: string) => {
  const beerData = await getAllBeerData();

  return beerData?.find(({ slug }) => slug === givenSlug);
};

const preloadData = () => {
  preloadBeerData();
};

export const api = {
  getAllBeerData,
  preloadData,
  getBeerBySlug,
};
