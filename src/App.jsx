
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import Home          from './pages/Home';
import Services      from './pages/Services';
import Work          from './pages/Work';
import Process       from './pages/Process';
import Blog          from './pages/Blog';
import BlogPost      from './pages/BlogPost';
import Contact       from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse    from './pages/TermsOfUse';
import { useAnimations } from './hooks/useAnimations';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"           element={<Home />} />
        <Route path="/services"   element={<Services />} />
        <Route path="/work"       element={<Work />} />
        <Route path="/process"    element={<Process />} />
        <Route path="/blog"       element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact"    element={<Contact />} />
        <Route path="/privacy"    element={<PrivacyPolicy />} />
        <Route path="/terms"      element={<TermsOfUse />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppInner() {
  /* ── Activate all advanced animations globally ── */
  useAnimations();
  return (
    <>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  );
}