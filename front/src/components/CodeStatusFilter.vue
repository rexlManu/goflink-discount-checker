<script setup lang="ts">
import { Status } from '../store';
import RecheckCodesDialog from './RecheckCodesDialog.vue';
import { ref } from 'vue';

defineProps<{ filter: Status[] }>();
const emit = defineEmits(['toggleFilter', 'recheck']);

const toggleFilter = (status: Status) => {
  emit('toggleFilter', status);
};

const startRecheck = () => {
  emit('recheck');
};

let isOpen = ref(false);

const setIsOpen = (value: boolean) => (isOpen.value = value);
</script>
<template>
  <div class="relative flex items-center mb-1 rounded-md">
    <div class="flex flex-row justify-between w-full rounded-md">
      <div
        @click="toggleFilter('inactive')"
        :class="{
          'text-orange-400 hover:text-orange-500 hover:bg-gray-700':
            filter.includes('inactive'),
          'text-gray-400 hover:bg-gray-700 hover:text-gray-100':
            !filter.includes('inactive'),
        }"
        class="p-2 transition bg-gray-800 rounded-md hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        @click="toggleFilter('money')"
        :class="{
          'text-orange-400 hover:text-orange-500 hover:bg-gray-700':
            filter.includes('money'),
          'text-gray-400 hover:bg-gray-700 hover:text-gray-100':
            !filter.includes('money'),
        }"
        class="p-2 transition bg-gray-800 rounded-md hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        @click="toggleFilter('pending')"
        :class="{
          'text-orange-400 hover:text-orange-500 hover:bg-gray-700':
            filter.includes('pending'),
          'text-gray-400 hover:bg-gray-700 hover:text-gray-100':
            !filter.includes('pending'),
        }"
        class="p-2 transition bg-gray-800 rounded-md hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        @click="toggleFilter('success')"
        :class="{
          'text-orange-400 hover:text-orange-500 hover:bg-gray-700':
            filter.includes('success'),
          'text-gray-400 hover:bg-gray-700 hover:text-gray-100':
            !filter.includes('success'),
        }"
        class="p-2 transition bg-gray-800 rounded-md hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div
        @click="setIsOpen(true)"
        class="p-2 text-gray-400 transition bg-gray-800 rounded-md  hover:cursor-pointer hover:bg-gray-700 hover:text-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        <RecheckCodesDialog
          v-on:confirm="startRecheck"
          :is-open="isOpen"
          v-on:open="setIsOpen"
        />
      </div>
    </div>
  </div>
</template>
