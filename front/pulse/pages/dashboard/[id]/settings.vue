<script setup lang="ts">
const route = useRoute()
const id = route.params.id

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
const options = [{
  label: 'Public',
  value: 'public',
  icon: 'i-heroicons-lock-open',
  help: "This project is open to all."
}, {
  label: 'Private',
  value: 'private',
  icon: 'i-heroicons-lock-closed',
  help: "Only you can see this project."
}]
const selected = ref('public')
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="w-full h-full p-3 mx-3">
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <UPage>
      <UPageHeader handline="Settings" title="Settings" description="Manage your project settings"
        icon="i-heroicons-cog" />

      <UPageBody>
        <USection>
          <USectionHeader title="General" description="General settings for your project" />
          <div class="flex flex-col gap-5">
            <label class="block text-2xl font-medium text-gray-700 dark:text-gray-300">Project Name</label>
            <div class="flex gap-3 mb-10">
              <UInput label="Project Name" placeholder="Enter your project name" size="md" class="w-1/3" />
              <UButton color="primary">Rename</UButton>
            </div>

            <label class="block text-2xl font-medium text-gray-700 dark:text-gray-300">Project Tag</label>
            <div class="flex gap-3">
              <UButton icon="i-heroicons-minus-16-solid" color="red" size="md" />
              <UInput label="Project Name" placeholder="Enter your project tag" size="md" class="w-1/3" />
              <UButton color="primary">Save</UButton>
            </div>

            <div class="flex gap-3 mb-10">
              <UButton icon="i-heroicons-plus-16-solid" size="md" color="primary" />
            </div>

            <label class="block text-2xl font-medium text-gray-700 dark:text-gray-300">Delete Project</label>
            <div class="flex gap-3 mb-10">
              <UButton color="red">delete</UButton>
            </div>
          </div>
        </USection>
      </UPageBody>
    </UPage>
  </div>
</template>
