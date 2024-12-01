<template>
    <div class="flex justify-center items-center">
        <div
            class="bg-purple-600 w-2/5 h-20 border border-black shadow-xl z-10 flex justify-between p-5 absolute right-x top-24">
            <div>
                <h2 class="text-white">ToDo</h2>
            </div>
            <div>
                <button @click="openAddPopup">
                    <font-awesome-icon class="hover:rounded-full  size-6 hover:bg-purple-500 p-1 text-white" icon="plus" />
                </button>
                <button><font-awesome-icon class="hover:rounded-full  size-6 hover:bg-purple-500 p-1 text-white"
                        icon="ellipsis-vertical" /></button>
            </div>
        </div>
    </div>
    <div v-if="showPopup" class="popup fixed inset-0 flex items-center justify-center bg-opacity-50 z-30">
        <div class="popup-content bg-gray-50  dark:bg-gray-700  p-6 rounded-lg shadow-lg w-80 space-y-4">
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">Add Task</h3>
            <input v-model="inputTask" type="text"
                class="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" />
            <div class="flex space-x-2">
                <button @click="handleAddTask"
                    class="bg-green-edit text-white w-full py-2 rounded-lg hover:bg-green-600 transition duration-200">
                    Save
                </button>
                <button @click="closePopup"
                    class="bg-red-remove  text-white w-full py-2 rounded-lg hover:bg-red-400 transition duration-200">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/task';

const inputTask = ref('');
const taskStore = useTaskStore();
const showPopup = ref(false);

const openAddPopup = () => {
    showPopup.value = true;
};

const closePopup = () => {
    showPopup.value = false;
};

const handleAddTask = async () => {
    if (inputTask.value.trim() === '') {
        alert("Task cannot be empty");
        return;
    }
    try {
        await taskStore.addTask({ 
            name: inputTask.value,
            isDone: false 
        });
        inputTask.value = '';
    } catch (error) {
        console.error("Failed to add task:", error);
    }
    showPopup.value = false;
};
</script>


<style scoped>
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