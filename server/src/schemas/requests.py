from pydantic import BaseModel
from typing import List


class CompanyInfo(BaseModel):
    company_name: str
    company_description: str

class Person(BaseModel):
    person_name: str
    person_title: str
    person_description: str

class PersonParagraphThoughts(BaseModel):
    inner_thought: str
    outer_thought: str
    level_of_interest: int