<template>
  <!-- 底部导航 -->
  <div class="tab-bar">
    <div class="tab-item" @click="toPage('/home',1)">
      <img src="./tab1_on.png" alt class="icon" v-if="active===1" />
      <img src="./tab1.png" alt class="icon" v-else />
      <div class="text" :style="active===1?'color: #3399FF;':''">首页</div>
    </div>
    <div class="tab-item" @click="toPage('/orderList',2)">
      <img src="./tab2_on.png" alt class="icon" v-if="active===2" />
      <img src="./tab2.png" alt class="icon" v-else />
      <div class="text" :style="active===2?'color: #5087ef;':''">订单</div>
    </div>
    <div class="tab-item" @click="toPage('/statistics',3)">
      <img src="./tab3_on.png" alt class="icon" v-if="active===3" />
      <img src="./tab3.png" alt class="icon" v-else />
      <div class="text" :style="active===3?'color: #5087ef;':''">统计</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    toPage(page, active) {
      if (this.active === active) return;
      if (this.active < active) {
        this.$router.push(page);
      } else {
        this.$router.push(page);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tab-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 60px;
  display: flex;
  box-shadow: 0px -3px 6px -3px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.tab-bar .tab-item {
  padding-top: 9px;
  box-sizing: border-box;
  position: relative;
  flex: 1;
}
/* .tab-bar .tab-item:first-child:after {
  content: " ";
  position: absolute;
  right: 0;
  top: 0.03rem;
  bottom: 0;
  transform: scaleX(0.5);
} */
.tab-bar .tab-item .icon {
  display: block;
  margin: 0 auto;
  width: 22px;
  height: 22px;
}
.tab-bar .tab-item .text {
  margin-top: 4px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #b0b0b0;
  line-height: 14px;
}
</style>

