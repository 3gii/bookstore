<?php

namespace app\api\model;

use think\Model;
use traits\model\SoftDelete;
use app\api\service\Image as ImageService;
class Category extends BaseModel
{
    public function products()
    {
        return $this->hasMany('Product', 'category_id', 'id');
    }

    public function img()
    {
        return $this->belongsTo('Image', 'topic_img_id', 'id');
    }

    public static function getCategories($ids)
    {
        $categories = self::with('products')
            ->with('products.img')
            ->select($ids);
        return $categories;
    }
    
    public static function getCategory($id)
    {
        $category = self::with('products')
            ->with('products.img')
            ->find($id);
        return $category;
    }
    public static function deleteCategory($id)
    {
        $img_id=self::get($id)->topic_img_id;
        $result=ImageService::deleteImage($img_id);
        if($result>0)
        {
            $result=self::destroy($id,true);
        }
        return $result;
    }
}
