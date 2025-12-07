export const speakVietnamese = (text) => {
    if (!window.speechSynthesis) {
        console.error("Browser does not support TTS");
        return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';

    // Try to find a Vietnamese voice specifically
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi'));
    if (viVoice) {
        utterance.voice = viVoice;
    }

    utterance.rate = 0.9; // Slightly slower for learning
    window.speechSynthesis.speak(utterance);
};
