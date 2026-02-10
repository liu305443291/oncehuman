<template>
  <div>
    <ElRow>
      <ElCol :span="24">
        <div class="top">123</div>
      </ElCol>
      <ElCol :span="12">
        <div class="grid-content bg-purple-dark">123</div>
      </ElCol>
    </ElRow>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomePage",
};
</script>

<style scoped lang="scss">
.top {
  border: 1px solid #000;
  height: 100px;
  background-color: #f00;
}
</style>