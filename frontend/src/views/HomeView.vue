<template>
  <div class="home">
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">
          Poder de la <span class="underline">Fotónica</span>
        </h1>
        <p class="hero-subtitle">Innovación y Comunidad en la Ciencia</p>
        <button class="hero-button">Descubre Más</button>
      </div>
    </section>

    <section class="who-we-are" ref="whoWeAre">
      <div class="container">
        <div class="content-wrapper">
          <div class="text-content" :class="{ 'animate-in': isWhoVisible }">
            <div class="title-wrapper">
              <div class="accent-bar"></div>
              <h2 class="section-title">¿Quiénes Somos?</h2>
            </div>
            <p class="section-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div class="image-content" :class="{ 'animate-in': isWhoVisible }">
            <div class="image-frame">
              <img src="@/assets/resources/team-photo.jpg" alt="SPIE Team" class="team-image" />
            </div>
          </div>
        </div>
      </div>
    </section>


    <section class="science-for-all" ref="scienceSection">
      <div class="container">
        <div class="content-wrapper">
          <div class="image-content" :class="{ 'animate-in': isScienceVisible }">
            <div class="image-frame">
              <img src="@/assets/resources/science-photo.jpg" alt="Ciencia Para Todos" class="team-image" />
            </div>
          </div>
          <div class="text-content" :class="{ 'animate-in': isScienceVisible }">
            <div class="title-wrapper">
              <div class="accent-bar"></div>
              <h2 class="section-title">Ciencia Para Todos</h2>
            </div>
            <p class="section-description">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="join-team" ref="joinTeam">
      <div class="container">
        <div class="join-header" :class="{ 'animate-in': isJoinVisible }">
          <div class="title-wrapper">
            <div class="accent-bar"></div>
            <h2 class="section-title">¡Únete Al Equipo!</h2>
          </div>
          <p class="section-description full-width">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the.
          </p>
        </div>

        <div class="benefits-grid">
          <div class="benefit-card" :class="{ 'animate-in': isJoinVisible }">
            <div class="card-image-container">
              <img src="@/assets/resources/benefit-1.jpg" alt="Beneficio 1" class="card-img" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Beneficio</h3>
              <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>

          <div class="benefit-card delay-1" :class="{ 'animate-in': isJoinVisible }">
            <div class="card-image-container">
              <img src="@/assets/resources/benefit-2.jpg" alt="Beneficio 2" class="card-img" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Beneficio</h3>
              <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>

          <div class="benefit-card delay-2" :class="{ 'animate-in': isJoinVisible }">
            <div class="card-image-container">
              <img src="@/assets/resources/benefit-3.jpg" alt="Beneficio 3" class="card-img" />
            </div>
            <div class="card-content">
              <h3 class="card-title">Beneficio</h3>
              <p class="card-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    // Refs for sections
    const whoWeAre = ref(null)
    const videoSection = ref(null)
    const scienceSection = ref(null)
    const joinTeam = ref(null) // New Ref

    // Visibility states
    const isWhoVisible = ref(false)
    const isVideoVisible = ref(false)
    const isScienceVisible = ref(false)
    const isJoinVisible = ref(false) // New State

    const handleScroll = () => {
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      const triggerPoint = windowHeight * 0.75

      // Check Who We Are
      if (whoWeAre.value) {
        const rect = whoWeAre.value.getBoundingClientRect()
        if (rect.top <= triggerPoint) isWhoVisible.value = true
      }

      // Check Video Section
      if (videoSection.value) {
        const rect = videoSection.value.getBoundingClientRect()
        if (rect.top <= triggerPoint) isVideoVisible.value = true
      }

      // Check Science Section
      if (scienceSection.value) {
        const rect = scienceSection.value.getBoundingClientRect()
        if (rect.top <= triggerPoint) isScienceVisible.value = true
      }

      // Check Join Team Section
      if (joinTeam.value) {
        const rect = joinTeam.value.getBoundingClientRect()
        if (rect.top <= triggerPoint) isJoinVisible.value = true
      }
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
      handleScroll()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      whoWeAre,
      videoSection,
      scienceSection,
      joinTeam,
      isWhoVisible,
      isVideoVisible,
      isScienceVisible,
      isJoinVisible
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.home {
  min-height: 100vh;
  background-color: #1a1a1a;
  padding-bottom: 50px;
}

/* --- Hero Section --- */
.hero {
  position: relative;
  height: calc(100vh - 104px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/resources/hero-background.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  z-index: -1;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 0 40px;
  max-width: 1200px;
}

.hero-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 96px;
  font-weight: 400;
  color: #ffffff;
  margin: 0 0 24px 0;
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-title .underline::after {
  content: '';
  position: absolute;
  bottom: 8px; left: 0; width: 100%; height: 4px;
  background-color: #ec1f2a;
}
.hero-title .underline { position: relative; display: inline-block; }

.hero-subtitle {
  font-family: var(--font-body, sans-serif);
  font-size: 32px;
  font-weight: 300;
  color: #ffffff;
  margin: 0 0 48px 0;
}

.hero-button {
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  padding: 16px 48px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}
.hero-button:hover {
  background-color: #d11b24;
  transform: translateY(-2px);
}

/* --- Shared Layout Classes --- */
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.accent-bar {
  width: 18px;
  height: 80px;
  background-color: #ec1f2a;
  margin-right: 24px;
  flex-shrink: 0;
}

.section-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 64px;
  font-weight: 400;
  color: #ffffff;
  margin: 0;
  line-height: 1;
}

.section-description {
  font-family: var(--font-body, sans-serif);
  font-size: 18px;
  line-height: 1.6;
  color: #e0e0e0;
  font-weight: 300;
}

/* Animation Base */
.text-content, .image-content, .join-header, .benefit-card {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
}

.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* --- Previous Sections (Who We Are / Science) --- */
.who-we-are, .science-for-all {
  background-color: transparent;
  padding: 100px 20px;
  color: #ffffff;
}

.text-content, .image-content { flex: 1; }
.image-content { transition-delay: 0.2s; }

.image-frame {
  position: relative;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.team-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.5s ease;
}

.image-frame:hover .team-image { transform: scale(1.03); }

/* --- YouTube Video Section --- */
.video-section {
  padding: 80px 20px;
  background-color: transparent;
}

.video-wrapper {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease-out;
}

.video-container {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}

/* --- NEW: Join The Team Section --- */
.join-team {
  padding: 80px 20px 120px;
  color: #ffffff;
  /* Optional: slightly different shade or keep transparent */
  background-color: transparent;
}

.join-header {
  margin-bottom: 80px;
}

.section-description.full-width {
  max-width: 900px;
}

/* Grid Layout */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* Benefit Cards */
.benefit-card {
  background-color: #252525; /* Dark grey card background */
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.8s ease-out, transform 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-10px);
}

.card-image-container {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.benefit-card:hover .card-img {
  transform: scale(1.05);
}

.card-content {
  padding: 30px;
  text-align: center;
}

.card-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 28px;
  color: #ffffff;
  margin: 0 0 16px 0;
  font-weight: 400;
}

.card-text {
  font-family: var(--font-body, sans-serif);
  font-size: 16px;
  color: #b0b0b0;
  line-height: 1.5;
  margin: 0;
}

/* Staggered Animation Delays for Cards */
.benefit-card.delay-1 { transition-delay: 0.2s; }
.benefit-card.delay-2 { transition-delay: 0.4s; }

/* --- Responsiveness --- */
@media (max-width: 1024px) {
  .hero-title { font-size: 72px; }
  .section-title { font-size: 52px; }
  .accent-bar { height: 60px; width: 14px; }
  .content-wrapper { gap: 40px; }

  /* Tablet: 2 columns or adjust grid?
     Usually 3 columns fit on tablet landscape,
     but maybe reduce gap */
  .benefits-grid { gap: 20px; }
}

@media (max-width: 768px) {
  /* Stack sections */
  .content-wrapper {
    flex-direction: column;
    text-align: left;
  }

  .image-content { transition-delay: 0s; margin-bottom: 32px; }

  .hero-title { font-size: 48px; }
  .section-title { font-size: 42px; }
  .accent-bar { height: 50px; width: 12px; margin-right: 16px; }

  /* Stack Cards on Mobile */
  .benefits-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  /* Reset delays on mobile so they load faster */
  .benefit-card.delay-1,
  .benefit-card.delay-2 {
    transition-delay: 0s;
  }
}
</style>
