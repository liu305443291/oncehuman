<template>
  <div :class="$style.container">
    <Search></Search>
  </div>
</template>

<script lang="ts">
import Search from "./filter.vue";

export default {
  name: "foodItem",
  components: {
    Search,
  },
};
</script>

<style lang="scss" module>
.container {
  height: 1800px;
}
</style>
