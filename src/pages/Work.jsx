
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';

const projects = [
  { name:'Arab Jewels',       url:'http://arabjewels.in/',        niche:'Jewellery E-commerce',    tag:'E-commerce', tagColor:'#7c5cfc', tagBg:'rgba(124,92,252,.15)', from:'#1c1917', to:'#44403c', desc:'A premium jewellery e-commerce website with elegant product displays, category filtering and seamless shopping.',                    services:['E-commerce store','Product catalog','Mobile responsive','SEO ready'] },
  { name:'Aswan Real Estate', url:'https://aswanrealestate.com/', niche:'Real Estate Agency',       tag:'Real Estate',tagColor:'#10b981', tagBg:'rgba(16,185,129,.15)', from:'#0c4a6e', to:'#0369a1', desc:'A property showcase website with listing pages, location details and enquiry capture forms.',                                        services:['Property listings','Enquiry forms','Google Maps','Gallery pages'] },
  { name:'Stanford Capital',  url:'https://stanfordcapital.in/', niche:'Investment & Finance',     tag:'Finance',    tagColor:'#0ea5e9', tagBg:'rgba(14,165,233,.15)', from:'#1e3a5f', to:'#1e40af', desc:'A trust-building finance firm website with services overview, team section and secure contact forms.',                               services:['Professional branding','Services pages','Team section','Contact forms'] },
  { name:'Actal Digital',     url:'https://actaldigital.com/',   niche:'Digital Marketing Agency', tag:'Agency',     tagColor:'#a855f7', tagBg:'rgba(168,85,247,.15)', from:'#3b0764', to:'#6d28d9', desc:'A bold digital marketing agency website with case studies, services breakdown and strong brand identity.',                          services:['Agency website','Case studies','Services pages','Brand identity'] },
];

export default function Work() {
  const fxRef = useCursorFX();
  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true" />
      <div className="dark-page">

        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="page-hero__noise" /><div className="page-hero__grid" />
          <div className="page-hero__orb" style={{background:'radial-gradient(circle,rgba(200,241,53,.12) 0%,transparent 65%)'}} />
          <div className="page-hero__orb2" />
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              Our Portfolio
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Work we are<br/><em>proud of</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              Real websites, real businesses. Here is a look at some of the projects we have built and launched.
            </motion.p>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section className="section" style={{background:'#0a0a0b',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(200,241,53,.18),transparent)'}} />
          <div className="container">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56,flexWrap:'wrap',gap:20}}>
              <div>
                <FadeIn><div className="slabel">All Projects</div></FadeIn>
                <FadeIn delay={0.08}>
                  <h2 className="sec-title" style={{marginTop:8}}>
                    Real results for<br/><em>real businesses</em>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.1}>
                <Link to="/contact" className="btn btn-outline-white">Start a Project <ArrowRight size={15}/></Link>
              </FadeIn>
            </div>
            <div className="work-grid">
              {projects.map((p,i) => (
                <motion.div key={p.name} className="wcard"
                  initial={{opacity:0,y:50}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true,margin:'-60px'}}
                  transition={{duration:.6,delay:(i%2)*.12,ease:[.22,1,.36,1]}}>
                  <div className="wcard__thumb">
                    <div className="wcard__thumb-bg" style={{background:`linear-gradient(135deg,${p.from},${p.to})`}} />
                    <div className="wcard__overlay" />
                    <div className="wcard__url-badge">{p.url.replace('https://','').replace('http://','')}</div>
                    <div style={{position:'relative',zIndex:1}}>
                      <div className="wcard__niche">{p.niche}</div>
                      <div className="wcard__name">{p.name}</div>
                    </div>
                  </div>
                  <div className="wcard__body">
                    <div className="wcard__top">
                      <div>
                        <div className="wcard__label">{p.name}</div>
                        <div className="wcard__sub">{p.niche}</div>
                      </div>
                      <span className="wcard__tag" style={{background:p.tagBg,color:p.tagColor}}>{p.tag}</span>
                    </div>
                    <p className="wcard__desc">{p.desc}</p>
                    <div className="wcard__chips">
                      {p.services.map(s => <span key={s} className="wcard__chip">{s}</span>)}
                    </div>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="wcard__link">
                      Visit Website <ExternalLink size={13}/>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-strip">
          <div className="cta-strip__orb" />
          <div className="container cta-strip__inner">
            <FadeIn>
              <h2 className="cta-strip__title">Want results like these?<br/><em>Let's talk.</em></h2>
              <p className="cta-strip__sub">We build websites that actually grow businesses. Yours could be next.</p>
              <div className="cta-strip__btns">
                <Link to="/contact" className="btn btn-lime">Start Your Project <ArrowRight size={16}/></Link>
                <Link to="/services" className="btn btn-outline-white">View Services</Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}