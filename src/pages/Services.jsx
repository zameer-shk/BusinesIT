
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layout, ShoppingBag, Home as HomeIcon, TrendingUp, FileText, RefreshCw } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';

const services = [
  { icon:<Layout size={26}/>,      name:'Business Website',    color:'#7c5cfc', bg:'rgba(124,92,252,.12)',
    desc:'Multi-page professional websites for brands, agencies and service-based businesses. Designed to build trust and drive enquiries.',
    points:['Up to 6 custom pages','Contact & enquiry forms','Google Maps integration','Mobile-first design'] },
  { icon:<ShoppingBag size={26}/>, name:'E-Commerce Store',    color:'#0ea5e9', bg:'rgba(14,165,233,.12)',
    desc:'Complete online stores with product listings, shopping cart, and payment gateway integration — ready to sell from day one.',
    points:['Product catalog & filters','Cart & checkout flow','Payment gateway setup','Order management'] },
  { icon:<HomeIcon size={26}/>,    name:'Real Estate Website', color:'#10b981', bg:'rgba(16,185,129,.12)',
    desc:'Property listing sites for builders, brokers and real estate agencies — with enquiry forms, location maps and gallery pages.',
    points:['Property listing pages','Location & map pages','Enquiry lead capture','Photo/video galleries'] },
  { icon:<TrendingUp size={26}/>,  name:'Finance & Capital',   color:'#f59e0b', bg:'rgba(245,158,11,.1)',
    desc:'Trust-building websites for investment firms, NBFCs, capital consultants and financial service companies.',
    points:['Professional branding','Services & scheme pages','Regulatory compliance layout','Secure contact forms'] },
  { icon:<FileText size={26}/>,    name:'Landing Page',        color:'#ec4899', bg:'rgba(236,72,153,.1)',
    desc:'High-converting single pages for product launches, ad campaigns and lead generation. Focused, fast and designed to convert.',
    points:['Single focused CTA','Optimised for ad traffic','A/B test-ready layout','Fast load speed'] },
  { icon:<RefreshCw size={26}/>,   name:'Website Redesign',    color:'#14b8a6', bg:'rgba(20,184,166,.1)',
    desc:'Modernise an outdated website with a fresh design, better mobile experience and improved performance.',
    points:['Full visual overhaul','Speed optimisation','Mobile responsiveness fix','SEO improvements'] },
];

export default function Services() {
  const fxRef = useCursorFX();
  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true" />
      <div className="dark-page">

        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="page-hero__noise" /><div className="page-hero__grid" />
          <div className="page-hero__orb" /><div className="page-hero__orb2" />
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              What We Do
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Services built for<br/><em>real businesses</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              From your first website to a full e-commerce overhaul — we handle everything, end to end.
            </motion.p>
          </div>
        </section>

        {/* ── GRID ── */}
        <section className="section" style={{background:'#0d0e10',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)'}} />
          <div className="container">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:64,flexWrap:'wrap',gap:20}}>
              <div>
                <FadeIn><div className="slabel">Our Services</div></FadeIn>
                <FadeIn delay={0.08}>
                  <h2 className="sec-title" style={{marginTop:8}}>
                    Everything your business<br/>needs to <em>win online</em>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.1}>
                <Link to="/contact" className="btn btn-outline-white">Get a Quote <ArrowRight size={15}/></Link>
              </FadeIn>
            </div>
            <div className="svc-grid">
              {services.map((s,i) => (
                <motion.div key={s.name} className="svc-cell"
                  initial={{opacity:0,y:40}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true,margin:'-60px'}}
                  transition={{duration:.55,delay:(i%3)*.09,ease:[.22,1,.36,1]}}>
                  <div className="svc-cell__bar" style={{background:s.color}} />
                  <div className="svc-cell__num">0{i+1}</div>
                  <div className="svc-cell__icon" style={{background:s.bg,color:s.color}}>{s.icon}</div>
                  <div className="svc-cell__name">{s.name}</div>
                  <p className="svc-cell__desc">{s.desc}</p>
                  <ul className="svc-cell__pts">
                    {s.points.map(p => (
                      <li key={p}>
                        <span className="svc-cell__check" style={{color:s.color}}>✓</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="svc-cta">
          <div className="container svc-cta__inner">
            <FadeIn>
              <div>
                <div className="svc-cta__title">Not sure what you need?</div>
                <div className="svc-cta__sub">Tell us about your business and we will recommend the right solution.</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Link to="/contact" className="btn btn-lime">Get a Free Consultation <ArrowRight size={16}/></Link>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}