import { defineStore } from 'pinia';

export const usePlaygroundStore = defineStore('playground', () => {
  // state
  const pageRef = ref<string>('');

  // computed (getters)
  const copy = computed(() => {
    return 'This came from playground store!';
  });

  // methods (action)

  // override methods
  const $reset = () => {
    pageRef.value = '';
  };

  return { pageRef, copy, $reset };
});
