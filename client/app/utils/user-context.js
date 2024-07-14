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

  const searchCompany = async (name, companyInfo, post) => {
    setCompanyName(name);
    setCompanyInfo(null); // Reset company info while fetching

    try {
      const response = await fetch(
        `https://localhost:8080/api/fetch-all-company-information?company=${encodeURIComponent(
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

      setCompanyInfo({
        name: data.company_name,
        industry: data.industry || "Not available",
        size: data.estimated_num_employees
          ? `${data.estimated_num_employees} employees`
          : "Not available",
        description: data.company_summary || "No description available",
        post: post,
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
        post: post,
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
