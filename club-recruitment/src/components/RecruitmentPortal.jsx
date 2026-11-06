import React, { useState } from 'react';
import { WINGS, CLUB } from '../data/clubData';
import { sound } from '../utils/audio';

export default function RecruitmentPortal({ onBackToHome }) {
  const [step, setStep] = useState(1);
  const [selectedWing, setSelectedWing] = useState(WINGS[0]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    year: '1st Year (Fresher)',
    portfolio: '',
    motivation: '',
  });
  const [passData, setPassData] = useState(null);

  const handleWingSelect = (wing) => {
    setSelectedWing(wing);
    sound.playTick(600);
  };

  const handleNextToForm = () => {
    sound.playOpen();
    setStep(2);
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) return;

    const randomId = 'ORB-2026-' + Math.floor(1000 + Math.random() * 9000);
    const pass = {
      id: randomId,
      name: formData.fullName,
      email: formData.email,
      year: formData.year,
      wing: selectedWing.name,
      wingIcon: selectedWing.icon,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };

    setPassData(pass);
    setStep(3);
    sound.playSuccess();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="recruitment-portal-view">
      <div className="portal-header">
        <div className="kick">Official Recruitment · Fall 2026 Cohort</div>
        <h2 className="portal-title">Join the Orbit Collective</h2>
        <p className="portal-sub">
          {step === 1 && 'Step 1 of 3: Select your primary domain of interest.'}
          {step === 2 && 'Step 2 of 3: Tell us about yourself and what you want to build.'}
          {step === 3 && 'Step 3 of 3: Application Received! Here is your digital Club Pass.'}
        </p>

        {/* Step progress pills */}
        <div className="portal-stepper">
          <div className={`step-pill ${step >= 1 ? 'active' : ''}`}>1. Wing Selection</div>
          <div className="step-connector" />
          <div className={`step-pill ${step >= 2 ? 'active' : ''}`}>2. Quick Details</div>
          <div className="step-connector" />
          <div className={`step-pill ${step >= 3 ? 'active' : ''}`}>3. Digital Pass</div>
        </div>
      </div>

      {/* STEP 1: WING SELECTION */}
      {step === 1 && (
        <div className="step-container wings-grid-container">
          <div className="wings-grid">
            {WINGS.map((w) => {
              const isSelected = selectedWing.id === w.id;
              return (
                <button
                  key={w.id}
                  type="button"
                  className={`wing-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => handleWingSelect(w)}
                >
                  <div className="wing-icon">{w.icon}</div>
                  <div className="wing-info">
                    <h4 className="wing-name">{w.name}</h4>
                    <p className="wing-desc">{w.desc}</p>
                  </div>
                  {isSelected && <span className="wing-check">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="step-footer">
            <button
              type="button"
              className="portal-primary-btn"
              onClick={handleNextToForm}
            >
              Continue with {selectedWing.name} →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: APPLICATION FORM */}
      {step === 2 && (
        <div className="step-container form-container">
          <form onSubmit={handleSubmitApplication} className="application-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Student Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alex.m@university.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Year of Study</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                >
                  <option>1st Year (Fresher)</option>
                  <option>2nd Year (Sophomore)</option>
                  <option>3rd Year (Junior)</option>
                  <option>4th Year (Senior)</option>
                  <option>Postgrad / Researcher</option>
                </select>
              </div>

              <div className="form-group">
                <label>GitHub / Portfolio / LinkedIn (Optional)</label>
                <input
                  type="text"
                  placeholder="https://github.com/username"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>What excites you or what do you want to build this semester?</label>
              <textarea
                rows="3"
                placeholder="Tell us what technologies you are curious about or any cool ideas you'd love to hack on..."
                value={formData.motivation}
                onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="portal-secondary-btn"
                onClick={() => {
                  sound.playBack();
                  setStep(1);
                }}
              >
                ← Back
              </button>
              <button type="submit" className="portal-primary-btn">
                Generate Official Member Pass ✨
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: HOLOGRAPHIC PASS */}
      {step === 3 && passData && (
        <div className="step-container pass-container">
          <div className="pass-card-wrapper">
            <div className="holo-pass-card">
              <div className="holo-shimmer" />

              <div className="pass-top">
                <div className="pass-logo">
                  <span className="dot-blink" /> {CLUB.name.toUpperCase()} PASS
                </div>
                <div className="pass-cohort">COHORT '26</div>
              </div>

              <div className="pass-body">
                <div className="pass-photo-placeholder">
                  <span>{passData.name.charAt(0)}</span>
                </div>
                <div className="pass-identity">
                  <div className="pass-name">{passData.name}</div>
                  <div className="pass-wing">
                    {passData.wingIcon} {passData.wing}
                  </div>
                  <div className="pass-meta">{passData.year}</div>
                </div>
              </div>

              <div className="pass-footer">
                <div>
                  <div className="pass-label">PASS ID</div>
                  <div className="pass-id-val">{passData.id}</div>
                </div>
                <div>
                  <div className="pass-label">VALIDITY</div>
                  <div className="pass-val">ACTIVE MEMBER</div>
                </div>
                <div className="pass-qr-sim">
                  <div className="qr-box">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pass-celebration-message">
            <h3>🎉 Welcome aboard, {passData.name}!</h3>
            <p>
              Your application has been logged into the Orbit Club recruitment registry. Bring this digital pass to{' '}
              <b>{CLUB.meetPlace} this Saturday at 5:00 PM</b> to pick up your physical NFC keycard and starter stickers.
            </p>
          </div>

          <div className="pass-actions">
            <button type="button" className="portal-primary-btn" onClick={handlePrint}>
              Save / Print Pass 🖨️
            </button>
            <a
              href={CLUB.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="portal-discord-btn"
            >
              Join Orbit Discord Community 🚀
            </a>
            <button
              type="button"
              className="portal-secondary-btn"
              onClick={onBackToHome}
            >
              Back to Home OS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
