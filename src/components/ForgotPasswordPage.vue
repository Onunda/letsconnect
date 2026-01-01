<template>
  <section class="login-page">
    <section id="login-container">
      <div>
        <h2>Forgot Password?</h2>
      </div>
      <div>
        <h4>
          <router-link to="/"> Back to Log In </router-link>
        </h4>
      </div>
      <div>
        <h3>Reset Your Password</h3>
        <form @submit.prevent="resetPassword">
          <div>
            <input v-model="email" type="email" placeholder="Email Address" required />
          </div>
          <div>
            <button type="submit">Send Reset Email</button>
          </div>
          <div v-if="message" class="success">
            {{ message }}
          </div>
          <div v-if="error" class="error">
            {{ error }}
          </div>
        </form>
      </div>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  name: 'ForgotPasswordPage',
  setup() {
    const email = ref('');
    const message = ref('');
    const error = ref('');

    const resetPassword = async () => {
      message.value = '';
      error.value = '';

      if (!email.value) {
        error.value = 'Email is required.';
        return;
      }

      try {
        // Replace with your real reset password API
        await axios.post('https://private-517bb-wad20postit.apiary-mock.com/reset-password', {
          email: email.value,
        });
        message.value = 'Password reset email sent successfully!';
      } catch (err) {
        error.value = 'Failed to send reset email. Please try again.';
        console.error(err);
      }
    };

    return {
      email,
      message,
      error,
      resetPassword,
    };
  },
};
</script>
