
import { useForm } from '@formspree/react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';

// ── Formspree Config ─────────────────────────────────────────────
const FORMSPREE_ID = 'mqeolbak';
// ────────────────────────────────────────────────────────────────

const contactItems = [
  { icon:<Mail size={18}/>,   label:'Email',     value:'service@businesit.in',       href:'mailto:service@businesit.in' },
  { icon:<Phone size={18}/>,  label:'WhatsApp',  value:'+91 90287 47098',            href:'https://wa.me/919028747098' },
  { icon:<MapPin size={18}/>, label:'Location',  value:'Mumbai, Maharashtra, India', href:'#' },
];

const serviceOptions = [
  'Business Website','E-Commerce Store','Real Estate Website',
  'Finance Website','Landing Page','Website Redesign','Other',
];

export default function Contact() {
  const fxRef = useCursorFX();
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true" />
      <div className="dark-page">

        {/* ── HERO ── */}
        <section className="page-hero">
          <div className="page-hero__noise" /><div className="page-hero__grid" />
          <div className="page-hero__orb" style={{background:'radial-gradient(circle,rgba(200,241,53,.1) 0%,transparent 65%)'}} />
          <div className="page-hero__orb2" />
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              Get In Touch
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Let us build something<br/><em>great together</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              Fill in the form and we will get back to you within 24 hours with a free consultation.
            </motion.p>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <section className="section" style={{background:'#0a0a0b',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(200,241,53,.2),transparent)'}} />
          <div className="container">
            <div className="contact-layout">

              {/* LEFT INFO */}
              <FadeIn>
                <div>
                  <div className="slabel" style={{marginBottom:24}}>Contact Info</div>
                  {contactItems.map(c => (
                    <a key={c.label} href={c.href} className="cinfo-item">
                      <div className="cinfo-icon">{c.icon}</div>
                      <div>
                        <div className="cinfo-label">{c.label}</div>
                        <div className="cinfo-value">{c.value}</div>
                      </div>
                    </a>
                  ))}
                  <div className="csteps-box">
                    <div className="csteps-box__title">What happens next?</div>
                    {[
                      'We will review your request',
                      'Schedule a free 30-min call',
                      'Send a tailored proposal',
                    ].map((text,i) => (
                      <div key={i} className="cstep-row">
                        <span className="cstep-num">{i+1}</span>
                        {text}
                      </div>
                    ))}
                  </div>
                  <div className="ctest-box">
                    <div className="ctest-stars">★★★★★</div>
                    <p className="ctest-text">"From first call to launch in under 2 weeks. The team was fast, professional and the result was exactly what we wanted."</p>
                    <div className="ctest-author">— Stanford Capital Team</div>
                  </div>
                </div>
              </FadeIn>

              {/* RIGHT FORM */}
              <FadeIn delay={0.15} direction="left">
                <div className="cform-wrap">
                  {state.succeeded ? (
                    <motion.div className="cform-success"
                      initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} transition={{duration:.4}}>
                      <div className="cform-success__icon">
                        <CheckCircle size={32}/>
                      </div>
                      <h3>Message Sent!</h3>
                      <p>Thanks for reaching out. We will reply within 24 hours.</p>
                      <Link to="/" className="btn btn-lime" style={{marginTop:8}}>
                        Back to Home <ArrowRight size={15}/>
                      </Link>
                    </motion.div>
                  ) : (
                    <form className="cform" onSubmit={handleSubmit}>
                      <div style={{marginBottom:8}}>
                        <div className="slabel" style={{marginBottom:4}}>Send us a message</div>
                        <p style={{fontSize:13,color:'rgba(255,255,255,.3)',lineHeight:1.6}}>
                          Fill in the details below and we will get back to you within 24 hours.
                        </p>
                      </div>

                      <div className="cform-row">
                        <div className="cform-group">
                          <label className="cform-label">Your Name *</label>
                          <input className="cform-input" name="name"
                            placeholder="Rahul Mehta" required />
                        </div>
                        <div className="cform-group">
                          <label className="cform-label">Email Address *</label>
                          <input className="cform-input" type="email" name="email"
                            placeholder="rahul@example.com" required />
                        </div>
                      </div>

                      <div className="cform-row">
                        <div className="cform-group">
                          <label className="cform-label">WhatsApp / Phone</label>
                          <input className="cform-input" name="phone"
                            placeholder="+91 9XXXXXXX" />
                        </div>
                        <div className="cform-group">
                          <label className="cform-label">Service Needed *</label>
                          <select className="cform-input cform-select" name="service" required defaultValue="">
                            <option value="" disabled>Select a service...</option>
                            {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="cform-group">
                        <label className="cform-label">Tell us about your project *</label>
                        <textarea className="cform-input cform-textarea" name="message"
                          placeholder="Tell us about your business, what you need and your timeline..." required />
                      </div>

                      {/* Error message */}
                      {state.errors && state.errors.length > 0 && (
                        <p style={{
                          color: '#ff6b6b',
                          fontSize: 13,
                          marginBottom: 12,
                          padding: '10px 14px',
                          background: 'rgba(255,107,107,.08)',
                          borderRadius: 8,
                          border: '1px solid rgba(255,107,107,.2)',
                        }}>
                          Something went wrong. Please try again or WhatsApp us directly.
                        </p>
                      )}

                      <button type="submit" className="cform-btn" disabled={state.submitting}>
                        {state.submitting
                          ? <span style={{opacity:.7}}>Sending…</span>
                          : <><Send size={15}/> Send Message</>
                        }
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-strip">
          <div className="cta-strip__orb" />
          <div className="container cta-strip__inner">
            <FadeIn>
              <h2 className="cta-strip__title">Prefer to talk<br/><em>directly?</em></h2>
              <p className="cta-strip__sub">Message us on WhatsApp for a quicker response. We usually reply within an hour.</p>
              <div className="cta-strip__btns">
                <a href="https://wa.me/919028747098" target="_blank" rel="noopener noreferrer" className="btn btn-lime">
                  Chat on WhatsApp <ArrowRight size={16}/>
                </a>
                <Link to="/work" className="btn btn-outline-white">See Our Work</Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}