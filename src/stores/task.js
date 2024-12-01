import { defineStore } from "pinia";
import { ref } from 'vue';
import axios from "axios";

export const useTaskStore = defineStore('task', () => {
    const tasks = ref([]);

    const fetchTask = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            tasks.value = response.data;
        } catch (error) {
            console.log('Error fetching tasks ', error);
        }
    };
    const addTask = async (task) => {
        try {
            const response = await axios.post('http://localhost:3000/tasks', task);
            tasks.value.push(response.data);
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };
    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/tasks/${id}`);
            const index = tasks.value.findIndex(task => task.id === id); //findIndex return the num of id or -1 if not match
            if (index !== -1)
                tasks.value.splice(index, 1);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    const updateTask = async (updatedTask) => {
        try {
            await axios.put(`http://localhost:3000/tasks/${updatedTask.id}`, updatedTask);
            const index = tasks.value.findIndex(task => task.id === updatedTask.id);
            if (index !== -1)
                tasks.value.splice(index, 1, updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    return {
        tasks,
        addTask,
        fetchTask,
        deleteTask,
        updateTask,
    };
});
