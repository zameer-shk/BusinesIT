// import { useRef, useEffect, useCallback } from 'react';

// const FLAME_COLORS = [
//   '#c8f135','#a8e820','#f59e0b','#fb923c',
//   '#fde047','#7c5cfc','#a78bfa','#ec4899',
//   '#38bdf8','#34d399','#e879f9','#60a5fa',
// ];

// export function useCursorFX() {
//   const layerRef = useRef(null);
//   const lastPos  = useRef({ x:-999, y:-999 });
//   const frameRef = useRef(null);
//   const queue    = useRef([]);

//   const spawnEmber = useCallback((x, y, isBurst) => {
//     const layer = layerRef.current;
//     if (!layer) return;
//     const el   = document.createElement('div');
//     const size = isBurst ? 5 + Math.random()*14 : 3 + Math.random()*9;
//     const angle = isBurst
//       ? Math.random() * Math.PI * 2
//       : -Math.PI/2 + (Math.random()-0.5)*1.4;
//     const dist = isBurst ? 40+Math.random()*100 : 20+Math.random()*55;
//     const tx   = Math.cos(angle)*dist;
//     const ty   = Math.sin(angle)*dist;
//     const color = FLAME_COLORS[Math.floor(Math.random()*FLAME_COLORS.length)];
//     const dur   = (isBurst ? 0.55 : 0.45) + Math.random()*0.35;
//     el.className = isBurst ? 'fx-spark' : 'fx-ember';
//     el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size*(isBurst?1:1.6)}px;background:${color};box-shadow:0 0 ${size*2}px ${color}88;--tx:${tx}px;--ty:${ty}px;animation-duration:${dur}s;`;
//     layer.appendChild(el);
//     el.addEventListener('animationend', ()=>el.remove(), {once:true});
//   }, []);

//   const loop = useCallback(() => {
//     queue.current.forEach(({x,y,burst})=>spawnEmber(x,y,burst));
//     queue.current = [];
//     frameRef.current = requestAnimationFrame(loop);
//   }, [spawnEmber]);

//   useEffect(() => {
//     frameRef.current = requestAnimationFrame(loop);
//     const onMove = (e) => {
//       const dx = e.clientX - lastPos.current.x;
//       const dy = e.clientY - lastPos.current.y;
//       if (Math.hypot(dx,dy) < 6) return;
//       lastPos.current = {x:e.clientX, y:e.clientY};
//       const count = Math.min(3, 1+Math.floor(Math.hypot(dx,dy)/20));
//       for (let i=0;i<count;i++) {
//         const t = count===1 ? 0.5 : i/(count-1);
//         queue.current.push({
//           x: e.clientX - dx*t + (Math.random()-0.5)*6,
//           y: e.clientY - dy*t + (Math.random()-0.5)*6,
//           burst: false,
//         });
//       }
//     };
//     const onClick = (e) => {
//       const n = 18+Math.floor(Math.random()*10);
//       for (let i=0;i<n;i++) queue.current.push({x:e.clientX,y:e.clientY,burst:true});
//     };
//     window.addEventListener('mousemove', onMove, {passive:true});
//     window.addEventListener('click', onClick);
//     return () => {
//       window.removeEventListener('mousemove', onMove);
//       window.removeEventListener('click', onClick);
//       cancelAnimationFrame(frameRef.current);
//     };
//   }, [loop]);

//   return layerRef;
// }

import { useRef, useEffect, useCallback } from 'react';

const FLAME_COLORS = [
  '#c8f135','#a8e820','#f59e0b','#fb923c',
  '#fde047','#7c5cfc','#a78bfa','#ec4899',
  '#38bdf8','#34d399','#e879f9','#60a5fa',
];

export function useCursorFX() {
  const layerRef = useRef(null);
  const lastPos  = useRef({ x:-999, y:-999 });
  const frameRef = useRef(null);
  const queue    = useRef([]);

  const spawnEmber = useCallback((x, y, isBurst) => {
    const layer = layerRef.current;
    if (!layer) return;
    const el   = document.createElement('div');
    const size = isBurst ? 5 + Math.random()*14 : 3 + Math.random()*9;
    const angle = isBurst
      ? Math.random() * Math.PI * 2
      : -Math.PI/2 + (Math.random()-0.5)*1.4;
    const dist = isBurst ? 40+Math.random()*100 : 20+Math.random()*55;
    const tx   = Math.cos(angle)*dist;
    const ty   = Math.sin(angle)*dist;
    const color = FLAME_COLORS[Math.floor(Math.random()*FLAME_COLORS.length)];
    const dur   = (isBurst ? 0.55 : 0.45) + Math.random()*0.35;
    el.className = isBurst ? 'fx-spark' : 'fx-ember';
    el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size*(isBurst?1:1.6)}px;background:${color};box-shadow:0 0 ${size*2}px ${color}88;--tx:${tx}px;--ty:${ty}px;animation-duration:${dur}s;`;
    layer.appendChild(el);
    el.addEventListener('animationend', ()=>el.remove(), {once:true});
  }, []);

  const loop = useCallback(() => {
    queue.current.forEach(({x,y,burst})=>spawnEmber(x,y,burst));
    queue.current = [];
    frameRef.current = requestAnimationFrame(loop);
  }, [spawnEmber]);

  useEffect(() => {
    const layer = layerRef.current;

    // Hide the FX layer on touch-only devices (mobile/tablet)
    // The static circle looks broken when there's no mouse cursor
    const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (layer) {
      layer.style.display = isTouchOnly ? 'none' : 'block';
    }

    frameRef.current = requestAnimationFrame(loop);

    // Desktop — mouse trail
    const onMove = (e) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      if (Math.hypot(dx,dy) < 6) return;
      lastPos.current = {x:e.clientX, y:e.clientY};
      const count = Math.min(3, 1+Math.floor(Math.hypot(dx,dy)/20));
      for (let i=0;i<count;i++) {
        const t = count===1 ? 0.5 : i/(count-1);
        queue.current.push({
          x: e.clientX - dx*t + (Math.random()-0.5)*6,
          y: e.clientY - dy*t + (Math.random()-0.5)*6,
          burst: false,
        });
      }
    };

    // Desktop — click burst
    const onClick = (e) => {
      const n = 18+Math.floor(Math.random()*10);
      for (let i=0;i<n;i++) queue.current.push({x:e.clientX,y:e.clientY,burst:true});
    };

    // Mobile — tap burst (shows color blast on touch, hides static circle)
    const onTouch = (e) => {
      if (layer) layer.style.display = 'block';
      const touch = e.changedTouches[0];
      const n = 18+Math.floor(Math.random()*10);
      for (let i=0;i<n;i++) queue.current.push({x:touch.clientX,y:touch.clientY,burst:true});
    };

    window.addEventListener('mousemove', onMove, {passive:true});
    window.addEventListener('click', onClick);
    window.addEventListener('touchstart', onTouch, {passive:true});

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchstart', onTouch);
      cancelAnimationFrame(frameRef.current);
    };
  }, [loop]);

  return layerRef;
}