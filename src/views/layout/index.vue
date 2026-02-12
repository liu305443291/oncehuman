<template>
  <div>
    <!-- 头部 -->
    <Head />

    <!-- 视图 -->
    <Main />
  </div>
</template>

<script lang="ts">
import Head from "./head.vue";
import Main from "./main.vue";

export default {
  name: "layoutView",
  components: {
    Head,
    Main,
  },
};
</script>
