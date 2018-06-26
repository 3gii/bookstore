<?php


namespace app\api\controller\v1;
use app\api\model\Message as MessModel;
use app\api\model\User as UserModel;
use app\api\controller\BaseController;
use app\api\service\Token;

/**
* 
*/
class Mess extends BaseController
{
	
	function getMessage($num=3)
	{
		$mess=new MessModel();
		if($num<4)
		{
			$mess=$mess->limit($num)
    	    ->order('id', 'desc')
    	    ->column('message');
		}
    	else{

    		$mess=$mess->limit($num)
    	    ->order('id', 'desc')
    	    ->select();
    	}
    	return $mess;
	}
	function addMessage()
	{

		$message=input('post.message');

		if($message)
		{
			$user=new UserModel();
			$result=$user->update(['status'=>1]);
			if($result)
			$mess=new MessModel();
			$mess=$mess->save(['message'=>$message]);
			if($mess>0)
			{
				return true;
			}
			
		}
		return false;
	}
	function deleteMessage($id)
	{
		return MessModel::destroy($id,true);
	}
}