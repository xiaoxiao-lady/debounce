/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export function urlParse() {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  //  ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  return obj
}

// 获取url参数
export function getUrlParam(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
}

// 密码必须为长度不小于6位且必须包含数字和大小写字母
export function checkPassWord(password) {
  var str = password;
  if (str == null || str.length < 6) {
    return false;
  } else {
    return true;
  }
  // var reg = new RegExp(/^[0-9a-zA-Z]+$/);
  // if (!reg.test(str)) {
  //   return false;
  // }
  // var reg1 = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/);
  // return reg1.test(str);
}

//  校验手机号码
export function validatemobile(mobile, _this) {
  if (mobile.length === 0) {
    _this.$layer.msg('请输入手机号！')
    return false
  }
  if (mobile.length !== 11) {
    _this.$layer.msg('手机号长度有误！')
    return false
  }
  // var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/
  // if (!myreg.test(mobile)) {
  //   _this.$layer.msg('手机号有误！')
  //   return false
  // }
  return true
}
