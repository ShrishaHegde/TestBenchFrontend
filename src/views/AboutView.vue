<template>
<div class="serv" style="height: 500px">
  <ag-grid-vue
  style="width: 100%; height: 100%;"
  class="ag-theme-alpine"
  :columnDefs="columnDefs" 
  :rowData="this.services"
  :pagination="true"
  :paginationPageSize=20
  :defaultColDef="defaultColDef"
></ag-grid-vue>
</div>

  
</template>

<script>

import {AgGridVue} from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
export default {
  name: "about",
  components: {
    AgGridVue,
  },
  data() {
    return {
      searchQuery: '',
      columnDefs: [
        { field: 'id' },
        { field: 'name' },
        { field: 'status' }
      ],
      defaultColDef: {
        filter: true,
        sortable: true,
      },
    }
  },
  methods: {
    fetchServices() {
      console.log(this.services)
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


