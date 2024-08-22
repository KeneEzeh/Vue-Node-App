<template>
  <div class="container mt-5">
    <b-card>
      <h5>Comments</h5>
      <b-list-group>
        <b-list-group-item v-for="comment in comments" :key="comment.id">
          {{ comment.body }}
        </b-list-group-item>
      </b-list-group>
    </b-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  props: ['postId'],
  setup(props) {
    const comments = ref([]);

    const fetchComments = async () => {
      const response = await fetch(`http://localhost:3000/posts/${props.postId}/comments`);
      comments.value = await response.json();
    };

    onMounted(fetchComments);

    return { comments };
  }
});
</script>
