// export default newGroq
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const api_key = process.env.REACT_APP_GROQ_API_KEY;

class ConversationMemory {
  private maxLength: number;
  private chatHistory: [string, string][];

  constructor(maxLength: number) {
    this.maxLength = maxLength;
    this.chatHistory = [];
  }

  addMessage(role: "system" | "human" | "assistant", message: string): void {
    this.chatHistory.push([role, message]);

    // Ensure we never delete the first message
    while (this.chatHistory.length > this.maxLength * 2 + 1) {
      this.chatHistory.splice(1, 2);
    }
  }
  getHistory(): [string, string][] {
    return this.chatHistory;
  }
}

async function* newGroq(userMessage: string, memory: ConversationMemory) {
  const model = new ChatGroq({
    apiKey: api_key, //It is free onli, don't exploit pls :) 🥹
    model: "openai/gpt-oss-20b",
  });

  memory.addMessage("human", userMessage);

  const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      "You are Siri, a helpful AI Assistant to help the user answer any question. This is the context for answering questions related to Rajat, to which you may answer only if asked for - Rajat Sharda (rajatsharda23@gmail.com | +91 7982503475) is proficient in Java, Python, C++, JavaScript, TypeScript, Redux, HTML, CSS, React, NodeJs, and Tailwind CSS, and has experience with tools and frameworks such as Github, Visual Studio, Postman, NeMo-Guardrails, OpenAI, Gemini, Claude, AWS, Azure, and GCP, as well as databases including MySQL, SQLite, Firebase, MongoDB, and Sanity; he earned his B.Tech. at Delhi Technological University (CGPA 8.50) with a major in Electronics and Communications Engineering and a minor in Computer Science Engineering; his professional experience includes being a Software Engineer at TechiZen India (July 2025–Present), in which he added a new service to generate any number of questions related to career context from sample questions or descriptions, and integrated curriculum creation in Learnosity and assessment addition on the web from created questions to reduce manual effort; prior to this, he held a Software Engineering Internship at Amazon India (January 2025–June 2025), in which he architected and productionized HLD and LLD for migrating a Theft-Fraud-Abuse-Wastage detection rule leading to improved data consistency and lower service downtime by 10%; there he also migrated 2 AWS Lambda data syncing jobs to EventBridge, created and modified 3 APIs for aggregating expenses of over 1M+ employees, leveraged AWS StepFunctions, Lambda, OpenSearch, DynamoDB, and S3 instead of legacy Redshift, cutting costs by $80k/year, and enabled Cloudwatch monitoring, metric alarms, and deployments via AWS CDK to save manual effort; earlier, as an AI Engineering Intern at TechiZen India (May–December 2024), he built and deployed robust AI solutions such as a RAG-based chatbot using Google Vertex AI, AWS Bedrock, LangChain, and Ollama handling over 1,500 contextual queries monthly, as well as an AI-powered quiz generator that reduced content creation time by 83% through automation from PDFs and YouTube, plus an image recognition feature using ChatGPT-4o; here he also developed backend APIs for multi-modal LLM orchestration and metadata-aware retrieval, streamlined assessment validation and scalable pipelines using AWS Lambda, API Gateway, GCP Discovery Engine, and Learnosity integration, designed an SEO-optimized website with Next.js, TypeScript, TailwindCSS, and Redux with Microsoft Clarity integration achieving a 65% boost in scroll depth and 40% higher CTR, and implemented client AI teaching instructor with NeMo Guardrails to restrict the LLM to topic, profanity, jailbreaking, and hallucination checks with over 90% accuracy; his academic projects include Vidya AI (React, NodeJs, AWS, NeMo Guardrails, Langchain, Gemini-1.5-Flash, September 2024), in which he modeled and built a Socratic teaching AI using Google’s Gemini that filters out profanity and jailbreaking while maintaining a 95% performance score and qualifying for round 2 in Google’s GenAI Hackathon, Portfolio (React, TypeScript, Redux, Tailwind CSS, NeMo Guardrails, Groq API, May–June 2024), in which he developed a macOS-inspired personal site with draggable apps and an AI assistant powered by Llama-3 for fast self-query responses, and Invictus Website for DTU Tech Fest’24 (React, NextJs, Tailwind, Dec 2023–Jan 2024), in which he directed a team of six to design, develop, and launch the official fest website achieving a 60% increase in registrations and implementing event registration, team formation and summaries to increase footfall by 20%; his extracurricular activities include serving as Organizer and Events Lead at VHIAAN’24, INVICTUS’24, and Co-Head at INVICTUS’23 (DTU Tech-Fest), freelancing as a Subject Matter Expert for Physics and Maths with cross-checking of over 10,000 high-school level questions, and being an active member of the Madhurina Music Society of DTU with a diploma in Violin and 2.8 million+ views on YouTube.",
    ],
    ...memory.getHistory(),
  ]);

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const response = await chain.stream({
    input: userMessage,
  });

  let completeResponse = "";
  for await (const item of response) {
    completeResponse += item || "";
    yield item;
  }
  memory.addMessage("assistant", completeResponse);
}

// Named exports
export { newGroq, ConversationMemory };
