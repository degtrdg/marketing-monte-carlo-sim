from together import Together
from src.config import TOGETHER_API_KEY
from src.prompts import sales_pitch_simulation_prompt, sales_pitch_system_short
from src.schemas import Person, CompanyInfo, SalesPitchThoughts

import openai
from pydantic import BaseModel
import instructor

from typing import List


class TogetherWrapper:
    @classmethod
    def initialize(cls):
        cls.initial_client = openai.OpenAI(
            base_url="https://api.together.xyz/v1",
            api_key=TOGETHER_API_KEY,
        )

        cls.client = instructor.from_openai(
            cls.initial_client, mode=instructor.Mode.TOOLS
        )

    @classmethod
    def simulate_once(
        cls,
        company_info: CompanyInfo,
        person: Person,
        sales_pitch: List[str],
    ) -> List[SalesPitchThoughts]:
        results = []

        # parallelize this maybe, not big deal
        for idx in range(len(sales_pitch)):
            messages = [
                {
                    "role": "system",
                    "content": sales_pitch_system_short.format(
                        # add company name
                        person_name=person.person_name,
                        person_title=person.person_title[:30],
                        person_description=person.person_description[:50], # trim it
                        company_name=company_info.company_name[:30],
                        company_description=cls.adjust_company_description(
                            company_info.company_description
                        ),
                    ),
                },
                {
                    "role": "user",
                    "content": "\n".join(
                        [paragraph for paragraph in sales_pitch[: idx + 1]]
                    ),
                },
            ]

            user: SalesPitchThoughts = cls.client.chat.completions.create(
                model="mistralai/Mixtral-8x7B-Instruct-v0.1",
                response_model=SalesPitchThoughts,
                messages=messages,
            )

            assert isinstance(
                user, SalesPitchThoughts
            ), "Should be instance of UserExtract"
            print("-" * 50)
            print(f"idx: {idx} {user.model_dump_json(indent=2)}")
            print("-" * 50)
            results.append(user)

        return results

    @classmethod
    def adjust_company_description(cls, company_description: str):
        if not company_description:
            return "No company description found"

        return company_description[:40]


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
    person = Person(
        person_name=person_name,
        person_title=person_title,
        person_description=person_description,
    )
    company = CompanyInfo(
        company_name="Hiline",
        company_description="A human-in-the-middle technology company that helps businesses manage finances.",
    )

    sales_pitch = [
        "Congrats on raising $500k in your Pre-Seed funding round last year! I'm impressed with how Speck is solving everyday workplace challenges efficiently.",
        "With such growth, managing finances can become tricky. Are you finding it hard to keep your burn rate under control?",
        "At Hiline, we help over 300 businesses keep their finances in check. We handle daily bookkeeping, monthly reports, and payroll. We even helped Jahnel Group save $1M in taxes.",
        "Is this something you're dealing with? If so, just hit reply and let's chat.",
    ]

    TogetherWrapper.initialize()
    print(
        TogetherWrapper.simulate_once(
            person=person,
            sales_pitch=sales_pitch,
            company_info=company,
        )
    )
