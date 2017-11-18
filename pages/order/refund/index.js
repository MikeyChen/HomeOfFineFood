// pages/me/refund/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width: "300",
    height: "100",
    second: 3,
    className: 'model',
    on: 'on1', 
    refund_reason:''
  },
  bindInput:function(e){
    var value=e.detail.value;
    this.setData({
      refund_reason:value
    });
  },
  //申请退款
  refund: function () {
    var that = this;
    //var refund_reason=that.data.refund_reason;
 
    // wx.getStorage({
    //   key: 'sdkData',
    //   success: function (res) {
    //     console.log("订单参数");
    //     orderid = res.data.orderId;
    //     console.log(orderid);
    //   },
    // })
    console.log("申请退款订单编号");
    console.log(that.data.orderid);
     wx.request({
       header: {
         "Content-Type": "application/x-www-form-urlencoded"
       },
       method: 'POST',
       url: app.globalData.webSite + '/weixin.php/wechat/refound',
       data:{
         orderid:that.data.orderid,
        //  refund_reason:refund_reason
       },
       success:function(res){
         console.log("申请退款");
         console.log(res);
       var data=res.data;
         if(data.code == '200'){
           that.setData({
             className:'model1',
             on:'on',
           });
           var num = that.data.second;
           var timer = setInterval(function () {
             num--;
             that.setData({
               second: num
             });
             if (num == 0) {
               clearInterval(timer);
               wx.switchTab({
                 url: '/pages/me/index/index'
               });
             }
           }, 1000);
         }else{
         }
       },
      
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.setData({
      orderid:options.orderid
    })
    //console.log("申请支付订单id");
   
    var that=this;
    //获取设备信息
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth
        });
      },
    })
    var elementWidth = that.data.width;
    var windowWidth = that.data.windowWidth;
    var left = (windowWidth - elementWidth) / 2;
    that.setData({
      price: options.price,
      id: options.id,
      left: left
    });

   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})