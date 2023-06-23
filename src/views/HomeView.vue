<template>
  <div class="menu-bar">
    <div class="stages">
      <div class="pentagon" v-for="gens in HuGens" :key="gens.id" :class="{ active: currentStage === gens.id }"
      @click="changeCurrentStage(gens)">
      <span class="text">{{ gens.id }}</span>
    </div>
    </div>
    <div class="search-bar me-4">
      <div class="form">
        <i class="fa fa-search"></i>
        <input type="text" class="form-control form-input" placeholder="Search by vin" v-model="search">
      </div>
    </div>
  </div>
  <div class="container">
    <div class="filters">
      <div class="ifilter">
        <label>Release</label>
        <select v-model="gen.release" placeholder="">
          <option value="">All</option>
          <option v-for="filter in releaseFilters" :key="filter.release" :value="filter.release">{{ filter.release }}
          </option>
        </select>
      </div>
      <div class="ifilter">
        <label> Version</label>
        <select v-model="gen.version">
          <option value="">All</option>
          <option v-for="filter in versionFilters" :key="filter" :value="filter">{{ filter }}</option>
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
      <button type="button" class="btn btn-outline-secondary btn-sm" style="margin-top:-5px" @click="clearAll">Clear
        All</button>
    </div>
    <div class="row">
      <div class="col" v-for="(card, index) in filteredDetails" :key="card.vin">
        <div class="card" style="width: 18rem;margin:30px">
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
            <div style="display:flex;justify-content: space-evenly;margin-bottom:1rem;
            " class="card-text">
              <p style="margin-bottom:0px" ref="textToCopy">{{  card.vin }} </p> 
              <i class="fas fa-copy" @click="copyText(index)"></i>
            </div>
            <div class="buttons" style="display:flex;justify-content:space-around">
              <button type="button" class="btn btn-primary btn-sm" @click="fetchServices(card.vin)">Services</button>
              <router-link :to="{ name: 'book' }" style="text-decoration: none; color: inherit;"><button type="button" class="btn btn-primary btn-sm" @click="setSelectedCard(card)" >Book</button></router-link>
            </div>
            <div class="notification" :class="{ 'show': showNotification }">
              Text copied!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="notification" :class="{ 'show': showNotification }">
    Text copied!
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
      currentStage: "Gen20xi2",
      search: "",
      gen: {
        release: "",
        stage: "",
        region: "",
        version: ""
      },
      releaseFilters: [
        {
          "release": "SOP",
          "supportedHeadUnitSoftwareVersions": [
            "E52.5",
            "E049.0_674",
            "E051.5_1066",
            "E052.5_1341"
          ]
        }
      ],
      isPopupVisible: false,
      showNotification: false
    }
  },
  created() {
    window.onload = () => {
      this.$store.dispatch("fetchDetails", "Gen20x/i2");
      this.$store.dispatch("fetchCategories");
    };
  },
  methods: {
    changeCurrentStage(gens) {
      this.$store.dispatch("fetchDetails", gens.generationName + "/" + gens.variant);
      this.currentStage = gens.id;
      this.releaseFilters = gens.supportedHeadUnitReleases;
    },

    fetchServices(vin) {
      this.isPopupVisible = true;
      this.$store.dispatch("fetchServices", vin);
    },
    hidePopup() {
      this.isPopupVisible = false;
    },
    clearAll() {
      this.gen.release = "",
        this.gen.stage = "",
        this.gen.region = "",
        this.gen.version = "",
        console.log(this.HuGens)
    },
    copyText(index) {
      const textToCopy = this.$refs.textToCopy[index].innerText;
      console.log(textToCopy);
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch(error => {
          console.error('Unable to copy text:', error);
        });
        this.showNotification = true;
        setTimeout(() => {
        this.showNotification = false;
      }, 2000);
    },
    setSelectedCard(card) {
      console.log(card)
      this.$store.commit('SET_CARD', card);
    }
  },
  computed: {
    details() {
      return this.$store.state.details;
    },
    categories() {
      return this.$store.state.categories;
    },
    filteredDetails() {
      const version = this.gen.version.toLowerCase();
      const release = this.gen.release.toLowerCase();
      const stage = this.gen.stage.toLowerCase();
      const region = this.gen.region.toLowerCase();
      const query = this.search.toLowerCase();
      if (query == '') {
        return this.details.filter(card => {
          return card.SwVersion.toLowerCase().includes(version) & card.release.toLowerCase().includes(release) & card.stage.toLowerCase().startsWith(stage) & card.region.toLowerCase().includes(region);
        });
      }
      else {
        return this.details.filter(card => {
          return card.vin.toLowerCase().includes(query);
        });
      }
    },

    versionFilters() {
      if (this.gen.release != "") {
        const filter = this.releaseFilters.find(releases => releases.release === this.gen.release
        );
        return filter.supportedHeadUnitSoftwareVersions;
      }
      else {
        const versions = [];
        this.releaseFilters.forEach(release => {
          release.supportedHeadUnitSoftwareVersions.forEach(ver => versions.push(ver))
        });
        return versions;
      }
    },
    HuGens() {
      return this.categories.map(category => {
        return category.supportedHeadUnitGenerations.map(hu => {
          return {
            generationName: category.generationName,
            ...hu
          };
        });
      });
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
.menu-bar{
  display: flex;
  padding: 10px;
  border-top: 0.5px solid;
  justify-content: space-between;
  background-color: black;
  text-align: left;
}
.stages {
  display: flex;
  justify-content: space-around; 
}

.pentagon {
  margin: 0px 30px;
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

.form {
  position: relative;
}

.form .fa-search {
  position: absolute;
  top: 10px;
  left: 20px;
  color: #9ca3af;
}

.form-input {
  background: rgba(248, 245, 245, 0.103);
  height: 35px;
  text-indent: 33px;
  border-radius: 10px;
  border: none;
  border: 1px solid whitesmoke;
}

.form-control {
  color: white;
}

*::-webkit-input-placeholder {
  color: #9ca3af;
}

.form-input:focus {
  box-shadow: none;
  
}

.filters {
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
}

.ifilter select {
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

.card-title {
  align-self: center;
}

.card-body {
  padding: 10px;
}

.card {
  border-radius: 20px;
  background: #dee2e69e;

}

.rowed {
  display: flex;
  justify-content: space-around;
}

.status-icon {
  margin-top: -8px;
}

.connected {
  color: green;
}

.disconnected {
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
.notification {
  position: fixed;
  color: aliceblue;
  top: 50%;
  right: 50%;
  background-color: #444141;
  padding: 10px;
  border-radius: 20px;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.notification.show {
  opacity: 1;
}

</style>
