"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">FITNESS</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/programs"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  The Sport
                </Link>
              </li>
              <li>
                <Link
                  href="/foundation"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Fitness Foundation
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/store"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Store
                </Link>
              </li>
              <li>
                <Link
                  href="/gym"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Fitness Gym
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Fitness Video
                </Link>
              </li>
              <li>
                <Link
                  href="/archive"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Archive
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">SOCIAL MEDIA</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Threads
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  WhatsApp
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  YouTube
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  TikTok
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">HELP</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Fitness Pass FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/devices"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Devices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/credentials"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Credentials
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">LEGAL</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ad-choices"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Ad Choices
                  </Link>
                </li>
                <li>
                  <Link
                    href="/do-not-sell"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Do Not Sell or Share
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        </div>
      </footer>
    );
}