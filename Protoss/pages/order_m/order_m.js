// pages/order_m/order_m.js
import {Order} from '../order/order-model.js';
var order=new Order();
Page({

  /**
   * 页面的初始数据
   */
  data: {
        pageIndex:1,
        isLoadedAll:false,
        loadingHidden:false,
        orderArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  _loadData:function(){
      this._getOrders();
      order.execSetStorageSync(false);  //更新标志位
  },
  /*订单信息*/
  
  _getOrders:function(callback){
      var that=this;
      order.getOrders(this.data.pageIndex,(res)=>{
          var data=res.data;
          that.setData({
              loadingHidden: true
          });
          if(data.length>0) {
              that.data.orderArr.push.apply(that.data.orderArr,res.data);  //数组合并
              that.setData({
                  orderArr: that.data.orderArr
              });
          }else{
              that.data.isLoadedAll=true;  //已经全部加载完毕
              that.data.pageIndex=1;

          }
          callback && callback();
      });
  },
  /*显示订单的具体信息*/
  showOrderDetailInfo:function(event){
      var id=order.getDataSet(event,'id');
      wx.navigateTo({
          url:'../order/order?from=order&id='+id
      });
  },
  /*未支付订单再次支付*/
  rePay:function(event){
      var id=order.getDataSet(event,'id'),
          index=order.getDataSet(event,'index');

      //online 上线实例，屏蔽支付功能
      if(order.onPay) {
          this._execPay(id,index);
      }else {
          this.showTips('支付提示','支付系统未开通，仅支持货到付款');
      }
  },

  /*支付*/
  _execPay:function(id,index){
      var that=this;
      order.execPay(id,(statusCode)=>{
          if(statusCode>0){
              var flag=statusCode==2;

              //更新订单显示状态
              if(flag){
                  that.data.orderArr[index].status=2;
                  that.setData({
                      orderArr: that.data.orderArr
                  });
              }

              //跳转到 成功页面
              wx.navigateTo({
                  url: '../pay-result/pay-result?id='+id+'&flag='+flag+'&from=my'
              });
          }else{
              that.showTips('支付失败','商品已下架或库存不足');
          }
      });
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function(){
      var that=this;
     // this.data.orderArr=[];  //订单初始化
      this.setData({
          'orderArr':[]
      })
      this._getOrders(()=>{
          that.data.isLoadedAll=false;  //是否加载完全
          that.data.pageIndex=1;
          wx.stopPullDownRefresh();
          order.execSetStorageSync(false);  //更新标志位
      });
              
          
  },


  /*
   * 提示窗口
   * params:
   * title - {string}标题
   * content - {string}内容
   * flag - {bool}是否跳转到 "我的页面"
   */
  showTips:function(title,content){
      wx.showModal({
          title: title,
          content: content,
          showCancel:false,
          success: function(res) {

          }
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
        //更新订单,相当自动下拉刷新,只有  非第一次打开 “我的”页面，且有新的订单时 才调用。
        var newOrderFlag=order.hasNewOrder();
        if(this.data.loadingHidden &&newOrderFlag){
            this.onPullDownRefresh();
        }
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
     if(!this.data.isLoadedAll) {
        this.data.pageIndex++;
        this._getOrders();
      }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})