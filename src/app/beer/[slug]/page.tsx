import { api } from "@/app/api";
import { BeerInformation } from "@/types";

interface Props {
  params: {
    slug: string;
  };
}

export default async function BeerPage({ params: { slug } }: Props) {
  const beer = await api.getBeerBySlug(slug);

  if (!beer) {
    return <p>no beer :-/</p>;
  }
  return <p>{beer?.name}</p>;
}
