
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import FadeIn from '../components/FadeIn';
import { useCursorFX } from '../hooks/useCursorFX';
import { posts } from '../data/blogData';
import './pages.css';

export default function Blog() {
  const fxRef    = useCursorFX();
  const featured = posts.find(p => p.featured);
  const rest     = posts.filter(p => !p.featured);

  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true"/>
      <div className="dark-page">

        {/* ══ HERO ══ */}
        <section className="page-hero">
          <div className="page-hero__noise"/><div className="page-hero__grid"/>
          <div className="page-hero__orb" style={{background:'radial-gradient(circle,rgba(124,92,252,.14) 0%,transparent 65%)'}}/>
          <div className="page-hero__orb2"/>
          <div className="container page-hero__inner">
            <motion.div className="page-hero__eyebrow"
              initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{duration:.5,delay:.1}}>
              Our Blog
            </motion.div>
            <motion.h1 className="page-hero__title"
              initial={{opacity:0,y:32}} animate={{opacity:1,y:0}} transition={{duration:.7,delay:.2,ease:[.22,1,.36,1]}}>
              Insights for<br/><em>growing businesses</em>
            </motion.h1>
            <motion.p className="page-hero__sub"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.35}}>
              Practical tips, industry insights and web design advice — written for business owners, not developers.
            </motion.p>
          </div>
        </section>

        {/* ══ POSTS ══ */}
        <section className="section" style={{background:'#0a0a0b',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:0,left:0,right:0,height:1,background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)'}}/>
          <div className="container">

            {/* Featured post */}
            {featured && (
              <FadeIn>
                <Link to={`/blog/${featured.slug}`} className="blog-featured" style={{textDecoration:'none'}}>
                  <div className="blog-featured__thumb">
                    <div className="blog-featured__dots"/>
                    <div className="blog-featured__glow"/>
                    <span className="bcard__cat" style={{background:`${featured.catColor}22`,color:featured.catColor,position:'relative',zIndex:1}}>
                      {featured.category}
                    </span>
                  </div>
                  <div className="blog-featured__body">
                    <div className="blog-featured__badge">Featured Article</div>
                    <h2 className="blog-featured__title">{featured.title}</h2>
                    <p className="blog-featured__excerpt">{featured.excerpt}</p>
                    <div className="blog-featured__meta">
                      <Clock size={13}/><span>{featured.readTime}</span>
                      <span className="blog-meta-dot"/>
                      <span>{featured.date}</span>
                    </div>
                    <div style={{marginTop:20}}>
                      <span className="btn btn-lime" style={{display:'inline-flex',pointerEvents:'none'}}>
                        Read Article <ArrowRight size={14}/>
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            )}

            {/* Cards grid */}
            <div className="blog-grid">
              {rest.map((p, i) => (
                <motion.div key={p.slug}
                  initial={{opacity:0,y:40}}
                  whileInView={{opacity:1,y:0}}
                  viewport={{once:true,margin:'-50px'}}
                  transition={{duration:.55,delay:(i%3)*.09,ease:[.22,1,.36,1]}}>
                  <Link to={`/blog/${p.slug}`} className="bcard" style={{textDecoration:'none',display:'flex',flexDirection:'column'}}>
                    <div className="bcard__thumb" style={{position:'relative'}}>
                      <div style={{position:'absolute',inset:0,background:`linear-gradient(135deg,${p.thumbFrom},${p.thumbTo})`}}/>
                      <div className="bcard__thumb-dots"/>
                      <div className="bcard__thumb-glow" style={{'--gc':p.glowColor}}/>
                      <span className="bcard__cat" style={{background:`${p.catColor}22`,color:p.catColor,position:'relative',zIndex:1}}>
                        {p.category}
                      </span>
                    </div>
                    <div className="bcard__body">
                      <h3 className="bcard__title">{p.title}</h3>
                      <p className="bcard__excerpt">{p.excerpt}</p>
                      <div className="bcard__meta">
                        <Clock size={12}/><span>{p.readTime}</span>
                        <span className="blog-meta-dot"/>
                        <span>{p.date}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="cta-strip">
          <div className="cta-strip__orb"/>
          <div className="container cta-strip__inner">
            <FadeIn>
              <h2 className="cta-strip__title">Ready to build your<br/><em>dream website?</em></h2>
              <p className="cta-strip__sub">Join growing businesses across India who trust BusinesIT to build their online presence.</p>
              <div className="cta-strip__btns">
                <Link to="/contact" className="btn btn-lime">Get Free Consultation <ArrowRight size={16}/></Link>
                <Link to="/work" className="btn btn-outline-white">See Our Work</Link>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </PageTransition>
  );
}