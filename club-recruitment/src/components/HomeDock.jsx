import React from 'react';
import { sound } from '../utils/audio';

export function SectionIcon({ name }) {
  switch (name) {
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <circle cx="8" cy="15" r="1" fill="currentColor" />
          <circle cx="12" cy="15" r="1" fill="currentColor" />
          <circle cx="16" cy="15" r="1" fill="currentColor" />
        </svg>
      );
    case 'code':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'image':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="9" y1="7" x2="15" y2="7" />
          <line x1="9" y1="11" x2="13" y2="11" />
        </svg>
      );
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" />
          <path d="M19 18l1.2 2.8L23 22l-2.8 1.2L19 26l-1.2-2.8L15 22l2.8-1.2z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}

export default function HomeDock({
  sections,
  activeIndex,
  tagline,
  onHoverSection,
  onSelectSection,
}) {
  return (
    <section className="view-home" aria-label="Home Navigation">
      <div className="home-content">
        <div className="club-kicker">
          <span className="dot" /> Student Innovation & Engineering Lab
        </div>
        <div className="tagline rise" key={tagline} aria-live="polite">
          {tagline}
        </div>

        <nav className="dock" aria-label="Club sections">
          {sections.map((sec, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <button
                key={sec.id}
                type="button"
                className={`dock-btn ${isSelected ? 'on' : ''}`}
                aria-label={sec.label}
                onPointerEnter={(e) => {
                  if (e.pointerType === 'mouse') {
                    sound.playTick(500 + idx * 60);
                    onHoverSection(idx);
                  }
                }}
                onFocus={() => {
                  sound.playTick(500 + idx * 60);
                  onHoverSection(idx);
                }}
                onClick={() => {
                  sound.playOpen();
                  onSelectSection(idx);
                }}
              >
                <div className="dock-icon-wrapper">
                  <SectionIcon name={sec.icon} />
                  <span className="dock-number">0{idx + 1}</span>
                </div>
                <span className="dock-nm">{sec.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="hint-bar">
          <div className="hint-item">
            <kbd className="kbd">←</kbd>
            <kbd className="kbd">→</kbd>
            <span>Browse dock</span>
          </div>
          <div className="hint-divider" />
          <div className="hint-item">
            <kbd className="kbd">Enter</kbd>
            <span>Open section</span>
          </div>
          <div className="hint-divider" />
          <div className="hint-item">
            <kbd className="kbd">1-6</kbd>
            <span>Direct jump</span>
          </div>
        </div>
      </div>
    </section>
  );
}
