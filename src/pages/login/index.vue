<template>
  <!-- 登录 -->
  <div class="login">
    <div class="login-logo">
      <img src="@/assets/defaultLogo.png" alt="logo" />
    </div>
    <!--} -->
    <!-- {{takerType ===1?"订餐员his":"订餐员非his"}} -->
    <div class="titleLog">订餐员端</div>
    <div class="login-container">
      <template>
        <template>
          <div class="info">
            <div class="operator">
              <span>账号</span>
              <input
                type="text"
                name
                @blur="blurF"
                placeholder="请输入账号"
                v-model="mobile"
                class="login-input tel"
              />
            </div>
          </div>
          <div class="info">
            <div class="operator">
              <span>密码</span>
              <input
                type="password"
                @blur="blurF"
                name
                placeholder="请输入密码"
                v-model="password"
                class="login-input passw"
              />
            </div>
          </div>
          <div class="forget-password">
            <div class="btn">
              <van-checkbox
                style="margin-right: 10px"
                v-model="remember"
                icon-size="14px"
                shape="square"
                >记住密码</van-checkbox
              >
            </div>
            <div class="btn" @click="forgetPassword()">忘记密码？</div>
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
        </template>
        <div class="sendBox">
          <div
            class="tabLoginItem"
            @click="tabLoginType"
            v-if="isShowTab && type == 2"
          >
            账号登录
            <img style="margin-left: 5px" src="./arrow-right.png" alt />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import SendCode from "@/components/SendCode";
let Base64 = require("js-base64").Base64;
import { validatemobile } from "@/common/js/util";
import { companyListByQo } from "@/api/home";
export default {
  components: {
    SendCode,
  },
  data() {
    return {
      takerType: takerType,
      remember: false,
      mobile: Cookies.get("mobile") ? Cookies.get("mobile") : "",
      password: "",
      message: "",
      type: 1,
      isShowTab: true,
    };
  },
  computed: {
    disabled() {
      return !this.mobile || !this.password;
    },
    scrollHeight() {
      return document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
  },
  created() {},
  activated() {},
  methods: {
    forgetPassword() {
      this.$router.push({
        path: "/forgetPassword",
        query: { username: this.mobile },
      });
    },

    tabLoginType() {
      if (this.type === 1) {
        this.type = 2;
      } else if (this.type === 2) {
        this.type = 1;
      } else {
        this.type = 1;
      }
    },
    blurF() {
      window.scrollTo(0, Math.max(this.scrollHeight - 1, 0));
    },
    login() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.forget-password {
  padding: 5px 20px 0;
  font-size: 0;
  text-align: right;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.forget-password .checkbox {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  border: 1px solid rgba(153, 153, 153, 1);
}
.forget-password .btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.tabLoginItem {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 153, 255, 1);
  line-height: 20px;
}
.tabLoginItem img {
  display: block;
  width: 6px;
  height: 12px;
}
.login {
  /* position: fixed; */
  width: 100%;
  min-height: 100%;
}

.login .login-logo {
  margin-top: 60px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.login .login-logo > img {
  width: 60px;
  height: 60px;
}
.login .titleLog {
  text-align: center;
  color: #333;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 40px;
}
.info {
  width: 100%;
  padding: 0 20px 20px;
  box-sizing: border-box;
}
.operator {
  display: flex;
  align-items: center;

  border-bottom: 1px solid #e8e8e8;
}
.operator > span {
  font-size: 16px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.operator .login-input {
  display: block;
  flex: 1;
  box-sizing: border-box;
  font-size: 14px;
  line-height: 22px;
  color: #333;
  padding: 15px 0 15px 50px;
}

.login .login-btn {
  margin: 0 auto;
  margin-top: 20px;
  width: 100%;
  border-radius: 5px;
}
.sendBox {
}
</style>
