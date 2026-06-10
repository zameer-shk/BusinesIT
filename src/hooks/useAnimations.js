/**
 * useAnimations — Master animation hook for BusinesIT
 * Call ONCE inside App.jsx:  useAnimations();
 * Does NOT touch the existing cursor flame/spark system.
 */
import { useEffect } from 'react';

/* ── small helpers ── */
const lerp = (a, b, t) => a + (b - a) * t;
const raf  = fn => requestAnimationFrame(fn);
const LIME = '#c8f135';

export function useAnimations() {

  /* ══ 1. CUSTOM CURSOR RING + DOT ══════════════════════ */
  useEffect(() => {
    const ring = document.createElement('div');
    const dot  = document.createElement('div');
    ring.className = 'cur-ring';
    dot.className  = 'cur-dot';
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let rafId;

    const onMove = e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    };

    const tick = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      rafId = raf(tick);
    };
    rafId = raf(tick);

    const SEL = 'a,button,.btn,.svc-cell,.wcard,.bcard,.pstep,.faq-card,.legal-section,.stat-box,.bp-scard,.work-thumb';
    const over  = e => { if (e.target.closest(SEL)) ring.classList.add('is-hover'); };
    const out   = e => { if (e.target.closest(SEL)) ring.classList.remove('is-hover'); };
    const down  = ()  => { ring.classList.add('is-click'); ring.classList.remove('is-hover'); };
    const up    = ()  => ring.classList.remove('is-click');

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover',  over);
    document.addEventListener('mouseout',   out);
    document.addEventListener('mousedown',  down);
    document.addEventListener('mouseup',    up);

    return () => {
      cancelAnimationFrame(rafId);
      ring.remove(); dot.remove();
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout',  out);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup',   up);
    };
  }, []);

  /* ══ 2. SCROLL PROGRESS BAR ═══════════════════════════ */
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'scroll-bar';
    document.body.appendChild(bar);

    const update = () => {
      const d   = document.documentElement;
      const pct = d.scrollTop / (d.scrollHeight - d.clientHeight) || 0;
      bar.style.transform = `scaleX(${pct})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', update); bar.remove(); };
  }, []);

  /* ══ 3. CANVAS PARTICLE TRAIL ═════════════════════════
     Soft glowing orbs that follow the mouse and slowly fade.
     Completely separate from the cursor flame (different canvas).  */
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'trail-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      'rgba(124,92,252,',   // purple
      'rgba(200,241,53,',   // lime
      'rgba(14,165,233,',   // blue
      'rgba(236,72,153,',   // pink
      'rgba(52,211,153,',   // teal
    ];

    const particles = [];
    let mouseX = -500, mouseY = -500, lastX = -500, lastY = -500;

    const onMove = e => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMove, { passive: true });

    let rafId;
    const animate = () => {
      /* only spawn when mouse actually moved */
      const dist = Math.hypot(mouseX - lastX, mouseY - lastY);
      if (dist > 8) {
        lastX = mouseX; lastY = mouseY;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particles.push({
          x: mouseX + (Math.random() - .5) * 10,
          y: mouseY + (Math.random() - .5) * 10,
          r: 6 + Math.random() * 10,
          alpha: 0.22 + Math.random() * 0.18,
          vx: (Math.random() - .5) * .6,
          vy: (Math.random() - .5) * .6 - .4,
          decay: 0.012 + Math.random() * 0.012,
          color,
        });
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.r    *= 0.98;
        if (p.alpha <= 0 || p.r < 0.5) { particles.splice(i, 1); continue; }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        grad.addColorStop(0, p.color + p.alpha + ')');
        grad.addColorStop(1, p.color + '0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      rafId = raf(animate);
    };
    rafId = raf(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', resize);
      canvas.remove();
    };
  }, []);

  /* ══ 4. MAGNETIC BUTTONS ══════════════════════════════ */
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll('.btn,.navbar__cta').forEach(el => {
        if (el.dataset.mag) return;
        el.dataset.mag = '1';
        el.classList.add('mag-wrap');

        const move  = e => {
          const r  = el.getBoundingClientRect();
          const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
          const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
          el.style.transform = `translate(${dx}px,${dy}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 5. CLICK RIPPLE on buttons ══════════════════════ */
  useEffect(() => {
    const onClick = e => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      btn.classList.add('ripple-host');
      const r    = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.4;
      const el   = document.createElement('span');
      el.className = 'ripple-el';
      el.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX-r.left-size/2}px;top:${e.clientY-r.top-size/2}px`;
      btn.appendChild(el);
      el.addEventListener('animationend', () => el.remove(), { once: true });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* ══ 6. 3-D TILT on cards ════════════════════════════ */
  useEffect(() => {
    const apply = () => {
      const SEL = '.svc-cell,.wcard,.bcard,.faq-card,.stat-box,.legal-section,.bp-scard,.work-thumb,.hero__stat';
      document.querySelectorAll(SEL).forEach(el => {
        if (el.dataset.tilt) return;
        el.dataset.tilt = '1';
        el.classList.add('tilt-card');
        el.style.position = el.style.position || 'relative';

        if (!el.querySelector('.tilt-shine')) {
          const s = document.createElement('div');
          s.className = 'tilt-shine';
          el.appendChild(s);
        }

        const move  = e => {
          const r  = el.getBoundingClientRect();
          const x  = (e.clientX - r.left) / r.width;
          const y  = (e.clientY - r.top)  / r.height;
          const rx = (y - .5) * -12;
          const ry = (x - .5) *  12;
          el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
          el.style.setProperty('--mx', x * 100 + '%');
          el.style.setProperty('--my', y * 100 + '%');
        };
        const leave = () => {
          el.style.transform = '';
        };
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', leave);
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 7. SPOTLIGHT FOLLOW on dark sections ════════════ */
  useEffect(() => {
    const apply = () => {
      const SEL = '.home-services,.home-work,.home-about,.home-cta,.faq-wrap,.svc-cta,.cta-strip,.section.bg-d1,.section.bg-d2,.bp-body-wrap';
      document.querySelectorAll(SEL).forEach(el => {
        if (el.dataset.spot) return;
        el.dataset.spot = '1';
        el.classList.add('spotlight-host');
        el.addEventListener('mousemove', e => {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--slx', (e.clientX - r.left) + 'px');
          el.style.setProperty('--sly', (e.clientY - r.top)  + 'px');
        });
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 8. COUNT-UP NUMBERS ════════════════════════════ */
  useEffect(() => {
    const runCount = el => {
      if (el.dataset.counted) return;
      el.dataset.counted = '1';
      const raw    = el.textContent.trim();
      const suffix = raw.replace(/[\d.]/g, '');
      const target = parseFloat(raw) || 0;
      const dur    = 1800;
      const start  = performance.now();

      const tick = now => {
        const t  = Math.min((now - start) / dur, 1);
        const e3 = 1 - Math.pow(1 - t, 3);
        el.textContent = (Number.isInteger(target)
          ? Math.round(target * e3)
          : (target * e3).toFixed(1)) + suffix;
        if (t < 1) raf(() => tick(performance.now()));
      };
      raf(() => tick(performance.now()));
    };

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) runCount(e.target); });
    }, { threshold: .6 });

    const apply = () => {
      document.querySelectorAll(
        '.hero__stat-num,.stat-box__num,.bp-stat__num,.countup-num'
      ).forEach(el => io.observe(el));
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); obs.disconnect(); };
  }, []);

  /* ══ 9. TEXT SCRAMBLE on nav-link hover ══════════════ */
  useEffect(() => {
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
    const scramble = el => {
      const orig = el.dataset.orig || el.textContent;
      el.dataset.orig = orig;
      let iter = 0;
      clearInterval(el._scTimer);
      el._scTimer = setInterval(() => {
        el.textContent = orig.split('').map((ch, i) =>
          i < iter ? orig[i]
          : ch === ' ' ? ' '
          : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('');
        iter += 0.35;
        if (iter >= orig.length) {
          clearInterval(el._scTimer);
          el.textContent = orig;
        }
      }, 30);
    };

    const apply = () => {
      document.querySelectorAll('.navbar__link,.footer__link').forEach(el => {
        if (el.dataset.scram) return;
        el.dataset.scram = '1';
        el.addEventListener('mouseenter', () => scramble(el));
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 10. BORDER BEAM on CTA / callout cards ══════════ */
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll(
        '.bp-cta-box,.bp-inline-cta,.legal-contact-box,.ctest-box,.cta-strip .container > *'
      ).forEach(el => {
        if (!el.classList.contains('border-beam')) {
          el.classList.add('border-beam');
        }
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 11. GLOW HOVER on stat + info cards ════════════ */
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll(
        '.hero__stat,.stat-box,.bp-stat,.pstep__num-wrap'
      ).forEach(el => {
        if (!el.classList.contains('glow-hover')) el.classList.add('glow-hover');
      });
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  /* ══ 12. FLOATING BADGES in hero ════════════════════ */
  useEffect(() => {
    const apply = () => {
      const badges = document.querySelectorAll('.hero__badge-float');
      badges.forEach((b, i) => {
        b.classList.add(i % 2 === 0 ? 'float-badge' : 'float-badge-slow');
      });
    };
    apply();
  }, []);

  /* ══ 13. SCROLL REVEAL (IntersectionObserver) ════════ */
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

    /* also handle stagger grids */
    const gridIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          gridIO.unobserve(e.target);
        }
      });
    }, { threshold: .08 });

    const apply = () => {
      document.querySelectorAll('.reveal-up,.reveal-left').forEach(el => io.observe(el));
      document.querySelectorAll('.stagger-grid').forEach(el => gridIO.observe(el));
    };
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); gridIO.disconnect(); obs.disconnect(); };
  }, []);

  /* ══ 14. SMOOTH ANCHOR SCROLL ═══════════════════════ */
  useEffect(() => {
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  /* ══ 15. NOISE FLICKER on hero section ══════════════ */
  useEffect(() => {
    const apply = () => {
      document.querySelectorAll('.hero,.page-hero,.bp-hero').forEach(el => {
        if (!el.classList.contains('noise-flicker')) el.classList.add('noise-flicker');
      });
    };
    apply();
  }, []);
}