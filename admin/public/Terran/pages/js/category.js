$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    var id = getQueryString('id');
    if(id!=null)
    {
        getCategory(id);
    }
    getCategorys()
    function getCategory(id)
    {
        var params={
            url:'category/'+id,
            tokenFlag:true,
            sCallback:function(data) {
                $('.name').attr('value',data.name);
                $('.desc').attr('value',data.description);
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
    function getCategorys()
    {
    	var params={
            url:'category/all',
            tokenFlag:true,
            sCallback:function(data) {
       
                var str='',item;
                for(var i=0 ; i<data.length;i++)
                {
                    item=data[i];
                    str+='<tr><td class="center"><a href="edit_category.html?id='+item.id+'">'+item.id+'</td>'+
                    '<td class="center">'+item.name+'</td>'+
                    '<td class="center">'+item.description+'</td>'+
                    '<td class="center im"><img src="'+item.img.url+'"/></td></tr>'
                }
                $(".category").append(str);
            }
        }
        window.base.getData(params);
    }

    $(document).on("click",'.tdBtn',function(){
    
        $("#formToUpdate").ajaxSubmit({
          type:'post',
            data:{
                id:id
            },
          url:'http://3kg.org/api/v1/category/update_category',
          success:function(data){
            if(data>0)
            {
                tip('更新成功',true);
            }else{
                tip('更新失败，如果仅更新参数，保存即可，无需提交');
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
                window.location.href = 'product_category.html';
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
})