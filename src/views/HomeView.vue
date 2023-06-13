<template>
    <div class="stages">
      <div class="pentagon" :class="{ active: currentStage === 'Gen20x/i2' }" @click="changeCurrentStage('Gen20x/i2')">
        <span class="text">Gen20X.i2</span>
      </div>
      <div class="pentagon" :class="{ active: currentStage === 'Gen20x/i3' }" @click="changeCurrentStage('Gen20x/i3')">
        <span class="text">Gen20X.i3</span>
      </div>
      <div class="pentagon" :class="{ active: currentStage === 'NTG/NTG6' }" @click="changeCurrentStage('NTG/NTG6')">
        <span class="text">NTG6</span>
      </div>
      <div class="pentagon" :class="{ active: currentStage === 'NTG/NTG7' }" @click="changeCurrentStage('NTG/NTG7')">
        <span class="text">NTG7</span>
      </div>
      <div class="search-bar">
        <div class="form">
          <i class="fa fa-search"></i>
          <input type="text" class="form-control form-input" placeholder="Search by vin id" v-model="search">
        </div>
    </div>
    </div>
    <div class="container">
      <div class="filters">
        <div class="ifilter">
        <label>Release</label> 
        <select v-model="gen.release" placeholder="">
          <option value="">All</option>
          <option value="SOP">SOP</option>
          <option value="FUP3">FUP3</option>
          <option value="FUP4">FUP4</option>
        </select>
      </div>
      <div class="ifilter">
        <label> Version</label>
        <select v-model="gen.version">
          <option value="">All</option>
          <option value="E871.103">E871.103</option>
          <option value="E905.320">E905.320</option>
          <option value="E905.404">"E905.404</option>
          <option value="E330.601">E330.601</option>
          <option value="E444.600">E444.600</option>
          <option value="E023.100">E023.100</option>
          <option value="E444.303">E444.303</option>
          <option value="E52.5">E52.5</option>
          <option value="E049.0_674">E049.0_674</option>
          <option value="E051.5_1066">E051.5_1066</option>
          <option value="E052.5_1341">E052.5_1341</option>
        </select>
        </div>
        <div class="ifilter">
        <label> Stage</label>
        <select v-model="gen.stage">
          <option value="">All</option>
          <option value="PROD">PROD</option>
          <option value="NONPROD">NONPROD</option>
        </select>
        </div>
        <div class="ifilter">
        <label>Region</label>
        <select v-model="gen.region">
          <option value="">All</option>
          <option value="ECE">ECE</option>
          <option value="NAM">NAM</option>
          <option value="USA">USA</option>
        </select>
       </div>
       <button type="button" class="btn btn-outline-danger btn-sm" @click="clearAll">Clear All</button>
      </div>
      <div class="row">
        <div class="col" v-for="card in filteredDetails" :key="card.vin">
          <div class="card gradient-custom" style="width: 18rem;margin:30px">
            <div class="card-body">
              <div class="rowed">
                <h5 class="card-title">{{ card.gen }}-{{ card.variant }}</h5>
              <div class="status-icon">
                <i v-if="card.connected" class="bi bi-wifi connected" style="font-size: 25px;margin-top:-2px"></i>
                <i v-else class="bi bi-wifi-off disconnected" style="font-size: 25px;margin-top:-2px"></i>
              </div>
              </div>
              <p class="card-text">Release : {{ card.release }}</p>
              <p class="card-text">Region:{{ card.region }}</p>
              <p class="card-text">Stage : {{ card.stage }}</p>
              <p class="card-text">Cubicle : {{ card.Cubicle }}</p>
              <p class="card-text">Software Version : {{ card.SwVersion }}</p>
              <p class="card-text">{{ card.vin }}</p>
              <div class="buttons">
                  <button type="button" class="btn btn-primary" @click="fetchServices(card.vin)">Services</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <popup v-if="isPopupVisible" @close="hidePopup"></popup>
    <!-- <div>{{ categories[0].supportedHeadUnitGenerations }}</div> -->
</template>

<script>
// @ is an alias to /src
import Popup from '../components/Popup.vue';
export default {
  name: 'HomeView',
  components: {
    Popup
  },
  data() {
    return {
      stages: ["Gen20x/i2", "Gen20x/i3", "NTG/NTG6", "NTG/NTG7"],
      currentStage: "Gen20x/i2",
      search: "",
      gen: {
        release: "",
        stage: "",
        region: "",
        version: ""
      },
      releseOptions: {},
      isPopupVisible: false

    }
  },
  created() {
    window.onload = () => {
      this.$store.dispatch("fetchDetails", "Gen20x/i2");
      this.$store.dispatch("fetchCategories");
    };
  },
  methods: {
    changeCurrentStage(stage) {
      this.$store.dispatch("fetchDetails", stage);
      this.currentStage = stage;
    },

    fetchServices(vin) {
      this.isPopupVisible = true;
      this.$store.dispatch("fetchServices", vin);
    },
    hidePopup() {
      this.isPopupVisible = false;
    },
    clearAll(){
        this.gen.release = "",
        this.gen.stage = "",
        this.gen.region = "",
        this.gen.version = ""
        console.log(this.categories)
    }
  },
  computed: {

    // gen20xSoftwareVersions() {
    //   const gen20x = this.categories.find(category => category.generationName === 'Gen20x').supportedHeadUnitGenerations.find(generation => generation.variant === 'i2');
    //   console.log(gen20x)
    //   return gen20x.supportedHeadUnitReleases.reduce((versions, release) => versions.concat(release.supportedHeadUnitSoftwareVersions), []);
    // },
    // ntg6SoftwareVersions() {
    //   const ntg6 = this.categories.find(category => category.generationName === 'NTG').supportedHeadUnitGenerations.find(generation => generation.variant === 'NTG6');
    //   return ntg6.supportedHeadUnitReleases.reduce((versions, release) => versions.concat(release.supportedHeadUnitSoftwareVersions), []);
    // },
    // ntg7SoftwareVersions() {
    //   const ntg7 = this.categories.find(category => category.generationName === 'NTG').supportedHeadUnitGenerations.find(generation => generation.variant === 'NTG7');
    //   return ntg7.supportedHeadUnitReleases.reduce((versions, release) => versions.concat(release.supportedHeadUnitSoftwareVersions), []);
    // },



    details() {
      return this.$store.state.details;
    },
    categories(){
      return this.$store.state.categories;
    },
    filteredDetails() {
      const version = this.gen.version.toLowerCase();
      const release = this.gen.release.toLowerCase();
      const stage = this.gen.stage.toLowerCase();
      const region = this.gen.region.toLowerCase();
      const query = this.search.toLowerCase();
      if(query == ''){
        return this.details.filter(card => {
        return card.SwVersion.toLowerCase().includes(version) & card.release.toLowerCase().includes(release) & card.stage.toLowerCase().startsWith(stage) & card.region.toLowerCase().includes(region);
      });
      }
      else{
        return this.details.filter(card => {
        return card.vin.toLowerCase().startsWith(query);
      });
      }
      

      
    },
    services() {
      return this.$store.state.services;
    }
  },
}
</script>

<style scoped>

body {
  background: rgba(88, 87, 83, 0.322)
}
.stages {
  display: flex;
  padding: 10px 300px;
  border-top: 0.5px solid;
  justify-content: space-around;
  background-color: black;
}

.pentagon {
  position: relative;
  color: #9c9898;
  transition: color 0.3s;
  font-size: large;
}

.pentagon::after {
  content: '';
  position: absolute;
  top: -11px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: transparent;
  transition: background-color 0.3s;
}

.pentagon:hover,
.pentagon.active {
  color: rgb(250, 250, 253);
}

.pentagon.active::after {
  background-color: rgb(55, 55, 245);
}

.form{
  position: relative;
}

.form .fa-search{
  position: absolute;
  top:10px;
  left: 20px;
  color: #9ca3af;
}

.form-input {
  background: rgba(248, 245, 245, 0.103);
  height: 35px;
  text-indent: 33px;
  border-radius: 10px;
  border: none;
  
}
.form-control{
  color: white;
}
*::-webkit-input-placeholder {
  color:#9ca3af;
}
.form-input:focus{

  box-shadow: none;
  border: 1px solid whitesmoke;
}

.filters{
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}
.ifilter select{
  width: 100px;
  margin-left: 10px;
}



.row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.card-text {
  border: 1px solid;
  border-radius: 10px;
  background: rgba(121, 204, 230, 0.24);
}
.card-title{
 align-self: center;
}
.card-body{
  padding: 10px;
}
.card{
  border-radius: 20px;
  background: #dee2e69e;
  
}
.rowed{
  display: flex;
  justify-content: space-around;
}

.status-icon{
  margin-top: -8px;
}
.connected{
  color: green;
}
.disconnected{
  color: red;
}
.col {
  opacity: 0;
  animation-name: fade-in;
  animation-duration: 1s;
  animation-delay: 0.1s;
  /* Adjust the delay value as per your requirements */
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}



</style>
