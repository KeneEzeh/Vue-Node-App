<template>
  <div>
    <h1>Total Autobots: {{ autobotCount }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      autobotCount: 0,
    };
  },
  mounted() {
    this.fetchAutobotCount();
    setInterval(this.fetchAutobotCount, 60000);
  },
  methods: {
    async fetchAutobotCount() {
      const response = await fetch('http://localhost:5000/api/get-count');
      const autobots = await response.json();
      this.autobotCount = autobots.count;
    },
  },
});
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
