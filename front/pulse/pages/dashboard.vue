<script setup lang="ts">
const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  tooltip: {
    text: 'Home',
    shortcuts: ['G', 'H']
  },
}, {
  label: 'Project',
  icon: 'i-heroicons-folder-16-solid',
  tooltip: {
    text: 'Project',
    shortcuts: ['G', 'P']
  },
  }, {
  label: 'Settings',
  icon: 'i-heroicons-cog-8-tooth',
  children: [{
    label: 'Profile',
  }, {
    label: 'Account',
  }],
  tooltip: {
    text: 'Settings',
    shortcuts: ['G', 'S']
  },
}]
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel>
      <UDashboardNavbar />

      <UDashboardSidebar>
        <UDashboardSidebarLinks :links="links" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />
  </UDashboardLayout>
</template>
