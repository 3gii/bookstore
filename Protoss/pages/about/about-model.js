import {Base} from '../../utils/base.js';
class About extends Base{
    constructor(){
        super();
        this._storageKeyName='about';
    }
    getHelp(callback){
        var that=this;
        var allParams = {
            url: 'help/get_help',
            sCallback: function (data) {
                callback && callback(data);
            }
            };
        this.request(allParams);
    }

}
export {About};