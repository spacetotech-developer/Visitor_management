"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OfficeSelector } from "../components/OfficeSelector";
import { clearTokens } from "../utils/apiService";
import { useApi } from "../hooks/useApi";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

interface APIResponse {
  data: any;
  offices: any[]; // Adjust type as needed    
  total: number;
  page: number;   
  limit: number;
}


export default function OfficeSelectorPage() {
  const router = useRouter();
  const [offices, setOffices] = useState<any[]>([]); // Adjust type as needed
  const {callApi} = useApi<APIResponse>();
  const { setOfficeses,setUserInfo } = useContext(DataContext)!;
  const [UserInfo, setUserInfrm] = useState<{ username: string }>({ username: "" });
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 5;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/"); // redirect to login if not authenticated
    } else {
      fetchOffices();
      fetchUserInfo();
    }
  }, [router]);

// Fetch user info from API
  const fetchUserInfo = async () => {
     const { data, error } = await callApi(`user/getUser`, {
      method: "GET"
    });
    if (data) {
      const UserInfo = data?.data || [];
      // console.log("Offices fetched:", data);
      setUserInfrm(UserInfo); // Assuming data is an array of offices
      setUserInfo(UserInfo);
    } else {
      console.error("Error fetching offices:", error);
    }
    if (error) {
      console.error("Failed to fetch offices:", error);
      return;
    }
  };

// Fetch the offices from the API
  const fetchOffices = async ()=>{
    const { data, error } = await callApi(`/office/getOfficesByUser?page=1&limit=10&search`, {
      method: "GET"
    });
    if (data) {
      const officesArr = data?.data?.offices || [];
      // console.log("Offices fetched:", data);
      setOffices(officesArr); // Assuming data is an array of offices
      setOfficeses(officesArr);
      // You can set the offices in state if needed
    } else {
      console.error("Error fetching offices:", error);
    }
    if (error) {
      console.error("Failed to fetch offices:", error);
      return;
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(offices.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  const paginatedOffices = offices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleLogout = () => {
    clearTokens();
    // localStorage.removeItem("accessToken");
    router.push("/");
  };

  if (!UserInfo) return null; // or a loader

  return (
    <OfficeSelector
      UserInfo={UserInfo}
      offices={paginatedOffices}
      currentPage={currentPage}
      totalPages={totalPages} 
      pageSize={pageSize}
      startIndex={startIndex}
      onSelectOffice={(officeId) => router.push(`/dashboard?office=${officeId}`)}
      onLogout={handleLogout}
      setCurrentPage={setCurrentPage}
    />
  );
}
