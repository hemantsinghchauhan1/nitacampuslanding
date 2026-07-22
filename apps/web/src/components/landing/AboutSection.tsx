import React from 'react'

export const AboutSection: React.FC = () => {
  return (
    <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#FFFFFF' }}>
      <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#0F172A', marginBottom: '16px' }}>
        About NITACAMPUS
      </h2>
      <p style={{ fontSize: '16px', color: '#64748B', maxWidth: '700px', margin: '0 auto' }}>
        Empowering students with seamless access to course materials, campus updates, event management, and peer collaboration.
      </p>
    </section>
  )
}

export default AboutSection
