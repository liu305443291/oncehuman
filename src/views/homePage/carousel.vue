<!-- 主内容 -->
<template>
  <div :class="$style.container" class="flex-box justify-center align-center">
    <el-carousel :interval="40000" type="card" height="400px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
export default {
  name: "homePagecCrousel",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" module>
.container {
  height: calc(100vh - $head-hight);
}
</style>

<style lang="scss" scoped>
::v-deep {
  .el-carousel {
    width: 90vw;

    .el-carousel__item {
      background-color: #ccc;
      width: 30%;
      margin-left: 10%;
    }
  }
}
</style>
