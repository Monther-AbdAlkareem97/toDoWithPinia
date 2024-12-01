<template>
    <div v-if="tasks.length > 0" class="absolute top-44 right-x w-2/5 bg-gray-100 p-5 space-y-4 dark:bg-gray-800 dark:text-white">
        <div v-for="(task, index) in tasks" :key="index"
            class="relative bg-gray-50 border border-black p-5 flex justify-between items-center rounded-lg dark:bg-gray-700 dark:border-gray-600">
            <span :style="{ backgroundColor: task.isDone ? 'green' : 'red' }" class="w-2 h-16 absolute top-0 left-0
            rounded-tl-lg rounded-bl-lg"></span>
            <div>{{ task.name }}</div>
            <div>
                <font-awesome-icon @click="toggleColor(index)"
                    class="cursor-pointer text-gray-400 hover:text-green-700 dark:text-gray-500 dark:hover:text-green-600" icon="check" />
                <font-awesome-icon class="mx-3 cursor-pointer text-gray-400 hover:text-blue-700 dark:text-gray-500 dark:hover:text-blue-600" icon="pen"
                    @click="openUpdatePopup(task)" />
                <font-awesome-icon class="cursor-pointer text-gray-400 hover:text-red-700 dark:text-gray-500 dark:hover:text-red-600" icon="trash"
                    @click="handleDeleteTask(task.id)" />
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="popup fixed inset-0 flex items-center justify-center bg-opacity-50 z-30">
        <div class="popup-content bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Edit Task</h3>
            <input v-model="editableTask.name" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <div class="flex space-x-2">
                <button @click="saveChanges"
                    class="bg-green-edit text-white w-full py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Save
                </button>
                <button @click="closePopup"
                    class="bg-red-remove text-white w-full py-2 rounded-lg hover:bg-red-400 transition duration-200">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import { useTaskStore } from "@/stores/task";

const tasks = ref([]);
const taskStore = useTaskStore();
const editableTask = ref({});
const showPopup = ref(false);

const toggleColor = (index) => {
    tasks.value[index].isDone = !tasks.value[index].isDone;
};

const handleDeleteTask = async (tasksId) => {
    await taskStore.deleteTask(tasksId);
};

const openUpdatePopup = (task) => {
    editableTask.value = { ...task };
    showPopup.value = true;
};

const saveChanges = async () => {
    await taskStore.updateTask(editableTask.value);
    closePopup();
};

const closePopup = () => {
    showPopup.value = false;
};

onMounted(async () => {
    await taskStore.fetchTask();
    tasks.value = taskStore.tasks;
});
</script>

<style scoped>
.bg-deep-purple {
    background-color: #6200EA;
}

.right-x {
    position: absolute;
    right: 15.75rem;
}

.bg-green-edit {
    background-color: #15803d;
    border-radius: 30px;
    margin-right: 3px;
}

.bg-red-remove {
    background-color: #FF3B30;
    border-radius: 30px;
}

.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.699);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

</style>
