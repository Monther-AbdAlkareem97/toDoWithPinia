<template>
  <div
    class="flex justify-end px-7 border border-black h-16 w-nav shadow-xl absolute top-0 right-0 dark:nav-bg dark:text-white">
    <button @click="toggleTheme">
      <font-awesome-icon
        class="p-2 size-6 hover:rounded-full dark:hover:bg-gray-600 hover:bg-blue-100 text-blue-700 dark:text-blue-700"
        :icon="darkMode ? 'sun' : 'moon'" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const darkMode = ref(false);


const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  if (darkMode.value) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');  
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light'); 
  }
};


onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    darkMode.value = true;
    document.body.classList.add('dark');
  } else {
    darkMode.value = false;
    document.body.classList.remove('dark');
  }
});
</script>

<style>
.w-nav {
  width: 1030px;
}


body {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

}


body.dark {
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: rgb(45, 45, 45);
  box-shadow: 0px 4px 6px rgba(255, 255, 255, 0.2);
}
</style>
