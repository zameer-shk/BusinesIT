import { useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { useCursorFX } from '../hooks/useCursorFX';
import { posts } from '../data/blogData';
import './pages.css';
import './BlogPost.css';

/* ─── Scroll progress bar ─── */
function ScrollProgress({ color }) {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const el  = barRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const pct = doc.scrollTop / (doc.scrollHeight - doc.clientHeight) || 0;
      el.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div ref={barRef} style={{
      position:'fixed',top:0,left:0,right:0,height:3,zIndex:9998,
      background:color,transformOrigin:'left',transform:'scaleX(0)',
      boxShadow:`0 0 12px ${color}88`,
    }}/>
  );
}

/* ─── Animated headline ─── */
function AnimTitle({ text }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} style={{ display:'inline-block', overflow:'hidden', marginRight:'0.25em', verticalAlign:'bottom' }}>
          <motion.span
            style={{ display:'inline-block' }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.25 + wi * 0.07, ease: [0.22, 1, 0.36, 1] }}>
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ─── Content block renderer ─── */
function Block({ block, color }) {
  const wvProps = { initial:{ opacity:0, y:20 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true, margin:'-40px' } };

  switch (block.type) {
    case 'intro':
      return (
        <motion.p className="bp-intro" {...wvProps} transition={{ duration:.6 }}>
          {block.text}
        </motion.p>
      );
    case 'h2':
      return (
        <motion.h2 className="bp-h2"
          initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true, margin:'-40px' }} transition={{ duration:.5, ease:[.22,1,.36,1] }}>
          <span className="bp-h2__bar" style={{ background:color }}/>
          {block.text}
        </motion.h2>
      );
    case 'p':
      return (
        <motion.p className="bp-p" {...wvProps} transition={{ duration:.55 }}>
          {block.text}
        </motion.p>
      );
    case 'callout':
      return (
        <motion.blockquote className="bp-callout"
          style={{ borderColor:color, background:`${color}0e` }}
          initial={{ opacity:0, scale:.97 }} whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true, margin:'-40px' }} transition={{ duration:.5 }}>
          <span className="bp-callout__dot" style={{ background:color }}/>
          <p>{block.text}</p>
        </motion.blockquote>
      );
    case 'conclusion':
      return (
        <motion.div className="bp-conclusion"
          style={{ borderColor:`${color}33`, background:`${color}08` }}
          {...wvProps} transition={{ duration:.6 }}>
          <div className="bp-conclusion__label" style={{ color }}>✦ Conclusion</div>
          <p>{block.text}</p>
        </motion.div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug }   = useParams();
  const navigate   = useNavigate();
  const fxRef      = useCursorFX();

  const post       = posts.find(p => p.slug === slug);
  const idx        = posts.findIndex(p => p.slug === slug);
  const prev       = idx > 0               ? posts[idx - 1] : null;
  const next       = idx < posts.length-1  ? posts[idx + 1] : null;
  const morePosts  = posts.filter(p => p.slug !== slug).slice(0, 3);

  /* 404 */
  if (!post) return (
    <div className="dark-page" style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', flexDirection:'column', gap:24 }}>
      <div style={{ fontFamily:'var(--font-h)', fontSize:80, fontWeight:800, color:'rgba(255,255,255,.06)', lineHeight:1 }}>404</div>
      <p style={{ color:'rgba(255,255,255,.35)', fontSize:16 }}>Post not found.</p>
      <Link to="/blog" className="btn btn-lime">Back to Blog <ArrowRight size={15}/></Link>
    </div>
  );

  const related    = posts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2);
  const fallback   = posts.filter(p => p.slug !== slug && p.category !== post.category).slice(0, 2 - related.length);
  const suggestions = [...related, ...fallback].slice(0, 2);

  return (
    <PageTransition>
      <div ref={fxRef} className="fx-layer" aria-hidden="true"/>
      <ScrollProgress color={post.catColor}/>
      <div className="dark-page">

        {/* ══ HERO ══ */}
        <section className="bp-hero" style={{ background:`linear-gradient(150deg,${post.thumbFrom} 0%,${post.thumbTo} 100%)` }}>
          <div className="bp-hero__noise"/>
          <div className="bp-hero__grid"/>
          <div className="bp-hero__glow" style={{ background:`radial-gradient(ellipse 55% 60% at 75% 40%,${post.catColor}28,transparent)` }}/>
          {/* floating large ghost letter */}
          <div className="bp-hero__ghost" style={{ color:`${post.catColor}08`, WebkitTextStroke:`1px ${post.catColor}12` }}>
            {post.category.charAt(0)}
          </div>
          <div className="container bp-hero__inner">

            <motion.button className="bp-back" onClick={() => navigate('/blog')}
              initial={{ opacity:0, x:-16 }} animate={{ opacity:1, x:0 }} transition={{ duration:.4, delay:.1 }}>
              <ArrowLeft size={15}/> Back to Blog
            </motion.button>

            <motion.span className="bp-cat"
              style={{ background:`${post.catColor}22`, color:post.catColor, border:`1px solid ${post.catColor}44` }}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.4, delay:.18 }}>
              {post.category}
            </motion.span>

            <h1 className="bp-title">
              <AnimTitle text={post.title}/>
            </h1>

            <motion.div className="bp-meta"
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.52 }}>
              <span className="bp-meta__item"><Clock size={13}/>{post.readTime}</span>
              <span className="bp-meta__sep"/>
              <span className="bp-meta__item"><Calendar size={13}/>{post.date}</span>
            </motion.div>

          </div>
        </section>

        {/* ══ ARTICLE ══ */}
        <section className="bp-body-wrap">
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)' }}/>
          <div className="container">
            <div className="bp-layout">

              {/* LEFT — article */}
              <article className="bp-content">
                {post.content.map((block, i) => (
                  <Block key={i} block={block} color={post.catColor}/>
                ))}

                {/* Tags */}
                <motion.div className="bp-tags"
                  initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
                  {[post.category, 'Web Design', 'Indian Business', 'BusinesIT'].map(t => (
                    <span key={t} className="bp-tag">{t}</span>
                  ))}
                </motion.div>

                {/* Inline CTA */}
                <motion.div className="bp-cta-box"
                  style={{ borderColor:`${post.catColor}33`, background:`${post.catColor}08` }}
                  initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:.6 }}>
                  <div className="bp-cta-box__eyebrow" style={{ color:post.catColor }}>✦ BusinesIT Studio</div>
                  <h3 className="bp-cta-box__title">Ready to grow your business online?</h3>
                  <p className="bp-cta-box__sub">Talk to us about building your website — free consultation, no obligations.</p>
                  <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                    <Link to="/contact" className="btn btn-lime">Get Free Consultation <ArrowRight size={15}/></Link>
                    <Link to="/work" className="btn btn-outline-white">See Our Work</Link>
                  </div>
                </motion.div>
              </article>

              {/* RIGHT — sidebar */}
              <aside className="bp-sidebar">

                {/* About card */}
                <motion.div className="bp-scard"
                  initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.35 }}>
                  <div className="bp-scard__label">About BusinesIT</div>
                  <p className="bp-scard__body">We design and build professional websites for growing Indian businesses — fast, beautiful and built to convert.</p>
                  <Link to="/contact" className="btn btn-lime" style={{ marginTop:14, width:'100%', justifyContent:'center', fontSize:13, padding:'10px 20px' }}>
                    Get Free Quote <ArrowRight size={13}/>
                  </Link>
                </motion.div>

                {/* Article info */}
                <motion.div className="bp-scard bp-scard--meta"
                  style={{ borderColor:`${post.catColor}22` }}
                  initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.45 }}>
                  <div className="bp-scard__label">Article Info</div>
                  <div className="bp-scard__meta-row">
                    <span className="bp-scard__meta-key">Category</span>
                    <span className="bp-scard__meta-val" style={{ color:post.catColor }}>{post.category}</span>
                  </div>
                  <div className="bp-scard__meta-row">
                    <span className="bp-scard__meta-key">Read time</span>
                    <span className="bp-scard__meta-val">{post.readTime}</span>
                  </div>
                  <div className="bp-scard__meta-row">
                    <span className="bp-scard__meta-key">Published</span>
                    <span className="bp-scard__meta-val">{post.date}</span>
                  </div>
                </motion.div>

                {/* Related posts */}
                {suggestions.length > 0 && (
                  <motion.div className="bp-scard"
                    initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.55 }}>
                    <div className="bp-scard__label">Read Next</div>
                    <div style={{ display:'flex', flexDirection:'column', gap:10, marginTop:12 }}>
                      {suggestions.map(s => (
                        <Link key={s.slug} to={`/blog/${s.slug}`} className="bp-rel">
                          <div className="bp-rel__thumb"
                            style={{ background:`linear-gradient(135deg,${s.thumbFrom},${s.thumbTo})` }}>
                            <span className="bp-rel__cat"
                              style={{ background:`${s.catColor}25`, color:s.catColor }}>
                              {s.category}
                            </span>
                          </div>
                          <div className="bp-rel__body">
                            <div className="bp-rel__title">{s.title}</div>
                            <div className="bp-rel__meta"><Clock size={10}/>{s.readTime}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Stats */}
                <motion.div className="bp-scard bp-stats-grid"
                  initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:.5, delay:.65 }}>
                  {[
                    { num:'50+', label:'Websites Built' },
                    { num:'7',   label:'Day Delivery' },
                    { num:'5★',  label:'Avg Rating' },
                  ].map(s => (
                    <div key={s.label} className="bp-stat">
                      <div className="bp-stat__num" style={{ color:post.catColor }}>{s.num}</div>
                      <div className="bp-stat__label">{s.label}</div>
                    </div>
                  ))}
                </motion.div>

              </aside>
            </div>
          </div>
        </section>

        {/* ══ PREV / NEXT ══ */}
        <section className="bp-nav-wrap">
          <div className="container">
            <div className="bp-nav">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="bp-nav__card">
                  <div className="bp-nav__dir"><ArrowLeft size={13}/> Previous Article</div>
                  <div className="bp-nav__title">{prev.title}</div>
                  <span className="bp-nav__cat" style={{ color:prev.catColor, background:`${prev.catColor}15`, border:`1px solid ${prev.catColor}30` }}>
                    {prev.category}
                  </span>
                </Link>
              ) : <div/>}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="bp-nav__card bp-nav__card--right">
                  <div className="bp-nav__dir" style={{ justifyContent:'flex-end' }}>Next Article <ArrowRight size={13}/></div>
                  <div className="bp-nav__title" style={{ textAlign:'right' }}>{next.title}</div>
                  <div style={{ textAlign:'right' }}>
                    <span className="bp-nav__cat" style={{ color:next.catColor, background:`${next.catColor}15`, border:`1px solid ${next.catColor}30` }}>
                      {next.category}
                    </span>
                  </div>
                </Link>
              ) : <div/>}
            </div>
          </div>
        </section>

        {/* ══ MORE POSTS ══ */}
        <section className="section" style={{ background:'#000', position:'relative', overflow:'hidden', paddingTop:60 }}>
          <div style={{ position:'absolute', top:0, left:0, right:0, height:1, background:'linear-gradient(90deg,transparent,rgba(124,92,252,.3),transparent)' }}/>
          <div className="container">
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:44, flexWrap:'wrap', gap:16 }}>
              <h2 className="sec-title">More <em>articles</em></h2>
              <Link to="/blog" className="btn btn-outline-white">All Articles <ArrowRight size={15}/></Link>
            </div>
            <div className="blog-grid">
              {morePosts.map((p, i) => (
                <motion.div key={p.slug}
                  initial={{ opacity:0, y:32 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-40px' }}
                  transition={{ duration:.55, delay:i*.09 }}>
                  <Link to={`/blog/${p.slug}`} className="bcard" style={{ textDecoration:'none', display:'flex', flexDirection:'column' }}>
                    <div className="bcard__thumb">
                      <div className="bcard__thumb-bg" style={{ background:`linear-gradient(135deg,${p.thumbFrom},${p.thumbTo})`, position:'absolute', inset:0 }}/>
                      <div className="bcard__thumb-dots"/>
                      <div className="bcard__thumb-glow" style={{ '--gc':p.glowColor }}/>
                      <span className="bcard__cat" style={{ background:`${p.catColor}22`, color:p.catColor }}>
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

      </div>
    </PageTransition>
  );
}