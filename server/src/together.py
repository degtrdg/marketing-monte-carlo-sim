from together import Together
from src.config import TOGETHER_API_KEY

if __name__ == "__main__":
    client = Together(api_key=TOGETHER_API_KEY)

    response = client.chat.completions.create(
        model="mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages=[
            {"role": "system", "content": "You are a helpful assistant"},
            {"role": "user", "content": "Hello"},
        ],
    )
    print(response.choices[0].message.content)
