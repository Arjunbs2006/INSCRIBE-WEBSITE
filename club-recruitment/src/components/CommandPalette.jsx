import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS, MEMBERS } from '../data/clubData';
import { sound } from '../utils/audio';

export default function CommandPalette({ isOpen, onClose, onSelectSection, onSelectMember }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Flatten searchable commands
  const allItems = [
    ...SECTIONS.map((s, idx) => ({
      type: 'Section',
      title: s.label,
      desc: s.sub,
      icon: '📂',
      color: s.color,
      action: () => onSelectSection(idx),
    })),
    ...MEMBERS.map((m, idx) => ({
      type: 'Team Member',
      title: m.name,
      desc: `${m.role} · ${m.wing}`,
      icon: '👤',
      color: m.color,
      action: () => onSelectMember(idx),
    })),
    {
      type: 'Action',
      title: 'Sound FX Toggle',
      desc: 'Toggle ambient audio feedback',
      icon: '🔊',
      color: '#ec4899',
      action: () => sound.toggle(),
    },
  ];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      sound.playTick(600);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      sound.playTick(600);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        sound.playOpen();
        filtered[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      sound.playBack();
      onClose();
    }
  };

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-bar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Type to search sections, projects, events, or team..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <kbd className="cmd-esc-tag" onClick={onClose}>
            ESC
          </kbd>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.title + idx}
                  className={`cmd-item ${isSelected ? 'active' : ''}`}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  onClick={() => {
                    sound.playOpen();
                    item.action();
                    onClose();
                  }}
                >
                  <span className="cmd-item-icon">{item.icon}</span>
                  <div className="cmd-item-details">
                    <div className="cmd-item-title">{item.title}</div>
                    <div className="cmd-item-desc">{item.desc}</div>
                  </div>
                  <span className="cmd-item-badge">{item.type}</span>
                </div>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵ Enter</kbd></span>
        </div>
      </div>
    </div>
  );
}
