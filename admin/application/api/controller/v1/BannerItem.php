<?php
namespace app\api\controller\v1;
use app\api\Model\BannerItem as BannerItemModel;
use app\api\controller\BaseController;
use app\api\service\Image as ImageService;

class BannerItem extends BaseController
{
    /*
    ** @url /banner/update
     */
	public function updateBannerItem()
    {
        $key_word = input('post.key_word');
        $id = input('post.id');
        $files = request()->file('image');
        if($files && $key_word && $id)
        {
            $img_id=ImageService::upload($files);
            $result=BannerItemModel::updateBannerItem($id,$img_id[0],$key_word);
            return $result;
        }
        else return '';
    }
}