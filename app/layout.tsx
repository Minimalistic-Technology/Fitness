// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import { ReactNode } from "react";
// import Link from "next/link";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Fitness Pro",
//   description: "Your ultimate fitness companion",
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
//         <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
//           <div className="container mx-auto px-4 py-3">
//             <div className="flex justify-between items-center">
//               {/* Logo/Brand */}
//               <div className="flex items-center space-x-2">
//                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                   <span className="text-blue-600 font-bold text-sm">FP</span>
//                 </div>
//                 <h1 className="text-2xl font-bold tracking-tight">Fitness Pro</h1>
//               </div>

//               {/* Desktop Navigation */}
//               <nav className="hidden md:block">
//                 <ul className="flex items-center space-x-8">
//                   <li>
//                     <Link 
//                       href="/" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       Home
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/workout" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       Workouts
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/nutrition" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       Nutrition
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/progress" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       Progress
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/about" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       About
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link 
//                       href="/contact" 
//                       className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
//                     >
//                       Contact
//                       <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full"></span>
//                     </Link>
//                   </li>
//                 </ul>
//               </nav>

//               {/* CTA Buttons & Auth */}
//               <div className="hidden md:flex items-center space-x-3">
//                 <Link 
//                   href="/workout" 
//                   className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
//                 >
//                   Get Started
//                 </Link>
                
//                 {/* Login/Sign Up */}
//                 <div className="flex items-center space-x-2">
//                   <Link 
//                     href="/login" 
//                     className="px-3 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
//                   >
//                     Login
//                   </Link>
//                   <span className="text-blue-300">|</span>
//                   <Link 
//                     href="/signup" 
//                     className="px-3 py-2 text-sm font-medium border border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               </div>

//               {/* Mobile Menu Button */}
//               <button className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 group">
//                 <span className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
//                 <span className="w-4 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
//                 <span className="w-6 h-0.5 bg-white transition-all duration-200"></span>
//               </button>
//             </div>

//             {/* Mobile Navigation (you'd toggle this with state) */}
//             <nav className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4 hidden">
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="/" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Home
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/workout" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Workouts
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/nutrition" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Nutrition
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/progress" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Progress
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/about" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     About
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/contact" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Contact
//                   </Link>
//                 </li>
//                 <li className="pt-2">
//                   <Link href="/workout" className="block bg-white text-blue-600 px-3 py-2 rounded font-medium text-sm text-center hover:bg-blue-50 transition-colors duration-200">
//                     Get Started
//                   </Link>
//                 </li>
//                 {/* Mobile Auth Links */}
//                 <li className="pt-2 border-t border-blue-500">
//                   <Link href="/login" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="/signup" className="block border border-white px-3 py-2 text-sm font-medium rounded hover:bg-white hover:text-blue-600 transition-all duration-200 text-center">
//                     Sign Up
//                   </Link>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </header>
        
//         <main className="min-h-screen">
//           {children}
//         </main>
        
//         <footer className="bg-black text-white">
//           <div className="container mx-auto px-4 py-12">
//             {/* Main Footer Content */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
//               {/* Brand Section */}
//               <div className="space-y-4">
//                 <div className="flex items-center space-x-2">
//                   <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
//                     <span className="text-white font-bold text-sm">FP</span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-red-600">FITNESS</h3>
//                 </div>
//                 <p className="text-gray-400 text-sm leading-relaxed">
//                   FitnessPro.com - World
//                 </p>
//               </div>

//               {/* FITNESS Links */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-white">FITNESS</h4>
//                 <ul className="space-y-2">
//                   <li><Link href="/programs" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">The Sport</Link></li>
//                   <li><Link href="/foundation" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Foundation</Link></li>
//                   <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Careers</Link></li>
//                   <li><Link href="/store" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Store</Link></li>
//                   <li><Link href="/gym" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Gym</Link></li>
//                   <li><Link href="/videos" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Video</Link></li>
//                   <li><Link href="/archive" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Archive</Link></li>
//                 </ul>
//               </div>

//               {/* Social Media */}
//               <div className="space-y-4">
//                 <h4 className="text-lg font-semibold text-white">SOCIAL MEDIA</h4>
//                 <ul className="space-y-2">
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Facebook</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Instagram</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Threads</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">WhatsApp</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">YouTube</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">TikTok</Link></li>
//                   <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Twitter</Link></li>
//                 </ul>
//               </div>

//               {/* Help & Legal */}
//               <div className="space-y-6">
//                 {/* Help Section */}
//                 <div className="space-y-4">
//                   <h4 className="text-lg font-semibold text-white">HELP</h4>
//                   <ul className="space-y-2">
//                     <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Pass FAQ</Link></li>
//                     <li><Link href="/devices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Devices</Link></li>
//                     <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Press</Link></li>
//                     <li><Link href="/credentials" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Credentials</Link></li>
//                   </ul>
//                 </div>

//                 {/* Legal Section */}
//                 <div className="space-y-4">
//                   <h4 className="text-lg font-semibold text-white">LEGAL</h4>
//                   <ul className="space-y-2">
//                     <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms</Link></li>
//                     <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</Link></li>
//                     <li><Link href="/ad-choices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Ad Choices</Link></li>
//                     <li><Link href="/do-not-sell" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Do Not Sell or Share</Link></li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </footer>
//       </body>
//     </html>
//   );
// }
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fitness Pro",
  description: "Your ultimate fitness companion",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <div className="flex justify-between items-center">
              {/* Logo/Brand */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">FP</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Fitness Pro</h1>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:block">
                <ul className="flex items-center space-x-8">
                  <li>
                    <Link 
                      href="/" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      Home
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/workout" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      Workouts
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/nutrition" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      Nutrition
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/plans" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      Plans
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/about" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      About
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/contact" 
                      className="relative px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-200 group"
                    >
                      Contact
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-white transition-all duration-200 group-hover:w-full group-hover:left-0"></span>
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* CTA Buttons & Auth */}
              <div className="hidden md:flex items-center space-x-3">
                <Link 
                  href="/workout" 
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-blue-50 transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
                
                {/* Login/Sign Up */}
                <div className="flex items-center space-x-2">
                  <Link 
                    href="/login" 
                    className="px-3 py-2 text-sm font-medium text-white hover:text-blue-200 transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <span className="text-blue-300">|</span>
                  <Link 
                    href="/signup" 
                    className="px-3 py-2 text-sm font-medium border border-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button className="md:hidden flex flex-col justify-center items-center w-6 h-6 space-y-1 group">
                <span className="w-5 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
                <span className="w-4 h-0.5 bg-white transition-all duration-200 group-hover:w-6"></span>
                <span className="w-6 h-0.5 bg-white transition-all duration-200"></span>
              </button>
            </div>

            {/* Mobile Navigation (you'd toggle this with state) */}
            <nav className="md:hidden mt-4 pb-4 border-t border-blue-500 pt-4 hidden">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/workout" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Workouts
                  </Link>
                </li>
                <li>
                  <Link href="/nutrition" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Nutrition
                  </Link>
                </li>
                <li>
                  <Link href="/plans" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Plans
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Contact
                  </Link>
                </li>
                <li className="pt-2">
                  <Link href="/workout" className="block bg-white text-blue-600 px-3 py-2 rounded font-medium text-sm text-center hover:bg-blue-50 transition-colors duration-200">
                    Get Started
                  </Link>
                </li>
                {/* Mobile Auth Links */}
                <li className="pt-2 border-t border-blue-500">
                  <Link href="/login" className="block px-3 py-2 text-sm font-medium hover:bg-blue-500 rounded transition-colors duration-200">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="block border border-white px-3 py-2 text-sm font-medium rounded hover:bg-white hover:text-blue-600 transition-all duration-200 text-center">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        <footer className="bg-black text-white">
          <div className="container mx-auto px-4 py-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">FP</span>
                  </div>
                  <h3 className="text-2xl font-bold text-red-600">FITNESS</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  FitnessPro.com - World
                </p>
              </div>

              {/* FITNESS Links */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">FITNESS</h4>
                <ul className="space-y-2">
                  <li><Link href="/programs" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">The Sport</Link></li>
                  <li><Link href="/foundation" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Foundation</Link></li>
                  <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Careers</Link></li>
                  <li><Link href="/store" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Store</Link></li>
                  <li><Link href="/gym" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Gym</Link></li>
                  <li><Link href="/videos" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Video</Link></li>
                  <li><Link href="/archive" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Archive</Link></li>
                </ul>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">SOCIAL MEDIA</h4>
                <ul className="space-y-2">
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Facebook</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Instagram</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Threads</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">WhatsApp</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">YouTube</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">TikTok</Link></li>
                  <li><Link href="#" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Twitter</Link></li>
                </ul>
              </div>

              {/* Help & Legal */}
              <div className="space-y-6">
                {/* Help Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">HELP</h4>
                  <ul className="space-y-2">
                    <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Fitness Pass FAQ</Link></li>
                    <li><Link href="/devices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Devices</Link></li>
                    <li><Link href="/press" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Press</Link></li>
                    <li><Link href="/credentials" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Credentials</Link></li>
                  </ul>
                </div>

                {/* Legal Section */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">LEGAL</h4>
                  <ul className="space-y-2">
                    <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Terms</Link></li>
                    <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Privacy Policy</Link></li>
                    <li><Link href="/ad-choices" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Ad Choices</Link></li>
                    <li><Link href="/do-not-sell" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">Do Not Sell or Share</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}