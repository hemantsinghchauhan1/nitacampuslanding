import React from 'react'

export const HeroSection: React.FC = () => {
  return (
    <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#0F172A', marginBottom: '16px' }}>
        Welcome to NITACAMPUS
      </h1>
      <p style={{ fontSize: '18px', color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>
        The official campus hub and super-app for NIT Agartala students.
      </p>
    </section>
  )
}

export default HeroSection
