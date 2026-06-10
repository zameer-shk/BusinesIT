
import { useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, ShoppingBag, TrendingUp, ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import './Home.css';

/* ─────────────────────────────────────────
   CURSOR FLAME TRAIL
   On mousemove  → spawn flame embers
   On click      → burst of coloured sparks
───────────────────────────────────────── */
const FLAME_COLORS = [
  '#c8f135','#a8e820','#f59e0b','#fb923c',
  '#fde047','#7c5cfc','#a78bfa','#ec4899',
  '#38bdf8','#34d399','#e879f9','#60a5fa',
];

function useCursorFX() {
  const layerRef = useRef(null);
  const lastPos   = useRef({ x: -999, y: -999 });
  const frameRef  = useRef(null);
  const queue     = useRef([]);

  /* spawn one ember into the DOM */
  const spawnEmber = useCallback((x, y, isBurst) => {
    const layer = layerRef.current;
    if (!layer) return;

    const el   = document.createElement('div');
    const size = isBurst
      ? 5  + Math.random() * 14
      : 3  + Math.random() * 9;

    /* flame moves mostly upward, slight random side */
    const angle  = isBurst
      ? Math.random() * Math.PI * 2
      : -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
    const dist   = isBurst
      ? 40 + Math.random() * 100
      : 20 + Math.random() * 55;
    const tx     = Math.cos(angle) * dist;
    const ty     = Math.sin(angle) * dist;
    const color  = FLAME_COLORS[Math.floor(Math.random() * FLAME_COLORS.length)];
    const dur    = (isBurst ? 0.55 : 0.45) + Math.random() * 0.35;

    el.className = isBurst ? 'fx-spark' : 'fx-ember';
    el.style.cssText = `
      left:${x}px;
      top:${y}px;
      width:${size}px;
      height:${size * (isBurst ? 1 : 1.6)}px;
      background:${color};
      box-shadow:0 0 ${size * 2}px ${color}88;
      --tx:${tx}px;
      --ty:${ty}px;
      animation-duration:${dur}s;
    `;
    layer.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, []);

  /* rAF loop — drains the queue */
  const loop = useCallback(() => {
    queue.current.forEach(({ x, y, burst }) => spawnEmber(x, y, burst));
    queue.current = [];
    frameRef.current = requestAnimationFrame(loop);
  }, [spawnEmber]);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);

    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const dist = Math.hypot(dx, dy);
      /* throttle: emit only when moved ≥ 6 px */
      if (dist < 6) return;
      lastPos.current = { x: e.clientX, y: e.clientY };
      /* more embers the faster you move */
      const count = Math.min(3, 1 + Math.floor(dist / 20));
      for (let i = 0; i < count; i++) {
        /* spread embers along the motion path */
        const t = count === 1 ? 0.5 : i / (count - 1);
        queue.current.push({
          x: e.clientX - dx * t + (Math.random() - 0.5) * 6,
          y: e.clientY - dy * t + (Math.random() - 0.5) * 6,
          burst: false,
        });
      }
    };

    const onClick = (e) => {
      const n = 18 + Math.floor(Math.random() * 10);
      for (let i = 0; i < n; i++) {
        queue.current.push({ x: e.clientX, y: e.clientY, burst: true });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(frameRef.current);
    };
  }, [loop]);

  return layerRef;
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const clients = [
  { name: 'Arab Jewels',        niche: 'Jewellery'  },
  { name: 'Aswan Real Estate',  niche: 'Real Estate'},
  { name: 'Stanford Capital',   niche: 'Finance'    },
  { name: 'Actal Digital',      niche: 'Agency'     },
];

const services = [
  { num:'01', icon:<Globe size={22}/>,       color:'#7c5cfc', bg:'rgba(124,92,252,.12)', title:'Business Website',      desc:'Multi-page professional sites that build trust and drive real business enquiries for brands and agencies.' },
  { num:'02', icon:<ShoppingBag size={22}/>, color:'#0ea5e9', bg:'rgba(14,165,233,.12)', title:'E-Commerce Store',       desc:'Full online stores with product pages, cart, and payment gateway — built to sell from day one.' },
  { num:'03', icon:<TrendingUp size={22}/>,  color:'#c8f135', bg:'rgba(200,241,53,.1)',  title:'Real Estate & Finance',  desc:'Trust-building sites for property agencies and investment firms — clean, credible and conversion-ready.' },
];

const works = [
  { name:'Arab Jewels',       cat:'Jewellery E-commerce',  desc:'Premium jewellery store with elegant product displays and seamless shopping.',          url:'http://arabjewels.in/',         from:'#1c1917', to:'#44403c' },
  { name:'Aswan Real Estate', cat:'Real Estate Agency',    desc:'Property showcase site with listing pages, maps and lead capture forms.',               url:'https://aswanrealestate.com/',  from:'#0c4a6e', to:'#0369a1' },
  { name:'Stanford Capital',  cat:'Investment & Finance',  desc:'Trust-inspiring finance firm site with services, team and contact pages.',              url:'https://stanfordcapital.in/',   from:'#1e3a5f', to:'#1e40af' },
  { name:'Actal Digital',     cat:'Digital Agency',        desc:'Bold agency website with case studies, services breakdown and brand identity.',         url:'https://actaldigital.com/',     from:'#3b0764', to:'#6d28d9' },
];

/* ─────────────────────────────────────────
   ANIMATED HEADLINE — char-by-char 3-D flip
───────────────────────────────────────── */
const charVariants = {
  hidden:  { opacity:0, y:40, rotateX:-30 },
  visible: (i) => ({
    opacity:1, y:0, rotateX:0,
    transition:{ duration:0.55, delay: i * 0.045, ease:[0.22,1,0.36,1] },
  }),
};

function SplitTitle({ text, className, baseDelay = 0 }) {
  return (
    <span className={className} style={{ display:'block', overflow:'hidden', perspective:800 }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={baseDelay + i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          style={{ display:'inline-block', whiteSpace: char===' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function Home() {
  const fxLayerRef = useCursorFX();

  return (
    <PageTransition>

      {/* FX layer — fixed, pointer-events:none so it never blocks clicks */}
      <div ref={fxLayerRef} className="fx-layer" aria-hidden="true" />

      <div className="page-wrapper" style={{ background:'#0a0a0b' }}>

        {/* ══ HERO ══ */}
        <section className="hero">
          <div className="hero__noise" />
          <div className="hero__grid"  />
          <div className="hero__orb1"  />
          <div className="hero__orb2"  />

          <div className="container hero__inner">
            {/* LEFT */}
            <div className="hero__left">
              <motion.div
                className="hero__eyebrow"
                initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:0.6, delay:0.1 }}
              >
                Premium Web Design Studio
              </motion.div>

              <motion.h1
                className="hero__title"
                initial={{ opacity:0 }} animate={{ opacity:1 }}
                transition={{ duration:0.01, delay:0.15 }}
              >
                <SplitTitle text="We Build"     className="hero__title-line"              baseDelay={0}  />
                <SplitTitle text="Websites That" className="hero__title-line"             baseDelay={8}  />
                <span className="hero__title-line" style={{ overflow:'visible', display:'block' }}>
                  <span className="hero__title-accent">
                    <SplitTitle text="Grow Your" baseDelay={22} />
                  </span>
                </span>
                <SplitTitle text="Business." className="hero__title-line hero__title-accent" baseDelay={32} />
              </motion.h1>

              <motion.p
                className="hero__sub"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:0.9 }}
              >
                From jewellery brands to real estate firms and finance companies — we craft fast, beautiful and conversion-focused websites that make your business stand out.
              </motion.p>

              <motion.div
                className="hero__btns"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:1.05 }}
              >
                <Link to="/work"    className="btn btn-lime">View Our Work <ArrowRight size={15}/></Link>
                <Link to="/contact" className="btn btn-outline-white">Get Free Quote</Link>
              </motion.div>

              <motion.div
                className="hero__stats"
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, delay:1.18 }}
              >
                {[
                  { num:'50+',    label:'Websites Delivered' },
                  { num:'5★',     label:'Avg. Rating'        },
                  { num:'Days', label:'Avg. Delivery'      },
                  { num:'100%',   label:'Satisfaction'       },
                ].map(s => (
                  <div className="hero__stat" key={s.label}>
                    <div className="hero__stat-num">{s.num}</div>
                    <div className="hero__stat-label">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — ghost big text */}
            <motion.div
              className="hero__right"
              initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }}
              transition={{ duration:1, delay:0.4, ease:[0.22,1,0.36,1] }}
            >
              <div className="hero__big-text" aria-hidden="true">
                <span className="hero__big-text-word">PIXEL</span>
                <span className="hero__big-text-word">CRAFT</span>
                <span className="hero__big-text-word hero__big-text-sub">STUDIO</span>
              </div>

              <motion.div
                className="hero__badge-float hero__badge1"
                initial={{ opacity:0, scale:0.8, x:20 }}
                animate={{ opacity:1, scale:1, x:0 }}
                transition={{ delay:1.3, duration:0.5 }}
              >
                <span className="hero__badge-dot" style={{ background:'#c8f135', boxShadow:'0 0 8px #c8f135' }} />
                <span>5★ Premium Quality</span>
              </motion.div>

              <motion.div
                className="hero__badge-float hero__badge2"
                initial={{ opacity:0, scale:0.8, x:-20 }}
                animate={{ opacity:1, scale:1, x:0 }}
                transition={{ delay:1.5, duration:0.5 }}
              >
                <span className="hero__badge-dot" style={{ background:'#7c5cfc', boxShadow:'0 0 8px #7c5cfc' }} />
                <span>Day Delivery</span>
              </motion.div>
            </motion.div>
          </div>

          <div className="hero__scroll-line">
            <div className="hero__scroll-dot" />
            <span className="hero__scroll-text">Scroll</span>
          </div>
        </section>

        {/* ══ MARQUEE ══ */}
        <div className="marquee-section">
          <div className="marquee-track">
            {[...clients,...clients,...clients,...clients].map((c,i) => (
              <span key={i} className="marquee-pill">
                <span className="marquee-pill-dot"/>
                <span className="marquee-pill-name">{c.name}</span>
                <span className="marquee-pill-cat">{c.niche}</span>
                {i % clients.length !== clients.length-1 && <span className="marquee-divider">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* ══ SERVICES ══ */}
        <section className="section home-services">
          <div className="container">
            <div className="home-services__head">
              <div>
                <FadeIn><div className="section-label">What We Do</div></FadeIn>
                <FadeIn delay={0.08}>
                  <h2 className="home-services__title">
                    Everything your business<br/>needs to <em>win online</em>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.1}>
                <Link to="/services" className="btn btn-outline-white">All Services <ArrowRight size={15}/></Link>
              </FadeIn>
            </div>

            <div className="home-services__grid">
              {services.map((s,i) => (
                <FadeIn key={s.title} delay={i*0.1}>
                  <div className="svc-card">
                    <div className="svc-card__num">{s.num}</div>
                    <div className="svc-card__icon" style={{ background:s.bg, color:s.color }}>{s.icon}</div>
                    <h3 className="svc-card__title">{s.title}</h3>
                    <p className="svc-card__desc">{s.desc}</p>
                    <Link to="/services" className="svc-card__link">Learn more <ArrowRight size={13}/></Link>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WORK ══ */}
        <section className="section home-work">
          <div className="container">
            <div className="home-work__head">
              <div>
                <FadeIn><div className="section-label">Our Portfolio</div></FadeIn>
                <FadeIn delay={0.08}>
                  <h2 className="home-work__title">
                    Work we&apos;re <em>proud of</em>
                  </h2>
                </FadeIn>
              </div>
              <FadeIn delay={0.1}>
                <Link to="/work" className="btn btn-outline-white">View All Projects <ArrowRight size={15}/></Link>
              </FadeIn>
            </div>

            <FadeIn>
              <div className="home-work__scroll">
                {works.map((w) => (
                  <div className="work-thumb" key={w.name}>
                    <div className="work-thumb__img" style={{ background:`linear-gradient(135deg,${w.from},${w.to})` }}>
                      <div className="work-thumb__overlay"/>
                      <div>
                        <div className="work-thumb__cat">{w.cat}</div>
                        <div className="work-thumb__title">{w.name}</div>
                      </div>
                    </div>
                    <div className="work-thumb__body">
                      <p className="work-thumb__desc">{w.desc}</p>
                      <a href={w.url} target="_blank" rel="noopener noreferrer" className="work-thumb__link">
                        Visit Site <ExternalLink size={12}/>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ ABOUT ══ */}
        <section className="section home-about">
          <div className="container home-about__inner">
            <FadeIn>
              <div>
                <div className="section-label">About BusinesIT</div>
                <h2 className="home-about__title">
                  We turn ideas into<br/><em>digital success stories</em>
                </h2>
                <p className="home-about__body">
                  Based in India, we specialise in building professional websites for businesses that are serious about their online presence. Clean code, great design, real results.
                </p>
                <div style={{ display:'flex', gap:12, marginTop:36, flexWrap:'wrap' }}>
                  <Link to="/process" className="btn btn-lime">How We Work <ArrowRight size={15}/></Link>
                  <Link to="/contact" className="btn btn-outline-white">Start a Project</Link>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.15} direction="left">
              <div className="stats-grid">
                {[
                  { num:'50+',  label:'Websites Delivered' },
                  { num:'5★',   label:'Average Rating'     },
                  { num:'4+',   label:'Industries Served'  },
                  { num:'100%', label:'Satisfaction Rate'  },
                ].map(s => (
                  <div className="stat-box" key={s.label}>
                    <div className="stat-box__num">{s.num}</div>
                    <div className="stat-box__label">{s.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="home-cta">
          <div className="home-cta__line" />
          <div className="home-cta__orb"  />
          <div className="container home-cta__inner">
            <FadeIn>
              <h2 className="home-cta__title">
                Ready to launch your<br/><em>dream website?</em>
              </h2>
              <p className="home-cta__sub">
                Join growing businesses across India who trust BusinesIT to build their online presence.
              </p>
              <div className="home-cta__btns">
                <Link to="/contact" className="btn btn-lime">Get Free Consultation <ArrowRight size={16}/></Link>
                <Link to="/work"    className="btn btn-outline-white">See Our Work</Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}