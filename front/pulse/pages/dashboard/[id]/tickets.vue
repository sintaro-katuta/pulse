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

const tickets = [{
    id: 1,
    name: 'Create a new design',
    title: 'Create a new design',
    description: 'Create a new design for the homepage',
    status: 'open',
    priority: 'high',
    assignee: 'John Doe',
    created_at: '2021-09-01',
    updated_at: '2021-09-01'
}, {
    id: 2,
    title: 'Fix the footer',
    description: 'Fix the footer on the homepage',
    status: 'in_progress',
    priority: 'medium',
    assignee: 'John Doe',
    created_at: '2021-09-01',
    updated_at: '2021-09-01'
}, {
    id: 3,
    title: 'Update the about page',
    description: 'Update the about page with new content',
    status: 'closed',
    priority: 'low',
    assignee: 'John Doe',
    created_at: '2021-09-01',
    updated_at: '2021-09-01'
}]

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
        <UTable v-model="ticket" :rows="tickets" @select="select" class="mt-4" />
    </div>
</template>
