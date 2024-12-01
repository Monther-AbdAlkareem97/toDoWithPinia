<template>
        <navBarComponent />
            <AddTask />
            <showTasks />
    <sideBarComponent />
</template>

<script setup>
import navBarComponent from '@/components/navBarComponent.vue';
import sideBarComponent from '@/components/sideBarComponent.vue';
import AddTask from '../components/AddTaskComponent.vue';
import showTasks from '../components/ShowTasksComponent.vue'
</script>
<style scoped></style>