import React, { useState } from 'react';
import { sound } from '../utils/audio';

export default function DetailModal({ item, type, onClose, onApplyDirect }) {
  const [rsvpState, setRsvpState] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    sound.playChime(800, 0.1);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRsvp = () => {
    setRsvpState(true);
    sound.playSuccess();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-btn"
          type="button"
          onClick={() => {
            sound.playBack();
            onClose();
          }}
          aria-label="Close dialog"
        >
          ✕
        </button>

        {/* Member Modal */}
        {type === 'member' && (
          <div className="modal-content member-modal">
            <div className="member-modal-header" style={{ borderColor: item.color }}>
              <div className="avatar-circle" style={{ background: item.color }}>
                {item.name.charAt(0)}
              </div>
              <div>
                <span className="modal-kicker">{item.wing}</span>
                <h2 className="modal-title">{item.name}</h2>
                <div className="modal-sub">{item.role}</div>
              </div>
            </div>

            <div className="modal-body">
              {item.quote && (
                <blockquote className="member-quote">
                  "{item.quote}"
                </blockquote>
              )}

              <div className="info-block">
                <h4>About</h4>
                <p>{item.bio}</p>
              </div>

              <div className="info-block">
                <h4>Core Stack & Specialties</h4>
                <div className="tag-cloud">
                  {item.skills?.map((s) => (
                    <span key={s} className="tag-chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="info-block">
                <h4>Connect & Code</h4>
                <div className="social-links-row">
                  {item.github && (
                    <a
                      href={`https://github.com/${item.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="social-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      github.com/{item.github}
                    </a>
                  )}
                  {item.twitter && (
                    <span className="social-btn handle-chip">
                      {item.twitter}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-primary-btn"
                onClick={() => handleCopy(`${item.name.toLowerCase().replace(' ', '.')}@orbitclub.edu`)}
              >
                {copied ? '✓ Email Copied' : 'Copy Club Email'}
              </button>
            </div>
          </div>
        )}

        {/* Card Modal: Events */}
        {type === 'events' && (
          <div className="modal-content">
            <span className="modal-kicker">{item.tag}</span>
            <h2 className="modal-title">{item.t}</h2>
            <div className="modal-sub">{item.s}</div>

            <div className="modal-body">
              <p className="detail-desc">{item.desc}</p>

              <div className="detail-meta-grid">
                <div className="meta-card">
                  <span className="label">Location & Time</span>
                  <span className="val">{item.s}</span>
                </div>
                <div className="meta-card">
                  <span className="label">Instructor / Lead</span>
                  <span className="val">{item.speaker || 'Orbit Core'}</span>
                </div>
                <div className="meta-card">
                  <span className="label">Availability</span>
                  <span className="val highlight">{item.spots || 'Open to all'}</span>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className={`modal-primary-btn ${rsvpState ? 'confirmed' : ''}`}
                onClick={handleRsvp}
              >
                {rsvpState ? '✓ You are on the Guest List!' : 'RSVP & Save Seat'}
              </button>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={() => handleCopy(`Join ${item.t} at ${item.s}`)}
              >
                {copied ? 'Copied' : 'Share Event'}
              </button>
            </div>
          </div>
        )}

        {/* Card Modal: Projects */}
        {type === 'projects' && (
          <div className="modal-content">
            <span className="modal-kicker">{item.tag}</span>
            <h2 className="modal-title">{item.t}</h2>
            <div className="modal-sub">{item.s}</div>

            <div className="modal-body">
              <p className="detail-desc">{item.desc}</p>
              <div className="stats-box">
                <span>{item.stats}</span>
                <span className="status-indicator">{item.status}</span>
              </div>
            </div>

            <div className="modal-actions">
              <a
                href={item.github || '#'}
                target="_blank"
                rel="noreferrer"
                className="modal-primary-btn"
              >
                Open GitHub Repository ↗
              </a>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={onApplyDirect}
              >
                Contribute to Project
              </button>
            </div>
          </div>
        )}

        {/* Card Modal: Resources / Gallery / Join */}
        {type !== 'member' && type !== 'events' && type !== 'projects' && (
          <div className="modal-content">
            <span className="modal-kicker">{item.tag}</span>
            <h2 className="modal-title">{item.t}</h2>
            <div className="modal-sub">{item.s}</div>

            <div className="modal-body">
              <p className="detail-desc">{item.desc}</p>
              {item.highlight && (
                <div className="highlight-banner">
                  ⭐ {item.highlight}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-primary-btn"
                onClick={onApplyDirect}
              >
                Get Access / Apply Now
              </button>
              <button
                type="button"
                className="modal-secondary-btn"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
