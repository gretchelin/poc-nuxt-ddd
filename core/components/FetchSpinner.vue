<template>
  <div
    class="text-center space-y-4"
  >
    <Icon
      name="uil-spinner"
      width="40"
      height="40"
      mode="svg"
      class="animate-spin mx-auto"
    />
    <slot>
      <span>Fetching data....</span>
    </slot>
  </div>
</template>
