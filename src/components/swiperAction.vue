<!--  -->
<template>
  <view @touchstart="handleTouchstart" @touchend="handleTouchend">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startTime: 0, // 按下屏幕的时间
      startX: 0, //按下屏幕的横坐标
      startY: 0, //按下屏幕的纵坐标
    };
  },
  methods: {
    handleTouchstart(e) {
      this.startTime = Date.now();
      this.startX = e.changedTouches[0].clientX;
      this.startY = e.changedTouches[0].clientY;
    },
    handleTouchend(e) {
      const endTime = Date.now();
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      //判断按下的时长
      if (endTime - this.startTime > 2000) return;

      //滑动的方向
      let direction = "";
      //判断用户滑动的距离是否合法
      if (
        Math.abs(endX - this.startX) > 10 &&
        Math.abs(endY - this.startY) < 10
      ) {
        direction = endX - this.startX > 0 ? "right" : "left";
      } else return;

      //滑动结束向父组件传递数据
      this.$emit("swiperAction", { direction });
    },
  },
};
</script>

<style lang=
>
</style>
