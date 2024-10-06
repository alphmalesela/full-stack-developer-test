<template>
  <div class="q-pa-md">
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

const getUsers = (designation="all") => {
  return fetch(`http://localhost:3000/users/dynamicUsers?designation=${designation}`).then((response) =>
        response.json()
    );
}

let rows = ref([])

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
    }
  },

  async mounted() {
    const data = await getUsers()
    rows.value = data
    console.log(data)
  }

}
</script>
