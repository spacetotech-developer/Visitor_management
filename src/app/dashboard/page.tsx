// "use client";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { VisitorManagement } from "@/app/components/VisitorManagement";
// import { clearTokens } from "../utils/apiService";

// export default function DashboardPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const [selectedOffice, setSelectedOffice] = useState("");

//   useEffect(() => {
//     const officeFromUrl = searchParams.get("office");
//     if (officeFromUrl) {
//       setSelectedOffice(officeFromUrl);
//     } else {
//       // if no office, send user back to office selector
//       router.push("/");
//     }
//   }, [searchParams, router]);

//   if (!selectedOffice) {
//     return <p>Loading dashboard...</p>;
//   }

//   const logoutFunction = () => {
//     clearTokens() // Clear access token
//     router.push("/"); // Redirect to login page after logout
//   };

//   return (
//     <VisitorManagement 
//       user={{ username: "Mahesh" }}  // replace with your auth user
//       selectedOfficeFromUrl={selectedOffice}
//       // onLogout={() => router.push("/")} 
//       onLogout={logoutFunction}
//     />
//   );
// }

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { VisitorManagement } from "@/app/components/VisitorManagement";
import { clearTokens } from "../utils/apiService";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedOffice, setSelectedOffice] = useState("");

  useEffect(() => {
    const officeFromUrl = searchParams.get("office");
    if (officeFromUrl) {
      setSelectedOffice(officeFromUrl);
    } else {
      router.push("/");
    }
  }, [searchParams, router]);

  if (!selectedOffice) {
    return <p>Loading dashboard...</p>;
  }

  const logoutFunction = () => {
    clearTokens();
    router.push("/");
  };

  return (
    <VisitorManagement
      user={{ username: "Mahesh" }}
      selectedOfficeFromUrl={selectedOffice}
      onLogout={logoutFunction}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <DashboardContent />
    </Suspense>
  );
}
