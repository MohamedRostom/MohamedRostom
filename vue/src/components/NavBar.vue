<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const menuOpen = ref(false)
const links = [
  { to: '/',           label: 'home' },
  { to: '/about',      label: 'about' },
  { to: '/experience', label: 'experience' },
  { to: '/projects',   label: 'projects' },
  { to: '/contact',    label: 'contact' },
]
</script>

<template>
  <nav>
    <RouterLink to="/" class="nav-logo">Mohamed Rostom</RouterLink>

    <ul class="nav-links">
      <li v-for="l in links" :key="l.to">
        <RouterLink :to="l.to" exact-active-class="active">{{ l.label }}</RouterLink>
      </li>
    </ul>

    <button class="nav-burger" :aria-expanded="menuOpen" aria-label="Toggle menu"
            @click="menuOpen = !menuOpen">
      <span></span><span></span><span></span>
    </button>

    <Transition name="menu">
      <ul v-if="menuOpen" class="nav-mobile" @click="menuOpen = false">
        <li v-for="l in links" :key="l.to">
          <RouterLink :to="l.to" exact-active-class="active">{{ l.label }}</RouterLink>
        </li>
      </ul>
    </Transition>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 2.5rem;
  background: rgba(10,10,10,0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--br);
}

.nav-logo {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--g);
}
.nav-logo::before { content: '> '; color: var(--m); }

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}
.nav-links a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.78rem;
  color: var(--m);
  text-decoration: none;
  transition: color 0.2s;
  position: relative;
}
.nav-links a::before { content: './'; }
.nav-links a:hover,
.nav-links a.active  { color: var(--g); }
.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0; right: 0;
  height: 1px;
  background: var(--g);
}

.nav-burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.nav-burger span {
  display: block;
  width: 20px;
  height: 1px;
  background: var(--g);
}

.nav-mobile {
  position: fixed;
  top: 45px; left: 0; right: 0;
  background: rgba(10,10,10,0.98);
  border-bottom: 1px solid var(--br);
  list-style: none;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.nav-mobile a {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.88rem;
  color: var(--m);
  text-decoration: none;
  transition: color 0.2s;
}
.nav-mobile a::before { content: './'; }
.nav-mobile a:hover,
.nav-mobile a.active  { color: var(--g); }

.menu-enter-active, .menu-leave-active { transition: opacity 0.2s, transform 0.2s; }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 768px) {
  .nav-links  { display: none; }
  .nav-burger { display: flex; }
  nav { padding: 0.75rem 1.25rem; }
}
</style>
