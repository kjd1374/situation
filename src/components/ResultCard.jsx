import React from 'react';
import { Volume2 } from 'lucide-react';
import { speakVietnamese } from '../services/tts';

const ResultCard = ({ item, delay }) => {
    return (
        <div
            className="glass-panel"
            style={{
                padding: '16px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animation: `fadeInUp 0.5s ease backwards`,
                animationDelay: `${delay}ms`,
                cursor: 'pointer',
                transition: 'transform 0.2s, background 0.2s'
            }}
            onClick={() => speakVietnamese(item.vi)}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(60, 64, 80, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--bg-card)';
            }}
        >
            <div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {item.vi}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {item.en}
                </div>
            </div>

            <button
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-primary)'
                }}
            >
                <Volume2 size={20} />
            </button>
        </div>
    );
};

export default ResultCard;
