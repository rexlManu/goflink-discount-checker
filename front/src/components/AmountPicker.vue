<script setup lang="ts">
import { ref } from 'vue';
import Slider from '@vueform/slider/dist/slider.js';

defineProps<{ amount: number }>();
</script>
<template>
  <div class="w-full pt-1">
    <Slider v-model="amount" v-bind:min="1" v-bind:max="50" v-bind:step="0.1" />
  </div>
</template>
<style src="@vueform/slider/themes/default.css"></style>
