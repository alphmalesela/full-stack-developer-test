<template>
  <div class="row">
    <PieChart/>
  </div>
  <div class="row">
    <DynamicTable/>
  </div>
</template>

<script setup>
import PieChart from './../components/PieChart.vue'
import DynamicTable from './../components/DynamicTable.vue'

defineOptions({
  name: 'IndexPage'
});
</script>
