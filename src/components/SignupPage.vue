<template>
  <section class="login-page">
    <section id="login-container">
      <div>
        <h1>Lets connect</h1>
      </div>
      <div>
        <h4>
          <router-link to="/">
            Already have an account?<br />
            Log In
          </router-link>
        </h4>
      </div>
      <div>
        <h4>Or</h4>
      </div>
      <div>
        <h3>Create an Account</h3>
        <form @submit.prevent="signup">
          <div>
            <input
              v-model="form.name"
              type="text"
              placeholder="Full Name"
              autocomplete="name"
              required
            />
          </div>
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
              autocomplete="new-password"
            />
          </div>
          <div>
            <button type="submit">Sign Up</button>
          </div>
          <div v-if="form.error" class="error">
            {{ form.error }}
          </div>
          <div v-if="form.success" class="success">Signup successful!</div>
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
  name: 'SignupPage',
  setup() {
    const router = useRouter();
    const form = ref({
      name: '',
      email: '',
      password: '',
      error: null,
      success: false,
    });

    const signup = async () => {
      form.value.error = null;
      form.value.success = false;

      if (!form.value.name || !form.value.email) {
        form.value.error = 'All fields are required.';
        return;
      }

      try {
        // Replace with your signup API endpoint
        const url = 'https://private-517bb-wad20postit.apiary-mock.com/users';
        const res = await axios.post(url, {
          name: form.value.name,
          email: form.value.email,
          password: form.value.password,
        });
        console.log(res.data);
        form.value.success = true;
        router.push('/');
      } catch (err) {
        form.value.error = err.message || 'Signup failed.';
      }
    };

    return {
      form,
      signup,
    };
  },
};
</script>
