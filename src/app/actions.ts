"use server";

import { generateDesignSuggestion, type DesignSuggestionInput } from "@/ai/flows/design-suggestion-generator";

export async function getAiSuggestions(input: DesignSuggestionInput) {
  try {
    const result = await generateDesignSuggestion(input);
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error("Error al generar sugerencias de IA:", error);
    return { success: false, error: "No se pudieron generar sugerencias. Por favor, inténtalo de nuevo." };
  }
}
