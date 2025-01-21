<script setup>
const route = useRoute();
const id = route.params.id

const { data: tickets, refresh: ticketRefresh } = await useFetch(`http://localhost:8000/api/tickets/${id}`)
const { data: ticketCount, refresh: ticketCountRefresh } = await useFetch(`http://localhost:8000/api/tickets/count/${id}`);

const links = computed(() => [
  {
    label: 'Overview',
    icon: 'i-heroicons-home',
    to: `/dashboard/${id}`
  },
  {
    label: 'Ticket',
    icon: 'i-mdi-ticket-outline',
    to: `/dashboard/${id}/tickets`,
    badge: ticketCount.value
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog',
    to: `/dashboard/${id}/settings`
  }
])

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
  'InProgress',
  'Closed'
]

const priorities = [
  'Low',
  'Medium',
  'High',
  'Critical'
]

const columns = [
  {
    key: 'id',
    label: 'ID'
  },
  {
    key: 'name',
    label: 'Name'
  },
  {
    key: 'title',
    label: 'Title'
  },
  {
    key: 'status',
    label: 'Status'
  },
  {
    key: 'priority',
    label: 'Priority'
  },
  {
    key: 'assignee',
    label: 'Assignee'
  },
  {
    key: 'createdAt',
    label: 'CreatedAt'
  },
  {
    key: 'actions'
  }
]

const items = row => [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => console.log('Edit', row.id)
  }, {
    label: 'Duplicate',
    icon: 'i-heroicons-document-duplicate-20-solid'
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    click: () => {
      deleteTargetId.value = row.id
      deleteModal.value = true
    }
  }]
]

const ticket = ref([tickets.value[0]])
const status = ref([statuses[0]])
const ticketStatus = ref(statuses[1])
const priority = ref(priorities[0])
const user = ref(users[0])
const selected = ref([tickets.value[0]])
const deleteTargetId = ref()
const ticketName = ref('')
const ticketTitle = ref('')
const ticketDescription = ref('')

const deleteModal = ref(false)
const addModal = ref(false)

const onSubmit = async () => {
  await useFetch('http://localhost:8000/api/tickets', {
    method: "post",
    body: {
      name: ticketName,
      title: ticketTitle,
      description: ticketDescription,
      status: ticketStatus,
      priority: priority,
      projectId: Number(id)
    }
  })
  ticketRefresh()
  ticketCountRefresh()
  addModal.value = false
}

const onDelete = async () => {
  await useFetch(`http://localhost:8000/api/tickets/${deleteTargetId.value}`, {
    method: "delete",
    body: {
      title: ticketTitle,
    }
  })
  ticketRefresh()
  ticketCountRefresh()
  deleteModal.value = false
}

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
        <UButton icon="i-heroicons-plus" @click="addModal = true">Add</UButton>

        <UDashboardModal v-model="addModal" title="Add ticket" prevent-close
          description="Are you sure you want to delete your ticket?" icon="i-heroicons-exclamation-circle" :ui="{
            icon: { base: 'text-green-500 dark:text-green-400' },
            footer: { base: 'ml-16' }
          }">
          <UInput v-model="ticketName" placeholder="Name" />
          <UInput v-model="ticketTitle" placeholder="Title" />
          <UTextarea v-model="ticketDescription" placeholder="Description" />
          <USelect v-model="ticketStatus" :options="statuses.slice(1)" icon="i-heroicons-hashtag" />
          <USelect v-model="priority" :options="priorities" icon="i-heroicons-fire-16-solid" />
          <template #footer>
            <UButton color="green" label="Submit" :loading="loading" @click="onSubmit" />
            <UButton color="white" label="Cancel" @click="addModal = false" />
          </template>
        </UDashboardModal>

        <UDashboardModal v-model="deleteModal" title="Delete ticket"
          description="Are you sure you want to delete your ticket?" icon="i-heroicons-exclamation-circle" :ui="{
            icon: { base: 'text-red-500 dark:text-red-400' },
            footer: { base: 'ml-16' }
          }">
          <template #footer>
            <UButton color="red" label="Delete" :loading="loading" @click="onDelete" />
            <UButton color="white" label="Cancel" @click="deleteModal = false" />
          </template>
        </UDashboardModal>
      </div>
    </div>
    <UTable v-model="selected" :rows="tickets" @select="select" :columns="columns" class="mt-4">
      <template #createdAt-data="{ row }">
        {{ $formatDate(row.createdAt) }}
      </template>

      <template #actions-data="{ row }">
        <UDropdown :items="items(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
  </div>
</template>
