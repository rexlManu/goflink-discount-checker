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

const props = defineProps<{ isOpen: boolean }>();
const emit = defineEmits(['open', 'confirm']);

const reset = () => {
  spinning.value = false;
};
const confirmRecheck = () => {
  spinning.value = true;
  setTimeout(() => {
    spinning.value = false;
    setIsOpen(false);
    emit('confirm');
  }, 200);
};

let spinning = ref(false);

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
        class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center  sm:block sm:p-0"
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
            class="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-gray-900 rounded-lg shadow-xl  sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          >
            <div>
              <div class="mt-3 sm:mt-2">
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-center text-gray-100 "
                >
                  Recheck every inactive code
                </DialogTitle>
                <div class="flex flex-col mt-2">
                  <div class="text-gray-400">
                    Do you really want to recheck every code that was inactive
                    (failed)?
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 sm:mt-6">
              <button
                type="button"
                v-bind:disabled="spinning"
                :class="{ 'opacity-75': spinning }"
                class="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-orange-600 rounded-md  focus:outline-none disabled:opacity-50 hover:bg-orange-700 focus:ring-opacity-50 focus:ring-2 focus:ring-orange-400 sm:text-sm"
                @click="confirmRecheck"
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
                {{ spinning ? 'Processing' : 'Confirm' }}
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
