"use server";

import { generateDesignSuggestion, type DesignSuggestionInput } from "@/ai/flows/design-suggestion-generator";

export async function getAiSuggestions(input: DesignSuggestionInput) {
  console.log("Iniciando getAiSuggestions con la entrada:", input);
  try {
    const result = await generateDesignSuggestion(input);
    console.log("Sugerencias de IA generadas exitosamente:", result);
    return { success: true, suggestions: result.suggestions };
  } catch (error) {
    console.error("Error detallado al generar sugerencias de IA:", error);
    return { success: false, error: "No se pudieron generar sugerencias. Revisa la consola del servidor para más detalles." };
  }
}
