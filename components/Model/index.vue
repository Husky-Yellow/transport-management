<template>
  <view class="show-box-bg wx-login-box" @touchmove="true" catchtouchmove="true" @catchtouchmove="true">
    <view class="conten p-t-32">
      <view class="titl fz-32 p-b-23" v-if="textmsg.title">
        {{ textmsg.title }}
      </view>
      <slot name="content" />
      <view class="btn-box fz-28 m-t-50">
        <view v-if="textmsg.cancel" class="cancel" @tap="$emit('cancel')">
          {{ textmsg.cancel }}
        </view>
        <view v-if="textmsg.confirm" class="confirm" @tap="$emit('confirm', textmsg.type)">
          {{ textmsg.confirm }}
        </view>
        <view v-if="textmsg.error" class="error" @tap="$emit('confirm', textmsg.type)">
          {{ textmsg.error }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["textmsg"],
  methods: {
    operation(e) {
      let type = e;
      this.$emit("operation", type);
    },
  },
};
</script>

<style scoped lang="scss">
.wx-login-box {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: $uni-bg-color-mask;
  z-index: 98;
  .conten {
    width: 84%;
    background-color: $uni-bg-color-white;
    z-index: 99;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 8rpx;
    overflow: hidden;
    .titl {
      text-align: center;
      font-weight: Medium;
    }
    .text {
      width: 100%;
      padding: 0 5%;
      font-weight: Regular;
    }
    .btn-box {
      width: 100%;
      height: 90rpx;
      display: flex;
      border-top: 1rpx solid $uni-border-color-grey;
      .cancel,.confirm{
            width: 50%;
            height: 100%;
            text-align: center;
            line-height: 89rpx;
      }
      .cancel {
        color: $uni-text-color-grey;
        border-right: 1rpx solid $uni-border-color-grey;
      }
      .confirm {
        color: $uni-text-color-active;
      }
    }
  }
}
</style>