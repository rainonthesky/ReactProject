import React from 'react'
import {Card,Button,message} from 'antd'
import './ui.less'
export default class Message extends React.Component{
    showMessage=(type)=>{
        message[type](
            "恭喜你，React学习课程");
        
    }
    render(){
        return(<div>
            <Card title="全局提示框" className="card-wrap">
                <Button type="primary" onClick ={()=>this.showMessage('success')}>sucess</Button>
                <Button type="primary" onClick ={()=>this.showMessage('info')}>info</Button>
                <Button type="primary" onClick ={()=>this.showMessage('error')}>Warning</Button>
                <Button type="primary" onClick ={()=>this.showMessage('loading')}>Loading</Button>



            </Card>





        </div>)
    }


}

