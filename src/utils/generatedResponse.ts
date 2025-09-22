import OpenAI from "openai";

async function generateResponse(query :string) {
    console.log("inside generate response function , query is : " , query);
    try {
        const client = new OpenAI({
            baseURL: process.env.BASE_URL,
            apiKey: process.env.GEMINI_API_KEY
        });

        const response = await client.chat.completions.create({
            "model": "gemini-2.5-flash",
            response_format: {type : "json_object"},
            "messages": [
                {
                    "role" : "system",
                    "content" : `
                        You are a helpfull ai chat assistant. 
                        Your name is nodeGPT. 
                        Ritam Acharya , who is a bTech CSE student , has Developed you. 
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
                },
                {
                    "role": "user",
                    "content": query
                }
            ]
        })

        if (! response){
            return {
                "status" : 400,
                "message" : "Sorry , Can't get response at this moment , Please try again later."
            }
        }

        return {
            "status" : 200,
            "message" : response
        }
    } catch (error) {
        console.log("Error while getting response : " , error)
        return {
            "status" : 404,
            "message" : "Falied to connect to the model , try afer sometime..."
        }
    }
}

export default generateResponse;