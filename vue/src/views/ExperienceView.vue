<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')

const jobs = [
  {
    title: 'Software Automation Test Engineer',
    badge: 'Resident Eng.',
    company: 'Mercedes-Benz ADAS Project (via Luxoft GmbH)',
    period: 'Jul 2024 – Present',
    bullets: [
      'Contributing in automation and CI/CD initiatives by designing and implementing pipelines in GitLab CI/CD, streamlining build, integration, and validation of automotive software.',
      'Developed reusable Python libraries and GitLab pipelines to automatically package, version, and publish components — enabling consistent reuse across ADAS ECU projects and reducing delivery effort.',
      'Designed and implemented test automation frameworks using Python, CAPL, and Vector CANoe for ECU validation of ADAS functions including sensor fusion, environment perception, and driver assistance features.',
      'Maintained and extended HIL (Hardware-in-the-Loop) environments for ADAS ECU testing, ensuring robust validation of real-time sensor inputs and vehicle communication protocols.',
      'Selected as Resident Engineer on-site at Mercedes-Benz, collaborating directly with OEM engineers to debug integration issues, optimize automation workflows, and ensure ASPICE compliance.',
      'Authored and maintained detailed technical documentation (Jira/Confluence) covering CI/CD workflows, test frameworks, and release pipelines — ensuring traceability of ADAS requirements through V&V processes.',
      'Collaborated with cross-functional R&D teams to harmonize validation strategies and automation frameworks.',
    ],
    tags: ['Python','CAPL','GitLab CI/CD','Vector CANoe','HIL','ASPICE','Jira','Confluence'],
  },
  {
    title: 'Software Engineer',
    badge: null,
    company: 'Valeo — Client: Nissan, Volkswagen',
    period: 'Nov 2022 – Jul 2024',
    bullets: [
      'Extensive experience in embedded software design, development, implementation, and testing on Linux platforms and real-time systems.',
      'Strong knowledge of embedded Linux programming, system-level software architecture, and best practices across the full software development lifecycle.',
      'Hands-on expertise in developing and maintaining software update and configuration management components for telematics devices using C/C++ and SQLite.',
      'Contributed to projects involving vehicle-to-vehicle (V2V) communication, vehicle diagnostics, and remote firmware updates (OTA/FOTA).',
      'Proficient in debugging complex software and hardware interactions, ensuring robust and reliable solutions.',
      'Engaged with system teams and customers via email and online meetings to clarify requirements and align on deliverables.',
      'Conducted regular technical and design review meetings with stakeholders to ensure alignment on requirements, design, and testing.',
    ],
    tags: ['C/C++','Python','CAPL','SQLite','Embedded Linux','RTOS','V2V','OTA/FOTA'],
  },
  {
    title: 'Validation Engineer',
    badge: null,
    company: 'Valeo — Client: Nissan, Renault',
    period: 'Oct 2021 – Oct 2022',
    bullets: [
      'Designed and executed comprehensive validation test plans for automotive embedded systems.',
      'Conducted a wide range of testing activities: smoke, regression, exploratory, daily verification, negative, usability, functionality, embedded system, and feature interaction testing.',
      'Installed and configured daily software builds in test environments to enable accurate and timely testing.',
      'Analyzed test data, documented results, and provided clear, actionable reports for stakeholders.',
      'Executed Verification & Validation (V&V) procedures to ensure all requirements were met; tracked results and communicated status updates.',
      'Managed CI/CD daily validation testing and contributed to the automation of feature test cases.',
      'Maintained HIL (Hardware-in-the-Loop) testing environments to ensure robust validation of software components.',
      'Identified and resolved blocked test cases, enabling their inclusion in automated pipelines.',
      'Created and maintained detailed test documentation including test plans, cases, and reports using Core ALM and IBM Rational DOORS.',
      'Participated in daily meetings with feature leads to ensure alignment with project standards and testing requirements.',
    ],
    tags: ['Python','CAPL','Vector CANoe','Bash','Jenkins','Core ALM','IBM DOORS'],
  },
]

const certs = [
  { name: 'ISTQB Certified Tester Foundation Level',   id: 'ID: 221026031',                              issuer: 'ISTQB' },
  { name: 'ISTQB Agile Tester',                         id: 'ID: 230817023',                              issuer: 'ISTQB' },
  { name: 'Modern C++ (C++11/14/17)',                   id: 'UC-33d0e302-7695-4cb7-aca4-87644f7565ee',   issuer: 'Udemy' },
  { name: 'Object Oriented Programming Specialization', id: 'NGE9PDT4GKCB',                               issuer: 'Coursera' },
]

onMounted(() => {
  if (prefersReduced) return

  gsap.from('.exp-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.exp-header', start: 'top 85%' } })

  gsap.from('.timeline-line', {
    scaleY: 0, transformOrigin: 'top center', duration: 1.4, ease: 'power2.out',
    scrollTrigger: { trigger: '.timeline', start: 'top 80%' },
  })

  document.querySelectorAll('.job-card').forEach((el, i) => {
    gsap.from(el, { opacity: 0, x: 28, duration: 0.65, delay: i * 0.14, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
    const dot = el.querySelector('.timeline-dot')
    if (dot) gsap.from(dot, { scale: 0, duration: 0.4, delay: i * 0.14 + 0.2, ease: 'back.out(2)',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })

  gsap.from('.edu-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.edu-header', start: 'top 85%' } })

  document.querySelectorAll('.edu-card').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 24, duration: 0.65, delay: i * 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
})
</script>

<template>
  <div class="page">
    <div class="inner">

      <div class="exp-header">
        <p class="section-label">experience --list</p>
        <h1 class="section-title">Experience</h1>
      </div>

      <div class="timeline">
        <div class="timeline-line" aria-hidden="true"></div>
        <div v-for="job in jobs" :key="job.title" class="job-card glass">
          <span class="timeline-dot" aria-hidden="true"></span>
          <p class="job-title">
            {{ job.title }}
            <span v-if="job.badge" class="job-badge">{{ job.badge }}</span>
          </p>
          <p class="job-company">{{ job.company }}</p>
          <p class="job-period">{{ job.period }}</p>
          <ul class="job-bullets">
            <li v-for="b in job.bullets" :key="b">{{ b }}</li>
          </ul>
          <div class="job-tags">
            <span v-for="t in job.tags" :key="t" class="tag-pill">{{ t }}</span>
          </div>
        </div>
      </div>

      <hr class="section-divider" />

      <div class="edu-header">
        <p class="section-label">education.txt</p>
        <h2 class="section-title">Education &amp; Certifications</h2>
      </div>

      <div class="edu-grid">
        <div class="edu-card glass">
          <p class="edu-card-label">Education</p>
          <p class="edu-degree">B.Sc. in Communications and Electronics Engineering</p>
          <p class="edu-inst">Faculty of Engineering, Alexandria University, Egypt</p>
          <p class="edu-period">2014 – 2019</p>
        </div>
        <div class="edu-card glass">
          <p class="edu-card-label">Certifications</p>
          <div class="cert-list">
            <div v-for="c in certs" :key="c.name" class="cert-item">
              <div class="cert-row">
                <p class="cert-name">{{ c.name }}</p>
                <span class="cert-issuer">{{ c.issuer }}</span>
              </div>
              <p class="cert-id">{{ c.id }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.timeline { position: relative; padding-left: 1.75rem; }
.timeline-line {
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(to bottom, var(--gd), transparent);
}

.job-card { position: relative; padding: 1.5rem; margin-bottom: 0.75rem; }
.timeline-dot {
  position: absolute; left: -2.15rem; top: 1.6rem;
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--g); box-shadow: 0 0 8px rgba(34,197,94,0.6);
}

.job-title   { font-size: 0.92rem; font-weight: 700; color: #E2E8F0; margin-bottom: 0.2rem; }
.job-badge   { font-size: 0.65rem; border: 1px solid var(--gd); color: var(--g); padding: 0.1rem 0.45rem; margin-left: 0.5rem; vertical-align: middle; }
.job-company { font-size: 0.8rem; color: var(--a); margin-bottom: 0.15rem; }
.job-period  { font-size: 0.72rem; color: var(--m); margin-bottom: 0.9rem; }

.job-bullets { list-style: none; margin-bottom: 1rem; }
.job-bullets li { font-size: 0.82rem; color: var(--t); padding-left: 1.5rem; position: relative; margin-bottom: 0.35rem; line-height: 1.65; }
.job-bullets li::before { content: '>>>'; position: absolute; left: 0; color: var(--gd); font-size: 0.62rem; top: 0.28em; }
.job-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.edu-card { padding: 1.5rem; }
.edu-card-label { font-size: 0.68rem; color: var(--g); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 1.1rem; }
.edu-card-label::before { content: '// '; color: var(--gd); }
.edu-degree { font-size: 0.9rem; font-weight: 700; color: #E2E8F0; margin-bottom: 0.35rem; line-height: 1.4; }
.edu-inst   { font-size: 0.82rem; color: var(--t); margin-bottom: 0.25rem; }
.edu-period { font-size: 0.72rem; color: var(--m); }

.cert-list { display: flex; flex-direction: column; gap: 0.8rem; }
.cert-item { padding-bottom: 0.8rem; border-bottom: 1px solid var(--br); }
.cert-item:last-child { border-bottom: none; padding-bottom: 0; }
.cert-row { display: flex; align-items: baseline; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.15rem; }
.cert-name   { font-size: 0.84rem; color: #E2E8F0; flex: 1; line-height: 1.4; }
.cert-issuer { font-size: 0.63rem; color: var(--g); border: 1px solid var(--gd); padding: 0.05rem 0.35rem; white-space: nowrap; flex-shrink: 0; }
.cert-id     { font-size: 0.67rem; color: var(--m); word-break: break-all; }

@media (max-width: 640px) { .edu-grid { grid-template-columns: 1fr; } }
</style>
