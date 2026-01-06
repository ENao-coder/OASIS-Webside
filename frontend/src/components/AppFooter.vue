<template>
  <footer class="footer">
    <div class="footer-line"></div>

    <div class="container">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-brand">
            <div class="brand-accent"></div>
            <h2 class="brand-title">OASIS SPIE UG</h2>
          </div>
          <p class="footer-description">
            Promoviendo el conocimiento científico a través de la comunicación y la curiosidad.
          </p>
          <ul class="footer-links">
            <li><a href="#">Proyectos de Investigación</a></li>
            <li><a href="#">Galería</a></li>
            <li><a href="#">Eventos</a></li>
          </ul>
        </div>

        <div class="footer-right">
          <h3 class="social-title">Siguenos en Redes</h3>
          <div class="social-icons">
            <a href="https://facebook.com" target="_blank" class="social-btn facebook" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" class="social-btn instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="https://tiktok.com" target="_blank" class="social-btn tiktok" aria-label="TikTok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">
          &copy; {{ new Date().getFullYear() }} <span class="text-white">OASIS SPIE UG</span>
        </p>
        <p class="credits">Desarrollado para la divulgación científica.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'OasisFooter',
}
</script>

<style scoped>
/* Variables for easy theme adjustments */
:root {
  --oasis-red: #ec1f2a;
  --oasis-dark: #121212;
  --oasis-gray: #1e1e1e;
  --text-main: #ffffff;
  --text-muted: #a0a0a0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer {
  background: linear-gradient(to bottom, var(--oasis-gray, #1e1e1e), var(--oasis-dark, #121212));
  color: var(--text-main, white);
  padding: 0;
  margin-top: 0;
  position: relative;
  font-family: 'Inter', system-ui, sans-serif; /* Recommend using Inter or Roboto */
}

/* Decorative top line */
.footer-line {
  height: 4px;
  width: 100%;
  background: linear-gradient(90deg, var(--oasis-red, #ec1f2a) 0%, #ff4d58 100%);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  padding: 60px 0 40px;
  flex-wrap: wrap;
  gap: 40px;
}

/* --- Left Section Styling --- */
.footer-left {
  flex: 1;
  min-width: 300px;
  max-width: 600px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.brand-accent {
  width: 7px;
  height: 48px;
  background-color: var(--oasis-red, #ec1f2a);
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(236, 31, 42, 0.4);
}

.brand-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 1px;
  background: linear-gradient(90deg, #fff, #e0e0e0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-description {
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-muted, #a0a0a0);
  margin-bottom: 32px;
  max-width: 480px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns for links */
  gap: 12px;
}

.footer-links li a {
  color: var(--text-main, white);
  text-decoration: none;
  font-size: 17px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 16px;
}

/* Animated bullet points */
.footer-links li a::before {
  content: '';
  position: absolute;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: var(--oasis-red, #ec1f2a);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.footer-links li a:hover {
  transform: translateX(5px);
  color: #fff;
}

.footer-links li a:hover::before {
  background-color: #fff;
  box-shadow: 0 0 8px #fff;
}

/* --- Right Section Styling --- */
.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  min-width: 250px;
}

.social-title {
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--text-muted, #a0a0a0);
  margin-bottom: 20px;
  font-weight: 600;
}

.social-icons {
  display: flex;
  gap: 16px;
}

.social-btn {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.social-btn svg {
  width: 24px;
  height: 24px;
  fill: currentColor;
}

/* Social Hover Effects */
.social-btn:hover {
  transform: translateY(-5px);
  border-color: transparent;
}

.social-btn.facebook:hover {
  background-color: #1877f2;
  box-shadow: 0 8px 20px rgba(24, 119, 242, 0.3);
}

.social-btn.instagram:hover {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);
  box-shadow: 0 8px 20px rgba(214, 36, 159, 0.3);
}

.social-btn.tiktok:hover {
  background-color: #fff;
  color: #000;
  box-shadow: 0 8px 20px rgba(255, 255, 255, 0.2);
}

/* --- Bottom Section --- */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 24px 0 32px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.copyright, .credits {
  font-size: 14px;
  color: #666;
  margin: 0;
}

.text-white {
  color: #fff;
  font-weight: 500;
}

/* --- Responsive Design --- */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 40px;
  }

  .footer-right {
    align-items: flex-start;
  }

  .footer-links {
    grid-template-columns: 1fr; /* 1 column on mobile */
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
}
</style>
