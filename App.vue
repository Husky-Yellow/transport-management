<script>
	export default {
		onLaunch: function(e) {
			console.log('App Launch')
      console.log('跳转过来的参数⬇️⬇️⬇️⬇️⬇️⬇️⬇️')
      console.log(e);
      console.log(JSON.stringify(e));
		}
	}
</script>

<style lang="scss">
view,
scroll-view,
swiper,
button,
input,
textarea,
label,
navigator,
image {
  box-sizing: border-box;
}

button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  line-height: 1;
  border-radius: 0;
  &::after {
    display: none;
  }
}

page {
  min-height: 100vh;
  height: auto;
  background-color: $uni-bg-color;
  font-family: PingFangSC-Regular, PingFang SC;
}


@for $i from 0 through 190 {
  .m-#{$i} {
    margin: ($i) + rpx;
  }
  .m-t-#{$i} {
    margin-top: ($i) + rpx;
  }
  .m-b-#{$i} {
    margin-bottom: ($i) + rpx;
  }
  .m-l-#{$i} {
    margin-left: ($i) + rpx;
  }
  .m-r-#{$i} {
    margin-right: ($i) + rpx;
  }

  .p-#{$i} {
    padding: ($i) + rpx;
  }
  .p-t-#{$i} {
    padding-top: ($i) + rpx;
  }
  .p-b-#{$i} {
    padding-bottom: ($i) + rpx;
  }
  .p-l-#{$i} {
    padding-left: ($i) + rpx;
  }
  .p-r-#{$i} {
    padding-right: ($i) + rpx;
  }

  .fz-#{$i} {
    font-size: ($i) + rpx;
  }
}

</style>
