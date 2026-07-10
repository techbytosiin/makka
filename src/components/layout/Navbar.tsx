import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Mission', path: '/mission' },
  { name: 'Vision', path: '/vision' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Admissions', path: '/admissions' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navClass = `fixed w-full z-50 transition-all duration-300 ${
    isScrolled || !isHome ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
  }`;

  const linkColorClass = isScrolled || !isHome ? 'text-text-main hover:text-primary' : 'text-white hover:text-secondary';
  const mobileLinkColorClass = 'text-text-main hover:text-primary';

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 transition-transform group-hover:scale-105 duration-300">
              <Logo variant={isScrolled || !isHome ? 'dark' : 'light'} className="w-full h-full drop-shadow-sm" />
            </div>
            <div className={`flex flex-col ${isScrolled || !isHome ? 'text-primary' : 'text-white'}`}>
              <span className="font-heading font-bold text-xl leading-tight">Excel International</span>
              <span className="text-xs font-medium tracking-wider">SCHOOL</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${linkColorClass}`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${isScrolled || !isHome ? 'bg-primary' : 'bg-secondary'}`}
                    initial={false}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled || !isHome ? 'text-primary' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white shadow-lg border-t"
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-3 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : mobileLinkColorClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
