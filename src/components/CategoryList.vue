<template>
  <div>
    <h2>板块列表</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <router-link :to="{ name: 'category-details', params: { id: category.id } }">
          {{ category.name }}
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
      categories: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/categories");
      this.categories = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
