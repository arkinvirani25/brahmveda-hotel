import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Together from "together-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function loopEmail(body: any) {
  const options = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + process.env.LOOPS_API_KEY,
      "Content-Type": "application/json",
    },
    body: body,
  };

  try {
    const response = await fetch("https://app.loops.so/api/v1/transactional", options);
    return response.json();
  } catch (err: any) {
    return {
      error: "Internal server error",
    };
  }
}

export function convertToSlug(hotelName: string): string {
  return hotelName
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim(); // Remove leading/trailing spaces
}

export async function AItogether(address: string) {
  const together = new Together({
    apiKey: process.env.TOGETHER_API_KEY,
  });

  if (address) {
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Extract the state from postal code, country, city, and postal code from this address: "${address}" and format it as like this json:  {"state": "Goa", "country": "India", "postal_code": "403511", "city": "Bardez", "address":  remaining address like country city postal code and state remove from address string}.Output should be only json object Nothing else than that.neither description nor Note.`,
        },
      ],
      model: "meta-llama/Llama-3-70b-chat-hf",
    });
    return response.choices;
  }
  return null;
}
