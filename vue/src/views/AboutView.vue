<script setup>
import { onMounted, inject, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const prefersReduced = inject('prefersReduced')
const quoteRef = ref(null)

const categories = [
  { name: 'Programming Languages',  items: ['C/C++','Python','Java','CAPL','Shell/Bash'] },
  { name: 'Operating Systems',      items: ['Linux (Embedded)','Linux (Real-Time)','Windows'] },
  { name: 'Automation & Testing',   items: ['pytest','Vector CANoe','Vector Test Studio','HIL','Robot Framework','TDD'] },
  { name: 'DevOps & CI/CD',         items: ['GitLab CI/CD','Jenkins','Git','GitHub'] },
  { name: 'Tools & IDEs',           items: ['VS Code','IntelliJ','Vector CANoe/Test Studio','UML','Postman'] },
  { name: 'Databases',              items: ['SQLite','PostgreSQL','MySQL'] },
  { name: 'Automotive & Protocols', items: ['CAN/CAN-FD','LIN','Ethernet','ASPICE','ISO 26262','ADAS','OTA/FOTA','V2V'] },
  { name: 'ALM & Collaboration',    items: ['Jira','Confluence','IBM DOORS','Core ALM','STARC','GitHub','GitLab'] },
  { name: 'Methodologies',          items: ['Agile/Scrum','TDD','ASPICE','V&V'] },
]

const interests = [
  'Open-source contributions',
  'IoT projects',
  'Continuous learning in software development',
]

const quoteText = '"The main goal of engineers is to decrease time to finish a task with high Quality and Efficiency. Anything in the Software Industry can be done — but with a cost. Based on the inputs, engineers set priority and start working on it."'

function typewrite(el, text, speed = 20) {
  let i = 0
  el.textContent = ''
  const id = setInterval(() => {
    el.textContent += text[i++]
    if (i >= text.length) clearInterval(id)
  }, speed)
}

onMounted(() => {
  if (prefersReduced) {
    if (quoteRef.value) quoteRef.value.textContent = quoteText
    return
  }

  gsap.from('.about-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-header', start: 'top 85%' } })

  gsap.from('.about-text', { opacity: 0, y: 18, stagger: 0.12, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.about-text', start: 'top 88%' } })

  gsap.from('.lang-pill', { opacity: 0, x: -18, stagger: 0.1, duration: 0.5, ease: 'power3.out',
    scrollTrigger: { trigger: '.lang-pills', start: 'top 90%' } })

  ScrollTrigger.create({
    trigger: '.philosophy-box', start: 'top 82%', once: true,
    onEnter: () => {
      gsap.from('.philosophy-box', { opacity: 0, y: 16, duration: 0.5, ease: 'power3.out' })
      if (quoteRef.value) typewrite(quoteRef.value, quoteText)
    },
  })

  gsap.from('.interests-header', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '.interests-header', start: 'top 88%' } })

  gsap.from('.interest-item', { opacity: 0, x: -16, stagger: 0.1, duration: 0.45, ease: 'power3.out',
    scrollTrigger: { trigger: '.interests-list', start: 'top 90%' } })

  gsap.from('.availability-box', { opacity: 0, y: 14, duration: 0.5, ease: 'power3.out',
    scrollTrigger: { trigger: '.availability-box', start: 'top 90%' } })

  gsap.from('.skills-header', { opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
    scrollTrigger: { trigger: '.skills-header', start: 'top 85%' } })

  document.querySelectorAll('.skill-block').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 22, duration: 0.55, delay: i * 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' } })
  })

  document.querySelectorAll('.tag-pill').forEach((el, i) => {
    gsap.from(el, { opacity: 0, scale: 0.8, duration: 0.3, delay: i * 0.018, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: el, start: 'top 95%' } })
  })
})
</script>

<template>
  <div class="page">
    <div class="inner">

      <div class="about-header">
        <p class="section-label">about.txt</p>
        <h1 class="section-title">About Me</h1>
      </div>

      <p class="about-text">
        Software Engineer with 4+ years of experience in embedded systems and automation,
        specializing in high-performance solutions for next-generation embedded and SoC platforms.
        ISTQB-certified, with strong expertise in C++, Python, Java, and Linux.
      </p>
      <p class="about-text">
        Skilled in test automation, CI/CD, and Agile delivery, with a proven record of driving
        efficiency and delivering complex projects in global, cross-functional environments.
        Currently Resident Engineer on-site at Mercedes-Benz via Luxoft GmbH — 4 OEM clients:
        Mercedes-Benz, Nissan, Volkswagen, and Renault.
      </p>

      <div class="lang-pills">
        <span class="lang-pill">English · Fluent</span>
        <span class="lang-pill">German · Basic</span>
        <span class="lang-pill">Arabic · Native</span>
      </div>

      <div class="philosophy-box">
        <p class="philosophy-label">Philosophy</p>
        <p class="philosophy-text" ref="quoteRef">{{ quoteText }}</p>
      </div>

      <hr class="section-divider" />

      <div class="interests-header">
        <p class="section-label">profile --personal</p>
        <h2 class="section-title">Interests &amp; Availability</h2>
      </div>

      <ul class="interests-list">
        <li v-for="item in interests" :key="item" class="interest-item">{{ item }}</li>
      </ul>

      <div class="availability-box">
        <span class="avail-dot" aria-hidden="true">●</span>
        Open to relocation and travel as required by project needs.
      </div>

      <hr class="section-divider" />

      <div class="skills-header">
        <p class="section-label">skills --all</p>
        <h2 class="section-title">Tools &amp; Expertise</h2>
      </div>

      <div class="skills-grid">
        <div v-for="cat in categories" :key="cat.name" class="skill-block">
          <p class="skill-cat">{{ cat.name }}</p>
          <div class="skill-tags">
            <span v-for="item in cat.items" :key="item" class="tag-pill">{{ item }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.about-text { font-size: 0.85rem; color: var(--t); line-height: 1.85; margin-bottom: 1rem; }

.lang-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 1rem 0; }
.lang-pill { font-size: 0.7rem; border: 1px solid var(--br); padding: 0.2rem 0.55rem; color: var(--m); }

.philosophy-box {
  background: var(--cb); border: 1px solid var(--br);
  border-left: 2px solid var(--gd); padding: 1.25rem; margin-top: 0.5rem;
}
.philosophy-label { font-size: 0.68rem; color: var(--g); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; }
.philosophy-label::before { content: '// '; }
.philosophy-text { font-size: 0.82rem; color: var(--m); line-height: 1.85; font-style: italic; min-height: 4em; }

.interests-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.interest-item { font-size: 0.83rem; color: var(--t); padding-left: 1.2rem; position: relative; }
.interest-item::before { content: '>>'; position: absolute; left: 0; color: var(--gd); font-size: 0.6rem; top: 0.3em; }

.availability-box {
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.8rem; color: var(--m);
  border: 1px solid var(--br); border-left: 2px solid var(--gd);
  padding: 0.75rem 1rem; background: var(--cb);
}
.avail-dot { color: var(--g); font-size: 0.6rem; animation: blink 1.4s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.skill-block { background: var(--cb); border: 1px solid var(--br); padding: 1.2rem; transition: border-color 0.2s; }
.skill-block:hover { border-color: rgba(34,197,94,0.25); }
.skill-cat { font-size: 0.72rem; color: var(--g); font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; }
.skill-cat::before { content: '+ '; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }

@media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
</style>
