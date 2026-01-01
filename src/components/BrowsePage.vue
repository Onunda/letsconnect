<template>
  <section class="browse-page">
    <header>
      <nav class="navbar">
        <div class="logo-container">
          <img src="../assets/logo.png" alt="postIt" />
        </div>

        <div class="search-container">
          <input v-model="search" type="text" placeholder="Search profiles..." />
          <button type="button" @click="searchProfiles">Search</button>
        </div>

        <div class="avatar-container">
          <button class="menu-button" @click.stop="toggleMenu">Menu</button>

          <div v-show="isMenuOpen" class="drop-down-container">
            <router-link class="menu-link" to="/post"> Posts </router-link>
            <hr class="menu-separator" />
            <router-link class="menu-link" to="/login"> Log Out </router-link>
          </div>
        </div>
      </nav>
    </header>

    <main class="main-container">
      <div class="profiles-scroll">
        <div v-if="profiles.length === 0">Loading profiles...</div>
        <div v-for="profile in filteredProfiles" :key="profile.email" class="profile-card">
          <img :src="profile.avatar" :alt="profile.firstname + ' ' + profile.lastname" />
          <div class="profile-details">
            <h2>{{ profile.firstname }} {{ profile.lastname }}</h2>
            <p>{{ profile.email }}</p>
            <button
              class="follow-button"
              :class="{ followed: profile.followed }"
              @click="toggleFollow(profile)"
            >
              {{ profile.followed ? 'Following' : 'Follow' }}
            </button>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BrowsePage',
  data() {
    return {
      profiles: [],
      search: '',
      isMenuOpen: false,
    };
  },
  computed: {
    filteredProfiles() {
      const q = this.search.toLowerCase().trim();
      if (!q) return this.profiles;

      return this.profiles.filter((profile) => {
        const fullName = `${profile.firstname} ${profile.lastname}`.toLowerCase();
        return fullName.includes(q) || profile.email.toLowerCase().includes(q);
      });
    },
  },
  mounted() {
    this.loadProfiles();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleClickOutside(event) {
      if (!this.isMenuOpen) return;

      const menu = this.$el.querySelector('.drop-down-container');
      if (menu && !menu.contains(event.target)) {
        this.isMenuOpen = false;
      }
    },
    async loadProfiles() {
      try {
        const response = await axios.get(
          'https://private-517bb-wad20postit.apiary-mock.com/profiles'
        );
        // Add `followed` state to each profile
        this.profiles = response.data.map((profile) => ({ ...profile, followed: false }));
      } catch (err) {
        console.error('Failed to load profiles:', err);
      }
    },
    toggleFollow(profile) {
      profile.followed = !profile.followed;
    },
    searchProfiles() {
      console.log('Searching for:', this.search);
    },
  },
};
</script>
