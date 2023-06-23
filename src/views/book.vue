<template>
  <div class="container">
    <div class="row" style="margin-top:10px;border-bootom:1px solid black">
      <div class="col"><span class="p-2" >{{ card.gen }}-{{ card.variant}}</span></div>
      <div class="col"><span class="p-2" >{{ card.vin }}</span></div>
      <div class="col">Software Version : <span class="p-2" >{{ card.SwVersion }}</span></div>
      <div class="col">Release : <span class="p-2" >{{ card.release }}</span></div>
      <div class="col">Region : <span class="p-2" >{{ card.region }}</span></div> 
    </div>
    <hr>
    <SchedulerComponent class="left-container" :events="events" @event-updated="logEventUpdate"></SchedulerComponent>
  </div>
</template>
 
<script>
import SchedulerComponent from '../components/SchedulerComponent.vue'
 
export default {
  name: "app",
  components: { SchedulerComponent },
  data() {
    return {
      events: [
        {
          id: 1,
          start_date: "2023-06-20 13:00",
          end_date: "2023-06-20 14:00",
          text: "Event 1",
        },
        {
          id: 2,
          start_date: "2023-06-23 10:00",
          end_date: "2023-06-23 10:30",
          text: "Event 2",
        },
      ],
    };
  },
  computed: {
    card() {
      return this.$store.state.card;
    },
  }
};
</script>
 
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
 
.container {
  height: 100%;
  width: 100%;
}
 
.left-container {
  overflow: hidden;
  position: relative;
  height: 99vh;
  display: inline-block;
  width: 80%;
}
.p-2{
  border-radius: 2px ;
  background: rgba(169, 212, 233, 0.3)
}
hr{
  margin-bottom: 10px !important;
}

</style>