<template>
  <header>
    <div class="header-container">
      <h2 class="logo">TweetAI</h2>
      <h4>A <span>SmartInsight</span> take-home Assignment</h4>
    </div>
  </header>
  <div class="main-container">
    <section class="hero">
      <h1 class="hero-title">Welcome to TweetAI</h1>
      <p class="hero-text">Designed and programmed by <span>Ezeanwe Kenechukwu</span></p>
      <!-- <button class="hero-btn">Get Started</button> -->
      <div class="hero-illustration">
        <img alt="Vue logo" src="../assets/logo.png">
        <h2>UI Powered with Vue.js</h2>
        <div class="api">
          <a href="https://keneezeh.github.io/Vue-Node-App/swagger-docs/">View the API documentation</a>
        </div>
      </div>
    </section>
    <section class="stats">
      <h1 class="stats-title">Total Autobots created</h1>
      <h2 class="stats-count">{{ autobotCount }}</h2>
      <p class="stats-text">Autobots created in the last 24 hours</p>
      <div class="stats-graph">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="50" fill="none" stroke="#3498db" stroke-width="10"></circle>
          <circle cx="50" cy="50" r="50" fill="none" stroke="#3498db" stroke-width="10" stroke-dasharray="100 100" stroke-dashoffset="50"></circle>
          <text x="50" y="60" font-size="30" font-weight="bold" text-anchor="middle">{{ recentAutobotCount }}</text>
        </svg>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "../api/axios";

export default defineComponent({
  data() {
    return {
      autobotCount: 0,
      recentAutobotCount: 0,
    };
  },
  mounted() {
    this.fetchAutobotCount();
    setInterval(this.fetchAutobotCount, 60000);
  },
  methods: {
  async fetchAutobotCount() {
    console.log("Here...");
    const response = await axios.get('/api/get-count');
    const autobots = await response.data;
    this.autobotCount = autobots.count;
    this.recentAutobotCount = autobots.recentAutobots;
  },
},
});
</script>

<style scoped>
.header-container {
  background: #3498db; 
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  border-radius: 25px;

  h4{
    color: #141618;
    font-weight: 800;
    font-size: 40px;

    span{
      color: #eef2f7;
    }
  }

  @media screen and (max-width: 860px) {
    flex-direction: column;
    height: auto;

    h4{
      font-size: 25px;
    }
    
  }
}

.logo {
  font-size: 44px;
  font-weight: bold;
  color: #fff;
  margin-right: 20px;
}


.main-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.hero {
  background: #3498db;
  padding: 40px;
  text-align: center;
  color: #fff;
}

.hero-title {
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero-text {
  font-size: 18px;
  margin-bottom: 20px;

  span{
    color: #141618;
    font-size: larger;
    font-weight: 800;
  }
}
.api {
  text-decoration: none;
  background: #b4c2e9;
  padding: 10px;
  border-radius: 10px;

  a{
    text-decoration: none;
    color: #141618;
    font-size: 30px;
  }
}

.hero-btn {
  background: #fff;
  color: #3498db;
  border: none;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.hero-btn:hover {
  background: #ccc;
}

.stats {
  padding: 40px;
  text-align: center;
}

.stats-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.stats-count {
  font-size: 48px;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
}

.stats-text {
  font-size: 18px;
  margin-bottom: 20px;
}

.stats-graph {
  width: 100px;
  height: 100px;
  margin: 20px auto;
}

.stats-graph svg {
  width: 100%;
  height: 100%;
}

.stats-graph circle {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 0.5s ease;
}

.stats-graph circle:nth-child(2) {
  stroke-dashoffset: 50;
  transition: stroke-dashoffset 0.5s ease;
}

.stats-graph:hover circle:nth-child(2) {
  stroke-dashoffset: 0;
}
</style>