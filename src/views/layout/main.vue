<!-- 主内容 -->
<template>
  <div :class="$style.container">
    <RouterView />
  </div>
</template>

<script lang="ts">
export default {
  name: "mainMain",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" module>
.container {
  padding: 24px;
  overflow: auto;
}
</style>
