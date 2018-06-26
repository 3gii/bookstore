<?php

namespace app\api\model;

use think\Model;

class OrderProduct extends BaseModel
{
//    protected $autoWriteTimestamp = true;
	public static function getProductsByOrderId($id)
	{
		return self::where('order_id','=',$id)->column("product_id");
	}
}
