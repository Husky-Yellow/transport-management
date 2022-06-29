<template>
  <view class="tabs">
    <view
      v-for="(item, index) in list"
      :key="index"
      :class="active === index ? 'active' : ''"
      @click="changeActive(index)"
      >{{ item }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
      default: 0,
    },
  },
  onLoad() {},
  methods: {
    changeActive(index) {
      this.$emit("changeActive", index);
    },
  },
};
</script>

<style scoped lang="scss">
.tabs {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  view {
    height: 80rpx;
    line-height: 80rpx;
    padding: 0 32rpx;
    position: relative;
    font-size: 28rpx;
    color: $uni-text-color;
    background-color: $uni-bg-color-white;
    text-align: center;
    font-weight: Regular;
    flex: 1;
    &::after {
      content: "";
      width: 0;
      height: 4rpx;
      background-color: $uni-color-active;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      transition: width 0.4s;
    }
  }
  view.active {
      color: $uni-color-active;
    &::after {
      width: 50%;
      transform: translateX(100% -30rpx);
    }
  }
}
</style>
