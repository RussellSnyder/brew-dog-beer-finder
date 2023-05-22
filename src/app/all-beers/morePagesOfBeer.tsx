"use client";

import { useCallback, useState } from "react";
import { useInView, InView } from "react-intersection-observer";
import { BeerPreviewContainer } from "./beerPreviewContainer";
import { fetchPageOfBeerData } from "../api/api";
import { BeerInformation, ViewDataState } from "@/types";
import { BeerPreview } from "./beerPreview";
import { useViewDataState } from "../hooks/useViewDataState";

export const MorePagesOfBeer = () => {
  const [viewDataState, setViewDataState] = useViewDataState();

  const [currentPage, setCurrentPage] = useState(1);
  const [beers, setBeers] = useState<BeerInformation[]>([]);

  const fetchBeerForCurrentPage = useCallback(async () => {
    setViewDataState(ViewDataState.Loading);

    const currentPageBeer = await fetchPageOfBeerData(currentPage);

    if (currentPageBeer.length === 0) {
      setViewDataState(ViewDataState.NoResults);
      return;
    }
    setBeers([...beers, ...currentPageBeer]);

    setViewDataState(ViewDataState.Data);
  }, [beers, currentPage, setViewDataState]);

  const handleView = useCallback(
    (inView: boolean) => {
      if (
        !inView ||
        [ViewDataState.Loading, ViewDataState.NoResults].includes(viewDataState)
      )
        return;

      const nextPageIndex = currentPage + 1;
      setCurrentPage(nextPageIndex);
      fetchBeerForCurrentPage();
    },
    [currentPage, fetchBeerForCurrentPage, viewDataState]
  );

  return (
    <>
      <BeerPreviewContainer>
        {beers.map((beer) => (
          <BeerPreview key={beer.id} beer={beer} />
        ))}
      </BeerPreviewContainer>

      <p className="text-3xl py-8 font-bold text-center">
        {viewDataState === ViewDataState.Initial
          ? "The end of the server side rendered beer"
          : null}
        {viewDataState === ViewDataState.NoResults
          ? "That's all the beer there is!"
          : null}
        {viewDataState === ViewDataState.Loading
          ? "Sit tight, grabbing some more beers!"
          : null}
        {viewDataState === ViewDataState.Data ? "More Beer?" : null}
      </p>
      <InView as="div" onChange={(inView) => handleView(inView)} />
    </>
  );
};
