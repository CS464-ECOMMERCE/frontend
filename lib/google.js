"use server";

import { COUNTRY_OPTIONS } from "@/components/util/Country";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

const autocompleteAddress = async (input, country) => {
  const getCountries = () => {
    if (!country) {
      return COUNTRY_OPTIONS.map((item) => `country:${item.value}`);
    } else {
      return `country:${country}`;
    }
  };

  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_MAPS_API_KEY,
        types: ["address"],
        components: getCountries(),
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    return [];
  }
};

export { autocompleteAddress };
