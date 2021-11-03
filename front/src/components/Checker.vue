<script setup lang="ts">
import CodeStatus from './CodeStatus.vue';
import EmptyAction from './EmptyAction.vue';
import CheckerStatus from './CheckerStatus.vue';
import { Checker, Status, store } from '../store';
import AddCodesDialog from './AddCodesDialog.vue';
import { ref, computed } from 'vue';
import CodeStatusFilter from './CodeStatusFilter.vue';

const props = defineProps<{ checker: Checker }>();

let isOpen = ref(false);
let filter = ref(store.state.filters);

const setIsOpen = (value: boolean) => (isOpen.value = value);

const onAddCodes = (rawCodes: string) => {
  const codes = rawCodes.split(/\r?\n/);

  for (let code of codes) {
    code = code.trim().toUpperCase();
    if (props.checker.codes.filter((c) => c.code == code).length != 0) {
      continue;
    }
    props.checker.codes.push({
      code,
      status: 'pending',
    });
  }
};

const recheck = () => {
  props.checker.codes
    .filter((c) => c.status != 'success')
    .forEach((e) => {
      e.status = 'pending';
      e.discount = 0;
    });
};

const percentage = computed(() => {
  const p =
    (props.checker.codes.filter((c) => c.status == 'pending').length /
      props.checker.codes.length) *
    100;

  return (p < 1 || Number.isNaN(p) ? 100 : 100 - p).toFixed(1);
});

const toggleFilter = (status: Status) => {
  if (filter.value.includes(status)) {
    filter.value = filter.value.filter((s) => s != status);
  } else filter.value.push(status);

  store.state.filters = filter.value;
  store.save();
};
const removeCode = (code: string) => {
  props.checker.codes = props.checker.codes.filter((a) => a.code != code);
  store.save();
};
const deleteChecker = () => {
  store.removeChecker(props.checker);
};
</script>
<template>
  <div
    class="flex flex-col flex-shrink-0 w-full space-y-2  sm:w-2/4 md:w-1/3 lg:w-1/4 2xl:w-full 2xl:max-w-sm"
  >
    <CheckerStatus
      v-on:delete="deleteChecker"
      :city="checker.city"
      v-bind:amount="checker.amount"
      v-bind:percentage="percentage"
    />
    <div class="w-full">
      <EmptyAction @click="setIsOpen(true)">Add Codes</EmptyAction>
      <AddCodesDialog
        v-on:code="onAddCodes"
        :is-open="isOpen"
        v-on:open="setIsOpen"
      ></AddCodesDialog>
    </div>
    <CodeStatusFilter
      v-on:recheck="recheck"
      :filter="filter"
      v-on:toggle-filter="toggleFilter"
    />

    <div
      class="
        flex flex-col
        sm:h-full
        max-h-80
        sm:max-h-screen sm:pr-2.5
        space-y-1
        overflow-y-scroll
        scrollbar-thumb-rounded-md
        overflow-x-hidden
        sm:scrollbar-thin
        scrollbar-thumb-gray-700 scrollbar-track-gray-800
      "
    >
      <CodeStatus
        v-for="promocode of checker.codes.filter(
          (code) => filter.length == 0 || filter.includes(code.status)
        )"
        :code="promocode"
        v-on:close="removeCode"
      />
    </div>
  </div>
</template>
