<template>
  <div class="admin-login">
    <!-- Background with animated particles effect -->
    <div class="background-animation"></div>

    <!-- Login Card -->
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">Login</h1>
        <p class="login-subtitle">Glad you're back !</p>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <input
              v-model="credentials.username"
              type="text"
              class="form-input"
              placeholder="Username"
              required
            />
          </div>

          <div class="form-group">
            <div class="password-wrapper">
              <input
                v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Password"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <button type="submit" class="btn-login" :disabled="loading">
            {{ loading ? 'Loading...' : 'Login' }}
          </button>
        </form>

        <div class="login-footer">
          <p class="signup-text">
            Don't have an account ? <router-link to="/admin/register" class="link-signup">Signup</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService'

export default {
  name: 'LoginView',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      showPassword: false,
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null

      try {
        const response = await login(this.credentials)

        // Redireccionar al dashboard después del login exitoso
        this.$router.push('/admin/dashboard')
      } catch (err) {
        console.error('Error al iniciar sesión:', err)
        this.error = err.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* --- Base Layout --- */
.admin-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1f0a 0%, #1a3d1a 50%, #0d260d 100%);
}

/* --- Animated Background --- */
.background-animation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(0, 255, 0, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 0, 100, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(0, 150, 255, 0.1) 0%, transparent 50%);
  animation: particleMove 20s ease-in-out infinite;
  z-index: 0;
}

@keyframes particleMove {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

/* --- Top Navigation --- */
.top-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px 60px;
  z-index: 10;
}

.btn-home {
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-home:hover {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(236, 31, 42, 0.4);
}

/* --- Login Container --- */
.login-container {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.login-card {
  background: rgba(26, 60, 26, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.login-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 42px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-align: left;
}

.login-subtitle {
  font-family: var(--font-body, sans-serif);
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 40px 0;
  text-align: left;
}

/* --- Error Message --- */
.error-message {
  background-color: rgba(236, 31, 42, 0.2);
  border: 1px solid #ec1f2a;
  color: #ff6b6b;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
  font-size: 14px;
  text-align: center;
}

/* --- Form --- */
.form-group {
  margin-bottom: 24px;
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-family: var(--font-body, sans-serif);
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.form-input:focus {
  outline: none;
  border-color: rgba(236, 31, 42, 0.6);
  background: rgba(0, 0, 0, 0.4);
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-password {
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  font-size: 20px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: rgba(255, 255, 255, 0.9);
}

.btn-login {
  width: 100%;
  padding: 16px;
  background-color: #ec1f2a;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
  font-family: var(--font-body, sans-serif);
}

.btn-login:hover:not(:disabled) {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(236, 31, 42, 0.4);
}

.btn-login:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* --- Footer Links --- */
.login-footer {
  margin-top: 32px;
  text-align: center;
}

.signup-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}

.link-signup {
  color: #ec1f2a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link-signup:hover {
  color: #ff2b38;
}

/* --- Responsiveness --- */
@media (max-width: 768px) {
  .top-nav {
    padding: 20px 30px;
  }

  .login-card {
    padding: 40px 30px;
  }

  .login-title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .top-nav {
    padding: 20px;
  }

  .login-card {
    padding: 30px 20px;
  }

  .login-title {
    font-size: 32px;
  }

  .form-input {
    padding: 14px 16px;
  }
}
</style>
