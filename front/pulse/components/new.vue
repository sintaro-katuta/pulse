<script setup>

const title = ref('')
const description = ref('')
const selected = ref('public')

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

</script>

<template setup>
    <div class="w-full h-full p-3 mx-3">
        <UCard>
            <template #header>
                <p class="font-bold text-3xl py-3">Create a New Project</p>
            </template>

            <UFormGroup label="Project Name" class="py-3">
                <UInput v-model="title" label="Title" type="text" placeholder="pulse" />
            </UFormGroup>

            <UFormGroup label="Description" class="py-3">
                <UTextarea v-model="description" label="Description" placeholder="2024夏休み制作作品" />
            </UFormGroup>

            <URadioGroup v-model="selected" :options="options" class="py-3">
                <template #label="{ option }">
                    <div>
                        <UIcon :name="option.icon" />
                        {{ option.label }}
                    </div>
                </template>
            </URadioGroup>

            <template #footer>
                <div class="flex justfu-start items-center gap-3">
                    <UButton color="red" to="/dashboard">Cancel</UButton>
                    <UButton color="primary" @click="createProject">Create</UButton>
                </div>
            </template>
        </UCard>
    </div>
</template>
