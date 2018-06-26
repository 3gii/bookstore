<?php
namespace app\api\service;

use app\api\model\ProductProperty as ProductPropertyModel;

class ProductProperty extends ProductPropertyModel
{
    public static function addProductProperty($arr)
    {
    	$ProductProperty=new ProductProperty();
    	$result=$ProductProperty->saveAll($arr);
    	return $result;
    }
}