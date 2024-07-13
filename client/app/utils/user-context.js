"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext({
  companyName: "",
  companyInfo: null,
  searchCompany: () => {},
});

export function UserProvider({ children }) {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState(null);

  const searchCompany = async (name) => {
    setCompanyName(name);
    setTimeout(() => {
      setCompanyInfo({
        name: name,
        industry: "Sample Industry",
        size: "1000-5000 employees",
        description: "This is a sample company description.",
      });
    }, 1000);
  };

  return (
    <UserContext.Provider value={{ companyName, companyInfo, searchCompany }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
