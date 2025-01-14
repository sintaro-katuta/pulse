<script setup lang="ts">
const projects = [
  {
    title: 'なぜなぜ',
    description: '2024前期チーム制作作品',
    icon: 'i-simple-icons-tailwindcss',
    to: "/dashboard/1",
    target: "_blank"
  },
  {
    title: 'pulse',
    description: '2024夏休み制作作品',
    icon: 'i-simple-icons-tailwindcss',
    to: "/dashboard/2",
    target: "_blank"
  }
]
</script>

<template>
  <div class="w-full h-full p-5 mx-3">
    <p class="font-bold text-3xl py-3">Project</p>
    <div class="w-full h-16 py-3 flex gap-3">
      <UContentSearchButton label="Search" class="w-1/3" />
      <UButton label="Create Project" color="black" variant="solid" to="/dashboard/new" class="w-1/5" />
    </div>
    <div class="grid grid-cols-3 gap-5">
      <UPageCard v-for="project in projects" :title=project.title :description=project.description :icon=project.icon
        :to=project.to :target=project.target class="mt-5" />
    </div>
  </div>
</template>
