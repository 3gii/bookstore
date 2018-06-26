$(function(){
    if(!window.base.getLocalStorage('token')){
        window.location.href = 'login.html';
    }
    getMessage()
    function getMessage()
    {
            var params={
            url:'mess/get_message',
            tokenFlag:true,
            data:{
                num:10
            },
            sCallback:function(data) {
                var str='';
                for(var i=0;i<data.length;i++)
                {
                    str+='<tr class="center del" data-id='+data[i].id+'><td colspan=2>'+data[i].message+'</td></tr>'
                }
                $('.message').append(str)
            }
        }
        window.base.getData(params);
    }
    $(document).on("click",'.tdBtn',function(){
    
        $("#formToUpdate").ajaxSubmit({
          type:'post',
          url:'http://3kg.org/api/v1/mess/add_message',
          success:function(data){
            if(data)
            {
                tip('发布成功',true);
                $('.mess').val("")

            }else{
                tip('发布失败');
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
                window.location.href = 'add_message.html';
            },1000) 
    }
   $(document).on("click",'.del',function(){
        var $td=$(this);
        var id=$td.attr('data-id');
            var msg = "您真的确定要删除吗？\n\n请确认！"; 
             if (confirm(msg)==true){ 
              var params={
                    url:'mess/delete_message/'+id,
                    type:'delete',
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
})