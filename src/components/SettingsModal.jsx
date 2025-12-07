import React from 'react';
import { X, Key } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose, apiKey, setApiKey }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '24px', background: 'var(--bg-secondary)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Key size={20} color="var(--accent-primary)" />
                        설정
                    </h3>
                    <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Gemini API 키
                    </label>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="API 키를 입력하세요..."
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: 'var(--radius-sm)',
                            background: 'var(--bg-input)',
                            border: '1px solid var(--border-light)',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <p style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-muted)' }}>
                        비워두면 데모 모드(Mock Mode)로 작동합니다.
                        <br />
                        무료 키 발급받기: <a href="https://aistudio.google.com/app/apikey" target="_blank" style={{ color: 'var(--accent-primary)' }}>Google AI Studio</a>.
                    </p>
                </div>

                <button
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '12px',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: '600'
                    }}
                >
                    저장 및 닫기
                </button>
            </div>
        </div>
    );
};

export default SettingsModal;
