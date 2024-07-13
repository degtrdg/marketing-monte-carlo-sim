from together import Together
from src.config import TOGETHER_API_KEY
from src.prompts import sales_pitch_simulation_prompt, sales_pitch_system_short

import openai
from pydantic import BaseModel
import instructor

from typing import List

class PersonParagraphThoughts(BaseModel):
    inner_thought: str
    outer_thought: str
    level_of_interest: int

class Together:
    @classmethod
    def initialize(cls):
        cls.inital_client = openai.OpenAI(
            base_url="https://api.together.xyz/v1",
            api_key=TOGETHER_API_KEY,
        )

        cls.client = instructor.from_openai(cls.inital_client, mode=instructor.Mode.TOOLS)

    @classmethod
    def simulate_once(
        cls,
        company_name: str,
        company_description: str,
        person_name: str,
        person_title: str,
        person_description: str,
        sales_pitch: List[str],
    ) -> List[PersonParagraphThoughts]:
        results = []

        # parallelize this maybe, not big deal
        for idx in range(len(sales_pitch)):
            messages = [
                {
                    "role": "system",
                    "content": sales_pitch_system_short.format(
                        # add company name
                        person_name=person_name,
                        person_title=person_title,
                        person_description=person_description,
                    ),
                },
                {
                    "role": "user",
                    "content": "\n".join(
                        [paragraph for paragraph in sales_pitch[: idx + 1]]
                    ),
                },
            ]

            user: PersonParagraphThoughts = cls.client.chat.completions.create(
                model="mistralai/Mixtral-8x7B-Instruct-v0.1",
                response_model=PersonParagraphThoughts,
                messages=messages,
            )

            assert isinstance(
                user, PersonParagraphThoughts
            ), "Should be instance of UserExtract"

            print(user.model_dump_json(indent=2))
            results.append(user)

        return results


if __name__ == "__main__":
    client = openai.OpenAI(
        base_url="https://api.together.xyz/v1",
        api_key=TOGETHER_API_KEY,
    )

    # By default, the patch function will patch the ChatCompletion.create and ChatCompletion.create methods to support the response_model parameter
    client = instructor.from_openai(client, mode=instructor.Mode.TOOLS)
        # buy: bool

    person_name = "Jane Doe"
    person_title = "Director of Operations"
    person_description = "A pragmatic leader with 15 years of experience in streamlining business processes. She's always looking for ways to improve efficiency but is cautious about adopting new technologies without proven ROI."

    sales_pitch = [
        "Congrats on raising $500k in your Pre-Seed funding round last year! I'm impressed with how Speck is solving everyday workplace challenges efficiently.",
        "With such growth, managing finances can become tricky. Are you finding it hard to keep your burn rate under control?",
        "At Hiline, we help over 300 businesses keep their finances in check. We handle daily bookkeeping, monthly reports, and payroll. We even helped Jahnel Group save $1M in taxes.",
        "Is this something you're dealing with? If so, just hit reply and let's chat.",
    ]

    Together.initialize()
    print(Together.simulate_once(
        company_name="Hiline",
        company_description="",
        person_name=person_name,
        person_title=person_title,
        person_description=person_description,
        sales_pitch=sales_pitch,
    ))
