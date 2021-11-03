<script setup lang="ts">
import { ref } from 'vue';
import CreateCheckerDialog from './CreateCheckerDialog.vue';
import EmptyAction from './EmptyAction.vue';
let isOpen = ref(false);

const setIsOpen = (value: boolean) => (isOpen.value = value);
</script>

<template>
  <div
    class="flex-shrink-0 w-full row-start-1  sm:w-1/2 md:w-1/3 lg:w-1/4 2xl:w-full 2xl:max-w-sm"
  >
    <EmptyAction @click="setIsOpen(true)">Create Checker</EmptyAction>
    <CreateCheckerDialog :is-open="isOpen" v-on:open="setIsOpen" />
  </div>
</template>
