import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#showcase' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Programs', href: '#programs' },
    { name: 'Membership', href: '#membership' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-lime-400/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img
              src="https://mocha-cdn.com/019af40a-53cd-73a4-ba49-a263443ce62c/apex-logo.png"
              alt="APEX Fitness"
              className="h-12 w-12"
            />
            <span className="bebas text-3xl text-gradient-lime">APEX FITNESS</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-lime-400 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
            <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-lime-400/50 transition-all duration-300 transform hover:scale-105">
              JOIN NOW
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-lime-400/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-300 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-4 py-3 bg-gradient-to-r from-lime-400 to-lime-500 text-black font-bold rounded-lg">
              JOIN NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
