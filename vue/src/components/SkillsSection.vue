<script setup>
import { onMounted, inject } from 'vue'
import { gsap } from 'gsap'
const prefersReduced = inject('prefersReduced')

const categories = [
  { name: 'Automation & Testing', items: ['Python','pytest','CAPL','Vector CANoe','HIL','Robot Framework','TDD'] },
  { name: 'CI/CD & DevOps',       items: ['GitLab CI/CD','Jenkins','Git','GitHub','Docker'] },
  { name: 'Programming',          items: ['C/C++','Python','Java','Shell/Bash','CAPL'] },
  { name: 'Automotive & Protocols', items: ['CAN/CAN-FD','LIN','Ethernet','ASPICE','ISO 26262','ADAS','OTA/FOTA'] },
  { name: 'Systems & Databases',  items: ['Embedded Linux','RTOS','SQLite','PostgreSQL','MySQL'] },
  { name: 'ALM & Process',        items: ['Jira','Confluence','IBM DOORS','Core ALM','Agile/Scrum'] },
]

onMounted(() => {
  if (prefersReduced) return
  gsap.from('#skills .section-label', { opacity: 0, y: 18, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: '#skills', start: 'top 80%' } })
  gsap.from('#skills .section-title', { opacity: 0, y: 18, duration: 0.6, delay: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: '#skills', start: 'top 80%' } })
  document.querySelectorAll('.skill-block').forEach((el, i) => {
    gsap.from(el, { opacity: 0, y: 20, duration: 0.55, delay: i * 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' } })
  })
})
</script>

<template>
  <section id="skills">
    <p class="section-label">skills --all</p>
    <h2 class="section-title">Tools &amp; Expertise</h2>
    <div class="skills-grid">
      <div v-for="cat in categories" :key="cat.name" class="skill-block">
        <p class="skill-cat">{{ cat.name }}</p>
        <div class="skill-tags">
          <span v-for="item in cat.items" :key="item" class="tag-pill">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
.skill-block {
  background: var(--cb);
  border: 1px solid var(--br);
  padding: 1.2rem;
  transition: border-color 0.2s;
}
.skill-block:hover { border-color: rgba(34,197,94,0.25); }
.skill-cat {
  font-size: 0.72rem;
  color: var(--g);
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.skill-cat::before { content: '+ '; }
.skill-tags { display: flex; flex-wrap: wrap; gap: 0.3rem; }
@media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
</style>