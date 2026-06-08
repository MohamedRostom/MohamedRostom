import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal(selector, opts = {}) {
  let triggers = []

  onMounted(() => {
    const els = document.querySelectorAll(selector)
    els.forEach((el, i) => {
      const st = gsap.fromTo(el,
        { opacity: 0, y: opts.y ?? 28 },
        {
          opacity: 1,
          y: 0,
          duration: opts.duration ?? 0.75,
          delay: (opts.stagger ?? 0) * i,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: opts.start ?? 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
      triggers.push(st.scrollTrigger)
    })
  })

  onUnmounted(() => {
    triggers.forEach(t => t && t.kill())
    triggers = []
  })
}

export function useSectionTitle(selector) {
  useScrollReveal(selector, { y: 24, duration: 0.7, start: 'top 85%' })
}
