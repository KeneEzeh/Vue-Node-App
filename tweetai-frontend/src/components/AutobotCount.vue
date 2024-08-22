<template>
  <header>
    <div class="header-container">
      <h2 class="logo">TweetAI</h2>
      <h4>A <span>SmartInsight</span> Take-home Assignment</h4>
      <!-- <div class="header-social">
        <a href="#" class="social-link">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-facebook"></i>
        </a>
        <a href="#" class="social-link">
          <i class="fab fa-instagram"></i>
        </a>
      </div> -->
    </div>
  </header>
  <div class="main-container">
    <section class="hero">
      <h1 class="hero-title">Welcome to TweetAI</h1>
      <p class="hero-text">Designed and programmed by <span>Ezeanwe Kenechukwu</span></p>
      <button class="hero-btn">Get Started</button>
      <div class="hero-illustration">
        <img alt="Vue logo" src="../assets/logo.png">
        <h2>UI Powered with Vue.js</h2>
      </div>
    </section>
    <section class="stats">
      <h1 class="stats-title">Total Autobots created</h1>
      <h2 class="stats-count">{{ autobotCount }}</h2>
      <p class="stats-text">Autobots created in the last 24 hours</p>
      <div class="stats-graph">
        <svg width="100" height="100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3498db" stroke-width="10"></circle>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#3498db" stroke-width="10" stroke-dasharray="100 100" stroke-dashoffset="50"></circle>
          <text x="50" y="65" font-size="44" font-weight="bold" text-anchor="middle">{{ autobotCount }}</text>
        </svg>
      </div>
    </section>
    <!-- <section class="features">
      <h1 class="features-title">Features</h1>
      <ul class="features-list">
        <li class="feature">
          <i class="fas fa-robot"></i>
          <h2 class="feature-title">AI-powered bot creation</h2>
          <p class="feature-text">Create Twitter bots with ease using our AI-powered platform</p>
        </li>
        <li class="feature">
          <i class="fas fa-chart-bar"></i>
          <h2 class="feature-title">Advanced analytics</h2>
          <p class="feature-text">Track your bot's performance with our advanced analytics tools</p>
        </li>
        <li class="feature">
          <i class="fas fa-lock"></i>
          <h2 class="feature-title">Secure and reliable</h2>
          <p class="feature-text">Our platform is built with security and reliability in mind</p>
        </li>
      </ul>
    </section> -->
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
      // const response = await fetch('http://localhost:5000/api/get-count');
      // const autobots = await response.json();
      // this.autobotCount = autobots.count;
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
    font-size: large;

    span{
      color: #eef2f7;
    }
  }
}

.logo {
  font-size: 24px;
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
    font-size: large;
    font-weight: 600;
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