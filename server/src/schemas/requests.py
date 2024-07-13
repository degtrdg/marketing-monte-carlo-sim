from pydantic import BaseModel


class CompanyInfo(BaseModel):
    company_name: str
    company_description: str