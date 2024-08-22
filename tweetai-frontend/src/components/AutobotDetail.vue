<template>
  <div class="container mt-5">
    <b-card>
      <h5>Autobot Details</h5>
      <p>Name: {{ autobot.name }}</p>
      <p>Username: {{ autobot.username }}</p>
      <p>Email: {{ autobot.email }}</p>
      <h5>Posts</h5>
      <b-list-group>
        <b-list-group-item v-for="post in posts" :key="post.id" @click="showComments(post)">
          {{ post.title }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  props: ['autobotId'],
  setup(props) {
    const autobot = ref(null);
    const posts = ref([]);

    const fetchAutobotDetails = async () => {
      const response = await fetch(`http://localhost:3000/autobots/${props.autobotId}/posts`);
      const data = await response.json();
      autobot.value = data.autobot;
      posts.value = data.posts;
    };

    const showComments = (post: any) => {
      // Logic to show post comments
    };

    onMounted(fetchAutobotDetails);

    return { autobot, posts, showComments };
  }
});
</script>
