// 'use client'
// import React, { createContext, useState, useContext, ReactNode } from "react";

// type AuthContextType = {
//   token: string | null;
//   setToken: (token: string) => void;
//   removeToken: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setTokenState] = useState<string | null>(
//     localStorage.getItem("accessToken")
//   );

//   // Save token to state & localStorage
//   const setToken = (newToken: string) => {
//     setTokenState(newToken);
//     localStorage.setItem("accessToken", newToken);
//   };

//   // Remove token from state & localStorage
//   const removeToken = () => {
//     setTokenState(null);
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken, removeToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for consuming auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


// "use client";
// import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

// type AuthContextType = {
//   token: string | null;
//   setToken: (token: string) => void;
//   removeToken: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setTokenState] = useState<string | null>(null);

//   // Load token from localStorage after mount
//   useEffect(() => {
//     const savedToken = localStorage.getItem("accessToken");
//     if (savedToken) {
//       setTokenState(savedToken);
//     }
//   }, []);

//   // Save token to state & localStorage
//   const setToken = (newToken: string) => {
//     setTokenState(newToken);
//     localStorage.setItem("accessToken", newToken);
//   };

//   // Remove token from state & localStorage
//   const removeToken = () => {
//     setTokenState(null);
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken, removeToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for consuming auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


// 'use client'
// import React, { createContext, useState, useContext, ReactNode } from "react";

// type AuthContextType = {
//   token: string | null;
//   setToken: (token: string) => void;
//   removeToken: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [token, setTokenState] = useState<string | null>(
//     localStorage.getItem("accessToken")
//   );

//   // Save token to state & localStorage
//   const setToken = (newToken: string) => {
//     setTokenState(newToken);
//     localStorage.setItem("accessToken", newToken);
//   };

//   // Remove token from state & localStorage
//   const removeToken = () => {
//     setTokenState(null);
//     localStorage.removeItem("accessToken");
//   };

//   return (
//     <AuthContext.Provider value={{ token, setToken, removeToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook for consuming auth context
// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


"use client";
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

type AuthContextType = {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  // Load token from localStorage after mount
  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken) {
      setTokenState(savedToken);
    }
  }, []);

  // Save token to state & localStorage
  const setToken = (newToken: string) => {
    setTokenState(newToken);
    localStorage.setItem("accessToken", newToken);
  };

  // Remove token from state & localStorage
  const removeToken = () => {
    setTokenState(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, removeToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};