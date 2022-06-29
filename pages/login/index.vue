<template>
  <view class="p-t-40 p-l-20 p-r-20">
    <view class="iphone m-b-30 p-30">
      <input type="number" placeholder="输入账号" v-model="phonenum" />
    </view>
    <view class="password p-30">
      <input type="password" placeholder="请输入密码" v-model="password" />
    </view>
    <view class="login-btn fz-40" @click="Login()">登录</view>
  </view>
</template>

<script>

export default {
  data: () => ({
    phonenum: "15942306465",
    password: "15942306465",
  }),
  methods: {
    Login() {
		//  || !isMobile(this.phonenum)
      if (!this.phonenum) {
        uni.showToast({
          title: "请输入正确账号",
          icon: "none",
        });
        return false;
      }
      if (!this.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
        return false;
      }
      this.$store
        .dispatch("login", {
          phonenum: this.phonenum,
          password: this.password,
        })
        .then((res) => {
          uni.showToast({
            title: "登录成功",
            icon: "success",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1500);
        })
        .catch(() => {
          uni.showToast({
            title: "登录失败",
            icon: "none",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.login-content input {
  height: 50rpx;
  border-radius: 25rpx;
  text-align: left;
  box-sizing: border-box;
  font-size: 15rpx;
}

.iphone,
.password {
  background: $uni-bg-color-white;
  border-bottom: 1rpx solid $uni-bg-color-border;
}

.login-btn {
  width: calc(100% - 36rpx);
  height: 100rpx;
  background: $uni-bg-color-primary;
  border-radius: 10rpx;
  color: $uni-text-color-inverse;
  text-align: center;
  line-height: 100rpx;
  position: fixed;
  bottom: 60rpx;
}
</style>
