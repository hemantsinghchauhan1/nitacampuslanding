const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 11);
targetDate.setHours(23, 59, 59, 999);

const elements = {
  days: document.getElementById('days'),
  hours: document.getElementById('hours'),
  minutes: document.getElementById('minutes'),
  seconds: document.getElementById('seconds')
};

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    Object.values(elements).forEach((el) => {
      if (el) el.textContent = '00';
    });
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  if (elements.days) elements.days.textContent = String(days).padStart(2, '0');
  if (elements.hours) elements.hours.textContent = String(hours).padStart(2, '0');
  if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, '0');
  if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

const audio = document.getElementById('bg-audio');
const audioToggle = document.getElementById('audio-toggle');

if (audio) {
  audio.volume = 0.25;
  // Keep audio muted for autoplay compliance; play muted so it's ready.
  audio.muted = true;
  audio.play().catch(() => {});

  function setIcon(isPlaying, isMuted) {
    if (!audioToggle) return;
    if (isMuted) audioToggle.textContent = '🔇';
    else audioToggle.textContent = isPlaying ? '⏸' : '🔊';
    audioToggle.setAttribute('aria-pressed', String(!isMuted && !audio.paused));
  }

  if (audioToggle) {
    setIcon(!audio.paused, audio.muted);
    audioToggle.addEventListener('click', () => {
      if (audio.muted) {
        audio.muted = false;
        audio.play().catch(() => {});
      } else if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
      setIcon(!audio.paused, audio.muted);
    });
  }
}
