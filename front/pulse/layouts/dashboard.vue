<script setup lang="ts">
const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    tooltip: {
      text: 'Home',
      shortcuts: ['G', 'H']
    },
  },
  {
    label: 'Project',
    icon: 'i-heroicons-folder-16-solid',
    to: '/dashboard',
    tooltip: {
      text: 'Project',
      shortcuts: ['G', 'P']
    },
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [{
      label: 'General',
    }, {
      label: 'Account',
    }],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'S']
    },
  }
]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="300" :resizable="{ min: 200, max: 400 }">
      <UDashboardNavbar>
        <template #left>
          <Logo class="w-auto h-6" />
        </template>
      </UDashboardNavbar>

      <UDashboardSidebar>
        <UDashboardSearchButton label="Search" />
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <UDashboardPage>
      <slot />
    </UDashboardPage>
  </UDashboardLayout>
</template>
