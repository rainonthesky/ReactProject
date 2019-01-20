import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'
import Utils from './../utils/utils'
export default class Axios{
    static requestList(_this,url,params,isMock){
        var data ={
            params:params,
            isMock
        }
        this.ajax({
            url,
            data
        }).then((data)=>{
            if(data && data.result){
                let list = data.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }
            );
            _this.setState({
                    list,
                    pagination:Utils.pagination(data,(current)=>{
                        _this.params.page =current;
                        _this.requestList();
                 
                    })
                })
            }
        })
          
    }
    static jsonp(options){
       return new Promise((resolve,reject)=>{
            JsonP(options.url,{
                param:'callback'
            },function(err,response){
                console.log(response);
                
                if(response.status == 'success'){

                    resolve(response);
                }else{
                    reject(response.message);

                }

            })
        })
    }

    static ajax(options){
        let loadding;
        if(options.data&&options.data.isShowLoading!==false){
            loadding =document.getElementById('ajaxLoading');
            loadding.style.display='block';
        }
        let baseApi ='';
        if(options.isMock){
        let baseApi='https://www.easy-mock.com/mock/5b71417db9e83b645e027243/mockapi'
        }else{
            baseApi='https://www.easy-mock.com/mock/5b71417db9e83b645e027243/mockapi'

        }
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params:(options.data&&options.data.params)||''
            }).then((response)=>{
                if(options.data&&options.data.isShowLoading!==false){
                    loadding =document.getElementById('ajaxLoading');
                    loadding.style.display='none';
                }
                if(response.status =='200'){
                    let res =response.data;
                    if(res.code =='0'){
                        resolve(response.data);
                    }else{
                        Modal.info({
                            title:"提示",
                            content:res.msg
                        })
                    }

                }else{
                    reject(response.data);
                }

            })

        });

    }
}