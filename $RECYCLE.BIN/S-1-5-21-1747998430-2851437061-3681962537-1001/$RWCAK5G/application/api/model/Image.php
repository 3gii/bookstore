<?php

namespace app\api\model;

use think\Model;


class Image extends BaseModel
{
    protected $hidden = ['delete_time', 'id', 'from'];
    public function getUrlAttr($value, $data)
    {
        return $this->prefixImgUrl($value, $data);
    }

    public static function setImage($arr){
		$image = new Image;
		if($arr){
			foreach ($arr as  $value) {
			
				$list[]["url"]='/'.$value;
			}
			$result=$image->saveAll($list);
			
		}
		foreach ($result as $key => $value) {
			# code...
			$list[]=$value;
		}
		if($result){

			return $result;
		}
		else{
			return '';
		}
		
		
	}
}

