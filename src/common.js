import React from 'react'
import { Row,Col} from 'antd'
import Header from './component/Header'
import Home from './pages/home'
import './style/common.less'
export default class Common extends React.Component{
    render(){
        return (<div>
        <Row className="simple-page">
        <Header menuType="second"/>
        </Row>
            
        <Row className="content">
        {this.props.children}        
        </Row>
        </div>);
    }
}