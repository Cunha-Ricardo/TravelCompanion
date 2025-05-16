import OpenAI from "openai";
import dotenv from "dotenv";


dotenv.config({ path: "c:/Users/ricar/OneDrive/Área de Trabalho/viagemChat/TravelCompanion/.env" });
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function sendMessage(message: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Você é um assistente de viagem." },
      { role: "user", content: message },
    ],
  });
  return response.choices[0].message?.content || "";
}

export async function generateItinerary(params: { destino: string }): Promise<string | undefined> {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Você é um assistente de viagem." },
      { role: "user", content: `Crie um roteiro para ${params.destino}` },
    ],
  });
  return response.choices[0].message?.content || undefined;
}

export async function generateChecklist(params?: any): Promise<string[]> {
  // Exemplo básico, pode ser melhorado para usar openai também
  return ["Passaporte", "Dinheiro", "Roupas"];
}
