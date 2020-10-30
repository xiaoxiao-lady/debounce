<template>
  <div id="app">
    <keep-alive exclude="OrderList,Area">
      <router-view class="Router"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      isShowFloat: false,
    };
  },
  watch: {},
  methods: {},
};
</script>

<style lang="less">
.van-dialog {
  border-radius: 5px;
  width: 80%;
}
i {
  font-style: normal;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.Router {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  min-height: 100%;
  overflow: auto;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  /* border:1px solid #000; */
  box-sizing: border-box;
}
.slideleft-enter,
.slideright-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
.slideleft-leave-active,
.slideright-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}

// 返回首页
.tiwen-ct-back {
  width: 75/75rem;
  height: 75/75rem;
  position: fixed;
  right: 30/75rem;
  bottom: 60/75rem;
  z-index: 999;
  .shouye-ct {
    width: 75/75rem;
    height: 75/75rem;
    img {
      width: 100% !important;
      height: 100% !important;
    }
  }
}
button {
  border: none;
  outline: none;
  border-radius: 0;
  background: #fff;
}
.return-home {
  width: 48px;
  height: 48px;
  position: fixed;
  right: 34px;
  bottom: 76px;
  z-index: 70;
}
.return-home img {
  display: block;
  width: 48px;
  height: 48px;
}

.mint-indicator-mask {
  z-index: 9999 !important;
}
</style>
