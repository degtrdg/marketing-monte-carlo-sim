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

  const searchCompany = async (name, description) => {
    setCompanyName(name);
    setTimeout(() => {
      setCompanyDescription(description);
    }, 1000);
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
