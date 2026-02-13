<template>
  <div :class="$style.container">
    <!-- 筛选 -->
    <IFilter @search="search" :filterList="filterList" />

    <!-- 列表 -->
    <ITable :get="page" :head="head" :query="query"></ITable>
  </div>
</template>

<script>
import IFilter from "@/components/Filter.vue";
import ITable from "@/components/Table.vue";

import { filterList, head } from "./table_data";
import { page } from "@/api/diet/index";

export default {
  name: "foodItem",
  components: {
    IFilter,
    ITable,
  },
  data() {
    return {
      query: {},
    };
  },
  computed: {
    page: () => page,
    head: () => head,
    filterList: () => filterList,
  },
  methods: {
    // 搜索
    search(form) {
      this.query = form;
    },
  },
};
</script>

<style lang="scss" module>
.container {
  height: 1800px;
}
</style>
