// pages/order/index/index.js
var app = getApp(); 
var order = [0, 1, 2, 3, 4]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //购餐数量
    toView: 'B',
    A: 'A',
    scrollTop: 200,
    letter: ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    num:0,
    price:15.58,
    sum:0, 
    show:'',
    flag:true,
    shadeShow:"",
    colorNum:0,
    webSite: app.globalData.webSite, 
    arrInfo:[],
    allPrice:0,
    typeList:[],
    totalPrice:0,
    allNum:0,
    allCartNum:0,
    allDish:[],
    allNumber:0,
    allPrices:0,
  },
  //  点击美食分类改变背景色,相应内容置顶
  click: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var num = e.currentTarget.dataset.num;
    that.data.foodList.forEach(function (val, key) {
      console.log(val.id);
      if (id== val.id) {
        that.setData({
          toView: id,
         colorNum:num
          
        })
      }
    })
  },
  //计算总价，总数
  getTotalPrice() {
    var that=this;
    let total = 0;
    let numbers = 0;
    let foodList = that.data.foodList;  // 获取购物车列表
    console.log("8888888888");
    console.log(foodList);  
    foodList.forEach(function(val,key){
      if(val.child){
        val.child.forEach(function (val1, key1) {
          if (val.flag != 0) {
            total += val.child[key1].flag * val.child[key1].price;
            numbers += val.child[key1].flag;
          }
        })
      }
      
    })            
    that.setData({                                // 最后赋值到data中渲染到页面
      foodList: foodList,
      totalPrice: total.toFixed(2),
      allNum: numbers
    });
    wx.setStorage({
      key: 'price',
      data: total,
    })
  },
  //点击添加购餐数量
  add: function (e) {
    var that = this;
    var foodList = that.data.foodList;
    var allDish=that.data.allDish;//所有菜品
   
   // console.log(foodList);
    var id = e.currentTarget.dataset.id;
   // console.log(id);
   console.log("添加按钮");
   console.log(that.data.foodList);
    foodList.forEach(function(val,key){
      console.log("点击添加");
      console.log(val);
      if(val.child){
        val.child.forEach(function (val1, key1) {
          if (val1.dish_id == id) {

            let num = val.child[key1].flag;
            num = num + 1;
            val.child[key1].flag = num;
            val.child[key1].total = num * val.child[key1].price;
          }
        })
      }
      
     
    })
   
    that.setData({
      foodList: foodList,
    });
   
     that.getTotalPrice();
     
    wx.setStorage({
      key: 'typeList',
      data:  { typeList: that.data.foodList },
    })   
  },
  //点击减少购餐数量
  reduce: function (e) {
    var that = this;
    var foodList = that.data.foodList;
    var allDish = that.data.allDish;//所有菜品
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    foodList.forEach(function (val, key) {
      if (val.child){
        val.child.forEach(function (val1, key1) {
          if (val1.dish_id == id) {
            let num = val.child[key1].flag;
            if (num <= 0) {
              return false;
            }
            num = num - 1;
            val.child[key1].flag = num;

            val.child[key1].total = val.child[key1].total - val.child[key1].price;
          }
        })
      }
      
    }) 
    that.setData({
      foodList: foodList,
    });
    that.getTotalPrice();
    wx.setStorage({
      key: 'typeList',
      data: { typeList: that.data.foodList},
     })   
  },
 //点击购物车显示具体购物信息
 bindImg:function(){
   var that = this;
   var _flag = that.data.flag;
   if(_flag){
     that.setData({
       show: "show",
       flag:false,
       shadeShow:'shadeShow'
     })
   }
   if(!_flag){
     that.setData({
       show: "",
       flag:true,
       shadeShow: ''
     })
   }  
 },


//点击结算按钮
account:function(e){
  wx.navigateTo({
    url: '/pages/order/addOrder/index',
  })
},
//点击cart消失
hidCart:function(){
  var that = this;
  var _flag = that.data.flag;
  if (_flag) {
    that.setData({
      show: "show",
      flag: false,
      shadeShow: 'shadeShow'
    })
  }
  if (!_flag) {
    that.setData({
      show: "",
      flag: true,
      shadeShow: ''
    })
  }
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    //获取屏幕信息
    wx.getSystemInfo({
      success: function(res) {
       that.setData({
         height:res.windowHeight,
         width:res.windowWidth,
       })
      },
    })
    //请求接口
    var id = options.id;
   that.setData({
     logoImg: options.img,
     store_name:options.name
   })
    //var typeList=[];
    wx.request({
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'get',
      url: app.globalData.webSite + '/weixin.php/wechat/getdish/id/3',
      data:{
          id:id,
      },
      success:function(res){
        var typeList=[];
        var list=[];
        
       res.data.forEach(function(val,key){
          typeList.push(val.category_name);
          list.push(val);
        })
       list.forEach(function (val, key) {
         list[key]['id'] = 'A' + val.id
       });
        //   list.push(ff);
        console.log(list);
         that.setData({
           foodList:list,
           name:res.data[0].category_name
           //typeList:typeList
         })
         
      },
    })
    
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