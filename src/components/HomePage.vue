<template>
  <div>
    <h2>Recommended Posts</h2>
    <ul>
      <li v-for="post in recommendedPosts" :key="post.post_id">
        {{ post.title }}
      </li>
    </ul>
    <h2>Categories</h2>
    <ul>
      <li v-for="category in categories" :key="category.category_id">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      recommendedPosts: [],
      categories: [],
    };
  },
  async mounted() {
    const userId = 1; // Replace this with the actual user ID
    const postsResponse = await axios.get(`/api/posts/recommend?userId=${userId}`);
    this.recommendedPosts = postsResponse.data;

    const categoriesResponse = await axios.get("/api/categories/all");
    this.categories = categoriesResponse.data;
  },
};
</script>
