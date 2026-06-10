import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, AlertCircle, CreditCard, Copyright, UserX, Scale, Globe, RefreshCw, Mail } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useCursorFX } from '../hooks/useCursorFX';
import './pages.css';
import './Legal.css';

const sections = [
  {
    id: 'acceptance',
    icon: <FileText size={20}/>,
    color: '#7c5cfc',
    title: 'Acceptance of Terms',
    content: [
      { type:'p', text:'By accessing and using the BusinesIT website (businesit.in) or engaging our services, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or services.' },
      { type:'p', text:'These terms apply to all visitors, clients, and others who access or use our website. We reserve the right to update these terms at any time, and continued use of our services following any changes constitutes acceptance of those changes.' },
      { type:'highlight', text:'These Terms of Use were last updated in May 2025. Please review them periodically to stay informed of any changes.' },
    ],
  },
  {
    id: 'services',
    icon: <Globe size={20}/>,
    color: '#0ea5e9',
    title: 'Our Services',
    content: [
      { type:'p', text:'BusinesIT provides professional web design and development services including, but not limited to:' },
      { type:'list', items:[
        'Business website design and development.',
        'E-commerce store design and development.',
        'Real estate and finance website design.',
        'Landing page design and development.',
        'Website redesign and optimisation.',
        'Related digital consulting services.',
      ]},
      { type:'p', text:'All services are subject to a separate service agreement or proposal provided to you before work begins. The terms of that agreement take precedence over these general Terms of Use in matters related to your specific project.' },
    ],
  },
  {
    id: 'payment',
    icon: <CreditCard size={20}/>,
    color: '#10b981',
    title: 'Payment Terms',
    content: [
      { type:'p', text:'The following payment terms apply to all BusinesIT projects unless otherwise agreed in writing:' },
      { type:'list', items:[
        '50% advance payment is required before any design or development work begins.',
        'The remaining 50% balance is due upon project completion and before the final website is handed over or made live.',
        'All payments are non-refundable once work has commenced on a project phase.',
        'Invoices not paid within 7 days of the due date may result in work being paused.',
        'We accept payment via bank transfer, UPI, and other methods as agreed.',
      ]},
      { type:'p', text:'For larger projects, milestone-based payment schedules may be agreed upon in the project proposal. All pricing is in Indian Rupees (INR) unless explicitly stated otherwise.' },
    ],
  },
  {
    id: 'intellectual-property',
    icon: <Copyright size={20}/>,
    color: '#f59e0b',
    title: 'Intellectual Property',
    content: [
      { type:'p', text:'Upon receipt of full and final payment, ownership of the custom website design and code created specifically for your project transfers to you, the client. However, the following remain the exclusive property of BusinesIT:' },
      { type:'list', items:[
        'Our internal development frameworks, templates, and code libraries used as a base for projects.',
        'Our design systems, UI component libraries, and proprietary tools.',
        'Pre-existing intellectual property developed prior to your project.',
        'Any portfolio rights — we retain the right to display completed work in our portfolio and marketing materials unless otherwise agreed in writing.',
      ]},
      { type:'p', text:'You warrant that any content, images, logos, or materials you provide to us are either owned by you or that you have the legal right to use them. You indemnify BusinesIT against any claims arising from the use of such materials.' },
    ],
  },
  {
    id: 'client-responsibilities',
    icon: <UserX size={20}/>,
    color: '#ec4899',
    title: 'Client Responsibilities',
    content: [
      { type:'p', text:'To enable us to deliver your project on time and to the agreed specification, you agree to:' },
      { type:'list', items:[
        'Provide all required content (text, images, logos, and other assets) in a timely manner as agreed.',
        'Respond to design feedback requests and approval requests within the agreed timeframe (typically 3 business days).',
        'Provide accurate and complete information about your business and project requirements.',
        'Designate a single point of contact for approvals and communications to avoid conflicting instructions.',
        'Notify us promptly of any changes to project requirements or scope.',
      ]},
      { type:'highlight', text:'Delays caused by late content delivery, delayed approvals, or significant scope changes may affect delivery timelines and may incur additional charges.' },
    ],
  },
  {
    id: 'revisions',
    icon: <RefreshCw size={20}/>,
    color: '#a855f7',
    title: 'Revisions and Changes',
    content: [
      { type:'p', text:'Our standard project packages include a defined number of revision rounds as specified in your project proposal. The following applies to all revision requests:' },
      { type:'list', items:[
        'Revisions within scope are changes to design elements, colours, fonts, layout, and copy within the originally agreed pages.',
        'Additional pages, new features, or significant structural changes constitute new scope and will be quoted separately.',
        'Revision requests must be submitted in writing (email or WhatsApp) as a consolidated list.',
        'Revisions requested after the project has been signed off and delivered are treated as new work and charged accordingly.',
      ]},
    ],
  },
  {
    id: 'limitation',
    icon: <AlertCircle size={20}/>,
    color: '#14b8a6',
    title: 'Limitation of Liability',
    content: [
      { type:'p', text:"BusinesIT's liability in connection with any project or service is limited as follows:" },
      { type:'list', items:[
        'Our total liability to you shall not exceed the total amount paid by you for the specific project giving rise to the claim.',
        'We are not liable for any indirect, incidental, consequential, or punitive damages including loss of revenue, loss of data, or loss of business.',
        'We are not responsible for third-party services, platforms, or tools (hosting providers, payment gateways, domain registrars) that we recommend or integrate.',
        'We are not liable for website downtime, security breaches, or performance issues caused by third-party hosting or infrastructure.',
      ]},
      { type:'p', text:'We make no guarantees regarding specific business outcomes, search engine rankings, conversion rates, or revenue generated as a result of our services. Results depend on many factors outside our control.' },
    ],
  },
  {
    id: 'governing-law',
    icon: <Scale size={20}/>,
    color: '#fb923c',
    title: 'Governing Law',
    content: [
      { type:'p', text:'These Terms of Use are governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms or our services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.' },
      { type:'p', text:'We encourage clients to raise any concerns or disputes directly with us first, as we are committed to resolving issues quickly and fairly through open communication.' },
      { type:'highlight', text:'Before initiating any formal legal proceedings, both parties agree to attempt to resolve the dispute through good-faith negotiation for a period of 30 days.' },
    ],
  },
];

export default function TermsOfUse() {
  const fxRef = useCursorFX();
  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true"/>
      <div className="dark-page">

        {/* HERO */}
        <section className="page-hero">
          <div className="page-hero__noise"/><div className="page-hero__grid"/>
          <div className="page-hero__orb" style={{background:'radial-gradient(circle,rgba(200,241,53,.1) 0%,transparent 65%)'}}/>
          <div className="page-hero__orb2"/>
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              Legal
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Terms of <em>Use</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              Please read these terms carefully before using our website or engaging our services.
            </motion.p>
            <motion.div className="legal-meta"
              initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.5,delay:.5}}>
              <span className="legal-meta__item">Last updated: May 2025</span>
              <span className="legal-meta__sep"/>
              <span className="legal-meta__item">BusinesIT Studio, Mumbai</span>
            </motion.div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="section legal-wrap" style={{background:'#0a0a0b',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(200,241,53,.2),transparent)'}}/>
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
                  <div className="legal-toc__title">Need Clarification?</div>
                  <p style={{fontSize:13,color:'rgba(255,255,255,.38)',lineHeight:1.7,margin:'8px 0 16px'}}>
                    If anything in these terms is unclear, please contact us before using our services.
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
                  <div className="legal-intro__icon"><Scale size={22} color="#c8f135"/></div>
                  <div>
                    <div className="legal-intro__title">Agreement between you and BusinesIT</div>
                    <p className="legal-intro__text">
                      These Terms of Use constitute a legally binding agreement between you and BusinesIT ("BusinesIT", "we", "us", "our"), a web design studio based in Mumbai, Maharashtra, India. These terms govern your use of our website and the services we provide. Please read them carefully.
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
                  <div className="legal-contact-box__title">Questions About These Terms?</div>
                  <p className="legal-contact-box__sub">
                    If you have any questions or concerns about these Terms of Use, please contact us before using our services.
                  </p>
                  <div className="legal-contact-box__details">
                    <div className="legal-contact-item"><Mail size={15} color="#c8f135"/><span>service@businesit.in</span></div>
                    <div className="legal-contact-item"><Globe size={15} color="#c8f135"/><span>businesit.in</span></div>
                  </div>
                  <Link to="/contact" className="btn btn-lime" style={{marginTop:20}}>
                    Get In Touch <ArrowRight size={15}/>
                  </Link>
                </motion.div>

                <div className="legal-related">
                  <Link to="/privacy" className="legal-related__link"><span>Privacy Policy</span><ArrowRight size={14}/></Link>
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