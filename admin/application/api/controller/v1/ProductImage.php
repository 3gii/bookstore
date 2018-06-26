<?php
namespace app\api\controller\v1;
use app\api\model\ProductImage as ProductImageModel;
use app\api\controller\BaseController;
use app\api\service\Image as ImageService;
class ProductImage extends BaseController
{
	
	function deleteImage($id)
	{
		
		return ProductImageModel::deleteProductImage($id);
	}
	function addImage()
	{
		$file=request()->file('images');
		$product_id=input('post.id');
		if($file)
		{
			$ids=ImageService::upload($file,true);
		}
		$url=array_pop($ids);
		if($ids)
		{
			$img=new ProductImageModel();
			$result=$img->save([
					'img_id' => $ids[0],
					'product_id' =>$product_id
				]);

			$id=$img->id;
			if($result>0)
			{
				return [$url,$id];
			}
		}
		return false;
	}
	
}
