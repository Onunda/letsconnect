<template>
  <section class="login-page">
    <section id="login-container">
      <div>
        <h1>Lets connect</h1>
      </div>
      <div>
        <h4>
          <router-link to="/signup"> Create an Account </router-link>
        </h4>
      </div>
      <div>
        <h4>Or</h4>
      </div>
      <div>
        <h3>Please Log In</h3>
        <form @submit.prevent="login">
          <div>
            <input
              v-model="form.email"
              type="email"
              placeholder="Email"
              autocomplete="email"
              required
            />
          </div>
          <div>
            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              autocomplete="current-password"
              required
            />
          </div>
          <div>
            <button type="submit">Log In</button>
          </div>
          <div>
            <small>
              <router-link to="/forgot-password">Forgot Password?</router-link>
            </small>
          </div>
          <div v-if="form.error" class="error">
            {{ form.error }}
          </div>
          <div v-if="form.success" class="success">Login successful!</div>
        </form>
      </div>
    </section>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'LoginPage',
  setup() {
    const router = useRouter();
    const form = ref({
      email: '',
      password: '',
      error: null,
      success: false,
    });

    const login = async () => {
      form.value.error = null;
      form.value.success = false;

      if (!form.value.email || !form.value.password) {
        form.value.error = 'Email and password are required.';
        return;
      }

      try {
        const url = 'https://private-517bb-wad20postit.apiary-mock.com/users/1';
        const auth = { username: form.value.email, password: form.value.password };
        const res = await axios.get(url, { auth });
        console.log(res.data);
        form.value.success = true;
        router.push('/post');
      } catch (err) {
        form.value.error = err.message || 'Login failed.';
      }
    };

    return {
      form,
      login,
    };
  },
};
</script>
