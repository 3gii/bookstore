<?php
namespace app\api\controller\v1;

use app\api\controller\BaseController;

use app\api\model\Help as HelpModel;

class Help extends BaseController
{
    public function getHelp()
    {
        $help=new HelpModel();
        return $help->limit(10)->select();
        
    }
}