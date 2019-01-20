import React from 'react'
export default class  Info  extends React.Component{
    render(){
        return (
            <div>
          测试动态路由功能；
          动态路由的属性值：{this.props.match.params.value}
            </div>
            
            
            );

    }
}