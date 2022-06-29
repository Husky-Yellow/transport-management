<template>
  <view class="transport-notice-bar">
    <view class="van-notice-bar__wrap">
      <view
        class="van-notice-bar__content transport-ellipsis"
      >
        <slot></slot>
      </view>
    </view>
  </view>
</template>


<style scoped lang="scss">
.transport-notice-bar {
  position: relative;
  display: flex;
  align-items: center;
  height: 80rpx;
  padding: 0 32rpx;
  color: #fff;
  font-size: 28rpx;
  line-height: 48rpx;
  background: #9dc4eb;
}

.van-notice-bar__wrap {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    height: 100%;
    overflow: hidden
}

.van-notice-bar__content {
    position: absolute;
    white-space: nowrap;
    transition-timing-function: linear
}

.van-notice-bar__content.van-ellipsis {
    max-width: 100%
}

</style>
