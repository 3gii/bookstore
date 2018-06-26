import { Home } from 'home-model.js';
var home = new Home(); //实例化 首页 对象
Page({
    data: {
        loadingHidden: false,

        inputShowed: false,
        inputVal: "",
        inputName :'',
    },
    onLoad: function () {
        this._loadData();
    },

    /*加载所有数据*/
    _loadData:function(callback){
        var that = this;

        // 获得bannar信息
        home.getBannerData((data) => {
            that.setData({
                bannerArr: data,
            });
        });

        /*获取主题信息*/
        home.getThemeData((data) => {
            that.setData({
                themeArr: data,
                loadingHidden: true
            });
        });

        /*获取单品信息*/
        home.getProductorData((data) => {
            that.setData({
                productsArr: data
            });
            callback&&callback();
        });
    },

    /*跳转到商品详情*/
    onProductsItemTap: function (event) {
        var id = home.getDataSet(event, 'id');
        wx.navigateTo({
            url: '../product/product?id=' + id
        })
    },

    /*跳转到主题列表*/
    onThemesItemTap: function (event) {
        var id = home.getDataSet(event, 'id');
        var name = home.getDataSet(event, 'name');
        wx.navigateTo({
            url: '../theme/theme?id=' + id+'&name='+ name
        })
    },

    /*下拉刷新页面*/
    onPullDownRefresh: function(){
        this._loadData(()=>{
            wx.stopPullDownRefresh()
        });
    },

    //分享效果
    onShareAppMessage: function () {
        return {
            title: '校园街坊',
            path: 'pages/home/home'
        }
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearVal: function(e)
    {
        this.setData({
            inputName:e.detail.value,
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: "",
            inputName:"",
        });
    },
    inputTyping: function (e) {
        var name=e.detail.value;
        this.data.inputName=name;
        var that=this
        home.getProductorName(name,(data) => {
            that.setData({
                inputVal: data,
            });
        });
    }

})


