import React, { useState, useEffect } from 'react';
import { CLUB } from '../data/clubData';
import { sound } from '../utils/audio';

export default function TopHeader({
  currentView,
  onGoHome,
  onOpenCommandPalette,
  onQuickJoin,
}) {
  const [timeStr, setTimeStr] = useState('');
  const [ampm, setAmpm] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [meetupInfo, setMeetupInfo] = useState({ when: '', countdown: '' });
  const [soundEnabled, setSoundEnabled] = useState(sound.enabled);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      // Clock
      const rawTime = now.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      const parts = rawTime.split(' ');
      setTimeStr(parts[0]);
      setAmpm(parts[1] || '');

      // Date
      setDateStr(
        now.toLocaleDateString('en-GB', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        })
      );

      // Next meetup calculation
      const target = new Date(now);
      target.setHours(CLUB.meetHour, 0, 0, 0);
      target.setDate(
        now.getDate() + ((CLUB.meetDow - now.getDay() + 7) % 7)
      );
      if (target <= now) target.setDate(target.getDate() + 7);

      const ms = target.getTime() - now.getTime();
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);

      const when =
        target.toLocaleDateString('en-GB', { weekday: 'short' }) +
        ' ' +
        target.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

      const countdown = d > 0 ? `${d}d ${h}h` : `${h}h ${m}m`;
      setMeetupInfo({ when, countdown });
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  return (
    <header className="top">
      <div className="top-left">
        {currentView !== 'home' ? (
          <button
            className="back-btn"
            type="button"
            onClick={() => {
              sound.playBack();
              onGoHome();
            }}
            aria-label="Back to home"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
            <span>Home</span>
            <kbd className="esc-hint">Esc</kbd>
          </button>
        ) : (
          <div className="brand-badge">
            <span className="live-dot" />
            <span className="brand-name">{CLUB.name}</span>
            <span className="brand-tag">Collective</span>
          </div>
        )}

        <div className="clock-box">
          <div className="clock">
            {timeStr}
            <span className="clock-ampm">{ampm}</span>
          </div>
          <div className="date">{dateStr}</div>
        </div>
      </div>

      <div className="top-right">
        {/* Meetup Card */}
        <div className="meet-card">
          <div className="meet-badge">
            <span className="pulse-circle" />
            <span>Meetup</span>
          </div>
          <div className="meet-details">
            <b>{meetupInfo.when}</b> · {CLUB.meetPlace}
          </div>
          <div className="meet-countdown">{meetupInfo.countdown} left</div>
        </div>

        {/* Action controls */}
        <div className="header-actions">
          <button
            type="button"
            className="hud-action-btn search-trigger"
            onClick={() => {
              sound.playTick(700);
              onOpenCommandPalette();
            }}
            title="Command Menu (Ctrl+K or /)"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="action-label">Menu</span>
            <span className="kbd-pill">⌘K</span>
          </button>

          <button
            type="button"
            className={`hud-action-btn sound-toggle ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={handleToggleSound}
            title={soundEnabled ? 'Mute Interface Sound' : 'Enable Interface Sound'}
          >
            {soundEnabled ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
            <div className={`audio-bars ${soundEnabled ? 'active' : ''}`}>
              <span />
              <span />
              <span />
            </div>
          </button>

          {currentView !== 'join' && (
            <button
              type="button"
              className="quick-apply-btn"
              onClick={() => {
                sound.playOpen();
                onQuickJoin();
              }}
            >
              Apply 2026
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
