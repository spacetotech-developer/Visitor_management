// app/context/DataContext.tsx
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

type Office = {
  _id: string; officeAddress: string; officeName: string, status: string 
}; // adjust to match your API

type UserInfo = {
  username: string;
} 

type DataContextType = {
  offices: Office[];
  userInfo?: UserInfo;
  setOfficeses: (offices: Office[]) => void;
  setUserInfo: (user: UserInfo) => void;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [offices, setOfficesState] = useState<Office[]>([]);
  const [userInfo, setUserState] = useState<UserInfo | undefined>(undefined);
  //Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("offices");
    if (stored) {
      setOfficesState(JSON.parse(stored));
    }
     const storedUser = localStorage.getItem("userInfo");
    if (storedUser) setUserState(JSON.parse(storedUser));
  }, []);

  //Save to localStorage whenever offices change
  const setOfficeses = (newOffices: Office[]) => {
    setOfficesState(newOffices);
    localStorage.setItem("offices", JSON.stringify(newOffices));
  };

   const setUserInfo = (user: UserInfo) => {
    setUserState(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  return (
    <DataContext.Provider value={{ offices,userInfo, setOfficeses, setUserInfo }}>
      {children}
    </DataContext.Provider>
  );
}
