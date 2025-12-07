import React from 'react';
import { Volume2, Heart } from 'lucide-react';
import { speakVietnamese } from '../services/tts';

const ResultCard = ({ item, delay, isBookmarked, onToggleBookmark }) => {
    return (
        <div
            className="glass-panel"
            style={{
                padding: '16px',
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px',
                animation: `fadeInUp 0.5s ease backwards`,
                animationDelay: `${delay} ms`,
                cursor: 'default',
                transition: 'transform 0.2s, background 0.2s'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(60, 64, 80, 0.6)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'var(--bg-card)';
            }}
        >
            <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => speakVietnamese(item.vi)}>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px', color: 'var(--text-primary)' }}>
                    {item.vi}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {item.en}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleBookmark(item);
                    }}
                    style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: isBookmarked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255,255,255,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isBookmarked ? '#ef4444' : 'var(--text-muted)',
                        transition: 'all 0.2s'
                    }}
                >
                    <Heart size={20} fill={isBookmarked ? "currentColor" : "none"} />
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        speakVietnamese(item.vi);
                    }}
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
        </div>
    );
};

export default ResultCard;
