$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    getCategory()
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


    $(document).on("click",'.addProperties',function(){
        //var $td=$(this);
        var len=$('.properties').find('input').length;
        if(len<10)
        {
        	var str='<span><input name="properties[]" type="text"  style="color:red;" value="参数" class="textBox length-short"/></span><input name="properties[]" type="text" value="参数值" class="textBox length-short"/>'+' '
        	$('.properties').append(str);
        }
       	else{
       		alert("不能超过五个参数");
       	}
        /*var id=$td.attr('data-id');
        properties.push({
     			'name' : data[i].name,
     			'detail' : data[i].detail
     		})*/
     	// var str=$('.properties').find('input')[1];

     	// console.log($(str).val())
    })
    $(document).on("click",'.tdBtn',function(){
    
        $("#formToUpdate").ajaxSubmit({
          type:'post',
          url:'http://3gii.applinzi.com/public/index.php/api/v1/product',
          success:function(data){
            if(data)
			{
				tip('添加成功',true);
			}else{
				tip('添加失败');
			}
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
            },1000) 
    }
    $("#suoluetu").change(function(){
         
            if($(this).val())
            {
                tip('添加成功');
            }else{
                
                tip('添加失败');
            }
         
      
    })
    $("#chanpinzhutu").change(function(){
         
            if($(this).val())
            {
                tip('添加成功');
            }else{
                
                tip('添加失败');
            }
         
      
    })
})