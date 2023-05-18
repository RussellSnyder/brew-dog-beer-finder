export interface ValueUnit {
  value: number;
  unit: "liters" | "celsius" | "kilograms" | "grams";
}

export interface BeerInformation {
  id: number;
  name: string;
  slug?: string; // this is added by us
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: ValueUnit;
  boil_volume: ValueUnit;
  method: {
    mash_temp: {
      temp: ValueUnit;
      duration: number;
    }[];
    fermentation: {
      temp: ValueUnit;
    };
    twist: any; // TODO figure out what this can be
  };
  ingredients: {
    malt: {
      name: string;
      amount: ValueUnit;
    }[];
    hops: {
      name: string;
      amount: ValueUnit;
      add: string; // maybe this is limited?
      attribute: string; // maybe this is limited?
    }[];
    yeast: string;
  };
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
}
