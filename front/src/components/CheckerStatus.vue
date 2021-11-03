<script setup lang="ts">
defineProps<{ city: string; amount: number; percentage: string }>();
</script>
<template>
  <div
    class="relative flex flex-col p-4 space-y-4 bg-gray-800 rounded-md group"
  >
    <div
      @click="$emit('delete')"
      class="absolute p-1 text-gray-400 transition  rounded-2xl top-3 right-3 hover:cursor-pointer hover:text-gray-100 hover:bg-gray-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    <h2 class="text-xl text-center text-gray-100">
      {{ city }}
      <span class="px-2 text-base text-orange-900 bg-orange-300 rounded-2xl">
        {{ amount }}€
      </span>
    </h2>
    <div class="relative w-full h-3 bg-gray-900 rounded">
      <span
        class="absolute w-full h-full text-xs leading-none text-center text-gray-100 "
        >{{ percentage }}%</span
      >
      <div
        class="h-full transition-all bg-orange-600 rounded-l rounded-r-xl"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
  </div>
</template>
