<template>
  <scroll-view
    class="album_scroll_view"
    scroll-y
    @scrolltolower="handleToLower"
  >
    <!-- 
      swiper 一定要去到b站上 搜索 “微信小程序 黑马程序员”  “swiper标签的介绍”
      1 自动轮播 autoplay
      2 指示器 indicator-dots 
      3 衔接轮播 circular

      4 swiper 
        默认的高度 150px
      5 image 
        默认的宽度 320px => 基本样式中 重置了 100%
        默认的高度 240px 
      6 计算图片的宽度和高度的比例
      7 把图片的比例也写到swiper标签样式 
      8 swiper-item 
        100% 
     -->
    <!-- 轮播图 开始 -->

    <view class="album_swiper">
      <swiper autoplay indicator-dots circular>
        <swiper-item v-for="item in banner" :key="item.id">
          <image :src="item.thumb"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 轮播图 结束 -->

    <!-- 列表 开始 -->
    <view class="album_list">
      <navigator
        class="album_item"
        v-for="item in album"
        :key="item.id"
        :url="`/pages/album/index?id=${item.id}`"
      >
        <view class="album_img">
          <image mode="aspectFill" :src="item.cover"></image>
        </view>
        <view class="album_info">
          <view class="album_name">{{ item.name }}</view>
          <view class="album_desc">{{ item.desc }}</view>
          <view class="album_btn">
            <view class="album_attention">关注</view>
          </view>
        </view>
      </navigator>
    </view>
    <!-- 列表 结束 -->
  </scroll-view>
</template>

<script>
export default {
  data() {
    return {
      params: {
        limit: 30, //获取多少条数据
        order: "new", //关键字 “hot”
        skip: 0, //跳过多少条
      }, //参数
      banner: [], //轮播图列表
      album: [], //专辑列表
      haveMore: true, //是否还有更多数据
    };
  },
  mounted() {
    uni.setNavigationBarTitle({ title: "专辑" });
    this.getList();
  },
  methods: {
    getList() {
      this.request({
        url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
        data: this.params,
      }).then((result) => {
        console.log(result);
        if (this.banner.length === 0) this.banner = result.data.res.banner;
        if (result.data.res.album.length === 0) {
          uni.showToast({
            title: "没有更多数据了",
            icon: "none",
          });
          return;
        }
        this.album = [...this.album, ...result.data.res.album];
      });
    },
    handleToLower() {
      if (this.haveMore) {
        this.params.skip += this.params.limit;
        this.getList();
      } else {
        uni.showToast({
          title: "没有更多数据了",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.album_scroll_view {
  height: calc(100vh - 36px);
}
.album_swiper {
  swiper {
    // 750rpx 326.0869565217392
    // height: calc(750rpx / 2.3 );
    height: 326.1rpx;
    image {
      height: 100%;
    }
  }
}
.album_list {
  padding: 10rpx;
  .album_item {
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1rpx solid #ccc;
    .album_img {
      flex: 1;
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }

    .album_info {
      flex: 2;
      padding: 0 10rpx;
      overflow: hidden;
      .album_name {
        font-size: 30rpx;
        color: #000;
        padding: 10rpx 0;
      }

      .album_desc {
        padding: 10rpx 0;
        font-size: 24rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .album_btn {
        padding: 10rpx;
        display: flex;
        justify-content: flex-end;
        .album_attention {
          color: $color;
          border: 1rpx solid $color;
          padding: 10rpx;
        }
      }
    }
  }
}
</style>
