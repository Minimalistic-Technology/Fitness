
// "use client";

// import { ReactNode, useState, useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import Navbar from "./Components/Navbar/page"; // Adjust the import path based on your project structure
// import Footer from "./Components/Footer/page"; // Adjust the import path based on your project structure

// export default function ClientLayout({ children }: { children: ReactNode }) {
//   const [isLoading, setIsLoading] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   // Log on mount and when pathname changes
//   useEffect(() => {
//     console.log("Current pathname:", pathname);
//   }, [pathname]);

//   // Route-based loading spinner (like your example)
//   useEffect(() => {
//     const start = () => setIsLoading(true);
//     const end = () => setIsLoading(false);

//     // Next.js App Router uses router.events only in pages directory,
//     // so here we simulate by watching pathname changes
//     start();
//     const timeout = setTimeout(end, 300); // small delay for effect

//     return () => clearTimeout(timeout);
//   }, [pathname]);

//   return (
//     <>
//       <Navbar />

//       <main className="min-h-screen relative">
//         {isLoading && (
//           <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
//             <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg" />
//           </div>
//         )}
//         {children}
//       </main>

//       <Footer />
//     </>
//   );
// }







"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Components/Navbar/page"; 
import Footer from "./Components/Footer/page"; 
import { AuthProvider } from "./context/context";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
   const isAdmin = pathname.startsWith("/admin")||pathname.startsWith("/Admin");

  // Log on mount and when pathname changes
  useEffect(() => {
    console.log("Current pathname:", pathname);
  }, [pathname]);

  // Route-based loading spinner (like your example)
  useEffect(() => {
    const start = () => setIsLoading(true);
    const end = () => setIsLoading(false);

    // Next.js App Router uses router.events only in pages directory,
    // so here we simulate by watching pathname changes
    start();
    const timeout = setTimeout(end, 300); // small delay for effect

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AuthProvider>
    <>
      {!isAdmin && <Navbar />}

      <main className="min-h-screen relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-lg" />
          </div>
        )}
        {children}
      </main>

      <Footer />
    </>
    </AuthProvider>
  );
}