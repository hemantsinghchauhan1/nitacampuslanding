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
})()
