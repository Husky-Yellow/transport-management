<template>
  <view class="data-select">
    <view>
      <view class="arrow left" @click="selectDate(selectDay - 1)" />
    </view>
    <view class="data-select-scroll fz-28">
      <scroll-view
        :scroll-x="true"
        scroll-with-animation
        :scroll-into-view="'u_' + selectDay"
        style="white-space: nowrap"
      >
        <view
          :class="[
            'scroll-view-item p-9',
            index === selectDay ? 'calendar-weekday-active' : '',
          ]"
          v-for="(item, index) in scrollDate"
          :key="index"
          :id="'u_' + index"
          @click="selectDate(index)"
        >
          <view>
            {{ item.week }}
          </view>
          <view> {{ item.month }}.{{ item.day }} </view>
        </view>
      </scroll-view>
    </view>
    <view><view class="arrow right" @click="selectDate(selectDay + 1)" /></view>
  </view>
</template>

<script>
export default {
  props: {
    scrollDate: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    selectDay: 0,
  }),
  methods: {
    selectDate(index) {
      this.selectDay = index;
      console.log(this.scrollDate[index]);
      this.$emit('select', this.scrollDate[index],index);
    },
  },
};
</script>

<style scoped lang="scss">
.data-select {
  width: 100%;
  background-color: $uni-bg-color-white;
  height: 120rpx;
  padding: 0 30rpx;
  @include space-between;
  .data-select-scroll {
    width: 95%;
    height: 100rpx;
    padding: 0 20rpx;
    .scroll-view-item {
      display: inline-flex;
      width: 104rpx;
      border: 1rpx solid $uni-bg-color-border;
      border-radius: 10rpx;
      margin: 0 10rpx;
      flex-direction: column;
      align-items: center;
    }
  }
}
.calendar-weekday-active {
  background-color: $uni-color-active;
  color: $uni-text-color-inverse;
}
</style>
