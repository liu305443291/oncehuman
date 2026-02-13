<!-- 表格 组件 -->
<template>
  <div>
    <ElTable
      v-loading="loading"
      :data="tableData"
      :height="height"
      :max-height="maxHeight"
      :stripe="stripe"
      :border="true"
      :size="size"
      :fit="fit"
      :show-header="showHeader"
      :highlight-current-row="highlightCurrentRow"
    >
      <!-- 序号 -->
      <ElTableColumn
        v-if="false"
        type="index"
        width="60"
        label="序号"
        :align="'center'"
      />

      <!-- 插入首列 -->
      <slot name="prefix" />

      <!-- 通过head传入 -->
      <template v-for="(item, index) in head?.filter((o) => !o.hidden)">
        <ElTableColumn
          :key="index"
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :min-width="
            item.minWidth ||
            (item.label && item.label.length * 12 + 16 * 2 + 8 + 20 + 2)
          "
          :fixed="item.fixed"
          :render-header="item.renderHeader"
          :sortable="item.sortable ? 'custom' : false"
          :formatter="item.formatter"
          show-overflow-tooltip
          :align="item.align"
        />
      </template>

      <!-- 插入尾列 -->
      <slot />
    </ElTable>

    <!-- 分页 -->
    <Pagination
      v-if="!data?.length && tableData?.length"
      :pagination-query="paginationQuery"
      :total="total"
      :page-style="pageStyle"
      @pageSize="pageSize"
      @currentPage="currentPage"
    />
  </div>
</template>

<script>
import Pagination from "@/components/pagination";

export default {
  name: "ITable",
  components: {
    Pagination,
  },
  props: {
    // 数据
    data: {
      type: Array,
      required: false,
    },
    // 表头
    head: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    // 数据接口
    get: {
      type: Function,
      required: false,
    },
    // 筛选
    query: {
      type: Object,
      required: false,
    },
    // 分页尺寸 all medium small
    pageStyle: {
      type: String,
      default: "all",
    },

    // Table 的高度
    height: {
      type: [Number, String],
      default: null,
    },
    // Table 的最大高度
    maxHeight: {
      type: [Number, String],
      default: null,
    },
    // 是否为斑马纹 table
    stripe: {
      type: Boolean,
      default: false,
    },
    // 是否带有纵向边框
    border: {
      type: Boolean,
      default: false,
    },
    // Table 的尺寸
    size: {
      type: String,
      default: null, // medium / small / mini
    },
    // 列的宽度是否自撑开
    fit: {
      type: Boolean,
      default: true,
    },
    // 是否显示表头
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 是否要高亮当前行
    highlightCurrentRow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 列表数据
      tableData: this.data || [],

      // 分页数据
      paginationQuery: {
        page: 1,
        pageSize: 10,
      },

      // 总数
      total: 0,

      loading: false,
    };
  },
  computed: {
    params() {
      return {
        ...this.query,
        ...this.paginationQuery,
      };
    },
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(val) {
        this.tableData = val;
      },
    },
    query: {
      deep: true,
      handler(v) {
        this.paginationQuery.page = 1;
        if (v.page) this.paginationQuery.page = v.page;
        if (v.pageSize) this.paginationQuery.pageSize = v.pageSize;
        this.getData();
      },
    },
  },
  methods: {
    // 通过接口获取数据
    getData() {
      if (!this.get) return;

      this.loading = true;

      setTimeout(() => {
        this.get(this.params).then((res) => {
          this.tableData = res.list;
          this.total = res.total;
          this.loading = false;
        });
      }, 300);
    },

    // pageSize 改变时会触发
    pageSize(pageSize) {
      this.paginationQuery.pageSize = pageSize;
      this.getData();
    },

    // currentPage 改变时会触发
    currentPage(page) {
      this.paginationQuery.page = page;
      this.getData();
    },
  },
  created() {
    this.getData();
  },
};
</script>
