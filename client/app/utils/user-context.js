"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  companyName: "",
  companyInfo: null,
  searchCompany: () => {},
  pushCompanyInfo: () => {},
});

export function UserProvider({ children }) {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  // const searchCompany = async (name, companyInfo, post) => {
  //   setCompanyName(name);
  //   // setTimeout(() => {
  //   //   setCompanyInfo({
  //   //     name: name,
  //   //     industry: "Sample Industry",
  //   //     size: "1000-5000 employees",
  //   //     description: "This is a sample company description.",
  //   //     post: post,
  //   //     companyInfo: companyInfo,
  //   //   });
  //   // }, 1000);
  // };

  const searchCompany = async (name, companyInfo) => {
    setCompanyName(name);
    setCompanyInfo(null); // Reset company info while fetching

    try {
      const response = await fetch(
        `http://localhost:8080/api/fetch-all-company-information?company=${encodeURIComponent(
          name
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch company information");
      }

      const data = await response.json();
      console.log("name", data.company_leaders[0].organization.name);
      console.log("description", data.company_leaders[0].organization.industry);

      let employees = [];
      console.log(data);
      for (const employee in data.company_leaders) {
        employees.push({
          name: employee.name,
          title: employee.title,
          description: "",
        });
      }

      sales_pitch = [
        "Congrats on raising $500k in your Pre-Seed funding round last year! I'm impressed with how Speck is solving everyday workplace challenges efficiently.",
        "With such growth, managing finances can become tricky. Are you finding it hard to keep your burn rate under control?",
        "At Hiline, we help over 300 businesses keep their finances in check. We handle daily bookkeeping, monthly reports, and payroll. We even helped Jahnel Group save $1M in taxes.",
        "Is this something you're dealing with? If so, just hit reply and let's chat.",
      ];

      const getPersonInfo = async (person) => {
        const response = await fetch(
          `http://localhost:8080/api/simulate-sales-pitch`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company_info: {
                company_name: data.company_name,
                company_description: data.description,
              },
              person: person,
              sales_pitch: sales_pitch,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
      };
      let found_employees = [];
      for (const person of employees) {
        info = getPersonInfo(person);
        if (info) {
          found_employees.push(info);
        }
      }

      setCompanyInfo({
        name: data.company_name,
        industry: data.industry,
        tagline: data.tag_line,
        description: data.description,
        company_logo: data.logo_url,
        company_url: data.company_url,
        employees: data.employees,
        employee_list: found_employees,
        companyInfo: {
          ...data,
          ...companyInfo, // Merge with any existing companyInfo
        },
      });
    } catch (error) {
      console.error("Error fetching company information:", error);
      // Set fallback info if fetch fails
      setCompanyInfo({
        name: name,
        industry: "Information not available",
        size: "Information not available",
        description: "Failed to fetch company information",
        companyInfo: companyInfo,
      });
    }
  };

  const pushCompanyInfo = async (info) => {
    setCompanyInfo(info);
  };

  return (
    <UserContext.Provider
      value={{
        companyName,
        companyInfo,
        companyDescription,
        searchCompany,
        pushCompanyInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
