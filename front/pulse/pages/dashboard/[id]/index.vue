<script setup lang="js">
const route = useRoute()
const id = route.params.id

const projects = {
  'id': 1,
  'name': 'nazenaze',
  'description': '2024前期チーム制作作品',
  'icon': 'i-simple-icons-tailwindcss'
}

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
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <UPageHeader :handline="projects.name" :title="projects.name" :description="projects.description"
      :icon="projects.icon" />
  </div>
</template>
