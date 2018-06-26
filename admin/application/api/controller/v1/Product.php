<?php


namespace app\api\controller\v1;

use app\api\model\Product as ProductModel; 
use app\api\model\OrderProduct;
use app\api\validate\Count;
use app\api\validate\IDMustBePositiveInt;
use app\api\validate\PagingParameter;
use app\lib\exception\ParameterException;
use app\lib\exception\ProductException;
use app\lib\exception\ThemeException;
use think\Controller;
use app\api\controller\BaseController;
use think\Exception;
use app\api\service\Image as ImageService;
class Product extends BaseController
{
    /*protected $beforeActionList = [
        'checkSuperScope' => ['only' => 'createOne,deleteOne']
    ];*/
    
   /**
     * 根据类目ID获取该类目下所有商品(分页）
     * @url /product?id=:category_id&page=:page&size=:page_size
     * @param int $id 商品id
     * @param int $page 分页页数（可选)
     * @param int $size 每页数目(可选)
     * @return array of Product
     * @throws ParameterException
     */
    public function getByCategory($id = -1, $page = 1, $size = 30)
    {
        (new IDMustBePositiveInt())->goCheck();
        (new PagingParameter())->goCheck();
        $pagingProducts = ProductModel::getProductsByCategoryID(
            $id, true, $page, $size);
        if ($pagingProducts->isEmpty())
        {
            // 对于分页最好不要抛出MissException，客户端并不好处理
            return [
                'current_page' => $pagingProducts->currentPage(),
                'data' => []
            ];
        }
        //数据集对象和普通的二维数组在使用上的一个最大的区别就是数据是否为空的判断，
        //二维数组的数据集判断数据为空直接使用empty
        //collection的判空使用 $collection->isEmpty()

        // 控制器很重的一个作用是修剪返回到客户端的结果

        //        $t = collection($products);
        //        $cutProducts = collection($products)
        //            ->visible(['id', 'name', 'img'])
        //            ->toArray();

//        $collection = collection($pagingProducts->items());
        $data = $pagingProducts
            ->hidden(['summary'])
            ->toArray();
        // 如果是简洁分页模式，直接序列化$pagingProducts这个Paginator对象会报错
        //        $pagingProducts->data = $data;
        return [
            'current_page' => $pagingProducts->currentPage(),
            'data' => $data
        ];
    }

    /**
     * 获取某分类下全部商品(不分页）
     * @url /product/all?id=:category_id
     * @param int $id 分类id号
     * @return \think\Paginator
     * @throws ThemeException
     */
    public function getAllInCategory($id = -1)
    {
        (new IDMustBePositiveInt())->goCheck();
        $products = ProductModel::getProductsByCategoryID(
            $id, false);
        if ($products->isEmpty())
        {
            throw new ThemeException();
        }
        $data = $products
            ->hidden(['summary'])
            ->toArray();
        return $data;
    }

    /**
     * 获取指定数量的最近商品
     * @url /product/recent?count=:count
     * @param int $count
     * @return mixed
     * @throws ParameterException
     */
    public function getRecent($count = 15)
    {
        (new Count())->goCheck();
        $products = ProductModel::getMostRecent($count);
        if ($products->isEmpty())
        {

        }
        $products = $products->hidden(
            [
                'summary'
            ])
            ->toArray();
        return $products;
    }

   /**
     * 获取商品详情
     * 如果商品详情信息很多，需要考虑分多个接口分布加载
     * @url /product/:id
     * @param int $id 商品id号
     * @return Product
     * @throws ProductException
     */
    public function getOne($id)
    {
        (new IDMustBePositiveInt())->goCheck();
        $product = ProductModel::getProductDetail($id);
        if (!$product)
        {
            throw new ProductException();
        }
        return $product;
    }

    public function createOne()
    {

        $name=input('post.name');
        $price=input('post.price');
        $stock=input('post.stock');
        $summary=input('post.summary');
        $category=input('post.category');
        $property=input('post.properties/a');

        if(is_array($property))
        {

            for ($i=0; $i < count($property)-1; $i=$i+2) { 
                # code...
                $arr[]=
                    [
                        'name'=> $property[$i],
                        'detail' => $property[$i+1]
                    ];
                
            }
        }
        else{

            return 'error';
        }
        
        $file=request()->file('image');
        $files=request()->file('images');
        if($file && $files){

            $id_url=ImageService::upload($file,true);
            $ids=ImageService::upload($files);

        }else{
            return "file_error";
        }
        
        $product = new ProductModel();
        $result=$product->save(
            [
               
                'name' => $name,
                'price' =>$price,
                'stock' => $stock,
                'img_id'=> $id_url[0],
                'main_img_url' => '/'.$id_url['url'],
                'category_id'=>$category,
                'summary'=>$summary
            ]);
       
        if($result>0)
        {
            $result=ProductModel::addProduct($product->id,$arr,$ids);
        }
        
        return $result;
    }

    public function deleteOne($id)
    {
        
        return ProductModel::destroy($id,true);
        //        ProductModel::destroy(1,true);
    }
    /*
    * @url /product/by_order_id?id=$id
    */
    public function getProductsByOrderID($id)
    {
        (new IDMustBePositiveInt())->goCheck();
        $products=OrderProduct::getProductsByOrderId($id);
        $arr = array();
        foreach ($products as $key => $value) {
            
            $arr[$key] = $this->getOne($value);
        }
        return $arr;
    }
    public function getProductByName($name)
    {
        $name=trim($name);
        if(!empty($name))
        {
            $name="%".$name."%";
            $name=trim($name);
            $products = ProductModel::getProductName($name);
            return $products;
        }
        else
        {
            return '';
        }
        
    }
    public function getProducts($page=1, $size = 20){
        (new PagingParameter())->goCheck();
        $pagingOrders = ProductModel::getProductsByPage($page, $size);
        return $pagingOrders;
        if ($pagingOrders->isEmpty())
        {
            return [
                'current_page' => $pagingOrders->currentPage(),
                'data' => []
            ];
        }
        $data = $pagingOrders//->hidden(['snap_address','snap_items'])
            ->toArray();
        return [
            'current_page' => $pagingOrders->currentPage(),
            'data' => $data
        ];
    }
    public function getProductsById($id)
    {
        (new PagingParameter())->goCheck();
        $data=ProductModel::getProductsById($id);
        if ($data->isEmpty())
        {
            return [];
        }
        else{
            return $data[0];
        }
    }
    public function updataImg()
    {
        $file=request()->file("image");
        $id=input('post.id');
        if($file)
        {
            $ids=ImageService::upload($file,true);
            $product = new ProductModel();
            $result=$product->save([
                    'img_id'=>$ids[0],
                    'main_img_url'=>'/'.$ids['url']
                ],['id'=>$id]);
            if($result>0)
            return $ids['url'];
        }
        return 0;
    }
    public function updateProduct()
    {
        $name=input('post.name');
        $id=input('post.id');
        $price=input('post.price');
        $stock=input('post.stock');
        $summary=input('post.summary');
        $category=input('post.category');
        $product = new ProductModel();
        $result=$product->save(
            [   
                
                'name' => $name,
                'price' =>$price,
                'stock' => $stock,
                'category_id'=>$category,
                'summary'=>$summary
            ],['id'=>$id]);
        return $result;
    }
}