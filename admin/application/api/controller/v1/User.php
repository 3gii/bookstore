<?php
/**
 * Created by 七月.
 * Author: 七月
 * 微信公号：小楼昨夜又秋风
 * 知乎ID: 七月在夏天
 * Date: 2017/2/22
 * Time: 21:52
 */

namespace app\api\controller\v1;
use app\api\model\User as UserModel;
use app\api\controller\BaseController;
use app\api\service\Token;
class User extends BaseController
{
	
	public function setUserStatus(){
		
		$uid = Token::getCurrentUid();
		$result=UserModel::setUserStatus($uid,0);
		
		return $result;
	}
	public function getStatus()
	{
		$user=new UserModel();
		$uid = Token::getCurrentUid();
		return $user->get($uid)->status;
	}
	public function userInfo()
    {
    	$nickName=input("post.nickname");
    	$extend=input("post.extend");
    	if($extend && $nickName )
    	{
    		$uid = Token::getCurrentUid();
    		$user = new UserModel();
    		$user=$user->get($uid);
    		$user->nickname = $nickName;
    		$user->extend = $extend;
    		$result=$user->save();
    		return $result;
    	}
    	return '';
    	
        
    }
}