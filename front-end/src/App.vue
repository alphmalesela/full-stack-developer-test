<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import * as localdb from './services/indexedDb'

const getOrderedUsers = () => {
  return fetch(`http://localhost:3000/users/orderedUsers`).then((response) =>
        response.json()
    );
}

defineOptions({
  name: 'App',
});

onMounted(async ()=> {
  const users = await getOrderedUsers()
  await localdb.createUsers(users)
})

</script>
