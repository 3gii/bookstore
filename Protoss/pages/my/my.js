import {Address} from '../../utils/address.js';
import {My} from '../my/my-model.js';

var address=new Address();
var my=new My();

Page({
    data: {
        pageIndex:1,
        isLoadedAll:false,
        loadingHidden:false,
        addressInfo:null,
        isMessage:true,
        message:[],
        show:true,
        down:"weui-cell__ft_in-access",
    },
    setting:function(){
        wx.openSetting({
          success: (res) => {
            /*
             * res.authSetting = {
             *   "scope.userInfo": true,
             *   "scope.userLocation": true
             * }
             */
          }
        })
    },
    getMessage:function(result){
      var that=this;
      if(result){
          my.getUserMessage((data)=>{
           
            if(data){
              that.setData({
                message:data,
              });
            }

          });
      }
    },
    getUserStatus:function(){

      var that=this;
          my.getStatus((data)=>{
            if(data>0){
              that.setData({
                isMessage:false,
              });
            }

          });
    },
    showMessage:function(){
      var that=this;
      var show=this.data.show;
      if(show){
        this.setData({
          show:false,
          down:"down"
        })
      }else{
        this.setData({
          show:true,
          down:"weui-cell__ft_in-access"
        })
      }
      if(!this.data.isMessage)
      {
        my.setUserStatus((data)=>{
            if(data){
              that.setData({
                isMessage:true,
              });
            }
          })
      }
      else{
        return
      }
    },
    onLoad:function(){
        this.setData({loadingHidden:true})
    },

    onShow:function(){
         var that=this;
        // my.getUserInfo((data)=>{
        //     that.setData({
        //         userInfo:data,
        //         loadingHidden:true
        //     });
            var result=wx.getStorageSync('token');
            if(result){
              that.getMessage(result);
              that.getUserStatus();
            }
        // });
    },

    /*修改或者添加地址信息*/
    editAddress:function(){
        var that=this;
        wx.chooseAddress({
            success: function (res) {
                var addressInfo = {
                    name:res.userName,
                    mobile:res.telNumber,
                    totalDetail:address.setAddressInfo(res)
                };
                if(res.telNumber) {
                    //保存地址
                    address.submitAddress(res, (flag)=> {
                        if (!flag) {
                            that.showTips('操作提示', '地址信息更新失败！');
                        }
                    });
                }
                //模拟器上使用
                else{
                    that.showTips('操作提示', '地址信息更新失败,手机号码信息为空！');
                }
            }
        })
    },
    help:function(){
      wx.navigateTo({
        url: '../about/about'
      });
        },
    toorder:function(){
      wx.navigateTo({
        url: '../order_m/order_m'
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
     onHide: function () {
        
        this.setData({
          show: true,
          down:"weui-cell__ft_in-access"
        })
    },
    

})