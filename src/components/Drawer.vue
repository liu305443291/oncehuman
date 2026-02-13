<!-- 弹窗 组件 -->
<template>
  <ElDrawer
    :class="$style.drawer"
    :append-to-body="appendToBody"
    :before-close="close"
    :close-on-press-escape="closeOnPressEscape"
    :custom-class="customClass"
    :destroy-on-close="destroyOnClose"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :direction="direction"
    :show-close="showClose"
    :size="size"
    :title="title"
    :visible.sync="drawer_"
    :wrapper-closable="wrapperClosable"
    :with-header="withHeader"
  >
    <div :class="$style.main" class="flex-box flex-column">
      <div :class="$style.content" class="flex-auto">
        <slot />
      </div>
      <div :class="$style.button" class="flex-box justify-center align-center">
        <ElButton type="primary" @click="close"> 取消 </ElButton>
        <ElButton type="success" @click="submit"> 提交 </ElButton>
      </div>
    </div>
  </ElDrawer>
</template>

<script>
export default {
  name: "IDrawer",
  props: {
    drawer: {
      type: Boolean,
      required: true,
    },

    // Drawer 自身是否插入至 body 元素上。嵌套的 Drawer 必须指定该属性并赋值为 true
    appendToBody: {
      type: Boolean,
      default: false,
    },

    // 是否可以通过按下 ESC 关闭 Drawer
    closeOnPressEscape: {
      type: Boolean,
      default: true,
    },

    // Drawer 的自定义类名
    customClass: {
      type: String,
      default: "",
    },

    // 控制是否在关闭 Drawer 之后将子元素全部销毁
    destroyOnClose: {
      type: Boolean,
      default: true,
    },

    // 是否需要遮罩层
    modal: {
      type: Boolean,
      default: true,
    },

    // 遮罩层是否插入至 body 元素上，若为 false，则遮罩层会插入至 Drawer 的父元素上
    modalAppendToBody: {
      type: Boolean,
      default: true,
    },

    // Drawer 打开的方向
    direction: {
      type: String,
      default: "rtl", // rtl / ltr / ttb / btt
    },

    // 是否显示关闭按钮
    showClose: {
      type: Boolean,
      default: false,
    },

    // Drawer 窗体的大小, 当使用 number 类型时, 以像素为单位, 当使用 string 类型时, 请传入 'x%', 否则便会以 number 类型解释
    size: {
      type: [Number, String],
      default: "30%",
    },

    // Drawer 的标题，也可通过具名 slot 传入
    title: {
      type: String,
      default: "",
    },

    // 点击遮罩层是否可以关闭 Drawer
    wrapperClosable: {
      type: Boolean,
      default: true,
    },

    // 控制是否显示 header 栏, 默认为 true, 当此项为 false 时, title attribute 和 title slot 均不生效
    withHeader: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    drawer_: function () {
      return this.drawer;
    },
  },
  methods: {
    // 关闭前的回调，会暂停 Drawer 的关闭
    close() {
      this.$emit("close");
    },

    submit() {
      this.$emit("submit");
    },
  },
};
</script>

<style lang="scss" module>
.drawer {
  :global {
    .el-drawer__header {
      z-index: 0;
      padding: 16px;
      margin-bottom: 0;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .main {
    height: 100%;

    .content {
      overflow: auto;
      padding: 16px;
      background: #f3f5f5;
    }

    .button {
      padding: 32px 0;
      overflow: hidden;
      height: 50px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
