import React, { useState, useEffect, useCallback } from 'react';
import { CLUB, SECTIONS, MEMBERS } from './data/clubData';
import { sound } from './utils/audio';

import AmbientBackground from './components/AmbientBackground';
import TopHeader from './components/TopHeader';
import HomeDock from './components/HomeDock';
import MembersCollage from './components/MembersCollage';
import CardsDeck from './components/CardsDeck';
import DetailModal from './components/DetailModal';
import RecruitmentPortal from './components/RecruitmentPortal';
import CommandPalette from './components/CommandPalette';
import './App.css';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'members' | 'panel' | 'join'
  const [homeIndex, setHomeIndex] = useState(0);
  const [memberIndex, setMemberIndex] = useState(2); // Center on president by default
  const [cardIndex, setCardIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [taglineIndexMap, setTaglineIndexMap] = useState(() => SECTIONS.map(() => 0));
  const [taglineText, setTaglineText] = useState('');
  const [ghostText, setGhostText] = useState(SECTIONS[0].label);

  // Modals & HUD
  const [modalData, setModalData] = useState(null); // { item, type }
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Determine active theme color
  const currentSection = SECTIONS[currentSectionIndex] || SECTIONS[0];
  const activeColor =
    view === 'members'
      ? MEMBERS[memberIndex]?.color || '#22c55e'
      : view === 'join'
      ? '#ec4899'
      : SECTIONS[homeIndex]?.color || '#3b82f6';

  // Apply CSS variable --theme to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--theme', activeColor);
  }, [activeColor]);

  // Initial welcome greeting
  useEffect(() => {
    const h = new Date().getHours();
    const greeting =
      (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening') +
      `. Welcome to ${CLUB.name}.`;
    setTaglineText(greeting);
    setGhostText(SECTIONS[0].label);
  }, []);

  // Hover or focus section on home dock
  const handleHoverSection = useCallback((idx) => {
    setHomeIndex(idx);
    const sec = SECTIONS[idx];
    setGhostText(sec.label);

    setTaglineIndexMap((prev) => {
      const next = [...prev];
      const count = next[idx]++;
      const lines = sec.taglines || [];
      if (lines.length > 0) {
        setTaglineText(lines[count % lines.length]);
      }
      return next;
    });
  }, []);

  // Open a section
  const handleSelectSection = useCallback((idx) => {
    const sec = SECTIONS[idx];
    setCurrentSectionIndex(idx);
    setCardIndex(0);
    setGhostText(sec.label);

    if (sec.id === 'join') {
      setView('join');
    } else if (sec.view === 'members' || sec.id === 'members') {
      setView('members');
    } else {
      setView('panel');
    }
  }, []);

  // Return to home
  const handleGoHome = useCallback(() => {
    setView('home');
    setGhostText(SECTIONS[homeIndex].label);
  }, [homeIndex]);

  // Arrow navigation
  const move = useCallback(
    (dir) => {
      if (modalData || isCommandPaletteOpen) return;

      if (view === 'home') {
        const next = (homeIndex + dir + SECTIONS.length) % SECTIONS.length;
        sound.playTick(500 + next * 40);
        handleHoverSection(next);
      } else if (view === 'members') {
        const next = (memberIndex + dir + MEMBERS.length) % MEMBERS.length;
        sound.playTick(600 + next * 40);
        setMemberIndex(next);
      } else if (view === 'panel') {
        const items = SECTIONS[currentSectionIndex]?.items || [];
        if (items.length > 0) {
          const next = (cardIndex + dir + items.length) % items.length;
          sound.playTick(550 + next * 30);
          setCardIndex(next);
        }
      }
    },
    [view, homeIndex, memberIndex, cardIndex, currentSectionIndex, modalData, isCommandPaletteOpen, handleHoverSection]
  );

  // Global Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle Command Palette (Cmd+K, Ctrl+K, or /)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
        return;
      }
      if (e.key === '/' && !modalData && !isCommandPaletteOpen && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
        return;
      }

      if (isCommandPaletteOpen) return;

      // Close modal on Escape
      if (e.key === 'Escape') {
        if (modalData) {
          setModalData(null);
          return;
        }
        if (view !== 'home') {
          sound.playBack();
          handleGoHome();
          return;
        }
      }

      // Quick numbers 1 - 6
      if (['1', '2', '3', '4', '5', '6'].includes(e.key) && view === 'home' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTIONS[idx]) {
          sound.playOpen();
          handleHoverSection(idx);
          handleSelectSection(idx);
        }
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'Enter' && view === 'home' && e.target.tagName !== 'INPUT') {
        // If an active button isn't focused, enter opens current dock item
        e.preventDefault();
        sound.playOpen();
        handleSelectSection(homeIndex);
      } else if (e.key === 'Backspace' && view !== 'home' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        sound.playBack();
        handleGoHome();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [view, homeIndex, modalData, isCommandPaletteOpen, handleGoHome, handleHoverSection, handleSelectSection, move]);

  // Touch Swipe Support
  useEffect(() => {
    let startX = null;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50 && view !== 'join') {
        move(dx < 0 ? 1 : -1);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [view, move]);

  return (
    <div id="stage" data-view={view} style={{ '--theme': activeColor }}>
      {/* Dynamic Background with Particles & Ambient Lighting */}
      <AmbientBackground ghostText={ghostText} themeColor={activeColor} />

      {/* Top Console Bar (Clock, Date, Next Meetup Countdown, Actions) */}
      <TopHeader
        currentView={view}
        onGoHome={handleGoHome}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onQuickJoin={() => {
          setView('join');
          setGhostText('JOIN');
        }}
      />

      {/* Main Interactive Views */}
      <main className="views-container">
        {view === 'home' && (
          <HomeDock
            sections={SECTIONS}
            activeIndex={homeIndex}
            tagline={taglineText}
            onHoverSection={handleHoverSection}
            onSelectSection={handleSelectSection}
          />
        )}

        {view === 'members' && (
          <MembersCollage
            members={MEMBERS}
            activeIndex={memberIndex}
            onFocusMember={(idx) => setMemberIndex(idx)}
            onOpenDetail={(member) => setModalData({ item: member, type: 'member' })}
          />
        )}

        {view === 'panel' && (
          <CardsDeck
            section={SECTIONS[currentSectionIndex]}
            activeIndex={cardIndex}
            onFocusCard={(idx) => setCardIndex(idx)}
            onOpenCardDetail={(item, sectionId) => setModalData({ item, type: sectionId })}
          />
        )}

        {view === 'join' && (
          <RecruitmentPortal
            onBackToHome={handleGoHome}
          />
        )}
      </main>

      {/* Inspection Modal for Details */}
      {modalData && (
        <DetailModal
          item={modalData.item}
          type={modalData.type}
          onClose={() => setModalData(null)}
          onApplyDirect={() => {
            setModalData(null);
            setView('join');
          }}
        />
      )}

      {/* Spotlight Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={(idx) => {
          handleHoverSection(idx);
          handleSelectSection(idx);
        }}
        onSelectMember={(idx) => {
          setView('members');
          setMemberIndex(idx);
        }}
      />
    </div>
  );
}
