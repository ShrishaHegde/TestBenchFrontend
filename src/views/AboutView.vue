<template>
  <div class="search-bar">
    <input type="text" class="bg-gray-300 w-50 px-4 py-2" autocomplete="off" v-model="searchQuery" >
    <button type="button" class="btn btn-primary">Search</button>
  </div>
  <div v-for="service in filterServices" :key="service">
    {{ service.name }}
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    fetchServices() {
      this.$store.dispatch("fetchServices");
    },
  },
  computed: {
    services() {
      return this.$store.state.services;
    },
    filterServices() {
      const query = this.searchQuery.toLowerCase();
      return this.services.filter(service => {
        // Add your filtering logic here
        // For example, filter by item name
        return service.name.toLowerCase().startsWith(query);
      });
    }
  }

}
</script>

<style>
.search-bar{
  margin-top: 2em;
}

</style>


