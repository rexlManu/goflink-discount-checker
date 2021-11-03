<script setup lang="ts">
import { Promocode } from '../store';

defineProps<{ code: Promocode }>();
</script>
<template>
  <div
    class="relative flex items-center border border-gray-800 rounded-md group"
  >
    <div class="inline-flex p-2 bg-gray-800 rounded-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        :class="{
          'text-orange-500': code.status == 'success',
          'text-orange-300': code.status == 'money',
          'text-gray-400': code.status == 'pending',
          'text-red-500': code.status == 'inactive',
        }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          v-if="code.status == 'pending'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          v-else-if="code.status == 'success'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          v-else-if="code.status == 'inactive'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          v-else-if="code.status == 'money'"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <div class="flex flex-row items-center justify-center flex-1">
      <h1 class="font-medium leading-none text-center text-gray-400 uppercase">
        {{ code.code }}
      </h1>
      <span
        v-if="code.discount"
        class="
          px-2
          py-0.5
          ml-2
          font-medium
          leading-none
          text-sm text-green-300
          bg-green-900
          rounded-2xl
        "
        >{{ code.discount }}€</span
      >
    </div>
    <div
      @click="$emit('close', code.code)"
      class="absolute top-0 right-0 bg-gray-800 rounded-md opacity-0  group-hover:opacity-100 hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-3.5 h-3.5 hover:text-gray-300 text-gray-500 transition"
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
  </div>
</template>
