<script setup lang="js">
const route = useRoute()
const id = route.params.id

const { data: projects } = await useFetch('http://localhost:8000/api/projects');

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

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="w-full h-full mx-5">
    <UPageHeader handline="Projects" title="Projects" description="Access to participating projects"
      :icon="projects.icon" class="text-green-500" />
    <UDashboardCard v-for="project in projects" :key="project" :title="project.name" :description="project.description"
      icon="i-simple-icons-tailwindcss" class="cursor-pointer mb-5" @click="$router.push(`/dashboard/${project.id}`)" />
    {{ response }}
  </div>
</template>
