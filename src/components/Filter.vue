<!-- 筛选框 组件 -->
<template>
  <div :class="$style.container" class="flex-box space-between">
    <!-- 筛选框 -->
    <ElForm
      inline
      ref="form"
      :model="form"
      class="flex-auto"
      :class="$style.searchBox"
    >
      <ElRow>
        <ElCol
          :span="item.span ?? 6"
          v-for="(item, index) in filterList"
          :key="index"
        >
          <ElFormItem :label="item.label" :prop="item.prop">
            <!-- 输入框 -->
            <ElInput
              v-if="item.type === 'input'"
              v-model="form[`${item.prop}`]"
              :placeholder="`请输入${item.label}查询`"
              clearable
            />

            <!-- 下拉框 -->
            <ElSelect
              v-if="item.type === 'select'"
              v-model="form[`${item.prop}`]"
              :placeholder="`请选择${item.label}查询`"
              clearable
            >
              <ElOption
                v-for="v in item.options"
                :key="v.value"
                :label="v.label"
                :value="v.value"
                :disabled="v.disabled"
              />
            </ElSelect>

            <!-- 多选下拉框 -->
            <ElSelect
              v-if="item.type === 'selects'"
              v-model="form[`${item.prop}`]"
              :placeholder="`请选择${item.label}查询`"
              clearable
              multiple
            >
              <ElOption
                v-for="v in item.options"
                :key="v.value"
                :label="v.label"
                :value="v.value"
                :disabled="v.disabled"
              />
            </ElSelect>
          </ElFormItem>
        </ElCol>
      </ElRow>
    </ElForm>

    <!-- 操作按钮 -->
    <div class="flex-box justify-end align-end" :class="$style.btnBox">
      <ElButton @click="reset"> 重置 </ElButton>
      <ElButton type="primary" @click="search"> 搜索 </ElButton>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-nocheck
export default {
  props: {
    filterList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  watch: {
    filterList: {
      deep: true,
      immediate: true,
      handler(val) {
        val?.forEach((v: any) => {
          // 各类型初始值
          const ENUMS_VALUE = {
            input: "",
            select: "",
            selects: [],
          };

          // 赋值
          this.$set(this.form, v.prop, ENUMS_VALUE[v.type]);
        });
      },
    },
  },
  methods: {
    // 重置
    reset() {
      this.$refs.form.resetFields();
      this.search();
    },

    // 搜索
    search() {
      this.$emit("search", JSON.parse(JSON.stringify(this.form)));
    },
  },
};
</script>

<style lang="scss" module>
.container {
  .btnBox {
    margin: 0 0 22px 100px;
  }
}
</style>
