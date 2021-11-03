<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import Slider from '@vueform/slider/dist/slider.js';
import { store } from '../store';
import { worker } from '../worker';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['open']);
const setIsOpen = (value: boolean) => {
  emit('open', value);
};
const intervalAmount = ref(store.state.settings.interval);
const checkerPerInterval = ref(store.state.settings.checkersPerWork);

watchEffect(() => {
  store.state.settings.checkersPerWork = checkerPerInterval.value;
  store.state.settings.interval = intervalAmount.value;
  store.save();
  worker.stop();
  worker.start();
});

const clearData = () => {
  store.clear();
  setIsOpen(false);
  setTimeout(() => location.reload(), 200);
  worker.stop();
  worker.start();
};
</script>
<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog
      as="div"
      class="fixed inset-0 z-10 overflow-y-auto"
      @close="setIsOpen"
      :open="isOpen"
    >
      <div
        class="flex items-end justify-center min-h-screen px-2 pt-4 pb-20 text-center  sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="inline-block w-full px-4 py-4 overflow-hidden text-left align-bottom transition-all transform bg-gray-900 rounded-lg shadow-xl  sm:align-middle sm:max-w-3xl sm:w-full sm:p-8"
          >
            <div>
              <div class="mt-3 sm:mt-2">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-100"
                >
                  <div class="flex justify-between space-x-12">
                    <span class="w-1/2"> Settings </span>
                    <span class="hidden w-1/2 sm:block"> Clear your data </span>
                  </div>
                </DialogTitle>
              </div>
              <div
                class="flex flex-col space-y-8  sm:space-y-0 sm:space-x-12 sm:flex-row"
              >
                <div class="flex flex-col mt-6 space-y-5 sm:w-1/2">
                  <div class="flex flex-col space-y-2">
                    <label class="text-sm font-medium text-gray-400 uppercase"
                      >Interval (500)</label
                    >
                    <Slider
                      v-model="intervalAmount"
                      v-bind:min="200"
                      v-bind:max="2000"
                      v-bind:step="100"
                    />
                  </div>
                  <div class="flex flex-col space-y-2">
                    <label class="text-sm font-medium text-gray-400 uppercase"
                      >Checker per Interval (2)</label
                    >
                    <Slider
                      v-model="checkerPerInterval"
                      v-bind:min="1"
                      v-bind:max="10"
                      v-bind:step="1"
                    />
                  </div>
                </div>
                <div class="flex flex-col h-full mt-3 space-y-2 sm:w-1/2">
                  <h6
                    class="block text-lg font-medium leading-6 text-gray-100  sm:hidden"
                  >
                    Clear your data
                  </h6>
                  <p class="leading-snug text-gray-400">
                    Your defined checkers, codes and settings will be cleared
                    for ever.
                  </p>
                  <div class="flex flex-row-reverse py-2">
                    <button
                      @click="clearData"
                      class="
                        rounded
                        px-5
                        py-2.5
                        overflow-hidden
                        group
                        bg-red-500
                        relative
                        hover:bg-gradient-to-r
                        hover:from-red-500
                        hover:to-red-400
                        text-white
                        hover:ring-2 hover:ring-offset-2 hover:ring-red-400
                        transition-all
                        ease-out
                        duration-300
                      "
                    >
                      <span
                        class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white  opacity-10 rotate-12 group-hover:-translate-x-40 ease"
                      ></span>
                      <span class="relative">Clear your data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
