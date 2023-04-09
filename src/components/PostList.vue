<template>
  <div>
    <h2>帖子列表</h2>
    <ul>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="{ name: 'post-details', params: { id: post.id } }">
          {{ post.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/posts");
      this.posts = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
