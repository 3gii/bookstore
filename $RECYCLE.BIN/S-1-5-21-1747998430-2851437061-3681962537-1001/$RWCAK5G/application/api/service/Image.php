<?php
/**
 * Created by 七月.
 * User: 七月
 * Date: 2017/2/16
 * Time: 4:22
 */

namespace app\api\service;
use traits\model\SoftDelete;
use app\api\model\Image as ImageModel;
/**
 * 图片服务类
 */
class Image
{
    /**
     * @param $ids array
     * @return array
     */
//    public static function getImagesByIDs($ids)
//    {
//        if(empty($ids)){
//            return [];
//        }
//        $imgs = ImageModel::all($ids);
//        return $imgs;
//    }
    public static function upload($files,$url=false){
    // 获取表单上传文件
        $arr=[];
        foreach($files as $file){
            // 移动到框架应用根目录/public/uploads/ 目录下
            $info = $file->validate(['size'=>325678,'ext'=>'jpg,png,gif'])->move(ROOT_PATH . 'public' . DS . 'images');
            if($info){
                $arr[]=str_replace('\\','/',$info->getSaveName());
                if($url)
                $url=$arr[0];
            }else{
                // 上传失败获取错误信息
                return $file->getError();
            }
        }
        $array=[];
        $result=ImageModel::setImage($arr);
        foreach ($result as $key => $value) {
            
            # code...
            $array[]=$value->getData('id');
        }
        if($url) $array['url']=$url;
        return $array;
    }
    public static function deleteImage($id)
    {
        $result=ImageModel::destroy($id,true);
        return $result;
    }
}