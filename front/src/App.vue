<script setup lang="ts">
import CreateChecker from './components/CreateChecker.vue';
import Checker from './components/Checker.vue';
import { store } from './store';
import OptionList from './components/OptionList.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="relative flex flex-col min-h-screen bg-gray-900 sm:h-screen">
    <div
      class="grid h-full grid-cols-1 px-2 space-y-4  gap-y-4 sm:flex sm:space-y-0 sm:space-x-2 md:space-x-4 sm:flex-row sm:pt-6 sm:px-6 sm:overflow-y-auto"
    >
      <Checker
        v-for="checker of store.state.checkers"
        :checker="checker"
      ></Checker>
      <CreateChecker></CreateChecker>
    </div>
    <Footer />
    <OptionList />
  </div>
</template>
