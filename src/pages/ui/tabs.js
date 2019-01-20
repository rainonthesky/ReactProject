import React from 'react'
import {Card,Tabs,message, Icon,Button} from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane;
export default class tabs extends React.Component{
     newTabIndex =0;
    Handlecallback=(key)=> {
        message.info("HI,您选择了标签"+key)
      }
      componentWillMount(){
      const panes=[{
          title:'Tab1',
          content:'Tab1',
          key:'1'
    },
    {
        title:'Tab2',
        content:'Tab2',
        key:'2'
  
    },
    {
    title:'Tab3',
    content:'Tab3',
    key:'3'

    }

]
  this.setState({
    activeKey:panes[0].key,
    panes
   })
  }
    onChange=(activeKey)=>{
        this.setState({
            activeKey
        })

    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
      }

      add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title:activeKey, content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
      }
    
      remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          } });
          const panes = this.state.panes.filter(pane => pane.key !== targetKey);
          if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
          }
          this.setState({ panes, activeKey });
        }
      

    render(){
        return(<div>
            <Card titile="Tab标签" className="card-wrap">
                 <Tabs  defaultActiveKey="1" onChange={this.Handlecallback}>
                     <TabPane tab="Tab 1" key="1">你好</TabPane>
                     <TabPane tab="Tab 2" key="2">、欢迎学习</TabPane>
                    <TabPane tab="Tab 3" key="3">React是一个MVC框架</TabPane>
                </Tabs>
            </Card>

             <Card titile="Tab带图标签" className="card-wrap">
                 <Tabs  defaultActiveKey="1" onChange={this.Handlecallback}>
                     <TabPane tab={<span><Icon type="plus"/>Tab 1</span>} key="1">你好</TabPane>
                     <TabPane tab={<span><Icon type="edit"/>Tab 2</span>} key="2">、欢迎学习</TabPane>
                    <TabPane tab={<span><Icon type="delete"/>Tab 3</span>} key="3">React是一个MVC框架</TabPane>
                </Tabs>
            </Card>

            <Card titile="Tab带图标签" className="card-wrap">
                     {/* <div style={{ marginBottom: 16 }}>
                        <Button onClick={this.add}>ADD</Button>
                        <Button onClick={this.remove}>Remove</Button>
                    </div> */}
                 <Tabs 
                    onChange={this.activeKey}
                    activeKey={this.state.activeKey}
                     onEdit={this.onEdit}
                     type="editable-card"
                     >
                    
                 {
                     this.state.panes.map((panel)=>{
                         return <TabPane
                         tab={panel.title}
                         key={panel.key}
                         />
                     })
                 }
                     
                </Tabs>
            </Card>
        </div>)
    }
}