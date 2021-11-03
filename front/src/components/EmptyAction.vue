<script setup lang="ts">
//defineProps<{ type: Type; }>();
</script>
<template>
  <div
    @click="$emit('click')"
    class="p-4 text-gray-400 transition border border-gray-800 border-dashed rounded-md  hover:text-gray-100 hover:cursor-pointer"
  >
    <h3 class="font-medium text-center">
      <slot />
    </h3>
  </div>
</template>
