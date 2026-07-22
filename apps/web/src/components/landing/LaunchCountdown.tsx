'use client'

import React, { useState, useEffect, useRef } from 'react'
import styles from './LaunchCountdown.module.css'

const LAUNCH_DATE = new Date('2026-08-12T00:00:00+05:30')
const TOTAL_MS = 21 * 24 * 60 * 60 * 1000

export const LaunchCountdown: React.FC = () => {
  const [days, setDays] = useState<number>(0)
  const [hours, setHours] = useState<number>(0)
  const [mins, setMins] = useState<number>(0)
  const [secs, setSecs] = useState<number>(0)
  const [pct, setPct] = useState<number>(0)

  const prevDays = useRef<number | null>(null)
  const prevHours = useRef<number | null>(null)
  const prevMins = useRef<number | null>(null)
  const prevSecs = useRef<number | null>(null)

  const daysRef = useRef<HTMLSpanElement>(null)
  const hoursRef = useRef<HTMLSpanElement>(null)
  const minsRef = useRef<HTMLSpanElement>(null)
  const secsRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tick = () => {
      const now = Date.now()
      const diff = Math.max(0, LAUNCH_DATE.getTime() - now)

      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      const p = Math.min(100, Math.max(0, Math.round((1 - diff / TOTAL_MS) * 100)))

      if (prevDays.current !== null && prevDays.current !== d && daysRef.current) {
        daysRef.current.classList.remove(styles.flip)
        void daysRef.current.offsetWidth // force reflow
        daysRef.current.classList.add(styles.flip)
      }
      prevDays.current = d

      if (prevHours.current !== null && prevHours.current !== h && hoursRef.current) {
        hoursRef.current.classList.remove(styles.flip)
        void hoursRef.current.offsetWidth // force reflow
        hoursRef.current.classList.add(styles.flip)
      }
      prevHours.current = h

      if (prevMins.current !== null && prevMins.current !== m && minsRef.current) {
        minsRef.current.classList.remove(styles.flip)
        void minsRef.current.offsetWidth // force reflow
        minsRef.current.classList.add(styles.flip)
      }
      prevMins.current = m

      if (prevSecs.current !== null && prevSecs.current !== s && secsRef.current) {
        secsRef.current.classList.remove(styles.flip)
        void secsRef.current.offsetWidth // force reflow
        secsRef.current.classList.add(styles.flip)
      }
      prevSecs.current = s

      setDays(d)
      setHours(h)
      setMins(m)
      setSecs(s)
      setPct(p)
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const formatNum = (num: number): string => String(num).padStart(2, '0')

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.topLabel}>NITACAMPUS</p>
        <h2 className={styles.headline}>
          Going <span className={styles.liveHighlight}>live</span> in
        </h2>

        <div className={styles.countdownWrapper}>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <span ref={daysRef} className={styles.digit}>
                {formatNum(days)}
              </span>
            </div>
            <span className={styles.label}>Days</span>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <span ref={hoursRef} className={styles.digit}>
                {formatNum(hours)}
              </span>
            </div>
            <span className={styles.label}>Hours</span>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <span ref={minsRef} className={styles.digit}>
                {formatNum(mins)}
              </span>
            </div>
            <span className={styles.label}>Mins</span>
          </div>

          <div className={styles.separator}>:</div>

          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <span ref={secsRef} className={styles.digit}>
                {formatNum(secs)}
              </span>
            </div>
            <span className={styles.label}>Secs</span>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressLabels}>
            <span>0% complete</span>
            <span>{pct}% complete</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <div className={styles.badge}>
          <span className={styles.pulsingDot} />
          <span className={styles.badgeText}>
            Building in progress — NIT Agartala Campus App
          </span>
        </div>
      </div>
    </section>
  )
}

export default LaunchCountdown
