<template>
  <view class="p-t-270">
    <view class="header">
      <view class="header-bar">
        <view class="search-form">
          <icon class="icon-small" type="search" size="12"></icon>
          <input
            type="text"
            confirm-type="search"
            placeholder="搜索供应商，送货员，取货员，返修员"
            @confirm="searchList"
          />
        </view>
      </view>
      <Tab
        class="tab"
        :list="list"
        :active="active"
        @changeActive="changeActive"
      />
      <view class="header-picker p-20 fz-26">
        <view
          :class="[
            'header-picker-time',
            !startTime && !endTime ? 'grey-text' : '',
          ]"
        >
          <picker
            mode="date"
            :value="startTime"
            header-text="开始时间"
            :start="seventDayStartTime"
            :end="active === 0 ? seventDayEndTime : seventDayEightTime"
            @change="changeStartTime"
            @cancel="startTime = null"
          >
            <text>{{ startTime || "所有时间" }}</text>
          </picker>
          <text>~</text>
          <picker
            mode="date"
            :value="endTime"
            header-text="结束时间"
            :start="seventDayStartTime"
            :end="active === 0 ? seventDayEndTime : seventDayEightTime"
            @change="changeEndTime"
            @cancel="endTime = null"
          >
            <text>{{ endTime || "所有时间" }}</text>
          </picker>
          <view class="arrow"></view>
        </view>
        <picker
          :class="['header-picker-type', !!typeIndex ? '' : 'grey-text']"
          @change="bindPickerChange"
          @cancel="typeIndex = null"
          :value="typeIndex"
          :range="typeArr"
        >
          {{ !!typeIndex ? typeArr[typeIndex] : typeArr[0] }}
          <view class="arrow"></view>
        </picker>
      </view>
    </view>
    <view v-if="orderArr.length !== 0" class="list p-20">
      <ManageCard v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view
            v-if="active === 0"
            class="list-item-funtion p-t-20 p-b-20 fz-28"
          >
            <text>操作</text>
            <view>
              <button
                class="p-l-54 p-r-54 fz-28 m-r-20 primary-button"
                @click="openModel(item, true)"
              >
                通过
              </button>
              <button
                class="p-l-54 p-r-54 fz-28 close-button"
                @click="openModel(item, false)"
              >
                拒绝
              </button>
            </view>
          </view>
        </template>
      </ManageCard>
    </view>
    <Empty v-if="orderArr.length === 0" />
    <Model
      :textmsg="textmsg"
      @cancel="operation(false)"
      @confirm="operation(true)"
      v-show="showTextmsg"
    >
      <view slot="content">
        <view
          v-if="textmsg.showType == 'button'"
          class="Model-content fz-28 p-20"
        >
          <view>
            即将<text :class="[textmsg.text ? 'receive' : 'reject']">{{
              textmsg.text ? "通过" : "拒绝"
            }}</text
            >{{ textmsg.content }}的
          </view>
          <view class="subscribe-type-text">
            {{ typeText(textmsg.type) }}预约申请
          </view>
        </view>
        <view
          v-if="textmsg.showType == 'error'"
          class="Model-content fz-28 p-20"
        >
          <view>
            {{ textmsg.content }}
            <text class="reject">拒绝</text>
            操作
          </view>
        </view>
      </view>
    </Model>
  </view>
</template>

<script>
import Tab from "@/components/Tab";
import ManageCard from "@/components/ManageCard";
import Model from "@/components/Model";
import Empty from "@/components/Empty";
import { warehouseOrderCommonOrder, warehouseOrderWarehouse } from "@/api";
const selectDayObj = (num = 7) => {
  const date1 = new Date();
  //今天时间
  const startTime =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  const date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  const endTime =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  console.log(endTime);
  return {
    startTime,
    endTime,
  };
};
export default {
  components: {
    Tab,
    ManageCard,
    Model,
    Empty,
  },
  data: () => ({
    list: ["待审核", "已通过", "已拒绝", "已过期"],
    typeArr: ["全部类型", "送货预约", "取货预约", "返修预约"],
    typeIndex: 0,
    startTime: null,
    endTime: null,
    active: 0,
    orderArr: [],
    page: 1,
    onReachBottomTimer: null,
    showTextmsg: false,
    cancelId: null,
    seventDayStartTime: selectDayObj().startTime,
    seventDayEndTime: selectDayObj().endTime,
    seventDayEightTime: selectDayObj(8).endTime,
    textmsg: {
      showType: "",
      title: "提示",
      content: "",
      text: "",
      type: "",
      cancel: "取消",
      confirm: "确定",
    },
  }),
  onReachBottom() {
    if (this.onReachBottomTimer !== null) {
      clearTimeout(this.onReachBottomTimer);
    }
    this.page++;
    this.onReachBottomTimer = setTimeout(() => this.getData(), 500);
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getData();
    uni.stopPullDownRefresh();
  },
  onLoad() {
    this.page = 1;
    this.orderArr = [];
    this.getData();
  },
  methods: {
    bindPickerChange(e) {
      this.typeIndex = e.detail.value;
    },
    changeStartTime(e) {
      this.startTime = e.detail.value;
    },
    changeEndTime(e) {
      this.endTime = e.detail.value;
    },
    getData() {
      warehouseOrderCommonOrder({
        page: this.page,
        num: 10,
        status: this.active + 1,
      }).then((res) => {
        if (this.page === 1) {
          this.orderArr = [];
        }
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
        }
        this.orderArr = [...this.orderArr, ...res.ret.data];
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1;
      this.orderArr = [];
      this.startTime = "";
      this.endTime = "";
      this.typeIndex = null;
      this.getData();
    },
    openModel(item, showType) {
      const {
        company = "" || "",
        date = "",
        s_time = "",
        e_time = "",
        type,
      } = item;
      this.cancel = item;
      this.showTextmsg = true;
      this.textmsg.text = showType;
      this.textmsg.type = type;
      this.textmsg.showType = "button";
      this.textmsg.content = `${company || ""}${date} ${s_time}-${e_time}`;
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.textmsg.content = "";
        this.textmsg.text = "";
        this.textmsg.type = "";
        this.textmsg.showType = "";
        return;
      } else {
        this.OrdeUuserCancel();
      }
    },
    OrdeUuserCancel() {
      warehouseOrderWarehouse({
        type: this.textmsg.text ? 2 : 3,
        id: this.cancel.id,
      })
        .then((res) => {
          uni.showToast({
            title: "操作成功",
            icon: "success",
            duration: 2000,
          });
          this.cancel = null;
          this.page = 1;
          this.orderArr = [];
          this.getData();
          this.textmsg.content = "";
          this.textmsg.text = "";
          this.textmsg.type = "";
          this.textmsg.showType = "";
        })
        .catch((content) => {
          this.showTextmsg = true;
          this.textmsg.text = type;
          this.textmsg.showType = "error";
          this.textmsg.content = `${this.cancel.date} ${this.cancel.s_time}-${this.cancel.e_time}的预约通过已满，无法再次通过，请选择`;
        });
    },
    typeText(value) {
      const MAP = {
        1: "送货",
        2: "取货",
        3: "返修",
      };
      return MAP[value] || "";
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 270rpx;
  background-color: #fff;
  border-top: 1rpx solid $uni-bg-color-border;
  .header-bar {
    display: flex;
    position: relative;
    align-items: center;
    min-height: 80rpx;
    justify-content: space-between;
    .search-form {
      border-radius: 10rpx;
      background-color: #f5f5f5;
      line-height: 64rpx;
      height: 64rpx;
      font-size: 24rpx;
      color: #333;
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 30rpx;
      .icon-small {
        margin: 30rpx 14rpx 0;
      }
      input {
        flex: 1;
        padding-right: 30rpx;
        height: 64rpx;
        line-height: 64rpx;
        font-size: 26rpx;
        background-color: transparent;
      }
    }
  }
  .tab {
    height: 80rpx;
    border-top: 1rpx solid $uni-bg-color-border;
  }
  .header-picker {
    display: flex;
    justify-content: space-between;
    .header-picker-time,
    .header-picker-type {
      border: 1rpx solid $uni-bg-color-border;
      border-radius: 40rpx;
      display: flex;
      align-content: center;
      padding: 16rpx 24rpx;
      margin: 0 18rpx;
    }
    .header-picker-time {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      picker {
        width: 40%;
        text-align: center;
      }
      .arrow {
        transform: translateY(-6rpx) translateX(4rpx) rotate(135deg);
      }
    }
    .arrow {
      width: 14rpx;
      height: 14rpx;
      transform: translateY(-8rpx) translateX(4rpx) rotate(135deg);
      margin-left: 10rpx;
      border-top: 2rpx solid;
      border-right: 2rpx solid;
      display: inline-block;
    }
  }
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item-funtion {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable {
    color: $uni-text-color-grey;
  }
  .text-active {
    color: $uni-text-color-active;
  }
  .primary-button,
  .close-button {
    border-radius: 10rpx;
    height: 64rpx;
    line-height: 64rpx;
  }
  .primary-button {
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;
  }
  .close-button {
    border: 1rpx solid $uni-bg-color-border;
  }
}
.Model-content {
  text-align: center;
  .subscribe-type-text {
    color: $uni-text-color-pending;
  }
  .pending {
    color: #f1b350;
  }
  .receive {
    color: #71d5a1;
  }
  .reject {
    color: #f55547;
  }
}
</style>
