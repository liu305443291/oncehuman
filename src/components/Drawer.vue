<template>
  <ElDrawer
    :class="$style.drawer"
    :append-to-body="appendToBody"
    :before-close="handleBeforeClose"
    :close-on-press-escape="closeOnPressEscape"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :direction="direction"
    :show-close="showClose"
    :size="size"
    :title="title"
    :visible.sync="visible"
    :wrapper-closable="wrapperClosable"
    :with-header="withHeader"
  >
    <div :class="$style.main" class="flex-box flex-column">
      <!-- 内容区：补充默认提示 -->
      <div :class="$style.content" class="flex-auto">
        <slot>
          <div
            class="flex-box justify-center align-center h-full text-gray-500"
          >
            暂无内容
          </div>
        </slot>
      </div>
      <!-- 按钮栏：修复样式冲突 -->
      <div
        :class="$style.buttonGroup"
        class="flex-box justify-center align-center"
      >
        <ElButton type="primary" @click="handleCancel" :size="buttonSize">
          {{ cancelText }}
        </ElButton>
        <ElButton
          type="success"
          @click="handleSubmit"
          :size="buttonSize"
          style="margin-left: 16px"
        >
          {{ submitText }}
        </ElButton>
      </div>
    </div>
  </ElDrawer>
</template>

<script>
export default {
  name: "IDrawer",
  props: {
    // 抽屉显隐状态
    drawer: {
      type: Boolean,
      required: true,
    },
    // 抽屉插入至body（嵌套抽屉必须为true）
    appendToBody: {
      type: Boolean,
      default: false,
    },
    // ESC关闭
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },
    // 自定义类名
    customClass: {
      type: String,
      default: "",
    },
    // 关闭时销毁子元素
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    // 遮罩层
    modal: {
      type: Boolean,
      default: true,
    },
    // 遮罩层插入至body
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },
    // 抽屉方向
    direction: {
      type: String,
      default: "rtl",
      validator: (val) => ["rtl", "ltr", "ttb", "btt"].includes(val),
    },
    // 显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },
    // 抽屉尺寸
    size: {
      type: [Number, String],
      default: "30%",
    },
    // 抽屉标题
    title: {
      type: String,
      default: "",
    },
    // 点击遮罩关闭
    wrapperClosable: {
      type: Boolean,
      default: true,
    },
    // 显示头部
    withHeader: {
      type: Boolean,
      default: true,
    },
    // 取消按钮文字
    cancelText: {
      type: String,
      default: "取消",
    },
    // 提交按钮文字
    submitText: {
      type: String,
      default: "提交",
    },
    // 按钮尺寸
    buttonSize: {
      type: String,
      default: "default",
      validator: (val) => ["large", "default", "small", "mini"].includes(val),
    },
  },
  computed: {
    visible: {
      get() {
        return this.drawer;
      },
      set(newVal) {
        this.$emit("update:drawer", newVal);
      },
    },
  },
  methods: {
    /**
     * 抽屉关闭前回调
     * @param {Function} done 关闭确认回调
     */
    handleBeforeClose(done) {
      this.$emit("close"); // 向外触发关闭事件
      done(); // 执行关闭确认，抽屉才能真正关闭
    },
    /**
     * 取消按钮点击事件
     */
    handleCancel() {
      this.visible = false;
      this.$emit("close");
    },
    /**
     * 提交按钮点击事件
     */
    handleSubmit() {
      this.$emit("submit"); // 向外触发提交事件
      // 若提交后需关闭，可按需添加：this.visible = false;
    },
  },
};
</script>

<style lang="scss" module>
.drawer {
  :global(.el-drawer__header) {
    z-index: 0;
    padding: 16px;
    margin-bottom: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .main {
    height: 100%;
    display: flex;
    flex-direction: column;

    .content {
      overflow: auto;
      padding: 16px;
      background: #f3f5f5;
      flex: 1;
      height: 0;
    }

    // 修复按钮栏样式冲突
    .buttonGroup {
      padding: 16px 0;
      box-shadow: 0 -2px 12px 0 rgba(0, 0, 0, 0.1);
      background: #fff;
    }
  }
}
</style>
