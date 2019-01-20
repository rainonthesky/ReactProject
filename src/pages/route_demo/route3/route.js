import React from 'react';
import {HashRouter as Router,Route,Link,Switch} from 'react-router-dom';
import Topic from '../route1/topic';
import About from '../route1/aboute';
import Main from './main';
import Info from './info';
import Home from './Home' 
import NoMatch from './NoMatch'      

export default class IRoute extends React.Component{
    render(){
        return (
            <Router>
            <Home>
                <Switch>
                    <Route   path="/main" render={()=>
                        <Main>
                            <div>   
                                <Route path="/main/:value" component={Info}></Route>
                            </div>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/topics" component={Topic}></Route>
                    <Route component={NoMatch}></Route>
                    </Switch>
            </Home>
            </Router>
        );
 
    }
}