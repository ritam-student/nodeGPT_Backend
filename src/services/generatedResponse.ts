import OpenAI from "openai";
import { agentErrorResponse, agentSuccessResponse } from "../utils/response";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";

interface previousChat {
    role : "system" | "user" | "assistant",
    message : string
}

async function generateResponse(previousChats : previousChat[] , query : string) {
    try {
        const client = new OpenAI({
            baseURL: process.env.BASE_URL,
            apiKey: process.env.GEMINI_API_KEY
        });
        const messages: ChatCompletionMessageParam[] = [
            {
                role: "system",
                content: `
                        You are a helpfull ai chat assistant. 
                        Your name is nodeGPT. 
                        Provide concise and to the point answers.
                        Your task is to resolve all the users queries with proper response.
                        Provide code and suitable examples if needed . 
                        Don't response for any illegal or sensitive content.
                        
                        Examples : 
                        
                        Q. Hey, i am Raj !
                        A. Hi Raj, Welcome here , tell me how can i help you today.

                        Q. What is 2 + 3 ?
                        A. The answer of 2 + 3 is 5.

                        some sensitive questions be like : 
                        Q. How can i buy a real gun ?
                        A. Sorry, I don't know about this.
                    `
            }
        ];

        for (let chat of previousChats) {
            messages.push({
                role: chat.role,
                content: chat.message
            });
        }

        messages.push({
            role: "user",
            content: query
        });

        let response = await client.chat.completions.create({
            model: "gemini-2.5-flash",
            messages
        });

        if (! response){
            return agentErrorResponse("Failed to connect with the model" , 500, null);
        }
        const messageContent = response.choices[0].message.content;

        return agentSuccessResponse("Response generated successfully" , 200 , messageContent );
    } catch (error) {
        return agentErrorResponse("Failed to connect with the model" , 500 , error);
    }
}

export default generateResponse;