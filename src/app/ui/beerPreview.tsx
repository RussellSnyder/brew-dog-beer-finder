import { BeerInformation } from "../types";

interface Props {
  beer: BeerInformation;
}

export const BeerPreview = ({ beer }: Props) => {
  return <div>{beer.name}</div>;
};
