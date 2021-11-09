<script setup lang="ts">
import { ref } from 'vue';
import {
  Dialog,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import { request } from '../api';
import { store } from '../store';
import Slider from '@vueform/slider/dist/slider.js';

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['open']);

const reset = () => {
  spinning.value = false;
  city.value = '';
  amount.value = 20;
};
const createChecker = () => {
  spinning.value = true;
  console.log(amount.value);

  request('create-checker', 'post', {
    city: city.value,
    amount: amount.value,
  })
    .then((data) => {
      if (data.errors) {
        spinning.value = false;
        return;
      }
      const { checkerId } = data;

      store.addChecker({
        checkerId,
        codes: [],
        city: city.value,
        amount: amount.value,
      });
      reset();
      setIsOpen(false);
    })
    .catch((e) => {
      spinning.value = false;
    });
};

let spinning = ref(false);
let amount = ref(20);
let city = ref('');

const setIsOpen = (value: boolean) => {
  emit('open', value);
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
            class="inline-block w-full px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-gray-900 rounded-lg shadow-xl  sm:my-8 sm:align-middle sm:max-w-sm sm:p-6"
          >
            <div>
              <div class="mt-3 sm:mt-2">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-100"
                >
                  Create Checker
                </DialogTitle>
                <div class="flex flex-col mt-2 space-y-6">
                  <div class="flex flex-col space-y-1">
                    <label
                      class="text-sm font-medium text-gray-400 uppercase"
                      for="input-city"
                      >City</label
                    >
                    <div class="relative">
                      <div
                        class="absolute flex items-center h-full px-2 bg-gray-700  rounded-l-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-5 h-5 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                        class="w-full py-1 pr-2 text-gray-200 bg-gray-800 rounded-md  focus:ring-orange-500 focus:ring focus:ring-opacity-50 pl-11 focus:outline-none"
                        type="text"
                        id="input-city"
                        v-model="city"
                      />
                    </div>
                  </div>
                  <div class="flex flex-col space-y-1">
                    <label
                      class="text-sm font-medium text-gray-400 uppercase"
                      for="input-city"
                      >Amount</label
                    >
                    <Slider
                      v-model="amount"
                      v-bind:min="1"
                      v-bind:max="50"
                      v-bind:step="0.1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-12">
              <button
                type="button"
                v-bind:disabled="spinning"
                :class="{ 'opacity-75': spinning }"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-orange-600 border border-transparent rounded-md  disabled:opacity-50 hover:bg-orange-700 focus:ring-2 focus:ring-orange-400 sm:text-sm"
                @click="createChecker"
              >
                <svg
                  v-if="!spinning"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 mr-1 -ml-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                {{ spinning ? 'Processing' : 'Create' }}
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<style src="@vueform/slider/themes/default.css"></style>
