<template>
  <view class="list-item m-t-46 p-l-30 p-r-30">
    <view class="list-item-header p-t-20 p-b-20">
      <view>
        <view class="fz-36"
          >{{obj.date && obj.date.length === 10 ? obj.date.substring(5,10) : obj.date }}
          <text class="fz-40 p-l-20 font-weight-medium">{{obj.s_time}}-{{obj.e_time}}</text>
        </view>
        <view class="fz-28 m-t-16 list-item-header_type"
          >{{obj.company || ''}}
        </view>
      </view>
      <view :class="['fz-32', statusText(obj.status).class+'_text']">{{ statusText(obj.status).text }}</view>
    </view>
    <view
      v-if="obj.type !== 3"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">预约类型</text>
        <text :class="['fz-32 type-text', typeText(obj.type).class]">{{ typeText(obj.type).text }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">送货单号</text>
        <text>{{ obj.delivery_note || '' }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>{{ obj.num }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">送货员</text>
        <view>
          <image
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="m-r-20 transport-image--round"
            mode="scaleToFill"
          />
          {{ obj.personnel[0].name || '--' }}</view
        >
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">手机号</text>
        <text>{{ obj.personnel[0].tel || '--' }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">车牌号</text>
        <text>{{ obj.personnel[0].license_plate || '--' }}</text>
      </view>
    </view>
    <view
      v-if="obj.type === 3"
      class="list-item-body p-t-10 p-b-10 fz-28"
    >
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">预约类型</text>
        <text :class="['fz-32 type-text', typeText(obj.type).class]">{{ typeText(obj.type).text }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">数量</text>
        <text>{{ obj.num }}</text>
      </view>
      <view class="list-item-body_item p-t-10 p-b-10">
        <text class="item-text">返修员</text>
        <text>{{ obj.personnel.length }}</text>
      </view>
      <view class="list-item-body_intro p-t-10 p-b-10 fz-24">
        <view v-for="(item, index) in obj.personnel" :key="index"
          >{{ item.name }}：{{ item.tel }}</view
        >
      </view>
    </view>
    <slot name="funtion"> </slot>
    <view
      :class="['show-line', statusText(obj.status).class]"
    ></view>
  </view>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {
        return {
          date: "",
          company: "",
          s_time: "",
          e_time: "",
          num: "",
          type: "",
          status: "",
          personnel: [
            {name:'--',tel:'--',license_plate:'--'}
          ],
          hint:"",
          time: "",
        };
      },
    }
  },
  methods: {
    typeText(value) {
      const MAP = {
        1: {
          class: "delivery",
          text: "送",
        },
        2: {
          class: "claimGoods",
          text: "取",
        },
        3: {
          class: "repair",
          text: "修",
        },
      };
      return (
        MAP[value] || {
          class: "",
          text: "",
        }
      );
    },
    statusText(value) {
      const MAP = {
        // pending: "待审核",
        // receive: "已接收",
        // reject: "已拒收",
        1: {
          class: "pending",
          text: "待审核",
        },
        2: {
          class: "receive",
          text: "审核通过",
        },
        3: {
          class: 'reject',
          text: "已拒绝"
        },
        4: {
          class: 'receive',
          text: "已接收"
        },
        5: {
          class: 'reject',
          text: "已拒绝"
        },
        9: {
          class: 'reject',
          text: "已过期"
        },
      };
      return (
        MAP[value] || {
          class: "",
          text: "",
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  display: flex;
  flex-direction: column;
  background-color: $uni-bg-color-white;
  border-radius: 20rpx;
  position: relative;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.05);
  .list-item-header,
  .list-item-body > .list-item-body_item {
    @include space-between;
  }
  .list-item-body image {
    width: 48rpx;
    height: 48rpx;
    vertical-align: middle;
  }
  .list-item-header {
    flex-direction: row;
    border-bottom: 1rpx solid $uni-bg-color-border;
    .list-item-header_type {
      display: flex;
      align-items: center;

    }
    .pending_text {
      color: $uni-text-color-pending;
    }
    .receive_text {
      color: #71d5a1;
    }
    .reject_text {
      color: #f55547;
    }
  }
  .list-item-body_intro {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    view {
      width: 48%;
      padding-right: 10rpx;
      margin-top: 10rpx;
    }
    view:nth-of-type(odd) {
      border-right: 1rpx solid $uni-bg-color-border;
    }
    view:nth-of-type(even) {
      padding-left: 40rpx;
    }
  }
  .show-line {
    height: 30rpx;
    position: absolute;
    top: -10rpx;
    border-radius: 20rpx;
    left: 0;
    width: 100%;
    z-index: -1;
  }
  .pending {
    background-color: #f1b350;
  }
  .receive {
    background-color: #71d5a1;
  }
  .reject {
    background-color: #f55547;
  }
  .type-text {
    display: inline-flex;
    width: 48rpx;
    height: 48rpx;
    border: 2rpx solid;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
  }
  .claimGoods {
        color: #f1b350;
      }
      .repair {
        color: #f55547;
      }
      .delivery {
        color: #358fee;
      }
}
</style>
