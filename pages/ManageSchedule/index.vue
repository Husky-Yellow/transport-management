<template>
  <view>
    <DataSelect @select="selectData" :scrollDate="scrollDate" />
    <NoticeBar>
      <view class="num-view">
        <text>本日预约：</text>
        <text class="m-l-30">送货 {{num.one}}</text>
        <text class="m-l-30">取货 {{num.two}}</text>
        <text class="m-l-30">返修 {{num.three}}</text>
      </view>
    </NoticeBar>
    <view v-if="timeArr.length !== 0" class="list p-l-20 p-r-20 p-b-20">
      <view v-for="(item,index) in timeArr" :key="index" class="list-item p-t-20 m-t-20">
        <view class="list-item-header p-r-20">
          <view class="list-item-header-intro">
            <view class="border-left" />
            <text class="fz-36 m-l-20 weight-500">{{item.time_str}}</text>
            <text :class="['fz-28 m-l-20', item.sonLength === 2 ? 'error-text' : 'reject_text']">({{item.sonLength}}/2)</text>
          </view>
          <view class="fz-28">{{item.numValue}}件</view>
        </view>
        <view class="list-item-intro m-20 p-l-20 p-r-20">
          <view class="list-item-intro-view p-t-20 p-b-20" v-for="(childItem, childIndex) in item.son" :key="childIndex">
            <view class="list-item-intro-header" >
              <view>
                <text :class="['fz-24 type-text', typeText(childItem.type).class]" >{{typeText(childItem.type).text}}</text>
                <text class="fz-28 m-l-20">{{childItem.company || ''}}</text>
              </view>
              <view class="fz-28">{{childItem.num}}</view>
            </view>
            <view v-if="childItem.type === 3" class="fz-24 plate-text p-l-70 p-t-16">
              <view v-for="(people, peopleIndex) in childItem.personnel" :key="peopleIndex">
                <text>{{people.name}}</text>
                <text class="m-l-20">{{people.tel}}</text>
              </view>
            </view>
            <view v-if="childItem.type !== 3" class="fz-24 plate-text p-l-70 p-t-16 user-list">
              <view class="m-t-6" v-for="(people, peopleIndex) in childItem.personnel" :key="peopleIndex">
                <text>{{people.name}}</text>
                <text class="m-l-10">{{people.license_plate}}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <Empty v-if="timeArr.length === 0"/>
  </view>
</template>

<script>
import DataSelect from "@/components/DataSelect";
import NoticeBar from "@/components/NoticeBar";
import Empty from "@/components/Empty";
import { warehouseOrderCount, warehouseOrderCountText } from "@/api";
export default {
  components: {
    DataSelect,
    NoticeBar,
    Empty
  },
  data: () => ({
    num:{
      one:"",
      two:"",
      three:"",
    },
    scrollDate: [],
    timeArr: [],
    id: "",
  }),
  onLoad() {
    this.getOrderShow();
  },
  methods: {
    typeText(value) {
      const MAP = {
        // repair: "修",
        1: {
          class: 'delivery',
          text: "送"
        },
        2: {
          class: 'claimGoods',
          text: "取"
        },
        3: {
          class: 'repair',
          text: "修"
        },
      };
      return MAP[value] || {
        class: "",
        text: ""
      };
    },
    getOrderShow() {
      warehouseOrderCount().then((res) => {
        this.scrollDate = res.ret.map((item) => {
          const weekArr = ["日", "一", "二", "三", "四", "五", "六"];
          const dateTs = new Date(item.date).setHours(0, 0, 0, 0);
          const dateValue = new Date(dateTs)
          return Object.freeze({
            id:item.id,
            week: `周${weekArr[dateValue.getDay()]}`,
            month: `${item.date.substring(5, 7)}`,
            day: `${item.date.substring(8, 10)}`,
            date: item.date,
          })
        });
        this.selectData(this.scrollDate[0]);
      });
    },
    selectData(item) {
      this.id = item.id;
      warehouseOrderCountText({id:this.id}).then((res) => {
        this.num = res.ret.num
        this.timeArr = res.ret.info.filter(item => item.son.length > 0).map((item) => {
          const numValue = item.son.map(item => item.num).reduce((prev, curr) => prev + curr);
          return {
            sonLength: item.son.length,
            numValue,
            ...item
          }
        })
        console.log(this.timeArr);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.num-view {
  display: flex;
}
.list-item {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 8rpx;
  .list-item-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .list-item-header-intro{
        display: flex;
        align-items: center;
        .border-left {
            width: 8rpx;
            height: 60rpx;
            background-color: $uni-bg-color-primary;
            border-radius: 4rpx;
        }
      .error-text {
        color: #f55547;
      }
      .reject_text{
        color: #71D5A1;
      }
    }
  }

  .list-item-intro {
    border-top: 1rpx solid #EDEEEE;
    .list-item-intro-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
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
  .delivery {
    color: #358fee;
  }
  .plate-text {
    color: $uni-text-color-grey;
  }
  .list-item-intro-view {
    border-bottom: 1rpx solid #EDEEEE;
  }
  .list-item-intro-view:last-child {
    border-bottom: none;
  }
  .user-list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    view:nth-of-type(odd) {
      padding-left: 0;
    }
    view:nth-of-type(even) {
      padding-left: 20rpx;
    }
  }
}
.weight-500{
  font-weight: 500;
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
</style>
