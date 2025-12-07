import { Instagram, Facebook, Youtube, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-lime-400/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/apex-logo.png"
                alt="APEX Fitness"
                className="h-12 w-12"
              />
              <span className="bebas text-3xl text-gradient-lime">APEX FITNESS</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              Transform your body, elevate your life. Join the elite community of fitness enthusiasts who demand excellence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors group"
              >
                <Youtube className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-lime-400/10 rounded-lg flex items-center justify-center hover:bg-lime-400/20 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-lime-400 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="bebas text-xl text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#showcase" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">
                  About
                </a>
              </li>
              <li>
                <a href="#programs" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">
                  Programs
                </a>
              </li>
              <li>
                <a href="#trainers" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">
                  Trainers
                </a>
              </li>
              <li>
                <a href="#membership" className="text-gray-400 hover:text-lime-400 transition-colors text-sm">
                  Membership
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="bebas text-xl text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">
                123 Fitness Avenue<br />
                Downtown District, NY 10001
              </li>
              <li className="text-gray-400 text-sm">
                +1 (555) 123-4567
              </li>
              <li>
                <a href="mailto:info@apexfitness.com" className="text-gray-400 hover:text-lime-400 transition-colors text-sm flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@apexfitness.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-lime-400/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {currentYear} APEX Fitness. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-lime-400 transition-colors text-sm">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
