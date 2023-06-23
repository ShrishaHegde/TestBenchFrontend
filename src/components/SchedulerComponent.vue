<template>
  <div ref="SchedulerComponent"></div>
</template>
   
<script>
import { scheduler } from "dhtmlx-scheduler";


export default {
  props: {
    events: {
      type: Array,
      default() {
        return []
      },
    },
  },
  mounted: function () {
    scheduler.skin = "material";
    scheduler.config.header = [
      "day",
      "week",
      "month",
      "date",
      "prev",
      "today",
      "next",
    ];
    scheduler.init(
      this.$refs.SchedulerComponent,
      new Date(2023, 5, 23),
      "week"
    );
    scheduler.parse(this.$props.events);
    scheduler.templates.hour_scale = function (date) {
      const hour = date.getHours();
      const ampm = hour >= 12 ? 'PM' : 'AM';
      let formattedHour = hour % 12;
      formattedHour = formattedHour === 0 ? 12 : formattedHour;
      const string = formattedHour + ':00 ' + ampm;
      console.log(string)
      return string;
    };
  },
};
</script>
   
<style>
.dhx_scale_hour{
  width: 55px !important;
}
@import "~dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css";
</style>