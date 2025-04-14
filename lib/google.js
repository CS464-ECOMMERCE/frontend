"use server";

import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();
const autocompleteAddress = async (input) => {
  try {
    const response = await client.placeAutocomplete({
      params: {
        input,
        key: process.env.GOOGLE_MAPS_API_KEY,
        types: ["address"],
        components: ["country:my", "country:sg"],
      },
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching autocomplete data:", error);
    return [];
  }
};

export { autocompleteAddress };
