
const Groq = require("groq-sdk");
const groq = new Groq({
    apiKey: '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', // pls don't use this, this shitty process.env is not working (its free anyways so )
    dangerouslyAllowBrowser: true
});

async function getGroqChatStream(userMessage: string) {
    return groq.chat.completions.create({
        //
        // Required parameters
        //
        messages: [
            // Set an optional system message. This sets the behavior of the
            // assistant and can be used to provide specific instructions for
            // how it should behave throughout the conversation.
            {
                role: "system",
                content: "Your name is Siri and are a helpful assistant."
            },
            // Set a user message for the assistant to respond to.
            {
                role: "user",
                content: userMessage
            }
        ],
        // The language model which will generate the completion.
        model: "llama3-8b-8192",
        //
        // Optional parameters
        //
        // Controls randomness: lowering results in less random completions.
        // As the temperature approaches zero, the model will become deterministic
        // and repetitive.
        temperature: 0.5,
        // The maximum number of tokens to generate. Requests can use up to
        // 2048 tokens shared between prompt and completion.
        max_tokens: 1024,
        // Controls diversity via nucleus sampling: 0.5 means half of all
        // likelihood-weighted options are considered.
        top_p: 1,
        // A stop sequence is a predefined or user-specified text string that
        // signals an AI to stop generating content, ensuring its responses
        // remain focused and concise. Examples include punctuation marks and
        // markers like "[end]".
        stop: null,
        // If set, partial message deltas will be sent.
        stream: true
    });
}

export { getGroqChatStream };
