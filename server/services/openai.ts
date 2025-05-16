import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // pega a chave da variável de ambiente
});

export async function generateItinerary(params: any) {
  // exemplo de uso da API OpenAI para gerar roteiro
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Você é um assistente de viagem." },
      { role: "user", content: `Crie um roteiro para ${params.destino}` },
    ],
  });

  return response.choices[0].message?.content;
}

export async function generateChecklist(params: any) {
  // exemplo de checklist simples
  return ["Passaporte", "Dinheiro", "Roupas"];
}
