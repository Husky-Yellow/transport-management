<template>
  <view class="empty">
    <view class="el-empty__image">
      <image src="@/static/none@2x.png" mode="scaleToFill" />
    </view>
  </view>
</template>

<style scoped lang="scss">
.empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
    margin-top: 18%;
    padding: 40px 0;
    .el-empty__image{
        width: 140px;
        height: 320rpx;
        image {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
