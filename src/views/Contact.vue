<template>
  <div class="contact-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="container">
        <h1 class="page-title">Contact Us</h1>
        <p class="page-subtitle">We're here to help. Get in touch with us and we'll respond as soon as possible.</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container main-content">
      <div class="contact-grid">
        <!-- Contact Information -->
        <div class="contact-info">
          <div class="info-card">
            <h2>Get in Touch</h2>
            <p class="info-description">Feel free to reach out to us through any of the following methods:</p>

            <div class="contact-methods">
              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="method-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="method-details">
                  <h3>Email</h3>
                  <p>support@readiculous.com</p>
                </div>
              </div>

              <div class="contact-method">
                <div class="method-icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="method-details">
                  <h3>Address</h3>
                  <p>123 Book Street<br>Reading City, RC 12345</p>
                </div>
              </div>
            </div>

            <div class="business-hours">
              <h3>Business Hours</h3>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-section">
          <div class="form-card">
            <h2>Send us a Message</h2>
            <p class="form-description">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form @submit.prevent="submitContactForm" class="contact-form">
              <!-- Name Fields -->
              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">First Name *</label>
                  <input
                      id="firstName"
                      v-model="contactForm.firstName"
                      type="text"
                      required
                      maxlength="50"
                      :class="{'error': errors.firstName}"
                      placeholder="Enter your first name"
                      @blur="validateField('firstName')"
                  />
                  <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
                </div>

                <div class="form-group">
                  <label for="lastName">Last Name *</label>
                  <input
                      id="lastName"
                      v-model="contactForm.lastName"
                      type="text"
                      required
                      maxlength="50"
                      :class="{'error': errors.lastName}"
                      placeholder="Enter your last name"
                      @blur="validateField('lastName')"
                  />
                  <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
                </div>
              </div>

              <!-- Contact Fields -->
              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <input
                      id="email"
                      v-model="contactForm.email"
                      type="email"
                      required
                      maxlength="100"
                      :class="{'error': errors.email}"
                      placeholder="Enter your email address"
                      @blur="validateField('email')"
                  />
                  <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
                </div>

                <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                      id="phone"
                      v-model="contactForm.phone"
                      type="tel"
                      maxlength="20"
                      :class="{'error': errors.phone}"
                      placeholder="Enter your phone number"
                      @blur="validateField('phone')"
                  />
                  <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
                </div>
              </div>

              <!-- Address -->
              <div class="form-group">
                <label for="address">Address</label>
                <textarea
                    id="address"
                    v-model="contactForm.address"
                    rows="3"
                    maxlength="255"
                    :class="{'error': errors.address}"
                    placeholder="Enter your full address"
                    @blur="validateField('address')"
                ></textarea>
                <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
              </div>

              <!-- Preferred Contact Method -->
              <div class="form-group">
                <label>Preferred Contact Method *</label>
                <div class="radio-group">
                  <label class="radio-option">
                    <input
                        v-model="contactForm.preferredContactMethod"
                        type="radio"
                        name="contactMethod"
                        value="EMAIL"
                        required
                    />
                    <span class="radio-label">
                      <i class="fas fa-envelope"></i>
                      Email
                    </span>
                  </label>

                  <label class="radio-option">
                    <input
                        v-model="contactForm.preferredContactMethod"
                        type="radio"
                        name="contactMethod"
                        value="PHONE"
                    />
                    <span class="radio-label">
                      <i class="fas fa-phone"></i>
                      Phone
                    </span>
                  </label>

                  <label class="radio-option">
                    <input
                        v-model="contactForm.preferredContactMethod"
                        type="radio"
                        name="contactMethod"
                        value="WHATSAPP"
                    />
                    <span class="radio-label">
                      <i class="fab fa-whatsapp"></i>
                      WhatsApp
                    </span>
                  </label>

                  <label class="radio-option">
                    <input
                        v-model="contactForm.preferredContactMethod"
                        type="radio"
                        name="contactMethod"
                        value="SMS"
                    />
                    <span class="radio-label">
                      <i class="fas fa-sms"></i>
                      SMS
                    </span>
                  </label>
                </div>
                <span v-if="errors.preferredContactMethod" class="error-message">{{ errors.preferredContactMethod }}</span>
              </div>

              <!-- Message -->
              <div class="form-group">
                <label for="notes">Message *</label>
                <textarea
                    id="notes"
                    v-model="contactForm.notes"
                    rows="5"
                    required
                    maxlength="1000"
                    :class="{'error': errors.notes}"
                    placeholder="Tell us how we can help you..."
                    @blur="validateField('notes')"
                ></textarea>
                <div class="character-count">
                  {{ contactForm.notes.length }}/1000 characters
                </div>
                <span v-if="errors.notes" class="error-message">{{ errors.notes }}</span>
              </div>

              <!-- Submit Button -->
              <button
                  type="submit"
                  :disabled="submitting || hasErrors"
                  class="submit-button"
                  :class="{'loading': submitting}"
              >
                <span v-if="!submitting">
                  <i class="fas fa-paper-plane"></i>
                  Send Message
                </span>
                <span v-else>
                  <i class="fas fa-spinner fa-spin"></i>
                  Sending...
                </span>
              </button>

              <!-- Status Message -->
              <div v-if="message" :class="['status-message', messageType]">
                <i :class="messageType === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
                {{ message }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'

// Contact Form Data
const contactForm = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  preferredContactMethod: '',
  notes: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  preferredContactMethod: '',
  notes: ''
})

const submitting = ref(false)
const message = ref('')
const messageType = ref('success')

// Validation functions
const validateField = (field: string) => {
  const value = contactForm[field as keyof typeof contactForm]

  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!value) {
        errors[field as keyof typeof errors] = 'This field is required'
      } else if ((value as string).length > 50) {
        errors[field as keyof typeof errors] = 'Maximum 50 characters allowed'
      } else {
        errors[field as keyof typeof errors] = ''
      }
      break

    case 'email':
      if (!value) {
        errors.email = 'Email is required'
      } else if (!isValidEmail(value as string)) {
        errors.email = 'Please enter a valid email address'
      } else if ((value as string).length > 100) {
        errors.email = 'Maximum 100 characters allowed'
      } else {
        errors.email = ''
      }
      break

    case 'phone':
      if (value && (value as string).length > 20) {
        errors.phone = 'Maximum 20 characters allowed'
      } else {
        errors.phone = ''
      }
      break

    case 'address':
      if (value && (value as string).length > 255) {
        errors.address = 'Maximum 255 characters allowed'
      } else {
        errors.address = ''
      }
      break

    case 'notes':
      if (!value) {
        errors.notes = 'Message is required'
      } else if ((value as string).length > 1000) {
        errors.notes = 'Maximum 1000 characters allowed'
      } else {
        errors.notes = ''
      }
      break

    case 'preferredContactMethod':
      if (!value) {
        errors.preferredContactMethod = 'Please select a preferred contact method'
      } else {
        errors.preferredContactMethod = ''
      }
      break
  }
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = (): boolean => {
  validateField('firstName')
  validateField('lastName')
  validateField('email')
  validateField('phone')
  validateField('address')
  validateField('preferredContactMethod')
  validateField('notes')

  return !Object.values(errors).some(error => error !== '')
}

// Computed property to check if form has errors
const hasErrors = computed(() => {
  return Object.values(errors).some(error => error !== '')
})

// Submit Contact Form
const submitContactForm = async () => {
  if (!validateForm()) {
    message.value = 'Please fix the errors in the form before submitting.'
    messageType.value = 'error'
    return
  }

  submitting.value = true
  message.value = ''

  try {
    const response = await fetch("http://localhost:8080/api/contacts", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactForm)
    })

    if (!response.ok) {
      if (response.status === 409) {
        throw new Error('This email address is already registered. Please use a different email.')
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const savedContact = await response.json()
    message.value = 'Thank you! Your message has been sent successfully. We will get back to you soon.'
    messageType.value = 'success'

    // Reset form
    Object.assign(contactForm, {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      preferredContactMethod: '',
      notes: ''
    })

    // Clear errors
    Object.keys(errors).forEach(key => {
      errors[key as keyof typeof errors] = ''
    })
  } catch (error) {
    console.error('Error submitting contact form:', error)
    message.value = error instanceof Error ? error.message : 'Sorry, there was an error sending your message. Please try again.'
    messageType.value = 'error'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Section */
.header-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 60px 0;
  text-align: center;
  color: white;
}

.page-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.page-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Main Content */
.main-content {
  padding: 60px 0;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  align-items: start;
}

/* Contact Information */
.contact-info {
  position: sticky;
  top: 40px;
}

.info-card {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.info-card h2 {
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.info-description {
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-methods {
  margin-bottom: 2rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 12px;
  transition: background-color 0.3s ease;
}

.contact-method:hover {
  background: #f7fafc;
}

.method-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.method-icon i {
  color: white;
  font-size: 1.2rem;
}

.method-details h3 {
  color: #2d3748;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.method-details p {
  color: #718096;
  margin: 0;
}

.business-hours {
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
}

.business-hours h3 {
  color: #2d3748;
  margin-bottom: 1rem;
  font-weight: 600;
}

.business-hours p {
  color: #718096;
  margin-bottom: 0.5rem;
}

/* Contact Form */
.contact-form-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.form-card h2 {
  color: #2d3748;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.form-description {
  color: #718096;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e53e3e;
}

.error-message {
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.radio-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.radio-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-option input {
  display: none;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  width: 100%;
  transition: all 0.3s ease;
  background: #fafafa;
}

.radio-option input:checked + .radio-label {
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.radio-label i {
  color: #667eea;
}

.character-count {
  text-align: right;
  color: #a0aec0;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Submit Button */
.submit-button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.submit-button.loading {
  background: #a0aec0;
}

/* Status Message */
.status-message {
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.status-message.success {
  background: #f0fff4;
  color: #2d7d46;
  border: 1px solid #9ae6b4;
}

.status-message.error {
  background: #fed7d7;
  color: #c53030;
  border: 1px solid #feb2b2;
}

/* Responsive Design */
@media (max-width: 968px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .contact-info {
    position: static;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .radio-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .header-section {
    padding: 40px 0;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .info-card,
  .contact-form-section {
    padding: 30px 20px;
  }

  .radio-group {
    grid-template-columns: 1fr;
  }
}
</style>