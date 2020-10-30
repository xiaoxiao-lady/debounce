<template>
  <!-- 修改密码 -->
  <div class="receiving-information change-password">
    <div class="info">
      <div class="input-wrapper border-bottom" style="margin-top: 0.18rem">
        <div class="title">手机号</div>
        <input
          type="text"
          v-model="mobile"
          placeholder="请输入手机号"
          class="input-tag"
        />
      </div>
    </div>
    <div class="info">
      <div class="input-wrapper yan border-bottom">
        <div class="title">验证码</div>
        <input
          type="text"
          name
          placeholder="请输入验证码"
          minlength="4"
          v-model="yzm"
          class="input-tag"
        />
        <button
          type="button"
          :disabled="currentTime > 0"
          class="send"
          @click="cutDown"
        >
          {{ currentTime > 0 ? currentTime + "s重新发送" : "获取验证码" }}
        </button>
      </div>
    </div>
    <div class="info">
      <van-button
        class="login-btn"
        :disabled="disabled"
        @click="login"
        type="info"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { validatemobile } from "@/common/js/util";
import { sendCode, updatePassword } from "@/api/user";
export default {
  props: ["type"],
  data() {
    return {
      timer: null,
      mobile: "",
      newPassword: "",
      yzm: "",
      currentTime: 0,
      canClick: true,
      loading: false,
    };
  },
  computed: {
    disabled() {
      return !this.mobile || !this.yzm;
    },
  },
  created() {
    let nowTime = new Date().getTime();
    let lastTime = localStorage.getItem("loginTimer");
    if (lastTime) {
      let time = parseInt((lastTime - nowTime) / 1000);
      if (time > 0) {
        this.setTimeGo(time);
      }
    }
  },
  methods: {
    login() {
      this.$emit("login");
    },
    setTimeGo(time) {
      this.currentTime = time;
      localStorage.setItem("loginTimer", new Date().getTime() + time * 1000);
      this.timer = setInterval(() => {
        this.currentTime--;
        if (this.currentTime <= 0) {
          this.currentTime = 0;
          clearInterval(this.timer);
        }
      }, 1000);
    },
    // // 短信验证码
    // cutDown() {
    //   if (
    //     !validatemobile(this.mobile, this) ||
    //     this.loading ||
    //     this.currentTime > 0
    //   ) {
    //     return;
    //   }
    //   this.loading = true;
    //   this.$axios({
    //     url: this.GLOBAL.BASE_URL + "/front/validateCode/send",
    //     method: "post",
    //     headers: {
    //       canteenId: this.$store.state.canteenId,
    //       token: this.$store.state.token,
    //     },
    //     data: this.$qs.stringify({
    //       type: this.type,
    //       mobile: this.mobile,
    //     }),
    //   })
    //     .then((respanse) => {
    //       this.loading = false;
    //       if (respanse.data.code !== 0) {
    //         this.$layer.msg(respanse.data.message);
    //       } else {
    //         this.setTimeGo(60);
    //       }
    //     })
    //     .catch((error) => {
    //       this.loading = false;
    //       this.currentTime = 0;
    //       clearInterval(this.timer);
    //     });
    // },
    cutDown() {
      if (!validatemobile(this.mobile, this)) {
        return;
      }
      sendCode({
        type: 5,
        mobile: this.mobile,
        userType: 2,
      })
        .then((respanse) => {
          this.setTimeGo(60);
        })
        .catch((error) => {
          this.loading = false;
          this.currentTime = 0;
          clearInterval(this.timer);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.receiving-information .info {
  padding: 0 20px 20px;
  box-sizing: border-box;
  width: 100%;
}
.receiving-information .input-wrapper {
  position: relative;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  padding: 15px 0;
  /* padding-left: 0.4rem; */
  background-color: #fff;
}
.receiving-information .input-wrapper .title {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.receiving-information .input-tag {
  -webkit-flex: 1;
  flex: 1;
  padding: 0 20px 0 50px;
  width: 100%;
  line-height: 22px;
  font-size: 14px;
  color: #656565;
}
.receiving-information .confirm {
  margin: 0.82rem auto 0;
  width: 93.3%;
}
.receiving-information .input-wrapper.yan .send {
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  border: 1px solid rgba(51, 153, 255, 1);
  padding: 5px 15px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 153, 255, 1);
  line-height: 17px;
}
.receiving-information .input-wrapper.yan .send[disabled] {
  background-color: #f6f6f6;
  border-color: #f6f6f6;
  color: #d4d4d4;
}
.login-btn {
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
}
</style>
