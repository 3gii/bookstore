<?php
namespace app\api\controller\v1;
use app\api\validate\IDMustBePositiveInt;
use app\api\model\ProductProperty as ProductPropertyModel;
use app\api\controller\BaseController;

class ProductProperty extends BaseController
{
	
	function addProperty()
	{
		$id=input('post.id');
		$name=input('post.name');
		$detail=input('post.detail');
		$result=0;
		if($id && $name && $detail)
		{
			$property=new ProductPropertyModel();
			$result=$property->save([

				'product_id' => $id,
				'name' => $name,
				'detail' => $detail
			]);
			$result=$property->id;
		}
		return $result;
	}
	function deleteProductProperty($id)
	{
		$validate = new IDMustBePositiveInt();
        $validate->goCheck();
		return ProductPropertyModel::deleteProductProperty($id);
	}
}