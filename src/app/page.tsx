import { PairingFinder } from "./pairingFinder/pairingFinder";
import { PageTitle } from "./ui/typography";

export default function Home() {
  return (
    <main className="">
      <PageTitle>Beer Pairings</PageTitle>

      <PairingFinder />
    </main>
  );
}
