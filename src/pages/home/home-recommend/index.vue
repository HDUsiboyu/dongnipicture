<!--  -->
<template>
  <scroll-view
    @scrolltolower="handleToLower"
    class="recommend_view"
    scroll-y
    v-if="recommends.length > 0"
  >
    <!-- 推荐模块 -->
    <view class="recommend_wrap">
      <navigator
        class="recommend_item"
        v-for="item in recommends"
        :key="item.id"
        :url="`/pages/album/index?id=${item.target}`"
      >
        <image mode="widthFix" :src="item.thumb"></image>
      </navigator>
    </view>
    <!-- 月份模块 -->
    <view class="monthes_wrap">
      <view class="monthes_title">
        <view class="monthes_title_info">
          <view class="monthes_info">
            <text> {{ monthes.stime | dataString("DD") }} / </text>
            {{ monthes.stime | dataString("MM") }} 月
          </view>
          <view class="monthes_text"> {{ monthes.title }} </view>
        </view>
        <view class="monthes_title_more">更多 > </view>
      </view>
      <view class="monthes_content">
        <view
          class="monthes_item"
          v-for="(item, index) in monthes.items"
          :key="item.id"
        >
          <go-detail :list="monthes.items" :index="index">
            <image
              mode="aspectFill"
              :src="item.thumb + item.rule.replace('$<Height>', 360)"
            ></image>
          </go-detail>
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="hots_wrap">
      <view class="hots_title">
        <text> 热门 </text>
      </view>
      <view class="hots_content">
        <view class="hot_item" v-for="(item, index) in hots" :key="item.id">
          <go-detail :list="hots" :index="index">
            <image mode="widthFix" :src="item.thumb"></image>
          </go-detail>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script>
import goDetail from "../../../components/goDetail";
export default {
  data() {
    return {
      recommends: [], //推荐
      monthes: {}, // 月份
      hots: [], //热门
      params: {
        limit: 30, //获取多少条数据
        order: "hot", //关键字 “hot”
        skip: 0, //跳过多少条
      }, //参数
      haveMore: true, //是否还有更多
    };
  },
  mounted() {
    this.getList();
    uni.setNavigationBarTitle({ title: "推荐" });
  },
  methods: {
    handleToLower() {
      if (this.haveMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有更多数据了",
          icon: none,
        });
      }
    },
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
        data: this.params,
      }).then((result) => {
        console.log(result);
        if (this.recommends.length === 0) {
          this.recommends = result.data.res.homepage[1].items;
          this.monthes = result.data.res.homepage[2];
          console.log(this.monthes);
        }
        if (result.data.res.vertical.length === 0) {
          this.haveMore = false;
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        this.hots = [...this.hots, ...result.data.res.vertical];
      });
    },
  },
  components: {
    goDetail,
  },
};
</script>

<style lang="scss" scoped >
.recommend_view {
  // height：屏幕的高度 -  头部标题的高度
  height: calc(100vh - 36px);
}
.recommend_wrap {
  // flex布局
  display: flex;
  flex-wrap: wrap;
  .recommend_item {
    width: 50%;
    border: 5rpx solid #fff;
  }
}
.monthes_wrap {
  .monthes_title {
    display: flex;
    justify-content: space-between;
    padding: 20rpx;
    .monthes_title_info {
      color: $color;
      font-size: 30rpx;
      font-weight: 600;
      display: flex;
      .monthes_info {
        text {
          font-size: 36rpx;
        }
      }

      .monthes_text {
        font-size: 34rpx;
        color: #666;
        margin-left: 30rpx;
      }
    }

    .monthes_title_more {
      font-size: 24rpx;
      color: $color;
    }
  }

  .monthes_content {
    display: flex;
    flex-wrap: wrap;
    .monthes_item {
      width: 33.33%;
      border: 5rpx solid #fff;
    }
  }
}
.hots_wrap {
  .hots_title {
    padding: 20rpx;
    text {
      border-left: 20rpx solid $color;
      padding-left: 20rpx;
      font-size: 34rpx;
      font-weight: 600;
    }
  }

  .hots_content {
    display: flex;
    flex-wrap: wrap;
    .hot_item {
      width: 33.33%;
      border: 5rpx solid #fff;
      image {
      }
    }
  }
}
</style>