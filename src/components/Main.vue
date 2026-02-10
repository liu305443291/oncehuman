<!-- 主内容 -->
<template>
  <div :class="$style.container">
    <RouterView />
  </div>
</template>

<style lang="scss" module>
.container {
  padding: 24px;
  overflow: auto;
}
</style>
