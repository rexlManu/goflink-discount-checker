<script lang="ts" setup>
import SettingPanel from './SettingPanel.vue';
import { ref } from 'vue';

let isOpen = ref(false);

const setIsOpen = (value: boolean) => (isOpen.value = value);
</script>
<template>
  <SettingPanel :is-open="isOpen" v-on:open="setIsOpen" />
  <div
    class="absolute flex flex-row-reverse  bottom-2 right-2 sm:bottom-4 sm:right-4"
  >
    <div
      class="grid p-2 text-gray-300 transition bg-gray-800  peer rounded-2xl place-items-center hover:bg-gray-700 hover:text-gray-100 hover:cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
    </div>
    <div
      class="flex flex-row-reverse flex-shrink-0 mx-2 transition ease-in origin-right translate-x-2 bg-gray-800 opacity-0  hover:opacity-100 hover:translate-x-0 peer-hover:translate-x-0 peer-hover:opacity-100 rounded-2xl"
    >
      <div
        @click="setIsOpen(true)"
        class="grid flex-shrink-0 p-2 text-gray-300 transition  rounded-2xl place-items-center hover:bg-gray-700 hover:text-gray-100 hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <a
        href="https://github.com"
        target="_blank"
        class="grid flex-shrink-0 p-2 text-gray-300 transition  rounded-2xl place-items-center hover:bg-gray-700 hover:text-gray-100 hover:cursor-pointer"
      >
        <svg
          role="img"
          fill="none"
          stroke="currentColor"
          class="w-7 h-7"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>GitHub</title>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
          />
        </svg>
      </a>
      <a
        href="https://www.goflink.com/en/"
        target="_blank"
        class="grid flex-shrink-0 p-2 text-gray-300 transition  rounded-2xl place-items-center hover:bg-gray-700 hover:text-gray-100 hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-12 h-7"
          fill="none"
          viewBox="0 0 111 29"
          stroke="currentColor"
        >
          <path
            fill="#fff"
            d="M110.871 0h-7.525l-2.007 5.518h7.526L110.871 0zM10.535 0h21.573l-3.01 7.024H16.554l-2.006 4.515h11.037l-2.509 7.023H12.04L8.53 28.094H0L10.535 0zm23.58 0h8.026L31.606 28.094h-8.027L34.114 0zm8.026 7.525h8.027l-8.027 20.57h-7.525l7.525-20.57zm10.535 0h7.526l-1.004 3.01c1.81-1.837 4.56-3.511 7.024-3.511 3.558 0 6.22 1.53 5.518 5.518-.205 1.367-.54 2.71-1.003 4.013l-4.515 11.54h-8.027l4.013-9.533c.416-.974.751-1.981 1.004-3.01.227-1.29-.756-2.007-2.007-2.007-2.464 0-3.172 1.4-4.014 3.512l-4.515 11.037h-7.525l7.525-20.569zM79.767 0h8.027l-5.519 13.545 7.024-6.02h9.03l-10.535 8.529 3.01 12.04h-8.027l-1.505-7.525-2.007 1.505-2.508 6.02h-7.525L79.767 0z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>
