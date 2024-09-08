// import { ChatGroq } from "@langchain/groq"
// import { ChatPromptTemplate } from "@langchain/core/prompts"
// import { StringOutputParser } from "@langchain/core/output_parsers"

// async function* newGroq(userMessage: string) {
//   const model = new ChatGroq({
//     apiKey: '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',
//   })
//   const prompt = ChatPromptTemplate.fromMessages([
//     ["system", "You are Siri, a helpful AI Assistant to help the user answer any question"],
//     ["human", userMessage],
//   ])
//   const outputParser = new StringOutputParser()
//   const chain = prompt.pipe(model).pipe(outputParser)
//   const response = await chain.stream({
//     input: userMessage,
//   })
//   for await (const item of response) {
//     yield item
//   }
// }

// export default newGroq
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

const api_key = process.env.REACT_APP_GROQ_API_KEY
console.log(api_key)

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
    apiKey: api_key, //It is free onli, don't exploit pls :). Didn't had the time to write the server side code to use the env file. 🥹
    model: "llama3-8b-8192"
  })

  memory.addMessage("human", userMessage);

  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are Siri, a helpful AI Assistant to help the user answer any question. This is the context for answering questions related to Rajat, to which you may answer only if asked for - Studies in Delhi Technological University(DTU), erstwhile Delhi College of Engineering(DCE). Pursuing B.Tech in Electronics and Communications Engineering, and a Minor in Computer Science. Did his 11th-12th class from Mayo International School, in Delhi. Scored 91.6% in CBSE Board. Did his schooling from nursery to class 10th from DPS Indirapuram, Ghaziabad. Proud dipsite. He likes to play the violin, won a couple national level competitions for his school, composed the string sections of a song that have 2.8+Mn hits on youtube. Love to play badminton and football. Favorite team would be real Madrid, and player would be 1st Ronaldo and 2nd Sunil Chettri. He lives in Delhi, and is ok for relocation for work purposes. He is also comfortable with remote work. Rajat Sharda Email: rajatsharda23@gmail.com Ph: +91 7982503475 Portfolio: rajat-portfolio23.netlify.app | LinkedIn: linkedin.com/in/rajatsharda | GitHub: github.com/rajatsharda) is a proficient technologist with expertise in Java, Python, C++, JavaScript, TypeScript, Redux, HTML, CSS, React, Node.js, Tailwind CSS, Streamlit, Colang, GitHub, Visual Studio, Postman, NeMo-Guardrails, and OpenAI, currently pursuing a B.Tech. in Electronics and Communications Engineering with a minor in Computer Science Engineering at Delhi Technological University (CGPA: 8.50). He has demonstrated practical skills through professional experience, including roles such as Software Engineering Intern at TechiZen India Pvt. Ltd., where he successfully implemented AI teaching instructors using NeMo Guardrails, Langchain, Colang, AWS, and Node.js. Rajat has also freelanced on projects involving OpenAI Embeddings, Pinecone, and Streamlit. His academic projects include developing a personal portfolio website inspired by macOS, integrating features such as Shut Down, Sleep, Restart, and draggable-resizable applications like NotePad, Safari, and VS Code, utilizing Redux for robust state management, and engineering Siri, an AI Assistant powered by Llama-3 capable of answering queries about himself while maintaining conversational memory. Additionally, he developed RhythMate, a Tinder-inspired web application using React and Tailwind CSS to facilitate user engagement and connections, utilizing MongoDB and Express.js for data management, and integrating the Spotify API to enhance matchmaking based on music preferences. Another notable project includes the Invictus Website for DTU Technical Fest’24, where he directed a team of six in designing and launching the official website, achieving a 60% increase in online registrations within the first week, and enabling features for event registration, team formation, and participation summary for all fest activities. He also created CreatiVerse, a Pinterest-inspired web application using React, Sanity, Tailwind CSS, and Google Auth API, enabling users to add, discover, and save content pins, perform category-based searches, view user profiles, and add comments, integrating Sanity for content management and Google authentication. His other projects include Movieverse (a Netflix Clone), where he refined backend functionality and integrated Firebase for email/password authentication, including a forgot password feature, and implemented Stripe payment gateway for seamless subscription purchases, and a Retail Management System (RMS), where he developed a Java and MySQL-based application encompassing inventory, customer, and order management functionalities, utilizing Javax Swing to design an intuitive UI. Rajat is actively engaged in extracurricular activities, including organizing and leading events at VHIAAN’24 and INVICTUS’24, serving as a DSA Mentor at IEEE DTU, coordinating activities at CS-IEEE DTU, leading the flagship Hackathon of IEEE DTU (VIHAAN 6.0), freelancing as an SME for Physics and Maths, actively participating in Madhurina (the Music Society of DTU) with a notable achievement of over 2.8 million views on YouTube for his violin performances, achieving 2nd runners-up at the Inter-DPS National Level Instrumental Orchestra, and volunteering at NSSS Foundation NGO."],
    ...memory.getHistory(),
  ]);

  const outputParser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(outputParser);
  const response = await chain.stream({
    input: userMessage,
  });

  let completeResponse = '';
  for await (const item of response) {
    completeResponse += item || '';
    yield item;
  }
  memory.addMessage("assistant", completeResponse);
}

// Named exports
export { newGroq, ConversationMemory };
