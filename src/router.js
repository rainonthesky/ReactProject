import React from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
import Home from './pages/home/index'
import Admin from './admin'
import Login from './pages/login/index'
import Buttons from './pages/ui/buttons'
import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch/index'
import Loading from './pages/ui/loading'
import Notice from './pages/ui/notice'
import Message from './pages/ui/message'
import tabs from './pages/ui/tabs'
import Gallery from './pages/ui/gallery'
import Carouse from './pages/ui/carousel'
import FormLogin from './pages/form/login'
import FormRegister from './pages/form/register'
import BasicTable from './pages/table/basicTable'
import HighTable from './pages/table/highTable'
import City from './pages/city/index'
import Order from './pages/order/index'
import Common from './common'
import orderDetail from './pages/order/detail'
import Permission from './pages/permission/index'
import User from './pages/user/index'
import Bar from './pages/echarts/bar'
import Pie from './pages/echarts/pie'
import Line from './pages/echarts/line'
import RichText from './pages/rich'

export default class Router extends React.Component{

    render(){
        return(
            <HashRouter>
                <App>
                    <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/common" render={()=>
                        
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={orderDetail} />

                        </Common>
                    }/>
                    <Route path="/" render ={ ()=>
                    <Admin>
                        <Switch>
                           
                            <Route path="/home" component={Home}/>
                             <Route path="/ui/buttons" component={Buttons}/>
                             <Route path="/ui/modals" component={Modals}/>
                             <Route path="/ui/loadings" component={Loading}/>
                             <Route path="/ui/notification" component={Notice}/>
                             <Route path="/ui/messages" component={Message}/>
                             <Route path="/ui/tabs" component={tabs}/>
                             <Route path="/ui/gallery" component={Gallery}/>
                             <Route path="/ui/carousel" component={Carouse}/>
                             <Route path="/form/login" component={FormLogin}/>
                             <Route path="/form/reg" component={FormRegister}/>
                             <Route path="/table/basic" component={BasicTable}/>
                             <Route path="/table/high" component={HighTable}/>
                             <Route path="/city" component={City}/>
                             <Route path="/order" component={Order}/>
                             <Route path="/user" component={User}/>
                             <Route path="/permission" component={Permission}/>
                             <Route path="/charts/bar" component={Bar}/>
                             <Route path="/charts/pie" component={Pie}/>
                             <Route path="/charts/line" component={Line}/>
                             <Route path="/rich" component={RichText}/>
                             <Redirect to="/home"/>
                             <Route  component={NoMatch}/>
                        </Switch>
                    </Admin>
                    }/>
                    </Switch>   
                    
                </App>

            </HashRouter>
        ); 
    }
}