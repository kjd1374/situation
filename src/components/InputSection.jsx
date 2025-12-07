import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const InputSection = ({ onGenerate, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            onGenerate(input);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '8px', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                어떤 상황인가요?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', fontSize: '14px' }}>
                예: "시장에서 과일 사기" 또는 "길 물어보기"
            </p>

            <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="상황을 설명해주세요... (예: 택시타기)"
                    style={{
                        width: '100%',
                        padding: '16px',
                        paddingRight: '120px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-input)',
                        border: '1px solid var(--border-light)',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        outline: 'none',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--accent-primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
                />
                <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    style={{
                        position: 'absolute',
                        right: '8px',
                        top: '8px',
                        bottom: '8px',
                        padding: '0 20px',
                        background: 'var(--accent-primary)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'white',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: isLoading || !input.trim() ? 0.7 : 1,
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(0.96)')}
                    onMouseUp={(e) => !isLoading && (e.currentTarget.style.transform = 'scale(1)')}
                >
                    {isLoading ? (
                        <span className="loader">...</span>
                    ) : (
                        <>
                            생성하기 <Sparkles size={16} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default InputSection;
