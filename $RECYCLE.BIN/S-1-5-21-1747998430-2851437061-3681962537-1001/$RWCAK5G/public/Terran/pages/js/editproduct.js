$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    var id = getQueryString('id');
    var proid=null;
  	if(id!=null)
  	{
  		getProduct(id);
  	}
	    getCategory()

	    
    function getProduct(id){

        var params={
            url:'product/get_products_id/?id='+id,
            tokenFlag:true,
            sCallback:function(data) {
                
            	proid=data.id
                $('.pro_name').val(data.name);
                $('.pro_price').val(data.price);
                $('.pro_stock').val(data.stock);
                $('.summary').val(data.summary);
                $('.pro_img').attr('src',data.main_img_url);
                getImgs(data.imgs);
                getProperties(data.properties);
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
    function getCategory()
    {
    	var params={
            url:'category/all',
            tokenFlag:true,
            sCallback:function(data) {
                var str='';
                for(var i=0;i<data.length;i++)
                {
                	str+='<option  value='+ data[i].id +'>'+data[i].name+'</option>'
                }
                $('.pro_sort').append(str);
               
            }
        }
        window.base.getData(params);
    }
    function getImgs(data){

    	var str='';
    	for(var i=0;i<data.length;i++)
    	{
    		
    		str+='<img class="del_img" data-id="'+data[i].id+'" src="'+data[i].img_url.url+'" width="80" height="80"/>';
    	}
    	$('.imgs').append(str);
    }
    function getProperties(data)
    {
    	
    	var str='';
    	for(var i=0;i<data.length;i++)
    	{
    		
    		str+='<a data-id='+ data[i].id +' class="textBox pp length-short"><span style="color:red;">'+data[i].name+'</span>:'+data[i].detail+'</a>'+' ';
     		
    	}
    	
    	$('.properties').append(str);
    }
    $(document).on('click','.pp',function(){
        var that = this
        var id=$(this).attr('data-id')
        var msg = "您真的确定要删除吗？\n\n请确认！"; 
         if (confirm(msg)==true){ 
          var params={
                url:'product/deleteProperty/'+id,
                tokenFlag:true,
                type:'delete',
                sCallback:function(data) {
                    
                    if(data>0){
                        alert("删除成功");
                        that.remove();
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
        

    })
    $(document).on('click','.addProperty',function(){
        var name=$("#pname").val()
        var detail=$("#pdetail").val()
        var params={
            url:'product/addProperty',
            type:'post',
            tokenFlag:true,
            data:{
                name:name,
                id:proid,
                detail:detail
            },
            sCallback:function(data) {
                if(data==0)
                {
                    tip('添加失败');
                }else{
                    
                    tip('添加成功');
                    var str='<a data-id='+ data +' class="textBox pp length-short"><span style="color:red;">'+name+'</span>:'+detail+'</a>'+' ';
                    $('.pnew').remove();
                    $('.properties').append(str);
                }
            }
        }
        window.base.getData(params);
    })
    $(".proimgs").change(function(){
         $("#formToUpdate").ajaxSubmit({
          type:'post',
          url:'http://3gii.applinzi.com/public/index.php/api/v1/product_image/add_image',
          data:{
            id:proid,
            },
          success:function(data){
            if(data==false)
            {
                tip('添加失败');
            }else{
                
                tip('添加成功');
                var str='<img class="del_img" data-id="'+data[1]+'" src="http://3gii.applinzi.com/public/index.php/images//'+data[0]+'" width="80" height="80"/>';
                $('.imgs').append(str);
            }
          },
          error:function(XmlHttpRequest,textStatus,errorThrown){
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        })
    })
    $(document).on("click",'.del_img',function(){
        var that=$(this);
        var id=that.attr('data-id');
        var msg = "您真的确定要删除吗？\n\n请确认！"; 
         if (confirm(msg)==true){ 
          var params={
                url:'product_image/delete_image/'+id,
                tokenFlag:true,
                type:'delete',
                sCallback:function(data) {
                    
                    if(data>0){
                        alert("删除成功");
                        that.remove();
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
    })
    $(document).on("click",'.addProperties',function(){
        var len=$('.properties').find('input').length;
        if(len<2)
        {
        	var str='<div class="pnew" style="margin-top:10px;"><span><input type="text" id="pname"  style="color:red;" value="参数" class="textBox length-short"/></span><input type="text" id="pdetail" value="参数值" class="textBox length-short"/>'+'<a class="addProperty" style="color:blue">保存</a></div> '
        	$('.properties').append(str);
        }
       	else{
       		alert("参数未保存");
       	}
    })
    $(document).on("click",'.tdBtn',function(){
    
        $("#formToUpdate").ajaxSubmit({
          type:'post',
            data:{
                id:proid
            },
          url:'http://3gii.applinzi.com/public/index.php/api/v1/product/update_product',
          success:function(data){
            if(data>0)
			{
				tip('更新成功',true);
			}else{
				tip('更新失败，如果仅更新参数，保存即可，无需提交');
			}
			console.log(data)
          },
          error:function(XmlHttpRequest,textStatus,errorThrown){
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
	})
    })
    function tip(str,r=false)
    {
    	var $tips=$('.global-tips'),
            $p=$tips.find('p');
            $p.text(str);
            $tips.show().delay(1500).hide(0);
            if(r)
            setTimeout(function(){
				window.location.href = 'product_list.html';
            },2000) 
    }
    $(".proimg").change(function(){
         $("#formToUpdate").ajaxSubmit({
          type:'post',
          url:'http://3gii.applinzi.com/public/index.php/api/v1/product/update_img',
          data:{
            id:proid
          },
          success:function(data){
            console.log(data)
            if(data==0)
            {
                tip('添加失败');
            }else{
                
                tip('添加成功');
                $('.pro_img').attr('src',"http://3gii.applinzi.com/public/index.php/images//"+data);
            }
          },
          error:function(XmlHttpRequest,textStatus,errorThrown){
            console.log(XmlHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
          }
        })
    })
})