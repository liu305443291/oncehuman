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
  overflow: auto;
  height: calc(100vh - $head-hight);
  padding: 12px;
}
</style>
