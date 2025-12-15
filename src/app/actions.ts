"use server";

import { generateDesignSuggestion, type DesignSuggestionInput } from "@/ai/flows/design-suggestion-generator";

export async function getAiSuggestions(input: DesignSuggestionInput) {
  try {
    const result = await generateDesignSuggestion(input);
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error("Error generating AI suggestions:", error);
    return { success: false, error: "Failed to generate suggestions. Please try again." };
  }
}
