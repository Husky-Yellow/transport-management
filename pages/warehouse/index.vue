<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view v-if="orderArr.length !== 0" class="list p-20 p-t-80">
      <ManageCard v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view v-if="active === 0" class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <view>
              <button class="p-l-54 p-r-54 fz-28 m-r-20 primary-button" @click="openModel(item,true)">接收</button>
              <button class="p-l-54 p-r-54 fz-28 close-button" @click="openModel(item,false)">拒收</button>
            </view>
          </view>
          <view v-if="active === 1" class="list-item-funtion-itron p-t-20 p-b-20 fz-28">
            <text class="item-lable">备注</text>
            <text class="text-active">{{item.remark || ''}}</text>
          </view>
        </template>
      </ManageCard>
    </view>
    <Empty v-if="orderArr.length === 0"/>
    <Model
      :textmsg="textmsg"
      @cancel="operation(false)"
      @confirm="operation(true)"
      v-if="showTextmsg"
    >
      <view slot="content">
        <view v-if="!textmsg.text" class="Model-content fz-28 p-20">
          <view>
            即将<text class="reject">拒绝</text>{{cancel.company}} {{cancel.s_time}}-{{cancel.e_time}}的
          </view>
          <view class="subscribe-type-text">
            {{typeText(cancel.type)}}
          </view>
        </view>
        <view v-if="textmsg.text" class="dialog-content fz-28 p-l-20 p-r-20">
          <view class="dialog-header p-10 p-b-18">
            <view>
              <view >
                <text class="fz-32 font-weight-Regular">{{cancel.date && cancel.date.length >= 10 ? cancel.date.substring(5,10) : cancel.date }}</text>
                <text class="m-l-20 fz-40 font-weight-medium">{{cancel.s_time}}-{{cancel.e_time}}</text>
              </view>
              <view class="fz-28 m-t-10">{{cancel.company}}</view>
            </view>
            <view class="fz-32 pending_text">待接收</view>
          </view>
          <view class="dialog-intro p-10 p-b-0 p-t-30">
            <view class="fz-28 p-b-15">
              预约类型：<text class="delivery">{{typeText(cancel.type)}}预约</text>
            </view>
            <textarea v-model="remark" class="p-10 dialog-intro_textarea" :focus="true" placeholder="请输入备注信息…"></textarea>
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
export default {
  components: {
    Tab,
    ManageCard,
    Model,
    Empty
  },
  data() {
    return {
      list: ["待接收", "已接收", "已拒绝"],
      active: 0,
      orderArr: [],
      page:1,
      remark:'',
      onReachBottomTimer: null,
      showTextmsg: false,
      cancel: null,

      textmsg: {
        title: "提示",
        content:'',
        text: "",
        cancel: "取消",
        confirm: "确定",
      },
    };
  },
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
    uni.stopPullDownRefresh()
  },
  onShow() {
      this.page = 1
      this.getData();
  },
  methods: {
     getData() {
      const statusMap = {
        0:'2',
        1:'4',
        2:'5',
      }
      warehouseOrderCommonOrder({
        page: this.page,
        num: 10,
        status: statusMap[this.active],
      }).then((res) => {
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr, ...res.ret.data]
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = [];
      this.getData();
    },
    openModel(item, showType) {
      this.cancel = item;
      this.textmsg.title = !showType ? "提示" : '';
      this.showTextmsg = true;
      this.textmsg.text = showType
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.cancel = null
        this.textmsg.text = null
        return;
      } else {
        this.OrdeUuserCancel();
      }
    },
    typeText(value) {
      const MAP = {
        1:'送货',
        2:'取货',
        3:'返修',
      };
      return MAP[value] || '';
    },
    OrdeUuserCancel() {
      warehouseOrderWarehouse({
        id: this.cancel.id,
        type: this.textmsg.text ? 4 : 5,
        remark: this.remark
      })
        .then((res) => {
          uni.showToast({
            title: "操作成功",
            icon: "success",
            duration: 2000,
          });
          this.cancel = null
          this.textmsg.text = null
          this.orderArr = []
          this.page = 1
          this.getData()
        })
        .catch((content) => {
          uni.showModal({
            title: "提示",
            content,
            showCancel: false,
            confirmColor: "#F55547",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.tab{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  height: 80rpx;
  border-top: 1rpx solid $uni-bg-color-border;
}
.list {
  display: flex;
  flex-direction: column;
}
.list-item-funtion {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable{
    color: $uni-text-color-grey;
  }
  .text-active{
    color: $uni-text-color-active;
  }
  .primary-button,.close-button{
    border-radius: 10rpx;
    height: 64rpx;
    line-height: 64rpx;
  }
  .primary-button{
    background-color: $uni-bg-color-primary;
    color: $uni-text-color-inverse;

  }
  .close-button{
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
.dialog-content{
  display: flex;
  flex-direction: column;
  .dialog-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1rpx solid #EDEEEE;
  }
  .dialog-intro_textarea{
    width: 100%;
    min-height: 210rpx;
    height: auto;
    background-color: #F3F3F3;
  }
}
 .claimGoods {
    color: #f1b350;
  }
  .delivery {
    color: #358fee;
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
.list-item-funtion-itron {
  @include space-between;
  border-top: 1rpx solid $uni-bg-color-border;
  .item-lable{
    color: $uni-text-color-grey;
  }
  .text-active{
    color: $uni-text-color-active;
  }
}
</style>
