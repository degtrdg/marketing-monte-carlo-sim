from typing import List
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from openai import BaseModel
import os

from src.schemas.requests import CompanyInfo, Person
from src.together_wrapper import TogetherWrapper
from src.llm_wrapper import LLMWrapper


# Service initialization
app: FastAPI = FastAPI(title="AGIHouse Hackathons API", version="0.0.1")

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return JSONResponse({"message": "API"})


@app.get("/company-info")
async def get_company_info(name: str):
    # This is a mock implementation. In a real scenario, you'd fetch this data from a database or external API.
    if not name:
        raise HTTPException(status_code=400, detail="Company name is required")

    # Mock company info
    company_info = {
        "name": name,
        "industry": "Technology",
        "size": "1000-5000 employees",
        "description": f"{name} is a leading technology company specializing in innovative solutions.",
    }

    return JSONResponse(company_info)


class SimulateRequest(BaseModel):
    company_info: CompanyInfo
    person: Person
    sales_pitch: List[str]


@app.post("/api/simulate-sales-pitch")
async def simulate_sales_pitch(request: SimulateRequest):
    try:
        # Initialize TogetherWrapper if not already initialized
        if not hasattr(TogetherWrapper, "client"):
            TogetherWrapper.initialize()

        results = TogetherWrapper.simulate_once(
            company_info=request.company_info,
            person=request.person,
            sales_pitch=request.sales_pitch,
        )
        return JSONResponse({"results": [result.model_dump() for result in results]})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/fetch-all-company-information")
async def fetch_all_company_information(company: str):
    from src.llm_wrapper import LLMWrapper

    try:

        company = LLMWrapper(company)
        company.get_apollo_data(os.getenv("APOLLO_API_KEY"))
        company.get_company_leaders(os.getenv("APOLLO_API_KEY"))

        company.extract_sitemap()
        company.get_important_pages()
        company.download_and_parse_pages_selfmade()
        company.analyze_with_llm(os.getenv("OPENAI_API_KEY"))

        return JSONResponse(
            {
                "company_leaders": company.company_leaders,
                "company_summary": company.company_summary,
                "company_tagline": company.company_tagline,
                "company_name": company.company_name,
                "company_url": company.company_url,
                "estimated_num_employees": company.estimated_num_employees,
                "industry": company.industry,
                "raw_address": company.raw_address,
                "logo_url": company.logo_url,
            }
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
