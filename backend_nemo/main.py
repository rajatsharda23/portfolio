from dotenv import load_dotenv
import os
import asyncio
import httpx

load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"
groq_api_key = os.getenv('GROQ_API_KEY')
groq_api_url = "https://api.groq.com/v1/chat"  # Example endpoint; adjust as necessary

async def get_api_response(prompt: str) -> str | None:
    text: str | None = None

    try:
        headers = {
            "Authorization": f"Bearer {groq_api_key}",
            "Content-Type": "application/json"
        }
        data = {
            "messages": [
                {"role": "system", "content": "You are Siri, a helpful AI Assistant to help the user answer any question"},
                {"role": "user", "content": prompt}
            ]
        }

        async with httpx.AsyncClient() as client:
            response = await client.post(groq_api_url, json=data, headers=headers)
            response.raise_for_status()
            text = response.json()["content"]

        print('---------------------------- \n')
        print('(2)\n')
        # Add any relevant debugging information if available from Groq
        print('(3) \n')
        # Add additional troubleshooting info if needed
        print('---------------------------- \n')

    except Exception as e:
        print('ERROR: ', e)

    return text

# To append the new prompt to last to retain history
def update_list(message: str, pl: list[str]):
    pl.append(message)

def create_prompt(message: str, pl: list[str]) -> str:
    p_message: str = f'\n{message}'
    update_list(p_message, pl)
    prompt: str = ''.join(pl)
    return prompt

async def get_bot_response(message: str, pl: list[str]) -> str:
    prompt: str = create_prompt(message, pl)
    bot_response: str = await get_api_response(prompt)

    if bot_response:
        update_list(bot_response, pl)
    else:   # Incase of error in API call to Groq
        bot_response = 'Something went wrong...'

    return bot_response

async def main():
    prompt_list = ['']  # History of prompts for context
    
    while True:
        user_input: str = input('You: ')
        if user_input.lower() == 'mischief managed':
            break
        response: str = await get_bot_response(user_input, prompt_list)
        print(f'Bot:  {response}')

        if user_input.lower() in ['quit', 'exit', 'bye']:
            break

        if response == 'Something went wrong...' or response == 'I cannot answer such questions, please read the guidelines...':
            break

if __name__ == '__main__':
    asyncio.run(main())
