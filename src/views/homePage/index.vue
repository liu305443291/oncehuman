<!-- 主内容 -->
<template>
  <div>
    <!-- 搜索框 -->
    <Search></Search>

    <!-- 轮播图 -->
    <Carousel></Carousel>
  </div>
</template>

<script lang="ts">
import Search from "./search.vue";
import Carousel from "./carousel.vue";

export default {
  name: "homePage",
  components: {
    Search,
    Carousel,
  },
  data() {
    return {};
  },
};
</script>
