<!-- 分页 组件 -->
<template>
  <ElPagination
    :class="$style.pagination"
    :current-page.sync="query.page"
    :page-size="query.pageSize"
    :page-sizes="pageSizes"
    :layout="ENUM_STYLE[pageStyle]"
    :total="total"
    @size-change="pageSize"
    @current-change="currentPage"
  />
</template>

<script lang="ts">
// @ts-nocheck
export default {
  props: {
    paginationQuery: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageStyle: {
      type: String,
      default: "all",
    },
  },
  data() {
    return {
      query: {
        page: 0,
        pageSize: 0,
      },

      // 分页列表
      pageSizes: [5, 10, 20, 50],

      ENUM_STYLE: {
        all: "total, sizes, prev, pager, next, jumper",
        medium: "total, sizes, prev, pager, next",
        small: "prev, pager, next",
      },
    };
  },
  watch: {
    paginationQuery: {
      deep: true,
      immediate: true,
      handler(val) {
        this.query.page = val.page;
        this.query.pageSize = val.pageSize;
      },
    },
  },
  methods: {
    // pageSize 改变时会触发
    pageSize(v) {
      this.$emit("pageSize", v);
    },
    // currentPage 改变时会触发
    currentPage(v) {
      this.$emit("currentPage", v);
    },
  },
};
</script>

<style lang="scss" module>
.pagination {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 16px;

  :global(.el-pagination__total) {
    flex: 1;
  }
}
</style>
