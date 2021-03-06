//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        wx.request({
          url: that.globalData.webSite+'/weixin.php/wechat/getOPenid', //仅为示例，并非真实的接口地址
          data: {
            errMsg: res.errMsg,
            code: res.code,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: "POST",
          success: function (res) {
            if (res.data.code == 0) {
              wx.setStorageSync("weixin_user_id", res.data.weixin_user_id);
            }
          }
        })// 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },  
  globalData: {
    appid: ' wxbd656d12592b4e0c',
    userInfo: null,
    openId: '',
    loginStatus: false,
    webSite: 'https://www.ynmshzj.com/'
  }
})