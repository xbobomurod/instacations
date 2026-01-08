
import { GoogleGenAI, Type } from "@google/genai";
import { CaptionRequest, CaptionResponse, Language } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaption = async (data: CaptionRequest): Promise<CaptionResponse> => {
  const langNames = {
    [Language.UZ]: "O'zbekcha",
    [Language.EN]: "English",
    [Language.RU]: "Russian"
  };

  const prompt = `
    Generate a professional Instagram caption for a shop.
    Target Language: ${langNames[data.language]}
    Product Name: ${data.productName}
    Color: ${data.color}
    Style: ${data.style}
    Call to Action: ${data.actionCall || "Natural and fitting for the platform"}
    Additional Info: ${data.additionalInfo || "None"}

    Requirements:
    1. The output MUST be in ${langNames[data.language]}.
    2. Use emojis relevant to the style.
    3. Include 15-20 hashtags: mix local (if applicable) and trending global ones.
    4. Focus on high engagement and aesthetic appeal.
    5. Mention the color ${data.color} creatively.
    6. Incorporate the call to action: "${data.actionCall || ""}".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: { type: Type.STRING },
            hashtags: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["caption", "hashtags"],
        },
      },
    });

    const jsonStr = response.text?.trim() || '{}';
    const result = JSON.parse(jsonStr);

    return {
      caption: result.caption || "Error generating content.",
      hashtags: Array.isArray(result.hashtags) ? result.hashtags : []
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw new Error("Failed to reach the AI engine.");
  }
};
