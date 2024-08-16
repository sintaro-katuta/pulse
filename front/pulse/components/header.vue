<script setup lang="ts">
import type { NavItem } from '@nuxt/content'

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))

const links = [{
  label: 'about',
  icon: 'i-heroicons-book-open',
  to: '/about'
}, {
  label: 'dashboard',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/dashboard'
}, {
  label: 'account',
  icon: 'i-heroicons-rocket-launch',
  to: '/account'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      <Logo class="w-auto h-6" />
    </template>

    <template #right>
      <UColorModeButton />

      <UButton to="https://github.com/nuxt/ui" target="_blank" icon="i-simple-icons-github" color="gray" variant="ghost" />
    </template>

    <template #panel>
      <UNavigationTree :links="mapContentNavigation(navigation)" />
    </template>
  </UHeader>
</template>
