import React from 'react';
import { sound } from '../utils/audio';

const ACC = {
  hair: '<path class="acc" d="M35 58C34 30 86 30 85 58C78 46 44 46 35 58Z"/>',
  long: '<path class="acc" d="M31 72C24 28 96 28 89 72L90 112L30 112Z" transform="translate(0,-2)"/>',
  cap: '<path class="acc" d="M33 52C35 27 85 27 87 52Z"/><path class="acc" d="M78 50L108 55L78 59Z"/>',
  beanie: '<path class="acc" d="M34 52C34 24 86 24 86 52Z"/><circle class="acc" cx="60" cy="23" r="6"/>',
  bun: '<path class="acc" d="M35 56C36 32 84 32 85 56C76 46 44 46 35 56Z"/><circle class="acc" cx="60" cy="29" r="10"/>',
  glasses: '<path class="acc" d="M35 54C38 33 82 33 85 54C76 45 44 45 35 54Z"/><circle class="line" cx="50" cy="63" r="8"/><circle class="line" cx="70" cy="63" r="8"/><path class="line" d="M58 63h4"/>'
};

function renderFigure(m) {
  if (m.img) return <img src={m.img} alt={m.name} />;
  const back = m.style === 'long' ? ACC.long : '';
  const front =
    m.style === 'long'
      ? '<path class="acc" d="M35 58C36 34 84 34 85 58C76 47 44 47 35 58Z"/>'
      : ACC[m.style] || '';

  const svgInner = `
    ${back}
    <path class="fig" d="M6 160C6 116 34 102 60 102C86 102 114 116 114 160Z"/>
    <rect class="fig" x="51" y="84" width="18" height="24" rx="6"/>
    <ellipse class="fig" cx="60" cy="62" rx="24" ry="28"/>
    ${front}
  `;

  return (
    <svg
      viewBox="0 0 120 160"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svgInner }}
    />
  );
}

export default function MembersCollage({
  members,
  activeIndex,
  onFocusMember,
  onOpenDetail,
}) {
  const current = members[activeIndex] || members[0];

  return (
    <div className="members-view">
      {/* Header Info */}
      <div className="who">
        <div className="who-header">
          <div className="kick">Core Team & Leads · 2026</div>
          <div className="nm rise" key={current.name}>
            {current.name}
          </div>
          <div className="rl-badges">
            <span className="rl" style={{ borderColor: current.color }}>
              {current.role}
            </span>
            <span className="wing-pill">{current.wing}</span>
          </div>
        </div>

        {/* Quick Quote Pill */}
        {current.quote && (
          <div className="member-quote-banner">
            <span className="quote-mark">“</span>
            <span>{current.quote}</span>
          </div>
        )}
      </div>

      {/* Mobile Member Quick-Selector Pills */}
      <div className="mobile-member-pills">
        {members.map((m, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={m.name}
              type="button"
              className={`mobile-pill ${isSelected ? 'active' : ''}`}
              style={{
                borderColor: isSelected ? m.color : 'var(--line)',
                background: isSelected ? `color-mix(in srgb, ${m.color} 25%, rgba(255,255,255,0.08))` : undefined,
              }}
              onClick={() => {
                sound.playTick(600 + idx * 40);
                onFocusMember(idx);
              }}
            >
              <span className="pill-dot" style={{ background: m.color }} />
              <span>{m.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Silhouette Stage (Desktop Lineup + Mobile Spotlight Single) */}
      <div className="collage desktop-collage">
        {members.map((m, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={m.name}
              type="button"
              className={`m ${isSelected ? 'on' : ''}`}
              style={{
                '--x': `${m.x}%`,
                '--h': `${m.h}%`,
                '--z': m.z,
                '--mc': m.color,
              }}
              aria-label={`${m.name}, ${m.role}`}
              onPointerEnter={(e) => {
                if (e.pointerType === 'mouse') {
                  sound.playTick(600 + idx * 50);
                  onFocusMember(idx);
                }
              }}
              onFocus={() => {
                sound.playTick(600 + idx * 50);
                onFocusMember(idx);
              }}
              onClick={() => {
                sound.playOpen();
                onFocusMember(idx);
                onOpenDetail(m);
              }}
            >
              {renderFigure(m)}
              <div className="member-hover-tag">
                <span>{m.name.split(' ')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Featured Single Avatar */}
      <div className="mobile-avatar-stage">
        <div
          className="mobile-avatar-card"
          style={{ '--mc': current.color }}
          onClick={() => {
            sound.playOpen();
            onOpenDetail(current);
          }}
        >
          {renderFigure(current)}
        </div>
      </div>

      {/* Bottom Profile Preview bar */}
      <div className="member-footer-bar">
        <div className="skills-row">
          <span className="skills-label">Specialties:</span>
          {current.skills?.map((s) => (
            <span key={s} className="skill-chip">
              {s}
            </span>
          ))}
        </div>

        <button
          type="button"
          className="inspect-member-btn"
          onClick={() => {
            sound.playOpen();
            onOpenDetail(current);
          }}
        >
          <span>View Profile & Contact</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  );
}
