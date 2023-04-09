<template>
  <div>
    <h2>{{ category.name }}</h2>
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
      category: {},
      posts: [],
    };
  },
  async created() {
  try {
    const categoryId = this.$route.params.id;
    const categoryResponse = await axios.get(`/api/categories/${categoryId}`);
    this.category = categoryResponse.data;

    const postsResponse = await axios.get(`/api/categories/${categoryId}/posts`);
    this.posts = postsResponse.data;
  } catch (error) {
    console.error(error);
  }
},
};
</script>
