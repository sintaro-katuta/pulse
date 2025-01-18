<script setup lang="ts">
const route = useRoute()
const id = route.params.id

const { data: tickets } = await useFetch(`http://localhost:8000/api/tickets/${id}`)

const links = [
  {
    label: 'Overview',
    icon: 'i-heroicons-home',
    to: `/dashboard/${id}`
  },
  {
    label: 'Ticket',
    icon: 'i-mdi-ticket-outline',
    to: `/dashboard/${id}/tickets`,
    badge: '3'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog',
    to: `/dashboard/${id}/settings`
  }
]

const users = [
  'John Doe',
  'Jane Doe',
  'Alice Doe',
  'Bob Doe',
  'shintaro katsuta'
]

const statuses = [
  'All',
  'Open',
  'In Progress',
  'Closed'
]

const ticket = ref([tickets[0]])
const status = ref(statuses[0])
const user = ref(users[0])

function select(row) {
  const index = ticket.value.findIndex((item) => item.id === row.id)
  if (index === -1) {
    ticket.value.push(row)
  } else {
    ticket.value.splice(index, 1)
  }
}

definePageMeta({
  layout: 'dashboard'
})

</script>

<template>
  <div class="w-full h-full p-3 mx-3">
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <div class="w-full flex justify-start items-center gap-5 pt-3">
      <UInput placeholder="Search" class="w-1/2" icon="i-heroicons-magnifying-glass" />
      <USelect v-model="status" :options="statuses" icon="i-heroicons-hashtag" />
      <UInputMenu v-model="user" :options="users" icon="i-heroicons-user" />
      <div class="ml-auto flex gap-5">
        <UButton color="red" icon="i-heroicons-trash">Delete</UButton>
        <UButton icon="i-heroicons-pencil">Edit</UButton>
        <UButton icon="i-heroicons-plus">Add</UButton>
      </div>
    </div>
    <UTable v-model="ticket" :rows="tickets" @select="select" class="mt-4"></UTable>
  </div>
</template>
