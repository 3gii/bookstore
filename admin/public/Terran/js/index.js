$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    var pageIndex=1,
        moreDataFlag=true;
    getOrders(pageIndex);

    /*
    * 获取数据 分页
    * params:
    * pageIndex - {int} 分页下表  1开始
    */

    function getOrders(pageIndex){
        var params={
            url:'order/paginate',
            data:{page:pageIndex,size:20},
            tokenFlag:true,
            sCallback:function(res) {
                var str = getOrderHtmlStr(res);
                $('#order-table').append(str);

            }
        };
        window.base.getData(params);
    }

    /*拼接html字符串*/
    function getOrderHtmlStr(res){
        var data = res.data;
        if (data){
            var len = data.length,
                str = '', item;
            if(len>0) {
                for (var i = 0; i < len; i++) {
                    item = data[i];
                    str += '<tr class="snap_name" id='+item.id+'>' +
                        '<td>' + item.order_no + '</td>' +
                        '<td>' + item.snap_address.name + '</td>' +
                        '<td>' + item.snap_address.country+ item.snap_address.detail + '</td>' +
                        '<td>' + item.snap_address.mobile + '</td>' +
                        '<td>' + item.leaving_message + '</td>' +
                        '<td>' + item.snap_name + '</td>' +
                        '<td>' + item.total_count + '</td>' +
                        '<td>￥' + item.total_price + '</td>' +
                        '<td>' + getOrderStatus(item.status) + '</td>' +
                        '<td>' + item.create_time + '</td>' +
                        '<td data-id="' + item.id + '">' + getBtns(item.status) + '</td>' +
                        '</tr>';
                }
            }
            else{
                ctrlLoadMoreBtn();
                moreDataFlag=false;
            }
            return str;
        }
        return '';
    }

    function getProducts(id,obj){
                var params={
                    url:'order/'+id,
                    tokenFlag:true,
                    sCallback:function(data) {
                        var item=data.snap_items
                        var del="del"+id;
                        var str1='<tr class='+del+'>';
                        var str2='<tr class='+del+'>';
                        var str='';
                        for (var i = 0;i<item.length ;  i++) {
                            if(i>0 && i%10==0){
                                if(i!=item.length-1){
                                    str1+='</tr>'+str2+'</tr><tr class='+del+'>';
                                    str2='<tr class='+del+'>';
                                }
                                else{
                                    str1+='</tr>'+str2+'</tr><tr class='+del+'>';
                                    str2='';
                                }
                                
                                
                            }
                            str1+="<td>"+item[i].name+"</td>"
                            str2+="<td>"+item[i].counts+"个</td>"
                            
                        }
                        $(obj).after(str1+str2+"</tr>");
                        $('.'+del).css('color','red');
                    }
                }
                window.base.getData(params);
    }
    /*根据订单状态获得标志*/
    function getOrderStatus(status){
        var arr=[{
            cName:'unpay',
            txt:'未付款'
        },{
            cName:'payed',
            txt:'已付款'
        },{
            cName:'done',
            txt:'已发货'
        },{
            cName:'unstock',
            txt:'缺货'
        }];
        return '<span class="order-status-txt '+arr[status-1].cName+'">'+arr[status-1].txt+'</span>';
    }

    /*根据订单状态获得 操作按钮*/
    function getBtns(status){
        var arr=[{
            cName:'done',
            txt:'发货'
        },{
            cName:'unstock',
            txt:'缺货'
        }];
        if(status==2 || status==4){
            var index=0;
            if(status==4){
                index=1;
            }
            return '<span class="order-btn '+arr[index].cName+'">'+arr[index].txt+'</span>';
        }else{
            return '';
        }
    }

    /*控制加载更多按钮的显示*/
    function ctrlLoadMoreBtn(){
        if(moreDataFlag) {
            $('.load-more').hide().next().show();
        }
    }

    /*加载更多*/
    $(document).on('click','.load-more',function(){
        if(moreDataFlag) {
            pageIndex++;
            getOrders(pageIndex);
        }
    });
    /*发货*/
    $(document).on('click','.order-btn.done',function(){
        var $this=$(this),
            $td=$this.closest('td'),
            $tr=$this.closest('tr'),
            id=$td.attr('data-id'),
            $tips=$('.global-tips'),
            $p=$tips.find('p');
        var params={
            url:'order/delivery',
            type:'put',
            data:{id:id},
            tokenFlag:true,
            sCallback:function(res) {
                if(res.code.toString().indexOf('2')==0){
                   $tr.find('.order-status-txt')
                       .removeClass('pay').addClass('done')
                       .text('已发货');
                    $this.remove();
                    $p.text('操作成功');
                }else{
                    $p.text('操作失败');
                }
                $tips.show().delay(1500).hide(0);
            },
            eCallback:function(){
                $p.text('操作失败');
                $tips.show().delay(1500).hide(0);
            }
        };
        window.base.getData(params);
    });

    /*退出*/
    $(document).on('click','#login-out',function(){
        window.base.deleteLocalStorage('token');
        top.location.href = 'login.html';
    });
    /*获取商品详情*/
    $(document).on('click','.snap_name',function(){
        var id=this.id;
        $(this).removeClass("snap_name");
        $(this).addClass("show");
        getProducts(id,this);
    })
    $(document).on('click','.show',function(){
        var id=this.id;
        $(".del"+id).remove();
        $(this).removeClass("show");
        $(this).addClass("snap_name");
    })
    $(document).on("dblclick",'.snap_name',function(){
        var id=this.id;
            var msg = "您真的确定要删除吗？\n\n请确认！"; 
             if (confirm(msg)==true){ 
              var params={
                    url:'order/delete_order/'+id,
                    tokenFlag:true,
                    sCallback:function(data) {
                        if(data>0){
                            alert("删除成功");
                            window.location.reload();
                        }
                        else{
                             alert("删除失败");
                        }
                    }
                }; 
                window.base.getData(params);
             }else{ 
              return false; 
             } 
            });
    
});