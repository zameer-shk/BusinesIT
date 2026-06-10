
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';

const steps = [
  { num:'01', title:'Discovery Call',     color:'#7c5cfc',
    desc:'We start by learning about your business, your goals and your target audience. This free call helps us understand exactly what you need so we can give you the right solution.',
    highlights:['30-minute free call','No obligations','Business & audience research','Timeline discussion'] },
  { num:'02', title:'Design Mockup',      color:'#0ea5e9',
    desc:'Within 48 hours we create a Figma design mockup of your website. You get to see exactly how it will look before a single line of code is written. We refine it until you love it.',
    highlights:['Figma design preview','Delivered in 48 hours','Full layout & colour scheme','Unlimited design feedback'] },
  { num:'03', title:'Development',        color:'#10b981',
    desc:'Once the design is approved, we build your website with clean, fast code. Every site is mobile-first, optimised for speed and built with smooth animations and interactions.',
    highlights:['Clean, semantic code','Mobile-first build','Performance optimised','Smooth animations'] },
  { num:'04', title:'Review & Revisions', color:'#f59e0b',
    desc:'You get a staging link to test your website fully before it goes live. Two rounds of revisions are included — we make sure everything looks and works exactly as you want.',
    highlights:['Full staging preview','2 revision rounds','Cross-browser testing','Mobile & desktop checks'] },
  { num:'05', title:'Launch & Support',   color:'#c8f135',
    desc:'We deploy your website, set up your domain and go live. After launch, we provide 30 days of free support for any bugs or tweaks so you are never left on your own.',
    highlights:['Domain & hosting setup','Go-live deployment','30 days free support','Full handover & training'] },
];

const faqs = [
  { q:'How long does it take to build a website?',      a:'Most business websites are delivered in 7–14 days from design approval. E-commerce projects typically take 3–4 weeks.' },
  { q:'Do I need to provide content?',                  a:'Yes — you provide text, images and branding. We help guide you on what is needed and can suggest content structure for each page.' },
  { q:'Can I update my website myself after launch?',   a:'Yes. If you would like a CMS, we can build it in so you can update pages, blog posts and images without any coding.' },
  { q:'What if I need changes after launch?',           a:'Ongoing maintenance packages are available. Or you can approach us for one-off changes — we are always just a message away.' },
];

export default function Process() {
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
              How We Work
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              A process built for<br/><em>zero surprises</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              From first call to launch day — here is exactly what working with us looks like, step by step.
            </motion.p>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section" style={{background:'#0d0e10',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)'}} />
          <div className="container">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:72,flexWrap:'wrap',gap:20}}>
              <div>
                <FadeIn><div className="slabel">The Process</div></FadeIn>
                <FadeIn delay={0.08}>
                  <h2 className="sec-title" style={{marginTop:8}}>
                    Five steps to your<br/><em>perfect website</em>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.1}>
                <Link to="/contact" className="btn btn-outline-white">Get Started <ArrowRight size={15}/></Link>
              </FadeIn>
            </div>
            <div className="process-timeline">
              {steps.map((s,i) => (
                <motion.div key={s.num} className="pstep"
                  initial={{opacity:0,x:-40}}
                  whileInView={{opacity:1,x:0}}
                  viewport={{once:true,margin:'-40px'}}
                  transition={{duration:.6,delay:i*.08,ease:[.22,1,.36,1]}}>
                  <div className="pstep__left">
                    <div className="pstep__num-wrap" style={{borderColor:`${s.color}44`}}>
                      <span className="pstep__num" style={{color:s.color}}>{s.num}</span>
                    </div>
                    {i < steps.length-1 && <div className="pstep__line" />}
                  </div>
                  <div className="pstep__body">
                    <h3 className="pstep__title">{s.title}</h3>
                    <p className="pstep__desc">{s.desc}</p>
                    <div className="pstep__chips">
                      {s.highlights.map(h => (
                        <span key={h} className="pstep__chip"
                          style={{borderColor:`${s.color}33`,color:s.color,background:`${s.color}10`}}>
                          ✓ {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section faq-wrap">
          <div className="container">
            <div style={{textAlign:'center',marginBottom:56}}>
              <FadeIn><div className="slabel" style={{justifyContent:'center',margin:'0 auto 16px'}}>FAQs</div></FadeIn>
              <FadeIn delay={0.08}>
                <h2 className="sec-title">Common <em>questions</em></h2>
              </FadeIn>
            </div>
            <div className="faq-grid">
              {faqs.map((f,i) => (
                <motion.div key={i} className="faq-card"
                  initial={{opacity:0,y:30}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true}}
                  transition={{duration:.5,delay:i*.08}}>
                  <div className="faq-q">{f.q}</div>
                  <div className="faq-a">{f.a}</div>
                </motion.div>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <div style={{textAlign:'center',marginTop:48}}>
                <Link to="/contact" className="btn btn-lime">Still have questions? Talk to us <ArrowRight size={15}/></Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-strip">
          <div className="cta-strip__orb" />
          <div className="container cta-strip__inner">
            <FadeIn>
              <h2 className="cta-strip__title">Ready to get<br/><em>started?</em></h2>
              <p className="cta-strip__sub">Book your free 30-minute discovery call today. No pressure, no obligations.</p>
              <div className="cta-strip__btns">
                <Link to="/contact" className="btn btn-lime">Book Free Call <ArrowRight size={16}/></Link>
                <Link to="/work" className="btn btn-outline-white">See Our Work</Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}