import { ChatGroq } from "@langchain/groq"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"

async function* newGroq(userMessage: string) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
  })
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are Siri, a helpful AI Assistant to help the user answer any question"],
    ["human", userMessage],
  ])
  const outputParser = new StringOutputParser()
  const chain = prompt.pipe(model).pipe(outputParser)
  const response = await chain.stream({
    input: userMessage,
  })
  for await (const item of response) {
    yield item
  }
}

export default newGroq
