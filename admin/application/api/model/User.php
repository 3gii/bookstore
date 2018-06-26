<?php

namespace app\api\model;

use think\Model;

class User extends BaseModel
{
    protected $autoWriteTimestamp = true;
//    protected $createTime = ;

    public function orders()
    {
        return $this->hasMany('Order', 'user_id', 'id');
    }

    public function address()
    {
        return $this->hasOne('UserAddress', 'user_id', 'id');
    }

    /**
     * 用户是否存在
     * 存在返回uid，不存在返回0
     */
    public static function getByOpenID($openid)
    {
        $user = User::where('openid', '=', $openid)
            ->find();
        return $user;
    }
    public static function setUserStatus($uid,$status)
    {
        $user = User::get($uid);
        $user->status=$status;
        $user->save();
        if($user)
        {
            return true;
        }else{
            return false;
        }
    }

}
