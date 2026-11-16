import React, { useEffect, useRef, useState } from 'react';
import { sound } from '../utils/audio';

const CODE_SYMBOLS = ['0', '1', '</>', '{ }', '=>', 'fn()', '0x', 'const', 'λ', '⚡', 'git', '&&', '||', '!=', '::', '/**/'];

export default function CyberMenuWave({
  dockRef,
  activeIndex,
  isInteracting,
  themeColor = '#3b82f6',
}) {
  const canvasRef = useRef(null);
  const [handPos, setHandPos] = useState({ x: 0, y: 0, visible: false, tapping: false });
  const handRef = useRef({ x: 0, targetX: 0, y: 0, targetY: 0, visible: false, tapping: false });
  const ripplesRef = useRef([]);

  // Calculate target position based on active/hovered dock button
  useEffect(() => {
    if (!dockRef?.current) return;
    const buttons = dockRef.current.querySelectorAll('.dock-btn');
    const targetBtn = buttons[activeIndex];

    if (targetBtn) {
      const dockRect = dockRef.current.getBoundingClientRect();
      const btnRect = targetBtn.getBoundingClientRect();
      const centerX = btnRect.left - dockRect.left + btnRect.width / 2;
      const topY = btnRect.top - dockRect.top + btnRect.height / 2;

      handRef.current.targetX = centerX;
      handRef.current.targetY = topY;
      handRef.current.visible = isInteracting;

      setHandPos((prev) => ({
        ...prev,
        x: centerX,
        y: topY,
        visible: isInteracting,
      }));
    } else {
      handRef.current.visible = false;
      setHandPos((prev) => ({ ...prev, visible: false }));
    }
  }, [activeIndex, isInteracting, dockRef]);

  // Canvas Code War Wave & Outgoing Shockwaves
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !dockRef?.current) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      const rect = dockRef.current.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height + 60; // Extra room for hand and wave crest
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Code particles riding the wave
    const waveParticles = Array.from({ length: 28 }, (_, i) => ({
      x: (i / 28) * (canvas.width || 600),
      speed: 0.8 + Math.random() * 1.4,
      symbol: CODE_SYMBOLS[Math.floor(Math.random() * CODE_SYMBOLS.length)],
      size: 9 + Math.random() * 5,
      alpha: 0.3 + Math.random() * 0.5,
      offset: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      time += 0.04;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Smooth lerp for hand and wave peak
      handRef.current.x += (handRef.current.targetX - handRef.current.x) * 0.16;
      handRef.current.y += (handRef.current.targetY - handRef.current.y) * 0.16;

      const activeX = handRef.current.x;
      const isVisible = handRef.current.visible;

      // 1. Draw flowing cyber code wave line
      const baselineY = height - 28;
      ctx.beginPath();
      ctx.moveTo(0, baselineY);

      for (let x = 0; x <= width; x += 6) {
        // Multi-harmonic sine wave
        let waveY =
          Math.sin(x * 0.015 + time * 2) * 5 +
          Math.sin(x * 0.035 - time * 1.5) * 3;

        // Energy crest toward hovered/touched menu item
        if (isVisible && activeX > 0) {
          const dist = Math.abs(x - activeX);
          if (dist < 100) {
            const crest = Math.cos((dist / 100) * (Math.PI / 2));
            waveY -= crest * (handRef.current.tapping ? 32 : 22);
          }
        }

        ctx.lineTo(x, baselineY + waveY);
      }

      // Stroke glowing wave
      ctx.strokeStyle = `color-mix(in srgb, ${themeColor} 70%, #38bdf8)`;
      ctx.lineWidth = 1.8;
      ctx.shadowColor = themeColor;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Lower secondary echo wave
      ctx.beginPath();
      ctx.moveTo(0, baselineY + 8);
      for (let x = 0; x <= width; x += 10) {
        const waveY = Math.sin(x * 0.02 - time * 1.8) * 4;
        ctx.lineTo(x, baselineY + 8 + waveY);
      }
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.lineWidth = 1;
      ctx.shadowBlur = 4;
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 2. Render code particles surging along the wave
      waveParticles.forEach((p) => {
        p.x = (p.x + p.speed) % width;
        let pY = baselineY + Math.sin(p.x * 0.02 + time + p.offset) * 6;

        // Lift particles up near active menu button
        if (isVisible && Math.abs(p.x - activeX) < 80) {
          const factor = 1 - Math.abs(p.x - activeX) / 80;
          pY -= factor * 24;
          ctx.fillStyle = '#fff';
          ctx.font = `600 ${p.size + 2}px "JetBrains Mono", monospace`;
        } else {
          ctx.fillStyle = `color-mix(in srgb, ${themeColor} ${p.alpha * 100}%, rgba(255,255,255,0.4))`;
          ctx.font = `400 ${p.size}px "JetBrains Mono", monospace`;
        }

        ctx.fillText(p.symbol, p.x, pY);
      });

      // 3. Render outgoing code waves & ripples after touching
      for (let i = ripplesRef.current.length - 1; i >= 0; i--) {
        const rip = ripplesRef.current[i];
        rip.radius += rip.speed;
        rip.alpha -= 0.022;

        if (rip.alpha <= 0) {
          ripplesRef.current.splice(i, 1);
          continue;
        }

        // Concentric expanding shockwave ring
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rip.alpha * 0.7})`;
        ctx.lineWidth = Math.max(1, (1 - rip.radius / 120) * 3);
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 16;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Dispersing code fragments shooting outwards
        rip.particles.forEach((pt) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          ctx.fillStyle = `rgba(255, 255, 255, ${rip.alpha})`;
          ctx.font = '700 11px "JetBrains Mono", monospace';
          ctx.fillText(pt.sym, pt.x, pt.y);
        });
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [dockRef, themeColor]);

  // Trigger outward shockwave burst on click / touch
  useEffect(() => {
    if (!dockRef?.current) return;
    const dockEl = dockRef.current;

    const handleMenuTouch = (e) => {
      const btn = e.target.closest('.dock-btn');
      if (!btn) return;

      const dockRect = dockEl.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const touchX = btnRect.left - dockRect.left + btnRect.width / 2;
      const touchY = btnRect.top - dockRect.top + btnRect.height / 2;

      // Sound FX
      sound.playCyberBurst();

      // Trigger hand tap animation
      handRef.current.tapping = true;
      setHandPos((prev) => ({ ...prev, tapping: true }));
      setTimeout(() => {
        handRef.current.tapping = false;
        setHandPos((prev) => ({ ...prev, tapping: false }));
      }, 320);

      // Create outgoing wave & code fragments
      const newBurst = {
        x: touchX,
        y: touchY,
        radius: 10,
        speed: 4.8,
        alpha: 1,
        particles: Array.from({ length: 8 }, (_, idx) => {
          const angle = (idx / 8) * Math.PI * 2 + Math.random() * 0.4;
          const velocity = 2.5 + Math.random() * 3.5;
          return {
            x: touchX,
            y: touchY,
            vx: Math.cos(angle) * velocity,
            vy: Math.sin(angle) * velocity,
            sym: CODE_SYMBOLS[idx % CODE_SYMBOLS.length],
          };
        }),
      };

      ripplesRef.current.push(newBurst);
    };

    dockEl.addEventListener('click', handleMenuTouch);
    dockEl.addEventListener('touchstart', handleMenuTouch, { passive: true });

    return () => {
      dockEl.removeEventListener('click', handleMenuTouch);
      dockEl.removeEventListener('touchstart', handleMenuTouch);
    };
  }, [dockRef]);

  return (
    <div className="cyber-menu-wave-layer" aria-hidden="true">
      {/* Matrix Code Wave Canvas */}
      <canvas ref={canvasRef} className="cyber-wave-canvas" />

      {/* Holographic Cyber Hand that emerges and touches menu item */}
      <div
        className={`cyber-hand-wrapper ${handPos.visible ? 'active' : ''} ${
          handPos.tapping ? 'tapping' : ''
        }`}
        style={{
          transform: `translate3d(${handPos.x}px, ${handPos.tapping ? -14 : 0}px, 0)`,
          '--hand-color': themeColor,
        }}
      >
        <svg
          className="cyber-hand-svg"
          viewBox="0 0 70 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="handGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor={themeColor} />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <radialGradient id="plasmaNode" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Holographic Wrist / Cyber Conduit Base */}
          <path
            d="M24 120 L27 88 L43 88 L46 120 Z"
            fill="url(#cyberGrad)"
            opacity="0.35"
          />
          <line x1="28" y1="92" x2="28" y2="118" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />
          <line x1="35" y1="88" x2="35" y2="118" stroke="#ffffff" strokeWidth="1.4" opacity="0.9" />
          <line x1="42" y1="92" x2="42" y2="118" stroke="#38bdf8" strokeWidth="1.2" opacity="0.8" />

          {/* Cyber Palm Skeleton */}
          <polygon
            points="22,86 48,86 52,62 18,62"
            fill="url(#cyberGrad)"
            opacity="0.3"
            stroke="#38bdf8"
            strokeWidth="1.2"
          />
          <circle cx="35" cy="74" r="5" fill="#38bdf8" opacity="0.7" />
          <circle cx="35" cy="74" r="2.5" fill="#ffffff" />

          {/* Knuckle Circuit Bridges */}
          <path d="M22 62 L26 48" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M30 62 L32 40" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M35 62 L35 22" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" /> {/* Extended Index */}
          <path d="M41 62 L40 42" stroke="#38bdf8" strokeWidth="1.5" />
          <path d="M48 62 L46 48" stroke="#38bdf8" strokeWidth="1.5" />

          {/* Folded Fingers (Cyber segments) */}
          <rect x="22" y="42" width="6" height="8" rx="2" fill="url(#cyberGrad)" opacity="0.6" />
          <rect x="29" y="34" width="6" height="8" rx="2" fill="url(#cyberGrad)" opacity="0.6" />
          <rect x="38" y="36" width="6" height="8" rx="2" fill="url(#cyberGrad)" opacity="0.6" />
          <rect x="44" y="42" width="5" height="7" rx="2" fill="url(#cyberGrad)" opacity="0.6" />

          {/* Extended Pointer/Index Finger (Emerging to Touch Menu) */}
          <rect
            x="32.5"
            y="18"
            width="5"
            height="18"
            rx="2.5"
            fill="url(#cyberGrad)"
            opacity="0.9"
            stroke="#ffffff"
            strokeWidth="1"
          />
          <circle cx="35" cy="22" r="2" fill="#ffffff" />
          <circle cx="35" cy="12" r="3" fill="#ffffff" filter="url(#handGlow)" />

          {/* Plasma Beam Arc from fingertip touching button */}
          <line
            x1="35"
            y1="10"
            x2="35"
            y2="0"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="plasma-beam"
          />
          <circle cx="35" cy="0" r="5" fill="url(#plasmaNode)" className="contact-spark" />
        </svg>

        {/* Dynamic Matrix Code Aura around hand */}
        <div className="hand-aura-text">
          <span>&lt;touch /&gt;</span>
        </div>
      </div>
    </div>
  );
}
