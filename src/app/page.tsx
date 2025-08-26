// "use client";
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { LoginPage } from './components/LoginPage';
// import { VisitorManagement } from './components/VisitorManagement';
// import { clearTokens } from './utils/apiService';

// export default function App() {
//   const [user, setUser] = useState<{ username: string } | null>(null);

//   const [accessToken, setAccessToken] = useState<string | null>(
//     () => localStorage.getItem("accessToken")
//   );
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
//     () => !!localStorage.getItem("accessToken")
//   );


//   const handleLogin = (accessToken: string) => {
//     // Demo authentication - in real app, this would call an API
//     console.log('User logged in with token:', accessToken);
//      if (accessToken) {
//       setAccessToken(accessToken);
//       setIsAuthenticated(true);
//       // setUser({ username });
//       return true;
//     }
//     return false;
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     clearTokens()
//     setUser(null);
//   };

//   const pageVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     in: { opacity: 1, scale: 1 },
//     out: { opacity: 0, scale: 1.05 }
//   };

//   const pageTransition = {
//     type: 'springGenerator',
//     ease: 'anticipate',
//     duration: 0.6
//   };
//   console.log('Rendering App component',isAuthenticated);

//   return (
//     <div className="size-full">
//       <AnimatePresence mode="wait">
//         {!isAuthenticated ? (
//           <motion.div
//             key="login"
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <LoginPage onLogin={handleLogin} />
//           </motion.div>
//         ) : (
//           <motion.div
//             key="visitor-management"
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <VisitorManagement user={user} onLogout={handleLogout} />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'motion/react';
// import { LoginPage } from './components/LoginPage';
// import { OfficeSelector } from './components/OfficeSelector';
// import { clearTokens } from './utils/apiService';
// import { useRouter } from "next/navigation";

// export default function App() {
//   const [user, setUser] = useState<{ username: string } | null>(null);

//   const [accessToken, setAccessToken] = useState<string | null>(
//     () => localStorage.getItem("accessToken")
//   );
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
//     () => !!localStorage.getItem("accessToken")
//   );

//   const router = useRouter();

//   const handleLogin = (accessToken: string) => {
//     if (accessToken) {
//       setAccessToken(accessToken);
//       setIsAuthenticated(true);
//       setUser({ username: "Mahesh" }); // you can set real user info from API
//       return true;
//     }
//     return false;
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     clearTokens();
//     setUser(null);
//     router.push(`/`); 
//   };

//   const pageVariants = {
//     initial: { opacity: 0, scale: 0.95 },
//     in: { opacity: 1, scale: 1 },
//     out: { opacity: 0, scale: 1.05 }
//   };

//   const pageTransition = {
//     type: 'springGenerator',
//     ease: 'anticipate',
//     duration: 0.6
//   };

//   return (
//     <div className="size-full">
//       <AnimatePresence mode="wait">
//         {!isAuthenticated ? (
//           // STEP 1: Show Login
//           <motion.div
//             key="login"
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <LoginPage onLogin={handleLogin} />
//           </motion.div>
//         ) : (
//           // STEP 2: Show OfficeSelector (instead of VisitorManagement directly)
//           <motion.div
//             key="office-selector"
//             initial="initial"
//             animate="in"
//             exit="out"
//             variants={pageVariants}
//             transition={pageTransition}
//           >
//             <OfficeSelector
//               user={user!}
//               offices = {[
//               { id: "66c5f3c1a1d4f2b6e89a1234", name: "Main Office - Mumbai", address: "Bandra Kurla Complex" },
//               { id: "66c5f3c1a1d4f2b6e89a5678", name: "Branch Office - Delhi", address: "Connaught Place" },
//               { id: "66c5f3c1a1d4f2b6e89a9abc", name: "Tech Hub - Bangalore", address: "Electronic City" },
//             ]}
//               onSelectOffice={(officeId) => router.push(`/dashboard?office=${officeId}`)}
//               onLogout={handleLogout}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginPage } from "./components/LoginPage";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number; // expiry in seconds
}

export default function Login() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isTokenValid = (token: string) => {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          return true; // still valid
        }
      } catch (e) {
        return false;
      }
      return false;
    };
 
   useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
      router.push("/office"); // valid token → go office
    } else {
      setIsAuthenticated(false);
      router.push("/"); // no token or expired → go login
    }
  }, [router]);

  const handleLogin = (token: string) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      setIsAuthenticated(true);
      router.push("/office");
      return true;
    }
    return false;
  };

  return <LoginPage onLogin={handleLogin} />;
}
