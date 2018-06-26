<?php

namespace app\api\model;

use think\Model;
use app\api\service\Image as ImageService;

class BannerItem extends BaseModel
{
    protected $hidden = ['id', 'img_id', 'banner_id', 'delete_time'];

    public function img()
    {
        return $this->belongsTo('Image', 'img_id', 'id');
    }
    //
    public static function updateBannerItem($id,$img_id,$key_word)
    {
    	$img=self::get($id)->img_id;
        
    	$result=ImageService::deleteImage($img);
    	if($result>0)
    	{
    		$banner = new BannerItem;
	        $result=$banner->save([

	                'img_id' => $img_id,
	                'key_word' => $key_word,
	                'banner_id' =>1
	                
	            ],['id' => $id]);
	        return $result;
    	}
       
    }
}
