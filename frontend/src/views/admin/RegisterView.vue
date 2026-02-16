<template>
  <div class="admin-register">
    <!-- Background with animated particles effect -->
    <div class="background-animation"></div>

    <!-- Register Card -->
    <div class="register-container">
      <div class="register-card">
        <h1 class="register-title">Registro</h1>
        <p class="register-subtitle">Crear cuenta para administradores</p>

        <!-- Error Message -->
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
        <div v-if="passwordAlert" class="error-message">
          {{ passwordAlert }}
        </div>

        <!-- Success Message -->
        <div v-if="success" class="success-message">
          {{ success }}
        </div>

        <!-- Register Form -->
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <input
              v-model="userData.name"
              type="text"
              class="form-input"
              placeholder="Nombre"
              required
            />
          </div>

          <div class="form-group">
            <input
              v-model="userData.lastname"
              type="text"
              class="form-input"
              placeholder="Apellido"
              required
            />
          </div>

          <div class="form-group">
            <input
              v-model="userData.username"
              type="text"
              class="form-input"
              placeholder="Nombre de usuario (3-20 caracteres)"
              minlength="3"
              maxlength="20"
              required
            />
          </div>

          <div class="form-group">
            <input
              v-model="userData.email"
              type="email"
              class="form-input"
              placeholder="Email"
              required
            />
          </div>

          <div class="form-group">
            <div class="password-wrapper">
              <input
                v-model="userData.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Contraseña (8-32 caracteres)"
                minlength="8"
                maxlength="32"
                required
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                {{ showPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <div class="password-wrapper">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="form-input"
                placeholder="Confirmar contraseña"
                required
              />
              <button
                type="button"
                class="toggle-password"
                @click="showConfirmPassword = !showConfirmPassword"
              >
                {{ showConfirmPassword ? '👁️' : '👁️‍🗨️' }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <select v-model="userData.role" class="form-input" required>
              <option value="" disabled>Seleccionar Rol</option>
              <option value="President">Presidente</option>
              <option value="Vicepresident">Vicepresidente</option>
              <option value="Secretary">Secretario/a</option>
              <option value="Treasurer">Tesorero/a</option>
              <option value="Asesor">Asesor/a</option>
              <option value="Vocal">Vocal</option>
              <option value="Member">Miembro del capitulo</option>
            </select>
          </div>

          <button type="submit" class="btn-register" :disabled="loading">
            {{ loading ? 'Creando cuenta...' : 'Registrarse' }}
          </button>
        </form>

        <div class="register-footer">
          <p class="login-text">
            ¿Ya tienes una cuenta?
            <router-link to="/admin/login" class="link-login">Iniciar Sesión</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/authService'

export default {
  name: 'RegisterView',
  data() {
    return {
      userData: {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        role: '',
      },
      confirmPassword: '',
      showPassword: false,
      showConfirmPassword: false,
      loading: false,
      error: null,
      success: null,
      passwordAlert: null,
    }
  },
  methods: {
    async handleRegister() {
      this.loading = true
      this.error = null
      this.success = null
      this.passwordAlert = null

      // Validar que las contraseñas coincidan
      if (this.userData.password !== this.confirmPassword) {
        this.error = 'Las contraseñas no coinciden'
        this.loading = false
        return
      }

      // Validar longitud mínima y máxima de contraseña
      if (this.userData.password.length < 8 || this.userData.password.length > 32) {
        this.passwordAlert = 'La contraseña debe tener entre 8 y 32 caracteres'
        this.loading = false
        return
      }

      // Validar complejidad de contraseña
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/
      if (!passwordRegex.test(this.userData.password)) {
        this.passwordAlert =
          'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
        this.loading = false
        return
      }

      try {
        await register(this.userData)
        this.success = 'Cuenta creada exitosamente. Redirigiendo al login...'

        // Redireccionar al login después de 2 segundos
        setTimeout(() => {
          this.$router.push('/admin/login')
        }, 2000)
      } catch (err) {
        console.error('Error al registrarse:', err)
        this.error = err.response?.data?.message || 'Error al crear la cuenta. Intenta nuevamente.'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
/* --- Base Layout --- */
.admin-register {
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
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

/* --- Register Container --- */
.register-container {
  position: relative;
  z-index: 5;
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.register-card {
  background: rgba(26, 60, 26, 0.85);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 50px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.register-title {
  font-family: var(--font-heading, sans-serif);
  font-size: 42px;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-align: left;
}

.register-subtitle {
  font-family: var(--font-body, sans-serif);
  font-size: 16px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 40px 0;
  text-align: left;
}

/* --- Error & Success Messages --- */
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

.success-message {
  background-color: rgba(0, 200, 83, 0.2);
  border: 1px solid #00c853;
  color: #69f0ae;
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

.btn-register {
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

.btn-register:hover:not(:disabled) {
  background-color: #ff2b38;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(236, 31, 42, 0.4);
}

.btn-register:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* --- Footer Links --- */
.register-footer {
  margin-top: 32px;
  text-align: center;
}

.login-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin: 0;
}

.link-login {
  color: #ec1f2a;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link-login:hover {
  color: #ff2b38;
}

/* --- Responsiveness --- */
@media (max-width: 768px) {
  .register-card {
    padding: 40px 30px;
  }

  .register-title {
    font-size: 36px;
  }
}

@media (max-width: 480px) {
  .register-card {
    padding: 30px 20px;
  }

  .register-title {
    font-size: 32px;
  }

  .form-input {
    padding: 14px 16px;
  }
}
</style>
