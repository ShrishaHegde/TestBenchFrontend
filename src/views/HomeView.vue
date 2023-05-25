<template>
  <h3>Head unit categories</h3>
  <div class="home">
    <div class="buttons">
      <button type="button" class="btn btn-primary" @click="fetchGen20x">Gen20X</button>
    </div>
    <div v-if="showGen20x">
      <div class="row">
        <div class="col-md-auto" v-for="card in gen20x" :key="card.vin">
          <div class="card" style="width: 18rem;margin:30px">
            <div class="card-body">
              <h5 class="card-title">Gen20X.{{ card.version }}</h5>
              <p class="card-text">Release : {{ card.release }}</p>
              <p class="card-text">Cubicle : {{ card.Cubicle }}</p>
              <p class="card-text">{{ card.vin }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="home">
    <div class="buttons">
      <button type="button" class="btn btn-primary" @click="fetchNtg">NTG</button>
    </div>
    <div v-if="showNtg">
      <div class="row">
        <div class="col-md-auto" v-for="card in ntg" :key="card.vin">
          <div class="card" style="width: 18rem;margin:30px">
            <div class="card-body">
              <h5 class="card-title">NTG{{ card.version }}</h5>
              <p class="card-text">Release : {{ card.release }}</p>
              <p class="card-text">Cubicle : {{ card.Cubicle }}</p>
              <p class="card-text">{{ card.vin }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  
  data() {
    return {
      showGen20x: false,
      showNtg: false
    }
  },
  methods: {
   
    fetchGen20x() {
      this.showGen20x = !this.showGen20x;
      this.$store.dispatch("fetchGen20x");
    },
    fetchNtg() {
      this.showNtg = !this.showNtg;
      this.$store.dispatch("fetchNtg");
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
    }
  },
}
</script>

<style>
.btn {
  display: block;
  width: 50%;
  margin: 50px 0px 50px 0px;
  padding: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.row {
  display: flex;
  justify-content: center;
}
.card:hover{
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.card-text{
  border: 1px solid ;
  border-radius: 10px;
  background: rgba(121, 204, 230, 0.24);
}
</style>
