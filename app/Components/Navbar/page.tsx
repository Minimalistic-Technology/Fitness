// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";

// export default function Navbar() {
//   const [isLoading, setIsLoading] = useState(false);
//   const pathname = usePathname();
//   const router = useRouter();

//   const handleLinkClick = (href: string) => {
//     setIsLoading(true);
//     router.push(href);
//     setTimeout(() => setIsLoading(false), 2000);
//   };

//   useEffect(() => {
//     console.log("Pathname changed to:", pathname);
//   }, [pathname]);

//   return (
//     <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//               <span className="text-blue-600 font-bold text-sm">FP</span>
//             </div>
//             <h1 className="text-2xl font-bold tracking-tight">Fitness Pro</h1>
//           </div>

//           {/* Desktop Menu */}
//           <nav className="hidden md:block">
//             <ul className="flex items-center space-x-8">
//               {[
//                 { href: "/", label: "Home" },
//                 { href: "/workout", label: "Workouts" },
//                 { href: "/nutrition", label: "Nutrition" },
//                 { href: "/plans", label: "Plans" },
//                 { href: "/about", label: "About" },
//                 { href: "/contact", label: "Contact" },
//               ].map((item) => (
//                 <li key={item.href}>
//                   <Link
//                     href={item.href}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleLinkClick(item.href);
//                     }}
//                     className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                   >
//                     {item.label}
//                     <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>

//           {/* Buttons */}
//           <div className="hidden md:flex items-center space-x-3">
//             <Link
//               href="/workout"
//               onClick={() => handleLinkClick("/workout")}
//               className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
//             >
//               Get Started
//             </Link>
//             <div className="flex items-center space-x-2">
//               <Link
//                 href="/login"
//                 onClick={() => handleLinkClick("/login")}
//                 className="px-3 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
//               >
//                 Login
//               </Link>
//               <span className="text-blue-300">|</span>
//               <Link
//                 href="/signup"
//                 onClick={() => handleLinkClick("/signup")}
//                 className="px-3 py-2 text-sm font-medium border border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
//               >
//                 Sign Up
//               </Link>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <button className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 group">
//             <span className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
//             <span className="w-4 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
//             <span className="w-6 h-0.5 bg-white transition-all duration-200"></span>
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import { useAuth } from "@/app/context/context";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { token, removeToken } = useAuth();

  const handleLinkClick = (href: string) => {
    setIsLoading(true);
    router.push(href);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handleLogout = () => {
    if (token) removeToken();
    alert("Successfully Logged Out!");
  };
  useEffect(() => {
    console.log("Pathname changed to:", pathname);
  }, [pathname]);

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">FP</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Fitness Pro</h1>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              {[
                { href: "/", label: "Home" },
                { href: "/workout", label: "Workouts" },
                { href: "/nutrition", label: "Nutrition" },
                { href: "/plans", label: "Plans" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.href);
                    }}
                    className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/workout"
              onClick={() => handleLinkClick("/workout")}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
            <div className="flex items-center space-x-2">
              {token ? (
                <>
                  <Link
                    href={"/UserProfile"}
                    title="Profile"
                    className=" cursor-pointer border-2 hover:border-white rounded-full p-2  text-blue-600 hover:text-white bg-white hover:bg-transparent"
                  >
                    <User />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => handleLinkClick("/login")}
                    className="px-3 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
                  >
                    Login
                  </Link>

                  <span className="text-blue-300">|</span>
                  <Link
                    href="/signup"
                    onClick={() => handleLinkClick("/signup")}
                    className="px-3 py-2 text-sm font-medium border border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 group">
            <span className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
            <span className="w-4 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
            <span className="w-6 h-0.5 bg-white transition-all duration-200"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
