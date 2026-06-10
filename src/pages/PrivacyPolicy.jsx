import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, Lock, Database, Mail, Trash2, RefreshCw, Phone } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';
import './Legal.css';

const sections = [
  {
    id: 'information-we-collect',
    icon: <Database size={20}/>,
    color: '#7c5cfc',
    title: 'Information We Collect',
    content: [
      { type:'p', text:'When you visit our website or contact us, we may collect the following types of information:' },
      { type:'list', items:[
        'Personal identification information — your name, email address, phone number, and WhatsApp number when you fill out our contact form or request a consultation.',
        'Business information — details about your business, industry, project requirements, and goals that you share with us voluntarily.',
        'Usage data — information about how you interact with our website, including pages visited, time spent, and actions taken (collected via analytics tools).',
        'Technical data — your IP address, browser type, device information, and operating system.',
        'Communication data — any messages, emails, or other correspondence you send to us.',
      ]},
      { type:'p', text:'We only collect information that is necessary to provide our services and improve your experience with BusinesIT.' },
    ],
  },
  {
    id: 'how-we-use',
    icon: <Eye size={20}/>,
    color: '#0ea5e9',
    title: 'How We Use Your Information',
    content: [
      { type:'p', text:'The information we collect is used exclusively for legitimate business purposes:' },
      { type:'list', items:[
        'To respond to your enquiries and provide you with information about our services.',
        'To prepare and deliver project proposals, quotes, and consultations.',
        'To communicate with you throughout your project — including updates, feedback requests, and delivery notifications.',
        'To send you occasional updates about our services, new offerings, or relevant industry insights (you may opt out at any time).',
        'To improve our website and services based on usage patterns and feedback.',
        'To comply with legal obligations and protect our legitimate business interests.',
      ]},
      { type:'highlight', text:'We do not sell, rent, or trade your personal information to third parties. Your data is never used for advertising purposes or shared with marketing companies.' },
    ],
  },
  {
    id: 'data-protection',
    icon: <Lock size={20}/>,
    color: '#10b981',
    title: 'How We Protect Your Data',
    content: [
      { type:'p', text:'We take the security of your personal information seriously and implement appropriate technical and organisational measures to protect it:' },
      { type:'list', items:[
        'All data transmitted through our website is encrypted using SSL/TLS technology.',
        'Access to personal data is restricted to authorised team members who need it to perform their job functions.',
        'We regularly review and update our security practices to address emerging threats.',
        'We use reputable, secure third-party services for email, analytics, and communication.',
      ]},
      { type:'p', text:'While we implement strong security measures, no method of transmission over the internet is 100% secure. We encourage you to contact us immediately if you believe your data has been compromised.' },
    ],
  },
  {
    id: 'cookies',
    icon: <RefreshCw size={20}/>,
    color: '#f59e0b',
    title: 'Cookies and Tracking',
    content: [
      { type:'p', text:'Our website uses cookies and similar tracking technologies to enhance your browsing experience and gather analytical data.' },
      { type:'list', items:[
        'Essential cookies — necessary for the website to function properly (cannot be disabled).',
        'Analytics cookies — help us understand how visitors use our site so we can improve it (Google Analytics).',
        'Preference cookies — remember your settings and preferences for future visits.',
      ]},
      { type:'p', text:'You can control cookie settings through your browser preferences. Disabling certain cookies may affect the functionality of our website.' },
    ],
  },
  {
    id: 'third-parties',
    icon: <Shield size={20}/>,
    color: '#ec4899',
    title: 'Third-Party Services',
    content: [
      { type:'p', text:'We use a limited number of trusted third-party services to operate our business. These may have access to certain data as necessary to perform their functions:' },
      { type:'list', items:[
        'Google Analytics — for website usage analytics (data is anonymised).',
        'Email service providers — to send and receive business communications.',
        'WhatsApp Business — for client communication when requested.',
        'Cloud storage services — to securely store project files and client assets.',
      ]},
      { type:'p', text:'All third-party services we use are contractually obligated to protect your data and may only use it for the specific purposes we have authorised.' },
    ],
  },
  {
    id: 'your-rights',
    icon: <Mail size={20}/>,
    color: '#a855f7',
    title: 'Your Rights',
    content: [
      { type:'p', text:'You have the following rights regarding your personal data:' },
      { type:'list', items:[
        'Right to access — you may request a copy of the personal information we hold about you at any time.',
        'Right to correction — you may ask us to correct any inaccurate or incomplete information.',
        'Right to deletion — you may request that we delete your personal data, subject to any legal obligations we may have to retain it.',
        'Right to opt out — you may unsubscribe from any marketing communications at any time.',
        'Right to data portability — you may request your data in a portable, machine-readable format.',
      ]},
      { type:'p', text:'To exercise any of these rights, please contact us at service@businesit.in. We will respond to all requests within 30 days.' },
    ],
  },
  {
    id: 'data-retention',
    icon: <Trash2 size={20}/>,
    color: '#14b8a6',
    title: 'Data Retention',
    content: [
      { type:'p', text:'We retain personal data only for as long as is necessary for the purposes it was collected:' },
      { type:'list', items:[
        'Enquiry and contact form data — retained for 2 years after last contact.',
        'Client project data — retained for 5 years after project completion for legal and warranty purposes.',
        'Analytics data — retained in anonymised form for up to 26 months.',
        'Financial records — retained for 7 years as required by Indian tax law.',
      ]},
      { type:'p', text:'When data is no longer required, it is securely deleted or anonymised so it can no longer be linked to you.' },
    ],
  },
];

export default function PrivacyPolicy() {
  const fxRef = useCursorFX();
  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true"/>
      <div className="dark-page">

        {/* HERO */}
        <section className="page-hero">
          <div className="page-hero__noise"/><div className="page-hero__grid"/>
          <div className="page-hero__orb" style={{background:'radial-gradient(circle,rgba(124,92,252,.14) 0%,transparent 65%)'}}/>
          <div className="page-hero__orb2"/>
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              Legal
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Privacy <em>Policy</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              We value your privacy. This policy explains what data we collect, how we use it, and your rights.
            </motion.p>
            <motion.div className="legal-meta"
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.5}}>
              <span className="legal-meta__item">Last updated: May 2025</span>
              <span className="legal-meta__sep"/>
              <span className="legal-meta__item">Applies to: businesit.in</span>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="section legal-wrap" style={{background:'#0a0a0b',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)'}}/>
          <div className="container">
            <div className="legal-layout">

              {/* Sidebar TOC */}
              <aside className="legal-toc">
                <div className="legal-toc__card">
                  <div className="legal-toc__title">Contents</div>
                  <nav className="legal-toc__nav">
                    {sections.map((s,i) => (
                      <a key={s.id} href={`#${s.id}`} className="legal-toc__link">
                        <span className="legal-toc__num" style={{color:s.color}}>{String(i+1).padStart(2,'0')}</span>
                        {s.title}
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="legal-toc__card">
                  <div className="legal-toc__title">Questions?</div>
                  <p style={{fontSize:13,color:'rgba(255,255,255,.38)',lineHeight:1.7,margin:'8px 0 16px'}}>
                    If you have any questions about this Privacy Policy, contact us directly.
                  </p>
                  <a href="mailto:service@businesit.in" className="btn btn-lime"
                    style={{fontSize:12,padding:'9px 18px',width:'100%',justifyContent:'center',display:'inline-flex'}}>
                    service@businesit.in
                  </a>
                </div>
              </aside>

              {/* Main content */}
              <div className="legal-content">
                <motion.div className="legal-intro"
                  initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.4}}>
                  <div className="legal-intro__icon"><Shield size={22} color="#7c5cfc"/></div>
                  <div>
                    <div className="legal-intro__title">Our commitment to your privacy</div>
                    <p className="legal-intro__text">
                      BusinesIT ("we", "us", "our") is a web design studio based in Mumbai, India. This Privacy Policy describes how we collect, use, protect, and share information when you visit our website or use our services. By using our website or engaging with our services, you agree to the practices described in this policy.
                    </p>
                  </div>
                </motion.div>

                {sections.map((sec, i) => (
                  <motion.div key={sec.id} id={sec.id} className="legal-section"
                    initial={{opacity:0,y:28}}
                    whileInView={{opacity:1,y:0}}
                    viewport={{once:true,margin:'-60px'}}
                    transition={{duration:.55}}>
                    <div className="legal-section__head">
                      <div className="legal-section__icon" style={{background:`${sec.color}18`,color:sec.color}}>
                        {sec.icon}
                      </div>
                      <div>
                        <div className="legal-section__num" style={{color:sec.color}}>{String(i+1).padStart(2,'0')}</div>
                        <h2 className="legal-section__title">{sec.title}</h2>
                      </div>
                    </div>
                    <div className="legal-section__body" style={{borderColor:`${sec.color}22`}}>
                      {sec.content.map((block,bi) => {
                        if (block.type==='p') return <p key={bi} className="legal-p">{block.text}</p>;
                        if (block.type==='list') return (
                          <ul key={bi} className="legal-list">
                            {block.items.map((item,ii) => (
                              <li key={ii} className="legal-list__item">
                                <span className="legal-list__dot" style={{background:sec.color}}/>
                                {item}
                              </li>
                            ))}
                          </ul>
                        );
                        if (block.type==='highlight') return (
                          <div key={bi} className="legal-highlight" style={{borderColor:sec.color,background:`${sec.color}0d`}}>
                            <span className="legal-highlight__icon" style={{color:sec.color}}>✦</span>
                            {block.text}
                          </div>
                        );
                        return null;
                      })}
                    </div>
                  </motion.div>
                ))}

                <motion.div className="legal-contact-box"
                  initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{duration:.6}}>
                  <div className="legal-contact-box__title">Contact Us About This Policy</div>
                  <p className="legal-contact-box__sub">
                    If you have questions, concerns, or requests regarding this Privacy Policy or your personal data, please reach out.
                  </p>
                  <div className="legal-contact-box__details">
                    <div className="legal-contact-item"><Mail size={15} color="#7c5cfc"/><span>service@businesit.in</span></div>
                    <div className="legal-contact-item"><Phone size={15} color="#7c5cfc"/><span>+91 9028 747098</span></div>
                  </div>
                  <Link to="/contact" className="btn btn-lime" style={{marginTop:20}}>
                    Send Us a Message <ArrowRight size={15}/>
                  </Link>
                </motion.div>

                <div className="legal-related">
                  <Link to="/terms" className="legal-related__link"><span>Terms of Use</span><ArrowRight size={14}/></Link>
                  <Link to="/contact" className="legal-related__link"><span>Contact Us</span><ArrowRight size={14}/></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}