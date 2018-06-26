<?php

namespace app\api\model;

use think\Model;

class Product extends BaseModel
{
    protected $autoWriteTimestamp = 'datetime';
    protected $hidden = [
        'delete_time', 'main_img_id', 'pivot', 'from', 'category_id',
        'create_time', 'update_time'];

    /**
     * 图片属性
     */
    public function imgs()
    {
        return $this->hasMany('ProductImage', 'product_id', 'id');
    }

    public function getMainImgUrlAttr($value, $data)
    {
        return $this->prefixImgUrl($value, $data);
    }

    public function category()
    {
        return $this->belongsTo('Category','category_id','id');
    }

    public function properties()
    {
        return $this->hasMany('ProductProperty', 'product_id', 'id');
    }

    /**
     * 获取某分类下商品
     * @param $categoryID
     * @param int $page
     * @param int $size
     * @param bool $paginate
     * @return \think\Paginator
     */
    public static function getProductsByCategoryID(
        $categoryID, $paginate = true, $page = 1, $size = 30)
    {
        $query = self::
        where('category_id', '=', $categoryID);
        if (!$paginate)
        {
            return $query->select();
        }
        else
        {
            // paginate 第二参数true表示采用简洁模式，简洁模式不需要查询记录总数
            return $query->paginate(
                $size, true, [
                'page' => $page
            ]);
        }
    }

    /**
     * 获取商品详情
     * @param $id
     * @return null | Product
     */
    public static function getProductDetail($id)
    {
        //千万不能在with中加空格,否则你会崩溃的
        //        $product = self::with(['imgs' => function($query){
        //               $query->order('index','asc');
        //            }])
        //            ->with('properties,imgs.imgUrl')
        //            ->find($id);
        //        return $product;

        $product = self::with(
            [
                'imgs' => function ($query)
                {
                    $query->with(['imgUrl'])
                        ->order('order', 'asc');
                }])
            ->with('properties')
            ->find($id);
        return $product;
    }

    public static function getMostRecent($count)
    {
        $products = self::limit($count)
            ->order('create_time desc')
            ->select();
        return $products;
    }

    /*
     * 获取模糊数据
     */
    public static function getProductName($name)
    {
        $products = self::limit(10)
        ->where('name', 'like', $name)
        ->select();
        return $products;
    }
    public static function addProduct($id,$arr,$ids)
    {
        $product=Product::find($id);
        $result=$product->properties()->saveAll($arr);
        foreach ($ids as $key => $value) {
            # code...
            $array[]['img_id']=$value;
        }
        $result=$product->imgs()->saveAll($array);
        if($result) return true;
        else return false;
    }
    public static function getProductsByPage($page=1, $size=20){
        $pagingData = self::order('create_time desc')
            ->with('properties')
            ->with('category')
            ->with(
            [
                'imgs' => function ($query)
                {
                    $query->with(['imgUrl'])
                        ->order('order', 'asc');
                }])
            ->paginate($size, true, ['page' => $page]);
        return $pagingData;
    }
    public static function getProductsById($id){
        $pagingData = self::with('category')
            ->with('properties')
            ->with(
            [
                'imgs' => function ($query)
                {
                    $query->with(['imgUrl'])
                        ->order('order', 'asc');
                }])
            ->where('id',$id)
            ->select();
        return $pagingData ;
    }
}
