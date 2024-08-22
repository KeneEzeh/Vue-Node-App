<template>
  <div class="container mt-5">
    <b-table :items="autobots" :fields="fields" @row-clicked="showDetails" hover>
      <template #cell(name)="data">
        {{ data.value }}
      </template>
      <template #cell(email)="data">
        <b-link @click.stop="showDetails(data.item)">{{ data.value }}</b-link>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalAutobots"
      :per-page="perPage"
      @change="fetchAutobots"
    ></b-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { BTable, BPagination, BLink } from 'bootstrap-vue';

export default defineComponent({
  components: { BTable, BPagination, BLink },
  setup() {
    const autobots = ref([]);
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalAutobots = ref(0);

    const fields = ['id', 'name', 'username', 'email'];

    const fetchAutobots = async () => {
      const response = await fetch(`http://localhost:5000/api/get-all-autobots`);
      const data = await response.json();
      autobots.value = data.autobots;
      totalAutobots.value = data.total;
    };

    const showDetails = (autobot: any) => {
      // Logic to show autobot details
      console.log(autobot);
    };

    onMounted(fetchAutobots);

    return {
      autobots,
      currentPage,
      perPage,
      totalAutobots,
      fields,
      fetchAutobots,
      showDetails,
    };
  }
});
</script>
