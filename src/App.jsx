import React, { useState, useEffect } from 'react';
import { Settings, Bookmark, Sparkles } from 'lucide-react';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import SettingsModal from './components/SettingsModal';
import { generateContent } from './services/ai';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');

  // Bookmarks State
  const [view, setView] = useState('home'); // 'home' | 'saved'
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('lingoflow_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gemini_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('lingoflow_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleGenerate = async (situation) => {
    setIsLoading(true);
    setView('home'); // Switch to home view on generate
    setData(null);
    try {
      const result = await generateContent(situation, apiKey);
      setData(result);
    } catch (error) {
      // Error alert is handled in generateContent
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (item) => {
    setBookmarks(prev => {
      const exists = prev.find(b => b.vi === item.vi);
      if (exists) {
        return prev.filter(b => b.vi !== item.vi);
      }
      return [item, ...prev];
    });
  };

  const isBookmarked = (viText) => bookmarks.some(b => b.vi === viText);

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        marginTop: '20px'
      }}>
        <div onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <h1 style={{
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}>
            LingoFlow
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>베트남어 상황별 학습 도우미</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setView(view === 'home' ? 'saved' : 'home')}
            style={{
              color: view === 'saved' ? 'var(--accent-primary)' : 'var(--text-secondary)',
              padding: '8px',
              background: view === 'saved' ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <Bookmark size={22} fill={view === 'saved' ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => setIsSettingsOpen(true)}
            style={{ color: 'var(--text-secondary)', padding: '8px' }}
          >
            <Settings size={22} />
          </button>
        </div>
      </header>

      {view === 'home' ? (
        <>
          <InputSection onGenerate={handleGenerate} isLoading={isLoading} />

          {data && (
            <div style={{ animation: 'fadeIn 0.5s ease', paddingBottom: '40px' }}>

              {/* Sentences Section - Scrollable */}
              <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                유용한 문장 (10)
              </h3>
              <div className="custom-scrollbar" style={{
                marginBottom: '32px',
                maxHeight: '400px',
                overflowY: 'auto',
                paddingRight: '8px',
                marginLeft: '-8px',
                paddingLeft: '8px'
              }}>
                {data.sentences.map((item, idx) => (
                  <ResultCard
                    key={idx}
                    item={item}
                    delay={idx * 50}
                    isBookmarked={isBookmarked(item.vi)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>

              {/* Words Section - Scrollable */}
              <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                핵심 단어
              </h3>
              <div className="custom-scrollbar" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
                paddingRight: '8px'
              }}>
                {data.words.map((item, idx) => (
                  <ResultCard
                    key={idx}
                    item={item}
                    delay={(data.sentences.length + idx) * 50}
                    isBookmarked={isBookmarked(item.vi)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>

            </div>
          )}
        </>
      ) : (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bookmark size={20} className="text-accent" />
            저장한 문장 및 단어 ({bookmarks.length})
          </h2>

          {bookmarks.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-light)'
            }}>
              <p>아직 저장된 내용이 없습니다.<br />마음에 드는 문장의 하트 버튼을 눌러보세요!</p>
              <button
                onClick={() => setView('home')}
                style={{
                  marginTop: '16px',
                  color: 'var(--accent-primary)',
                  fontWeight: '600'
                }}
              >
                표현 찾으러 가기 &rarr;
              </button>
            </div>
          ) : (
            <div className="custom-scrollbar" style={{ maxHeight: '70vh', overflowY: 'auto', paddingRight: '8px' }}>
              {bookmarks.map((item, idx) => (
                <ResultCard
                  key={idx}
                  item={item}
                  delay={idx * 50}
                  isBookmarked={true}
                  onToggleBookmark={toggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .loader {
          display: inline-block;
          width: 30px;
          height: 30px;
        }
        .loader:after {
          content: " ";
          display: block;
          width: 18px;
          height: 18px;
          margin: 0;
          border-radius: 50%;
          border: 2px solid #fff;
          border-color: #fff transparent #fff transparent;
          animation: lds-dual-ring 1.2s linear infinite;
        }
        @keyframes lds-dual-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default App;
