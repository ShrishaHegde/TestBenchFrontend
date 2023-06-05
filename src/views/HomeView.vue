<template>
  <div class="home">
    <div class="buttons">
      <button type="button" class="btn btn-primary" style="display: block;
      width: 20%;
      margin: 50px 0px 50px 0px;
      padding: 20px;" @click="fetchGen20x">Gen20X</button>
      <button type="button" class="btn btn-primary" style="display: block;
      width: 20%;
      margin: 50px 0px 50px 0px;
      padding: 20px;" @click="fetchNtg">NTG</button>
    </div>
    <div v-if="showGen20x">

      <div class="filters">
        Variant
        <select v-model="gen.variant">
          <option value="">All</option>
          <option value="i2">i2</option>
          <option value="i3">i3</option>
          <option value="i4">i4</option>
        </select>
        Release
        <select v-model="gen.release">
          <option value="">All</option>
          <option value="SOP">SOP</option>
          <option value="FUP1">FUP2</option>
          <option value="FUP2">FUP3</option>
        </select>
        Stage
        <select v-model="gen.stage">
          <option value="">All</option>
          <option value="PROD">PROD</option>
          <option value="NONPROD">NONPROD</option>
        </select>
        Region
        <select v-model="gen.region">
          <option value="">All</option>
          <option value="ECE">ECE</option>
          <option value="NAM">NAM</option>
          <option value="USA">USA</option>
        </select>
        Version
        <select v-model="gen.version">
          <option value="">All</option>
          <option value="E871.103">E871.103</option>
          <option value="E905.320">E905.320</option>
          <option value="E905.404">"E905.404</option>
          <option value="DK">Dk</option>
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
      <div class="row">
        <div class="col" v-for="card in filteredGen20x" :key="card.vin">
          <vue-flip active-click="true" class="flipper">
            <template v-slot:front>
              <div class="card" style="width: 18rem;margin:30px">
                <div class="card-body">
                  <h5 class="card-title">Gen20X.{{ card.version }}</h5>
                  <p class="card-text">Release : {{ card.release }}</p>
                  <p class="card-text">Cubicle : {{ card.Cubicle }}</p>
                  <p class="card-text">{{ card.vin }}</p>
                  <div class="buttons">
                    <button type="button" class="btn btn-primary" >Book</button>
                    <button type="button" class="btn btn-primary" >Status</button>
                  </div>
                </div>
              </div>
            </template>
            <template v-slot:back>
              <div class="card" style="width: 18rem;margin:30px">
                <div class="card-body">
                  <h5 class="card-title">{{ card.connected ? "Connected" : "Not Connected" }}</h5>
                  <p class="card-text">Stage : {{ card.stage }}</p>
                  <p class="card-text">Software Version : {{ card.SwVersion }}</p>
                  <p class="card-text">Region:{{ card.region }}</p>
                  <div class="buttons">
                    <router-link :to="{ name: 'about' }" style="text-decoration: none; color: inherit;">
                    <button type="button"  class="btn btn-primary" @click="fetchServices">Services</button></router-link>
                  </div>
                </div>
              </div>
            </template>
          </vue-flip>
        </div>
      </div>
    </div>
  </div>

  <div class="home">
    <div v-if="showNtg">

      <div class="filters">
        Variant
        <select v-model="nt.variant">
          <option value="">All</option>
          <option value="5">5</option>
          <option value="5.5">5.5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
        Release
        <select v-model="nt.release">
          <option value="">All</option>
          <option value="SOP">SOP</option>
          <option value="FUP1">FUP2</option>
          <option value="FUP2">FUP3</option>
        </select>
        Stage
        <select v-model="nt.stage">
          <option value="">All</option>
          <option value="PROD">PROD</option>
          <option value="NONPROD">NONPROD</option>
        </select>
        Region
        <select v-model="nt.region">
          <option value="">All</option>
          <option value="ECE">ECE</option>
          <option value="NAM">NAM</option>
          <option value="USA">USA</option>
        </select>
        Version
        <select v-model="nt.version">
          <option value="">All</option>
          <option value="E871.103">E871.103</option>
          <option value="E905.320">E905.320</option>
          <option value="E905.404">"E905.404</option>
          <option value="DK">Dk</option>
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
      <div class="row">
      <div class="col" v-for="card in filteredNtg" :key="card.vin">
        <vue-flip active-click="true" class="flipper">
          <template v-slot:front>
            <div class="card" style="width: 18rem;margin:30px">
              <div class="card-body">
                <h5 class="card-title">NTG{{ card.version }}</h5>
                <p class="card-text">Release : {{ card.release }}</p>
                <p class="card-text">Cubicle : {{ card.Cubicle }}</p>
                <p class="card-text">{{ card.vin }}</p>
              </div>
              <div class="buttons">
                <button type="button" class="btn btn-primary" >Book</button>
                <button type="button" class="btn btn-primary" >Status</button>
              </div>
            </div>
          </template>
          <template v-slot:back>
            <div class="card" style="width: 18rem;margin:30px">
              <div class="card-body">
                <h5 class="card-title">{{ card.connected ? "Connected" : "Not Connected" }}</h5>
                <p class="card-text">Stage : {{ card.stage }}</p>
                <p class="card-text">Software Version : {{ card.SwVersion }}</p>
                <p class="card-text">Region:{{ card.region }}</p>
              </div>
              <div class="buttons">
                <router-link :to="{ name: 'about' }" style="text-decoration: none; color: inherit;">
                <button type="button"  class="btn btn-primary" @click="fetchServices">Services</button></router-link>
              </div>
            </div>
          </template>
        </vue-flip>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { VueFlip } from 'vue-flip';
export default {
  name: 'HomeView',
  components: {
    VueFlip
  },
  data() {
    return {
      showGen20x: false,
      showNtg: false,
      gen: {
        variant: "",
        release: "",
        stage: "",
        region: "",
        version:""
      },
      nt: {
        variant: "",
        release: "",
        stage: "",
        region: "",
        version:""
      }

    }
  },
  methods: {
    fetchServices() {
      this.$store.dispatch("fetchServices");
    },
    fetchGen20x() {
      if (!this.showGen20x) {
        this.showGen20x = true;
        this.$store.dispatch("fetchGen20x");
        if (this.showNtg) {
          this.showNtg = false;
        }
      }
    },
    fetchNtg() {
      if (!this.showNtg) {
        this.showNtg = true;
        this.$store.dispatch("fetchNtg");
        if (this.showGen20x) {
          this.showGen20x = false;
        }
      }
    }
  },
  computed: {
    headunits() {
      return this.$store.state.headunits;
    },
    gen20x() {
      return this.$store.state.gen20x;
    },
    ntg() {
      return this.$store.state.ntg;
    },
    filteredGen20x() {
      const variant = this.gen.variant.toLowerCase();
      const version = this.gen.version.toLowerCase();
      const release = this.gen.release.toLowerCase();
      const stage = this.gen.stage.toLowerCase();
      const region = this.gen.region.toLowerCase();
      return this.gen20x.filter(card => {
        return card.SwVersion.toLowerCase().includes(version) & card.version.toLowerCase().includes(variant) & card.release.toLowerCase().includes(release) & card.stage.toLowerCase().startsWith(stage) & card.region.toLowerCase().includes(region);
      });
    },
    filteredNtg() {
      const variant = this.gen.variant.toLowerCase();
      const version = this.nt.version.toLowerCase();
      const release = this.nt.release.toLowerCase();
      const stage = this.nt.stage.toLowerCase();
      const region = this.nt.region.toLowerCase();
      return this.ntg.filter(card => {
        return card.SwVersion.toLowerCase().includes(version) & card.version.toLowerCase().includes(variant) & card.release.toLowerCase().includes(release) & card.stage.toLowerCase().startsWith(stage) & card.region.toLowerCase().includes(region);

      });
    },
    services() {
      return this.$store.state.services;
    }
  },
}
</script>

<style>

.buttons {
  display: flex;
  justify-content: space-around;
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
.flipper{
  height: 240px;
}
body{
  background: rgba(243, 220, 179, 0.322)
}
</style>
