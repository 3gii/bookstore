$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    var id = getQueryString('id');
    getProducts(id);
    function getProducts(id){

                var params={
                    url:'order/'+id,
                    tokenFlag:true,
                    sCallback:function(data) {
                        var item=data.snap_items
                  
                        $('.order_no').html("订单编号:"+data.order_no);
                        $('.address').html(data.snap_address.city+data.snap_address.country+data.snap_address.detail);
                        $('.name').html(data.snap_address.name);
                        $('.time').html(data.create_time);
                        $('.mobile').html(data.snap_address.mobile);
                        $('.leaving').html(data.leaving_message);
                        $('.sum').html(data.total_price);
                        if(data.status==3)
                        {
                            $('.status').html("已发货");
                        }else if(data.status==2){
                            $('.status').html("已付款");
                        }
                        else{
                            $('.status').html("未付款");
                        }
                        var str='';
                        for(var i=0;i<item.length;i++)
                        {
                        str+='<tr  class="center">'+
                          '<td><img style="width:50px; height:50px" src="'+item[i].main_img_url+'" class="thumbnail"/></td>'+
                          '<td>'+item[i].name+'</td>'+
                          '<td><span><i>￥</i><em>'+item[i].price+'</em></span></td>'+
                          '<td>'+item[i].counts+'</td>'+
                          '<td><span><i>￥</i><em>'+item[i].totalPrice+'</em></span></td>'+
                          '<td><span><em>'+item[i].supplier+'</em></span></td>'+
                          '</tr>'
                        }
                        $('#product').append(str);
                       
                    }
                }
                window.base.getData(params);
    }
    function getQueryString(name){
        
        var reg=new RegExp('(^|&)'+name+'=([^&]*)(&|$)','i');
        var r=window.location.search.substr(1).match(reg);
        if(r!=null)
        {
            return unescape(r[2]);
        }
        else{
            return null;
        }
    }
    
     
})