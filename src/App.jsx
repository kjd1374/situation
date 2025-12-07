import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import InputSection from './components/InputSection';
import ResultCard from './components/ResultCard';
import SettingsModal from './components/SettingsModal';
import { generateContent } from './services/ai';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_key') || '');

  useEffect(() => {
    localStorage.setItem('gemini_key', apiKey);
  }, [apiKey]);

  const handleGenerate = async (situation) => {
    setIsLoading(true);
    setData(null);
    try {
      const result = await generateContent(situation, apiKey);
      setData(result);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        marginTop: '20px'
      }}>
        <div>
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
        <button
          onClick={() => setIsSettingsOpen(true)}
          style={{ color: 'var(--text-secondary)', padding: '8px' }}
        >
          <Settings size={22} />
        </button>
      </header>

      <InputSection onGenerate={handleGenerate} isLoading={isLoading} />

      {data && (
        <div style={{ animation: 'fadeIn 0.5s ease' }}>

          {/* Sentences Section */}
          <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            유용한 문장
          </h3>
          <div style={{ marginBottom: '32px' }}>
            {data.sentences.map((item, idx) => (
              <ResultCard key={idx} item={item} delay={idx * 100} />
            ))}
          </div>

          {/* Words Section */}
          <h3 style={{ marginBottom: '16px', color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            핵심 단어
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            {data.words.map((item, idx) => (
              <ResultCard key={idx} item={item} delay={(data.sentences.length + idx) * 100} />
            ))}
          </div>

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
