import React from 'react'
import {Card,Button,Spin,Icon,Alert} from 'antd'
import './ui.less'
export default class Loading extends React.Component{
    render(){
        const icon =<Icon type="loading" style={{fontSize:24}}/>
        return (<div>
            <Card title="spin" className ="card-wrap">
                <Spin size="small"/>
                <Spin style={{margin:'0 10px'}}/>
                <Spin size="large"/>
                <Spin indicator={icon} style={{marginLeft:10}}/>
            </Card>
            <Card title="内容遮照" className ="card-wrap"   >
                <Alert 
                message = "React"
                description ="欢迎来到React实战课程"
                type ="info"
                />
                <Spin tip="加载中...... "indicator={icon}>
                <Alert 
                message = "React"
                description ="欢迎来到React实战课程"
                type ="success"
                />
                </Spin>     
            </Card>



        </div>)
    }
}
