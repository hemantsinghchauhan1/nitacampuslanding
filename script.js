(function () {
  const LAUNCH_DATE = new Date('2026-08-12T00:00:00+05:30')
  const TOTAL_MS = 21 * 24 * 60 * 60 * 1000

  const daysEl = document.getElementById('days-digit')
  const hoursEl = document.getElementById('hours-digit')
  const minsEl = document.getElementById('mins-digit')
  const secsEl = document.getElementById('secs-digit')
  const progressFill = document.getElementById('progress-fill')
  const pctLabel = document.getElementById('pct-label')

  let prevDays = null
  let prevHours = null
  let prevMins = null
  let prevSecs = null

  function formatNum(num) {
    return String(num).padStart(2, '0')
  }

  function triggerFlip(el) {
    if (!el) return
    el.classList.remove('flip')
    void el.offsetWidth // force reflow
    el.classList.add('flip')
  }

  function tick() {
    const now = Date.now()
    const diff = Math.max(0, LAUNCH_DATE.getTime() - now)

    const d = Math.floor(diff / 86400000)
    const h = Math.floor((diff % 86400000) / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    const s = Math.floor((diff % 60000) / 1000)
    const pct = Math.min(100, Math.max(0, Math.round((1 - diff / TOTAL_MS) * 100)))

    if (daysEl) {
      const formattedD = formatNum(d)
      if (prevDays !== null && prevDays !== formattedD) {
        triggerFlip(daysEl)
      }
      daysEl.textContent = formattedD
      prevDays = formattedD
    }

    if (hoursEl) {
      const formattedH = formatNum(h)
      if (prevHours !== null && prevHours !== formattedH) {
        triggerFlip(hoursEl)
      }
      hoursEl.textContent = formattedH
      prevHours = formattedH
    }

    if (minsEl) {
      const formattedM = formatNum(m)
      if (prevMins !== null && prevMins !== formattedM) {
        triggerFlip(minsEl)
      }
      minsEl.textContent = formattedM
      prevMins = formattedM
    }

    if (secsEl) {
      const formattedS = formatNum(s)
      if (prevSecs !== null && prevSecs !== formattedS) {
        triggerFlip(secsEl)
      }
      secsEl.textContent = formattedS
      prevSecs = formattedS
    }

    if (progressFill) {
      progressFill.style.width = `${pct}%`
    }

    if (pctLabel) {
      pctLabel.textContent = `${pct}% complete`
    }
  }

  tick()
  setInterval(tick, 1000)

  // 3D TILT EFFECT ON CARDS
  const cards = document.querySelectorAll('.card')
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (centerY - y) / 4
      const rotateY = (x - centerX) / 4

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)'
    })
  })

  // AUDIO AUTOMATIC PLAYBACK ON USER CLICK
  const audio = document.getElementById('bg-audio')
  const audioFab = document.getElementById('audio-fab')
  const audioBtn = document.getElementById('audio-toggle-btn')
  const audioTooltip = document.getElementById('audio-tooltip')

  let hasStartedPlaying = false

  function playAudio() {
    if (!audio) return
    audio.volume = 0.3
    audio.play().then(() => {
      hasStartedPlaying = true
      if (audioFab) audioFab.classList.add('playing')
      if (audioTooltip) audioTooltip.textContent = 'Music playing 🎵'
    }).catch(() => {})
  }

  function pauseAudio() {
    if (!audio) return
    audio.pause()
    if (audioFab) audioFab.classList.remove('playing')
    if (audioTooltip) audioTooltip.textContent = 'Music paused'
  }

  function toggleAudio(e) {
    if (e) e.stopPropagation()
    if (!audio) return
    if (audio.paused) {
      playAudio()
    } else {
      pauseAudio()
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio)
  }

  // Play audio whenever someone clicks anywhere on the page if not already playing
  document.addEventListener('click', () => {
    if (audio && audio.paused && !hasStartedPlaying) {
      playAudio()
    }
  })
})()
