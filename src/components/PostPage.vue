<template>
  <section class="post-page">
    <nav class="navbar">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="postIt" />
      </div>

      <div class="search-container">
        <input v-model="search" type="text" placeholder="Search posts..." />
      </div>

      <div class="avatar-container">
        <button class="menu-button" @click="toggleMenu">Menu</button>
        <div v-show="isMenuOpen" class="drop-down-container">
          <span id="user-name">{{ user.firstname }} {{ user.lastname }}</span>
          <span id="user-email">{{ user.email }}</span>
          <hr class="menu-separator" />
          <router-link class="menu-link" to="/browse"> Browse Users </router-link>
          <router-link class="menu-link" to="/login"> Log Out </router-link>
        </div>
      </div>
    </nav>
    <main class="main-container">
      <div v-if="loading">Loading posts...</div>
      <div v-else-if="filteredPosts.length === 0">No posts found.</div>

      <div class="posts-scroll">
        <div v-for="post in filteredPosts" :key="post.id" class="post-card">
          <div class="author-info">
            <img
              class="avatar"
              :src="post.author?.avatar || defaultAvatar"
              :alt="post.author ? post.author.firstname + ' ' + post.author.lastname : 'Unknown'"
            />
            <div class="author-details">
              <span
                >{{ post.author?.firstname || 'Unknown' }} {{ post.author?.lastname || '' }}</span
              >
              <small>{{ post.createTime || '' }}</small>
            </div>
          </div>

          <p>{{ typeof post.text === 'string' ? post.text : '' }}</p>

          <div v-if="post.media?.url" class="post-media">
            <template v-if="post.media.type === 'image'">
              <img :src="post.media.url" alt="" />
            </template>
            <template v-else-if="post.media.type === 'video'">
              <video controls :src="post.media.url" />
            </template>
          </div>

          <div class="post-likes">❤️ {{ post.likes || '0' }}</div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PostPage',
  data() {
    return {
      posts: [],
      loading: false,
      search: '',
      defaultAvatar: 'https://via.placeholder.com/50x50.png?text=Avatar',
      isMenuOpen: false,
      user: {},
    };
  },
  computed: {
    filteredPosts() {
      const q = this.search.toLowerCase().trim();
      if (!q) return this.posts;

      return this.posts
        .filter((post) => {
          const text = typeof post.text === 'string' ? post.text : '';
          const authorName = post.author
            ? `${post.author.firstname} ${post.author.lastname}`.toLowerCase()
            : '';
          return text.toLowerCase().includes(q) || authorName.includes(q);
        })
        .sort((a, b) => (b.media?.url ? 1 : 0) - (a.media?.url ? 1 : 0));
    },
  },
  mounted() {
    this.fetchPosts();
    this.loadUser();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      try {
        const res = await axios.get(
          'https://private-anon-f827f4c13e-wad20postit.apiary-mock.com/posts'
        );
        this.posts = res.data;
      } catch (err) {
        console.error('Failed to load posts', err);
      } finally {
        this.loading = false;
      }
    },
    async loadUser() {
      try {
        const res = await axios.get('https://private-517bb-wad20postit.apiary-mock.com/users/1');
        this.user = res.data;
      } catch (err) {
        console.error('Failed to load user', err);
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
