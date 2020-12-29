<template>
  <h1>{{ itemData.name }}</h1>
</template>
<script>
export default {
  props: {
    itemData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>
