<template>
    <div class="popup">
        <div class="popup-content">
            <!-- Popup content here -->
            <button type="button" class="btn-close" aria-label="Close" @click="closePopup"></button>
            <h5>{{ services.vin }}</h5>
            <span>{{ services.gen }}</span>.<span>{{ services.variant }}</span> -  <span>{{ services.release }}</span> <br>
            <p>Region : {{ services.region }}</p>
            <div class="serv" style="height: 400px">
                <ag-grid-vue style="width: 650px; height: 400px;" class="ag-theme-alpine" :columnDefs="columnDefs"
                    :rowData="this.services.services" :pagination="true" :paginationPageSize=20
                    :defaultColDef="defaultColDef"></ag-grid-vue>
            </div>
        </div>
    </div>
</template>
  
<script>
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
export default {
    name: "popup",
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
        closePopup() {
            this.$emit('close');
        }
    },
    computed: {
        services() {
            return this.$store.state.services;
        }
    }
};
</script>
  
<style>
.btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    /* Other styles for the close button */
  }
  .popup-content{
    position: relative;
  }
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background-color: white;
    padding: 20px;
}
.ag-header-icon.ag-header-cell-menu-button {
    opacity: 1 !important;
  }
.ag-icon.ag-icon-menu{
    display: none;
}
  .ag-header-icon.ag-header-cell-menu-button::before {
    opacity: 1 !important;
    background-image: url('../assets/filter.png');
    content: "";
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    width: 20px; /* Adjust the width and height as per your icon's size */
    height: 20px;
    /* Additional styling as needed */
  }

  .ag-grid-container .ag-cell {
    border-right: 1px solid #ccc;
  }
  
  .ag-theme-alpine .ag-root-wrapper {
    border-right: 1px solid #ccc;
  }
  
  .ag-theme-alpine .ag-root-wrapper .ag-header-cell {
    border-right: 1px solid #ccc;
  }
  
</style>
  