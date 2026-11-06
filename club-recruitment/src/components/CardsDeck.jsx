import React, { useRef, useEffect } from 'react';
import { sound } from '../utils/audio';

export default function CardsDeck({
  section,
  activeIndex,
  onFocusCard,
  onOpenCardDetail,
}) {
  const cardsRef = useRef(null);

  // Auto scroll active card into view
  useEffect(() => {
    if (cardsRef.current && cardsRef.current.children[activeIndex]) {
      cardsRef.current.children[activeIndex].scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const items = section.items || [];

  return (
    <div className="cards-panel-view">
      <div className="panel-head">
        <div className="kick">Orbit Collective · {section.label}</div>
        <div className="nm rise" key={section.label}>
          {section.label}
        </div>
        <div className="sub-desc">{section.sub}</div>
      </div>

      <div className="cards-scroll-container" ref={cardsRef}>
        {items.map((it, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={it.id || idx}
              type="button"
              className={`card ${isSelected ? 'on' : ''}`}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                  sound.playTick(550 + idx * 40);
                  onFocusCard(idx);
                }
              }}
              onFocus={() => {
                sound.playTick(550 + idx * 40);
                onFocusCard(idx);
              }}
              onClick={() => {
                sound.playOpen();
                onOpenCardDetail(it, section.id);
              }}
            >
              {/* Card top badges */}
              <div className="card-top">
                <span className="card-tag">{it.tag}</span>
                {it.badge && <span className="card-extra-badge">{it.badge}</span>}
                {it.status && <span className="card-status-badge">{it.status}</span>}
              </div>

              {/* Card middle content */}
              <div className="card-body">
                <h3 className="card-title">{it.t}</h3>
                <div className="card-subtitle">{it.s}</div>
                {it.desc && <p className="card-desc-preview">{it.desc}</p>}
              </div>

              {/* Card bottom action indicator */}
              <div className="card-footer">
                <span className="card-cta">
                  <span>Explore</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <span className="card-counter">0{idx + 1} / 0{items.length}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard navigation helper */}
      <div className="cards-nav-hint">
        <span>Use <kbd>←</kbd> <kbd>→</kbd> to scroll, <kbd>Enter</kbd> to inspect details</span>
      </div>
    </div>
  );
}
