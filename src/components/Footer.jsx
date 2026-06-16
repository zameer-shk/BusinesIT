
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">Busines<span>IT</span></div>
            <p className="footer__tagline">We design and build professional websites for businesses across India — beautiful, fast, and built to grow.</p>
            <div className="footer__socials">
              <a href="https://linkedin.com"          target="_blank" rel="noopener noreferrer" className="footer__social-btn">in</a>
              {/* <a href="https://instagram.com"         target="_blank" rel="noopener noreferrer" className="footer__social-btn">ig</a> */}
              <a href="https://www.instagram.com/businesit.in/" target="_blank" rel="noopener noreferrer" className="footer__social-btn">ig</a>
              <a href="https://wa.me/919028747098"    target="_blank" rel="noopener noreferrer" className="footer__social-btn">wa</a>
            </div>
          </div>
          <div className="footer__nav">
            <div className="footer__col">
              <div className="footer__col-title">Company</div>
              <Link to="/"         className="footer__link">Home</Link>
              <Link to="/services" className="footer__link">Services</Link>
              <Link to="/work"     className="footer__link">Our Work</Link>
              <Link to="/process"  className="footer__link">Process</Link>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Resources</div>
              <Link to="/blog"    className="footer__link">Blog</Link>
              <Link to="/contact" className="footer__link">Contact</Link>
              <Link to="/privacy" className="footer__link">Privacy Policy</Link>
              <Link to="/terms"   className="footer__link">Terms of Use</Link>
            </div>
            <div className="footer__col">
              <div className="footer__col-title">Contact</div>
              <a href="mailto:service@businesit.in" className="footer__link">service@businesit.in</a>
              <a href="tel:+919028747098"           className="footer__link">+91 9028 747098</a>
              <a href="tel:+919284506450"           className="footer__link">+91 9284 506450</a>
              <span className="footer__link" style={{cursor:'default'}}>Mumbai, Maharashtra</span>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} BusinesIT. All rights reserved.</span>
          <span>Made By BusinesIT</span>
        </div>
      </div>
    </footer>
  );
}