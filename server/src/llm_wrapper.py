import time
from bs4 import BeautifulSoup
import requests
from xml.etree import ElementTree as ET
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from openai import OpenAI
from src.together_wrapper import TogetherWrapper
from src.prompts import query_titles_prompt


class LLMWrapper:
    def __init__(
        self,
        company_name,
        query_person_locations=None,
        query_seniority_levels=None,
        query_titles=None,
    ):
        self.apollo_data = None
        self.sitemap = None
        self.company_leaders = []
        self.important_pages = []
        self.page_content = {}
        self.company_summary = ""
        self.linkedin_profiles = {}
        self.company_tagline = ""

        self.company_name = company_name
        self.company_url = None
        self.estimated_num_employees = None
        self.industry = None
        self.raw_address = None
        self.logo_url = None

        self.query_person_locations = (
            query_person_locations if query_person_locations else ["California, US"]
        )
        self.query_seniority_levels = (
            (
                query_seniority_levels
                if query_seniority_levels
                else ["executive", "director"]
            ),
        )
        self.query_titles = (
            query_titles
            if query_titles
            else [
                "CEO",
                "CTO",
                "CFO",
                "COO",
                "President",
                "Vice President",
                "Director",
                "Senior Engineer",
            ]
        )

    def get_query_titles(self, sales_pitch, seller_company_description):
        """
        Get the query titles based on the seller company description.
        """
        response = TogetherWrapper.call(
            model="mistralai/llama3-8b",
            messages=[
                {
                    "role": "system",
                    "content": "You are a senior sales development representitive who's job is to find the right titles to to talk to in a company.",
                },
                {
                    "role": "user",
                    "content": query_titles_prompt.format(
                        company_description=seller_company_description,
                        sales_pitch=sales_pitch,
                    ),
                },
            ],
        )
        print(response)
        return response

    def get_apollo_data(self, api_key):
        """
        Fetch company data from Apollo's API.
        """
        url = "https://api.apollo.io/v1/organizations/search"
        headers = {"Content-Type": "application/json", "X-Api-Key": api_key}
        payload = {"q_organization_name": self.company_name}

        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            self.apollo_data = response.json()
            org = self.apollo_data.get("organizations", [{}])[0]

            self.org_id = org.get("id")
            self.company_url = org.get("website_url")
            self.company_name = org.get("name", self.company_name)
            self.estimated_num_employees = org.get("estimated_num_employees")
            self.industry = org.get("industry")
            self.raw_address = org.get("raw_address")
            self.logo_url = org.get("logo_url")
        else:
            print(
                f"Failed to fetch data from Apollo. Status code: {response.status_code}"
            )
            print(response.content)
            print(response)

    def get_company_leaders(self, api_key):
        """
        Fetch company leaders from Apollo's API.
        """
        if not self.org_id:
            print("Organization ID not found. Run get_apollo_data first.")
            return

        url = "https://api.apollo.io/v1/people/search"
        headers = {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "X-Api-Key": api_key,
        }
        payload = {
            "organization_ids": [self.org_id],
            "page": 1,
            "per_page": 10,
            "person_locations": self.query_person_locations,
            "seniority_levels": self.query_seniority_levels,
            "titles": self.query_titles,
        }

        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            self.company_leaders = data.get("people", [])
        else:
            print(
                f"Failed to fetch company leaders. Status code: {response.status_code}"
            )

    def get_top_leaders(self, num_leaders=5):
        """
        Return information about the top N company leaders from the existing data.

        :param num_leaders: Number of top leaders to return (default 5)
        :return: Dictionary of top leaders with their information
        """
        if not self.company_leaders:
            print("No company leaders data available. Run get_company_leaders first.")
            return {}

        top_leaders = {}
        for i, leader in enumerate(self.company_leaders[:num_leaders], 1):
            leader_info = {
                "name": f"{leader.get('first_name', '')} {leader.get('last_name', '')}",
                "title": leader.get("title", "N/A"),
                "photo_url": leader.get("photo_url", "N/A"),
                "headline": leader.get("headline", "N/A"),
                "email": leader.get("email", "N/A"),
                "linkedin_url": leader.get("linkedin_url", "N/A"),
            }
            top_leaders[f"Leader_{i}"] = leader_info

        return top_leaders

    def extract_sitemap(self):
        """
        Extract XML sitemap from the company URL.
        """
        try:
            sitemap_url = f"{self.company_url}/sitemap.xml"
            response = requests.get(sitemap_url)
            if response.status_code == 200:
                root = ET.fromstring(response.content)
                self.sitemap = [
                    url.text
                    for url in root.findall(
                        ".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc"
                    )
                ]
            else:
                print(f"Failed to fetch sitemap. Status code: {response.status_code}")
        except requests.RequestException as e:
            print(f"Error fetching sitemap: {e}")
        except ET.ParseError as e:
            print(f"Error parsing XML: {e}")

    def get_important_pages(self, max_pages=5):
        """
        Extract the most important pages from the sitemap.
        """
        important_keywords = ["about", "mission", "vision"]
        self.important_pages = []

        for url in self.sitemap:
            if any(keyword in url.lower() for keyword in important_keywords):
                self.important_pages.append(url)
                if len(self.important_pages) == max_pages:
                    break

    def download_and_parse_pages_selfmade(self):
        """
        Download and parse the important pages using ButifulSoup
        """

        for url in self.important_pages:
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    soup = BeautifulSoup(response.content, "html.parser")

                    # Extract text from common content areas
                    main_content = (
                        soup.find("main")
                        or soup.find("div", {"id": "content"})
                        or soup.find("div", {"class": "content"})
                    )
                    if main_content:
                        text = main_content.get_text(strip=True, separator=" ")
                    else:
                        # If no main content area found, extract text from the body
                        text = soup.body.get_text(strip=True, separator=" ")

                    # Limit the text to a reasonable length (e.g., first 1000 characters)
                    self.page_content[url] = text[:1000]
                else:
                    print(
                        f"Failed to fetch homepage. Status code: {response.status_code}"
                    )
            except requests.RequestException as e:
                print(f"Error processing {url}: {e}")

    def download_and_parse_pages(self):
        """
        Download and parse the important pages using LlamaParse.
        """
        llama_cloud_api_key = os.getenv("LLAMA_CLOUD_API_KEY")
        if not llama_cloud_api_key:
            raise ValueError("LLAMA_CLOUD_API_KEY environment variable is not set")

        for url in self.important_pages:
            try:
                response = requests.get(url)
                if response.status_code == 200:
                    # Upload HTML content to LlamaParse
                    upload_response = requests.post(
                        "https://api.cloud.llamaindex.ai/api/parsing/upload",
                        headers={
                            "accept": "application/json",
                            "Authorization": f"Bearer {llama_cloud_api_key}",
                        },
                        files={"file": ("page.html", response.content, "text/html")},
                    )

                    if upload_response.status_code == 200:
                        job_id = upload_response.json()["id"]

                        # Check job status
                        while True:
                            status_response = requests.get(
                                f"https://api.cloud.llamaindex.ai/api/parsing/job/{job_id}",
                                headers={
                                    "accept": "application/json",
                                    "Authorization": f"Bearer {llama_cloud_api_key}",
                                },
                            )

                            if status_response.json()["status"] == "completed":
                                break
                            time.sleep(5)  # Wait for 5 seconds before checking again

                        # Get result in markdown
                        result_response = requests.get(
                            f"https://api.cloud.llamaindex.ai/api/parsing/job/{job_id}/result/markdown",
                            headers={
                                "accept": "application/json",
                                "Authorization": f"Bearer {llama_cloud_api_key}",
                            },
                        )

                        if result_response.status_code == 200:
                            self.page_content[url] = result_response.text
                            print(result_response.text)
                        else:
                            print(
                                f"Failed to get result for {url}. Status code: {result_response.status_code}"
                            )
                    else:
                        print(
                            f"Failed to upload {url}. Status code: {upload_response.status_code}"
                        )
                else:
                    print(
                        f"Failed to download {url}. Status code: {response.status_code}"
                    )
            except requests.RequestException as e:
                print(f"Error processing {url}: {e}")

    def analyze_with_llm(self, llm_api_key):
        """
        Analyze the parsed content using a secondary LLM (e.g., OpenAI's GPT-3).
        """
        combined_content = "\n\n".join(self.page_content.values())

        summary_prompt = f"""
        Based on the following content from {self.company_name}'s website, provide a concise summary of what the company is about. 
        Focus on their main products or services, mission, and any unique selling points.

        Content:
        {combined_content}

        Summary:
        """

        tagline_prompt = f"""
        Based on the following content from {self.company_name}'s website, provide a four word tagline for the company.

        Content:
        {combined_content}

        Summary:
        """

        # This is a placeholder for the API call to the LLM of your choice
        # You would replace this with actual API call code
        self.company_summary = self.call_llm_api(summary_prompt, llm_api_key)
        self.company_tagline = self.call_llm_api(tagline_prompt, llm_api_key)

    def call_llm_api(self, prompt, api_key):
        """
        Method for calling OpenAI's GPT-4 API.
        """

        from openai import OpenAI

        client = OpenAI(
            api_key=api_key,
        )

        try:
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful assistant that analyzes companies.",
                    },
                    {"role": "user", "content": prompt},
                ],
                max_tokens=150,
                n=1,
                temperature=0.5,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"An error occurred while calling the OpenAI API: {str(e)}")
            return "An error occurred while analyzing the company."

    def analyze_linkedin_profiles(self, linkedin_urls, llm_api_key):
        """
        Analyze LinkedIn profiles of company leaders using an LLM.
        """
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        driver = webdriver.Chrome(options=chrome_options)

        for url in linkedin_urls:
            try:
                driver.get(url)
                time.sleep(5)  # Wait for page to load

                # Wait for the main content to load
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "pv-top-card"))
                )

                # Get the page source and parse with BeautifulSoup
                soup = BeautifulSoup(driver.page_source, "html.parser")

                # Extract the entire profile content
                profile_content = soup.get_text(separator="\n", strip=True)

                # Use LLM to analyze the profile
                analysis = self.analyze_profile_with_llm(profile_content, llm_api_key)

                self.linkedin_profiles[url] = analysis

            except Exception as e:
                print(f"Error processing LinkedIn profile {url}: {str(e)}")

        driver.quit()

    def get_linkedin_profiles(self, num_leaders=5):
        """
        Get LinkedIn profiles of top N company leaders.
        """
        top_leaders = self.get_top_leaders(num_leaders)
        linkedin_urls = []

        for leader_info in top_leaders.values():
            linkedin_url = leader_info.get("linkedin_url")
            if linkedin_url:
                linkedin_urls.append(linkedin_url)

        return linkedin_urls

    def analyze_linkedin_profiles(self, linkedin_urls, llm_api_key):
        """
        Attempt to analyze LinkedIn profiles of company leaders.
        """
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument(
            "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        )

        driver = webdriver.Chrome(options=chrome_options)

        for url in linkedin_urls:
            try:
                driver.get(url)
                time.sleep(5)  # Initial wait

                # Wait for the main content to load
                try:
                    WebDriverWait(driver, 20).until(
                        EC.presence_of_element_located((By.CLASS_NAME, "pv-top-card"))
                    )
                except TimeoutException:
                    print(f"Timeout waiting for content on {url}")
                    continue

                # Scroll to load more content
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(3)

                # Get the page source and parse with BeautifulSoup
                soup = BeautifulSoup(driver.page_source, "html.parser")

                # Extract relevant information
                name = soup.find("h1", class_="text-heading-xlarge")
                title = soup.find("div", class_="text-body-medium")
                about = soup.find("div", class_="pv-shared-text-with-see-more")

                profile_info = {
                    "name": name.text.strip() if name else "N/A",
                    "title": title.text.strip() if title else "N/A",
                    "about": about.text.strip() if about else "N/A",
                }

                # Use LLM to analyze the profile
                analysis = self.analyze_profile_with_llm(profile_info, llm_api_key)
                self.linkedin_profiles[url] = analysis

            except Exception as e:
                print(f"Error processing LinkedIn profile {url}: {str(e)}")

        driver.quit()

    def analyze_profile_with_llm(self, profile_info, api_key):
        """
        Use an LLM to analyze the LinkedIn profile content.
        """
        client = OpenAI(api_key=api_key)

        prompt = f"""
        Analyze the following LinkedIn profile information and provide a summary including:
        1. The person's name
        2. Their current role and company
        3. A brief description of their professional background
        4. An assessment of their level of technical experience (High, Moderate, or Low)
        5. An estimate of their openness to new pitches or opportunities (High, Moderate, or Low)
        6. Any other notable information

        Profile Information:
        Name: {profile_info['name']}
        Title: {profile_info['title']}
        About: {profile_info['about']}

        Please format your response as a JSON object with the following keys:
        name, current_role, background, technical_experience, openness_to_pitches, notable_info
        """

        try:
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "You are an AI assistant that analyzes LinkedIn profiles.",
                    },
                    {"role": "user", "content": prompt},
                ],
                max_tokens=500,
                n=1,
                temperature=0.5,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"An error occurred while calling the OpenAI API: {str(e)}")
            return "An error occurred while analyzing the LinkedIn profile."

    def display_linkedin_profiles(self):
        """
        Display the analyzed LinkedIn profiles.
        """
        print("\nLinkedIn Profile Analysis:")
        for url, analysis in self.linkedin_profiles.items():
            print(f"\nProfile: {url}")
            print(analysis)

    def display_company_leaders(self):
        """
        Display the company leaders.
        """
        if not self.company_leaders:
            print("No company leaders data available.")
            return

        print("\nCompany Leaders:")
        for leader in self.company_leaders:
            name = f"{leader.get('first_name', '')} {leader.get('last_name', '')}"
            title = leader.get("title", "N/A")
            print(f"- {name}: {title}")

    def display_top_leaders(self, num_leaders=5):
        """
        Display information about the top N company leaders.
        """
        top_leaders = self.get_top_leaders(num_leaders)
        if top_leaders:
            print(f"\nTop {num_leaders} Company Leaders:")
            for leader_key, leader_info in top_leaders.items():
                print(f"\n{leader_key}:")
                for key, value in leader_info.items():
                    print(f"  {key}: {value}")
        else:
            print("No leader information available.")

    def display_info(self):
        """
        Display the extracted information.
        """
        if self.apollo_data:
            print("\nApollo Data:")
            # Adjust the following based on the actual structure of Apollo's API response
            org = self.apollo_data.get("organizations", [{}])[0]
            print(f"Name: {org.get('name')}")
            print(f"Website: {org.get('website_url')}")
            print(f"Industry: {org.get('industry')}")
            print(f"Employee Count: {org.get('employee_count')}")

        if self.sitemap:
            print("\nSitemap URLs:")
            for url in self.sitemap[:5]:  # Display first 5 URLs
                print(url)
            print(f"... and {len(self.sitemap) - 5} more")

        self.display_company_leaders()


if __name__ == "__main__":
    # from linkedin_scraper import Person, actions
    # from selenium import webdriver

    # driver = webdriver.Chrome()

    # actions.login(driver)  # if email and password isnt given, it'll prompt in terminal
    # person = Person("https://www.linkedin.com/in/joey-sham-aa2a50122", driver=driver)
    # import os
    # from dotenv import load_dotenv  # Import load_dotenv from dotenv

    # # Load environment variables from .env file
    # load_dotenv()

    # company = CompanyInfo("sambanova systems")
    # company.get_apollo_data(os.getenv('APOLLO_API_KEY'))
    # # print(company.apollo_data)
    # # print("#" * 20)

    # company.get_company_leaders(os.getenv('APOLLO_API_KEY'))
    # # print(company.company_leaders)
    # # print("#" * 20)

    # company.extract_sitemap()
    # company.get_important_pages()
    # company.download_and_parse_pages_selfmade()

    # company.analyze_with_llm(os.getenv('OPENAI_API_KEY'))
    # company.display_info()
    company = CompanyInfo("sambanova systems")
    TogetherWrapper.initialize()
    company.get_query_titles(
        "we want to make a sales pitch", "we are a company that makes software"
    )
