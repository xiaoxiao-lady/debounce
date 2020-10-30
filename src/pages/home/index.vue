<template>
  <div class="login home">
    <div class="canteen-name" v-if="companyArr && companyArr.length">
      <!-- // TODO  html -->
      <van-dropdown-menu active-color="#1989fa">
        <van-dropdown-item
          v-model="companyId1"
          @change="selectCompany1"
          :options="companyArr"
        />
      </van-dropdown-menu>
    </div>
    <van-notice-bar
      color="#333"
      background="#FAFAFA"
      :left-icon="newIcon"
      class="myNotice"
      scrollable
      speed="80"
      @click="goPageNotice()"
      >{{ noticeList.title }}</van-notice-bar
    >
    <div class="date-container">
      <span class="avatar-ct" @click="goPersonInfo()">
        <img :src="userInfo.image" />
      </span>
      <div>
        <div class="name">
          {{ userInfo.name }}
          <img src="./edit.png" @click="goPersonInfo()" />
        </div>
        <div class="date">{{ date }}</div>
      </div>
      <!-- <span style="position:absolute;right: 4px;font-size: .28rem;font-weight: bold;top: 50%;transform: translateY(-50%)">{{canteenName}}</span> -->
    </div>
    <div class="nav-wrapper">
      <div @click="gotoNext('/canteen')" class="nav-item">
        <img src="./xiadantext.png" class="icon" />
      </div>
      <div @click="gotoNext('/scanResult')" class="nav-item">
        <img src="./wodetext.png" class="icon" />
      </div>
      <div @click="gotoNext('/sendOrderDetail')" class="nav-item">
        <img src="./sendtext.png" class="icon" />
      </div>
    </div>

    <div class="orderNum-ct">
      <div class="orderNum-ct-top">
        <div class="title">订单数浏览</div>
        <ul>
          <li>
            <p>{{ dataStatistic.todayCount }}</p>
            <p>今日</p>
          </li>
          <li>
            <p>{{ dataStatistic.weekCount }}</p>
            <p>本周</p>
          </li>
          <li>
            <p>{{ dataStatistic.monthCount }}</p>
            <p>本月</p>
          </li>
        </ul>
      </div>
      <div class="orderNum-ct-top">
        <div class="title">订单金额概览</div>
        <ul>
          <li>
            <p>{{ dataStatistic.todayAmount }}</p>
            <p>今日</p>
          </li>
          <li>
            <p>{{ dataStatistic.weekAmount }}</p>
            <p>本周</p>
          </li>
          <li>
            <p>{{ dataStatistic.monthAmount }}</p>
            <p>本月</p>
          </li>
        </ul>
      </div>
    </div>
    <TabBar :active="1"></TabBar>
  </div>
</template>

<script>
/* eslint-disable */
import { parseTime } from "@/utils/index";
import { getTakerIndex, getInformationList, companyListByQo } from "@/api/home";
import TabBar from "@/components/TabBar/index";
export default {
  components: {
    TabBar,
  },
  data() {
    return {
      takerType: takerType,
      newIcon: require("./msg.png"),
      date: "",
      dataStatistic: {},
      canteenName: "",
      noticeList: [],
      companyArr: [],
      companyId1: "", //设置companyId1主要是下拉框选择的时候不能直接绑定计算属性，计算数值不能set
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    companyId() {
      return this.$store.state.user.companyId
        ? Number(this.$store.state.user.companyId)
        : "";
    },
    companyName() {
      return this.$store.state.user.companyName;
    },
  },
  created() {},
  activated() {},
  mounted() {
    this.companyId1 = Number(this.companyId); //设置回显
    this.$store.dispatch("setCanteenId", "");
    this.init();
  },
  methods: {
    // TODO  methods
    // 选择园区
    selectCompany1(value) {
      this.$store.commit("setCompanyId", value);
      this.showPicker = false;
      this.init();
    },
    showPickered() {
      this.showPicker = true;
    },
    init() {
      this.canteenName = sessionStorage.getItem("canteenName");
      this.date = parseTime(new Date().getTime(), "{y}-{m}-{d} 星期{a}");
      this.getData();
      this.setUserInfoFun();
      this.getNotice();
      this.getCompanyList();
    },

    setUserInfoFun() {
      this.$store.commit("setUserInfoFun");
    },
    getData() {
      getTakerIndex().then((res) => {
        this.dataStatistic = res.result;
      });
    },
    getNotice() {
      getInformationList({
        type: 3,
      }).then((respanse) => {
        if (respanse.result.list && respanse.result.list.length) {
          let noticeList = respanse.result.list[0];
          this.noticeList = noticeList;
        }
      });
    },
    gotoNext(path) {
      this.$router.push(path);
    },
    goPageNotice() {
      this.$router.push({
        path: "/noticeList",
      });
    },
    goPersonInfo() {
      this.$router.push({
        path: "/personal",
      });
    },
    getCompanyList() {
      companyListByQo().then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.companyArr = res.result;
          if (this.companyArr && this.companyArr.length) {
            this.companyArr = this.companyArr.map((ele) => {
              return (ele = {
                value: ele.id,
                text: ele.name,
              });
            });
            console.log(this.$store.state.user.companyId);
            if (!this.$store.state.user.companyId) {
              // this.$store.commit("setCompanyName", this.companyArr[0].name);
              // this.$store.commit("setCompanyId", this.companyArr[0].id);
              this.$store.commit("setCompanyName", this.companyArr[0].text);
              this.companyId1 = this.companyArr[0].value;
              this.$store.commit("setCompanyId", this.companyArr[0].value);
            } else {
              this.$store.commit("setCompanyName", "");
              this.companyId1 = "";
              this.$store.commit("setCompanyId", "");
            }
          }
        } else {
          this.$store.commit("setCompanyName", "");
          this.companyId1 = "";
          this.$store.commit("setCompanyId", "");
          this.$layer.msg(res.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myNotice {
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  line-height: 20px;
  /deep/ .van-notice-bar__left-icon {
    width: 90px;
    font-size: 15px;
  }
}
.myNotice:after {
  position: absolute;
  content: "消息通知：";
  font-size: 14px;
  color: #333;
  left: 40px;
}
.login {
  // padding: 0 20/75rem;
  background-color: #fafafa;
  padding-bottom: 95px;
}
.date-container {
  height: 80px;
  display: flex;
  align-items: center;
  margin: 0 10px;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 6px;
  .avatar-ct {
    border-radius: 50%;
    overflow: hidden;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .name {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    display: flex;
    align-items: center;
    img {
      width: 14px;
      height: 14px;
      margin-left: 10px;
      object-fit: contain;
    }
  }
  .date {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 17px;
    margin-top: 5px;
  }
}
.home .nav-wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  padding: 15px;
  background-color: #fff;
  margin-top: -15px;
  .book-btn {
    margin: 5px;
    width: 100%;
    border-radius: 5px;
  }
}
.home .nav-wrapper .nav-item {
  position: relative;
  width: 30%;
  height: 60px;
  background-size: cover;
  background-repeat: no-repeat;
  box-sizing: border-box;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  background-image: url("./wode.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 5px;
  text-align: center;
  .icon {
    width: 58px;
    height: 20px;
    position: absolute;
    top: 50%;
    margin-top: -10px;
    left: 50%;
    margin-left: -29px;
  }
}
.home .nav-wrapper .nav-item:nth-child(2) {
  background-image: url("./xiadan.png");
}
.home .nav-wrapper .nav-item:nth-child(3) {
  background-image: url("./send.png");
}

.questionnaire-popup {
  position: fixed;
  left: 0.3rem;
  right: 0.3rem;
  top: 1.3rem;
  z-index: 110;
  padding-bottom: 0.86rem;
  background: #fff;
  border-radius: 0.22rem;
}
.questionnaire-popup .top-img {
  display: block;
  width: 100%;
}
.questionnaire-popup .close {
  position: absolute;
  right: -0.1rem;
  top: -0.94rem;
  display: block;
  padding: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
}
.questionnaire-popup .name {
  margin-top: 0.59rem;
  line-height: 0.38rem;
  text-align: center;
  font-size: 0.3rem;
  color: #222222;
}
.questionnaire-popup .to-questionnaire {
  margin: 0.81rem auto 0;
  width: 3.6rem;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  background: rgba(0, 0, 0, 0);
}
.orderNum-ct {
  img {
    display: block;
    width: 100%;
  }
}
.msg-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20/54rem;
  .msg-ct {
    box-shadow: 0 0 5px #dddddd;
    border-radius: 5px;
    width: 48%;
    height: 100/75rem;

    display: flex;

    align-items: center;
    box-sizing: border-box;
    padding: 0 14/54rem;
    .img-ct {
      width: 46/54rem;
      height: 46/54rem;
      display: block;
      margin-right: 10/54rem;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .title-ct {
      line-height: 100/75rem;
    }
  }
}

.orderNum-ct-top {
  background: #fff;
  border-radius: 5px;
  margin: 10px 10px 0;
}
.orderNum-ct-top .title {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  padding: 16px 20px 10px;
  border-bottom: 1px solid #f0f0f0;
}
.orderNum-ct-top ul {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.orderNum-ct-top ul li {
  text-align: center;
  padding: 17px 0 15px;
}
.orderNum-ct-top ul li p {
  margin: 0;
}
.orderNum-ct-top ul li p:first-child {
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
.orderNum-ct-top ul li p:last-child {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
}

.echart-title {
  display: flex;
  justify-content: space-between;
}

.echart-title ul {
  display: flex;
  align-items: center;
}
.echart-title ul li {
  font-size: 0.3rem;
  padding: 2px 12px;
  font-weight: bold;
  height: 0.35rem;
  line-height: 0.35rem;
}
.echart-title ul li.on {
  background: #58b6ff;
  color: #fff;
  border-radius: 0.24rem;
}
</style>
