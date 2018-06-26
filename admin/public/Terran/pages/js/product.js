$(function(){
    if(!window.base.getLocalStorage('token')){
        top.location.href = 'login.html';
    }
    var pageIndex=1,
        moreDataFlag=true;
    getproducts(pageIndex);
    function getproducts(pageIndex){
        var params={
            url:'product/get_products',
            data:{page:pageIndex,size:20},
            tokenFlag:true,
            sCallback:function(res) {
               
             
                var str = getProductsHtmlStr(res);
                $('#product-table').append(str);

            }
        };
        window.base.getData(params);
    }
        /*拼接html字符串*/
    function getProductsHtmlStr(res){
        var data = res.data;
        if (data){
            var len = data.length,
                str = '', item,st,items;
            if(len>0) {
                for (var i = 0; i < len; i++) {
                    item = data[i];
                    
                    str += '<tr>' +
                        '<td><span><i>'+item.id+'</i></span></td>'+
                        '<td class="centerc thumbnail pic-area"><img src="'+ item.main_img_url +'" class="thumbnail"/></td>'+
                        '<td class="td-name"><span>'+item.name+'</span></td>'+
                        '<td class="center"><span><i>￥</i><em>'+item.price+'</em></span></td>'+
                        '<td class="center"><span><em>'+item.stock+'</em><i>件</i></span></td>'+
                        '<td class="center"><span><em>'+item.summary+'</em></span></td>'+
                        '<td class="center"><span><em>'+getCategory(item.category)+'</em></span></td>'+
                        '<td class="center">'+getProperties(item.properties)+'</td>'+
                        '<td class="center pic-area">'+getImages(item.imgs)+'</td>'+
                        '<td class="center">'+item.supplier+'</td>'+
                    	'<td class="center"><a href="edit_product.html?id='+item.id+'" title="编辑"><img src="images/icon_edit.gif"/></a><a  data-id="'+item.id+'" title="删除" class="delpro"><img src="images/icon_drop.gif"/></a></td></tr>';
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
    function getCategory(item)
    {
    	if(item!=null)
    	{
    		return item.name;
    	}
    	else{
    		return "没有分类";
    	}
    }
    function getProperties(item)
    {
    	
    	var items,str='';
    	var len=item.length
    	if(len>0){
    		for(var j=0;j<len;j++)
	        {
	        	items = item[j];
	         	str+='<span><em>'+items.name+':'+items.detail+'</em></span><br/>'
	    	}

	    	return str;
    	}else{
    		return "没有参数";
    	}
    	
    }
    function getImages(item)
    {

    	var items,str='';
    	var len=item.length
        try{
    	if(len>0){
    		for(var k=0;k<item.length;k++)
	    	{
	    		 items=item[k];
	    		 str+='<img src="'+ items.img_url.url +'" class="thumbnail"/><hr/>'
	    	}
	    	return str;
    	}
    	else{
    		return "没有介绍";
    	}
        }
        catch(res){

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
            getproducts(pageIndex);
        }
    });    
    $(document).on('click','.delpro',function(){
        var $td=$(this);
        var id=$td.attr('data-id');
            var msg = "您真的确定要删除吗？\n\n请确认！"; 
             if (confirm(msg)==true){ 
              var params={
                    url:'product/'+id,
                    tokenFlag:true,
                    type:'delete',
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

})