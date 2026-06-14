
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { label: 'Home',     path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Work',     path: '/work' },
  { label: 'Process',  path: '/process' },
  { label: 'Blog',     path: '/blog' },
  { label: 'Contact',  path: '/contact' },
];

// Standalone dot — rendered OUTSIDE the Link so framer-motion
// never tries to removeChild from a node React Router has already unmounted.
function NavDot({ active }) {
  return (
    <span className="navbar__link-dot-wrap" aria-hidden="true">
      <AnimatePresence>
        {active && (
          <motion.span
            className="navbar__link-dot"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </AnimatePresence>
    </span>
  );
}

export default function Navbar() {
  const { pathname }            = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <div className="container navbar__inner">

          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-b">Busines</span>
            <span className="navbar__logo-it">IT</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__links">
            {navLinks.map(link => {
              const active = pathname === link.path ||
                (link.path !== '/' && pathname.startsWith(link.path));
              return (
                <span key={link.path} style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Link
                    to={link.path}
                    className={`navbar__link${active ? ' navbar__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                  <NavDot active={active} />
                </span>
              );
            })}
          </nav>

          {/* CTA */}
          <Link to="/contact" className="btn btn-lime navbar__cta">
            Free Consultation <ArrowRight size={14} />
          </Link>

          {/* Mobile toggle */}
          <button
            className="navbar__toggle"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-drawer__nav">
              {navLinks.map((link, i) => {
                const active = pathname === link.path ||
                  (link.path !== '/' && pathname.startsWith(link.path));
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      className={`mobile-drawer__link${active ? ' mobile-drawer__link--active' : ''}`}
                    >
                      {link.label}
                      {active && <span className="mobile-drawer__dot" />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mobile-drawer__footer">
              <Link
                to="/contact"
                className="btn btn-lime"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Get Free Consultation <ArrowRight size={15} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}