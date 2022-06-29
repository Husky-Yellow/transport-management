<template>
  <view>
    <NoticeBar>
      <view>
        <text>修改时间</text>
        <text class="m-l-10">{{ timeDay }}</text>
      </view>
    </NoticeBar>
    <view class="time-list fz-28 p-b-100">
      <view
        v-for="(item, index) in TIMEARR"
        :key="index"
        :class="['m-15', item.click === true ? 'active' : 'show']"
        @click="changeTime(index)"
        >{{ item.time_str }}</view
      >
    </view>
    <view class="fix-view p-10 p-l-12 p-r-12">
      <view>
        <text class="fz-28">已选时间段：</text>
        <text class="fz-36 red-text">{{ selectLength }}</text>
      </view>
      <button class="fz-28 p-t-26 p-b-26 p-l-80 p-r-80" @click="submit">
        确定
      </button>
    </view>
  </view>
</template>

<script>
import { warehouseOrderEditTime } from "@/api";
import NoticeBar from "@/components/NoticeBar";
import { formatNumber } from "@/utils/index";
const selectTimeArr = ['09:00-10:00','10:00-11:00','11:00-12:00','13:00-14:00','14:00-15:00','15:00-16:00']
export default {
  components: {
    NoticeBar,
  },
  data: () => ({
    timeDay: "",
    TIMEARR:Array(23).fill(0).map((_, index) => {
      const time_str = `${formatNumber(index)}:00-${formatNumber(index + 1)}:00`
      const click = selectTimeArr.includes(time_str)
        return {
          time_str,
          click,
        };
      }),
  }),
  computed: {
    selectLength() {
      return this.TIMEARR.filter((item) => item.click).length;
    }
  },
  onLoad(e) {
    this.timeDay = e.timeDay;
    this.id = e.id;
  },
  methods: {
    changeTime(index) {
      this.$set(
        this.TIMEARR[index],
        "click",
        !this.TIMEARR[index].click
      );
    },
    submit() {
      if(!this.selectLength) {
        uni.showToast({
          title: "请选择时间段",
          icon: "none",
        });
        return;
      }
      warehouseOrderEditTime({
        id: this.id,
        time_str: this.TIMEARR
          .filter((item) => item.click)
          .map((item) => item.time_str)
          .toString(),
      }).then((res) => {
        uni.showToast({
          title: "提交成功",
          icon: "success",
          duration: 2000,
        });
        setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1500);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.time-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  text-align: center;
  view {
    border-radius: 8rpx;
    height: 100rpx;
    line-height: 100rpx;
  }
  .show {
    background-color: $uni-bg-color-white;
    color: #333333;
  }
  .active {
    background-color: #71d5a1;
    color: $uni-text-color-inverse;
  }
}
.fix-view {
  background-color: $uni-bg-color-white;
  border-top: 1rpx solid #d8d8d8;
  position: fixed;
  z-index: 1;
  width: 100vw;
  bottom: 0;
  left: 0;
  text-align: center;
  @include space-between;
  view {
    display: flex;
    align-items: center;
    .red-text {
      color: #f55547;
    }
  }
  button {
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
    border-radius: 50rpx;
  }
}
</style>
