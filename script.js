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

  // 3D TILT EFFECT ON CARDS (.card-3d)
  const cards = document.querySelectorAll('.card-3d, .card')
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (centerY - y) / 4
      const rotateY = (x - centerX) / 4

      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
    })

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)'
    })
  })

  // AUDIO AUTOMATIC PLAYBACK ON ANY USER INTERACTION / CLICK
  const audio = document.getElementById('bg-audio')
  const audioFab = document.getElementById('audio-fab')
  const audioBtn = document.getElementById('audio-toggle-btn')
  const audioTooltip = document.getElementById('audio-tooltip')

  let hasStartedPlaying = false

  function playAudio() {
    if (!audio) return
    audio.volume = 0.35
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

  if (audioFab) {
    audioFab.addEventListener('click', toggleAudio)
  }
  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio)
  }

  function handleUserGesture() {
    if (audio && audio.paused && !hasStartedPlaying) {
      playAudio()
    }
  }

  ['click', 'touchstart', 'mousedown', 'pointerdown', 'keydown'].forEach((eventType) => {
    window.addEventListener(eventType, handleUserGesture, { passive: true })
    document.addEventListener(eventType, handleUserGesture, { passive: true })
  })

  // FORM SUBMISSION HANDLING -> SENDS EMAIL NOTIFICATION TO snigdhasarkarsnigi@gmail.com
  const notifyForm = document.getElementById('notify-form')
  const notifyEmail = document.getElementById('notify-email')
  const notifyBtn = document.getElementById('notify-submit-btn')
  const notifyMsg = document.getElementById('notify-msg')

  if (notifyForm) {
    notifyForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const emailVal = notifyEmail ? notifyEmail.value.trim() : ''
      if (!emailVal) return

      if (notifyBtn) {
        notifyBtn.disabled = true
        const btnText = notifyBtn.querySelector('span')
        if (btnText) btnText.textContent = 'Submitting...'
      }

      try {
        await fetch('https://formsubmit.co/ajax/snigdhasarkarsnigi@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: emailVal,
            _subject: 'New NITACAMPUS Subscriber Email!',
            _template: 'table'
          })
        })
      } catch (err) {
        // Fallback smooth behavior
      }

      notifyForm.style.display = 'none'
      if (notifyMsg) {
        notifyMsg.style.display = 'block'
      }
    })
  }
})()
