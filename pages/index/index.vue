<template>
  <view>
    <Tab class="tab" :list="list" :active="active" @changeActive="changeActive" />
    <view v-if="orderArr.length !== 0" class="list p-20 p-t-80">
      <ManageCard v-for="(item, index) in orderArr" :key="index" :obj="item">
        <template #funtion>
          <view v-if="active === 0" class="list-item-funtion p-t-20 p-b-20 fz-28">
            <text>操作</text>
            <view>
              <button class="p-l-54 p-r-54 fz-28 m-r-20 primary-button" @click="openModel(item,true)">通过</button>
              <button class="p-l-54 p-r-54 fz-28 close-button" @click="openModel(item,false)">拒绝</button>
            </view>
          </view>
        </template>
      </ManageCard>
    </view>
    <Empty v-if="orderArr.length === 0"/>
    <Model
      :textmsg="textmsg"
      @cancel="operation(false)"
      @confirm="operation(true)"
      v-show="showTextmsg"
    >
      <view slot="content">
        <view v-if="textmsg.showType == 'button'" class="Model-content fz-28 p-20">
          <view>
            即将<text :class="[textmsg.text ? 'receive' : 'reject']">{{ textmsg.text ? "通过" : "拒绝" }}</text>{{textmsg.content}}的
          </view>
          <view class="subscribe-type-text">
            {{typeText(textmsg.type)}}预约申请
          </view>
        </view>
        <view v-if="textmsg.showType == 'error'" class="Model-content fz-28 p-20">
          <view>
            {{textmsg.content}}
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
export default {
  components: {
    Tab,
    ManageCard,
    Model,
    Empty
  },
  data: () => ({
      list: ["待审核", "已通过", "已拒绝"],
      active: 0,
      orderArr: [],
      page:1,
      onReachBottomTimer: null,
      showTextmsg: false,
      cancelId: null,

      textmsg: {
        showType: "",
        title: "提示",
        content:'',
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
    uni.stopPullDownRefresh()
  },
  onLoad() {
      this.page = 1
      this.orderArr = [];
      this.getData();
  },
  methods: {
    getData() {
      warehouseOrderCommonOrder({
        page: this.page,
        num: 10,
        status: this.active + 1,
      }).then((res) => {
        if (this.page === 1) {
          this.orderArr = []
        }
        if (res.ret.data.length === 0) {
          return uni.showToast({
            title: '没有更多数据了',
            icon: 'none',
          })
        }
        this.orderArr = [...this.orderArr, ...res.ret.data];
      });
    },
    changeActive(index) {
      this.active = index;
      this.page = 1
      this.orderArr = [];
      this.getData();
    },
    openModel(item, showType) {
      const {company = '' || '', date = '', s_time = '', e_time = '',type} = item
      this.cancel = item;
      this.showTextmsg = true;
      this.textmsg.text = showType
      this.textmsg.type = type
      this.textmsg.showType = 'button'
      this.textmsg.content = `${company || ''}${date} ${s_time}-${e_time}`;
    },
    operation(e) {
      this.showTextmsg = false;
      if (!e) {
        this.textmsg.content = ""
        this.textmsg.text = ''
        this.textmsg.type = ''
        this.textmsg.showType = ''
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
          this.cancel = null
          this.page = 1
          this.orderArr = [];
          this.getData();
          this.textmsg.content = "";
          this.textmsg.text = ''
          this.textmsg.type = ''
          this.textmsg.showType = ''
        })
        .catch((content) => {
            this.showTextmsg = true;
            this.textmsg.text = type
            this.textmsg.showType = 'error'
            this.textmsg.content = `${this.cancel.date} ${this.cancel.s_time}-${this.cancel.e_time}的预约通过已满，无法再次通过，请选择`;
        });
    },
    typeText(value) {
      const MAP = {
        1:'送货',
        2:'取货',
        3:'返修',
      };
      return MAP[value] || '';
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
</style>
