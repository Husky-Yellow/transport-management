<template>
  <view class="p-l-20 p-r-20 p-b-20">
    <view v-if="timeDate.length !== 0">
      <view
        class="list-item p-t-20 m-t-20"
        v-for="(item, index) in timeDate"
        :key="index"
      >
        <view class="list-item-header p-r-20 m-b-20">
          <view class="border-left" />
          <text class="p-l-20 fz-32 font-weight-600">开放时间：{{ item.date_sub }}</text>
        </view>
        <view class="list-item-body fz-30 m-l-20 m-r-20 fz-30 p-b-15 p-t-15">
          <view
            v-for="(itemChild, indexChild) in item.son"
            :key="indexChild"
            class="m-t-15 m-b-15"
            >{{ itemChild.time_str }}</view
          >
        </view>
        <view class="list-item-function p-30 fz-28">
          <text>操作</text>
          <button
            v-if="showButton(item)"
            class="fz-28 p-l-58 p-r-58"
            @click="goTimeManagementSelect(item)"
          >
            修改
          </button>
          <button
            v-else
            class="fz-28 p-l-58 p-r-58 disabled"
          >
            修改
          </button>
        </view>
      </view>
    </view>
    <Empty v-if="timeDate.length === 0"/>
  </view>
</template>

<script>
import Empty from "@/components/Empty";
import { orderShow } from "@/api";
export default {
  components: {
    Empty
  },
  data: () => ({
    timeDate: [],
  }),
  onShow() {
    this.getOrderShow();
  },
  methods: {
    showButton(item){
      const dayStr = new Date(item.date).setHours(0, 0, 0, 0);
      const today = new Date().setHours(0, 0, 0, 0);
      return dayStr - today > 0 ? true : false;
    },
    getOrderShow() {
      orderShow().then((res) => {
        this.timeDate = (res.ret || []).map((item) => {
          return {
            date_sub: item.date_sub,
            date: item.date,
            id: item.id,
            son: item.son,
          };
        });
      });
    },
    goTimeManagementSelect(item) {
      uni.navigateTo({
        url: `/pages/TimeManagementSelect/index?timeDay=${item.date}&id=${item.id}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.list-item {
  border-radius: 8rpx;
  background-color: $uni-bg-color-white;
  .list-item-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 500;
    .border-left {
      width: 8rpx;
      height: 60rpx;
      background-color: $uni-bg-color-primary;
      border-radius: 4rpx;
    }
  }
  .list-item-body {
    border-top: 1rpx solid #EDEEEE;
    border-bottom: 1rpx solid #EDEEEE;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    font-weight: 400;
    view {
      border-right: 1rpx solid #EDEEEE;
    }
    view:nth-of-type(3n),
    view:last-child {
      border-right: none;
    }
  }
  .list-item-function {
    flex-direction: row;
    @include space-between;
    button {
      background-color: $uni-bg-color-pending;
      color: $uni-text-color-inverse;
      height: 65rpx;
      line-height: 65rpx;
      border-radius: 8rpx;
    }
    .disabled{
      background-color: $uni-text-color-disable;
      color: $uni-text-color-inverse;
    }
  }
}
</style>
