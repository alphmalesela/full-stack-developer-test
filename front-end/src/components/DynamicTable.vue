<template>
  <div class="q-pa-lg">
    <div class="q-gutter-md">
      <q-select v-model="model" :options="designations" label="Designation"
        @update:model-value="selectedDesignation"
      />
    </div>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { ref } from 'vue'

let rows = ref([])
let designations = ref([])

const getUsers = (designation="all") => {
  return fetch(`http://localhost:3000/users/dynamicUsers?designation=${designation}`).then((response) =>
        response.json()
    );
}

const selectedDesignation = async (value)=> {
  const data = await getUsers(value)
  rows.value = data.users
  designations.value = data.designations
}

const columns = [
  { name: 'name', align: 'center', label: 'Name', field: 'name', sortable: true },
  { name: 'surname', align: 'center', label: 'Surname', field: 'surname', sortable: true },
  { name: 'department', label: 'Department', field: 'department', sortable: true },
  { name: 'designation', label: 'Designation', field: 'designation' }
]

export default {

  setup () {
    return {
      columns,
      rows,
      model: ref(null),
      selectedDesignation,
      designations
    }
  },

  async mounted() {
    const data = await getUsers()
    rows.value = data.users
    designations.value = data.designations
  }

}
</script>
