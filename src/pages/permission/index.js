import React from 'react'
import {Button,Card,Modal,Select,Form,Input, message,Tree,Transfer} from 'antd'
import "./../../style/common.less"
import Utils from './../../utils/utils'
import axios from '../../axios/index'
import ETable from './../../component/ETable/index'
import menuList from './../../config/menuConfig'
import { width } from 'window-size';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode  ;
export default class Permission extends React.Component{
    state = {

    };
    componentDidMount(){
        
        this.list();
    }
    list=()=>{
        let _this=this;
        axios.requestList(this,'/role/list',{},true)
        }
    handleRole=()=>{
        this.setState({
            isVisible:true
        })
    }
    //角色提交
    handleRoleSubmit=()=>{
        let data =this.roleForm.props.form.getFieldsValue()
        axios.ajax({
            url:'/role/create',
            data:{
                params:{
                 data   
                }
            }
        }).then(((res)=>{
            if(res.code==0){
                message.success('角色创建成功')
                this.setState({
                    isVisible:false
                })
                this.list() ; 
                this.roleForm.props.form.resetFields();
            }
        }))

    }
    //权限设定
    handlePermisson=()=>{
        let item =this.state.selectedItem;
        if(!item){
            Modal.info({
                text:"请选择一个角色"
            })
            return;
        }
        this.setState({
            isPermVisible:true,
            detailInfo:item,
            menuInfo:item.menus
        })

    }
    // 权限提交
    handlePermEditSubmit=()=>{
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id=this.state.selectedItem.id;
        data.menus=this.state.menuInfo;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
                if(res.code ==0){
                    message.success(" 权限设置成功");
                    this.setState({
                    isPermVisible:false
                    })
                    this.list();
                }

            
        })


    }
    handleUserAuth=()=>{
        let item =this.state.selectedItem;
        if(!item){
            Modal.info({
                text:"请选择一个角色"
            })
            return;
        }
        this.setState({
            isUserVisible:true,
            detailInfo:item
        })
       this.getRoleUserList(item.id)

    }
    getRoleUserList=(id)=>{
        axios.ajax({
            url:'/role/user_list',
            data:{
                params:{
                    id
                }
            }
        }).then((res)=>{
            this.getAuthUserList(res.result)
        })

    }
    //塞选目标用户
    getAuthUserList=(dataSource)=>{
        const mockData=[];
        const targetKeys =[];
        if(dataSource&&dataSource.length>0){
            for(let i=0;i<dataSource.length;i++){
                const data ={
                    key:dataSource[i].user_id,
                    title:dataSource[i].user_name,
                    status:dataSource[i].status

                }
                if(data.status==1){
                    targetKeys.push(data.key); 
                }
                    mockData.push(data);
            

            }
            this.setState({
                targetKeys,
                mockData

            })
        }

        
    }
    handleUserSubmit=()=>{
        let data={}
        data.user_ids=this.state.targetKeys;
        data.role_id=this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }

        }).then((res)=>{
            if(res.code==0){
                message.success('用户授权成功')
                this.setState({
                    isUserVisible:false
                    })
                    this.list();

            }

        })

    }
    
    render(){
        const columns=[{
            title:'角色创建',
            dataIndex:'id'
        },
        {
            title:'角色名称',
            dataIndex:'role_name'
        },
        {
            title:'创建时间',
            dataIndex:'create_time'
        },
        {
            title:'使用状态',
            dataIndex:'status',
            render(status){
                if(status==1){
                    return "启用"
                }else{
                    return "停用"
                }
            }
        },
        {
            title:'授权时间',
            dataIndex:'authorize_time',
            render: Utils.formatTime
        },
        {
            title: '授权人',
            dataIndex: 'authorize_user_name'
        }
        ]
        return (
            <div>
                <Card style={{marginTop:10}} className="operate-wrap">
                    <Button type="primary" onClick={this.handleRole} >创建角色</Button>
                    <Button type="primary" onClick={this.handlePermisson}>设置权限</Button>
                    <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
                </Card>
                <div className="content-wrap">
                    <ETable 
                  updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    selectedRowKeys={this.state.selectedRowKeys}
                   dataSource={this.state.list}
                   columns={columns}
                    />
                </div>
                <Modal
                title="创建用户"
                visible={this.state.isVisible}
                onOk={this.handleRoleSubmit}
                onCancel={()=>{
                    this.roleForm.props.form.resetFields();
                    this.setState({
                        isVisible:false,
                    })
                }}
                >
                 <RoleForm  wrappedComponentRef={(inst) => this.roleForm = inst }/>
                </Modal>
                <Modal
                title="设置权限"
                visible={this.state.isPermVisible}
                onOk={this.handlePermEditSubmit}
                onCancel={()=>{
                    this.setState({
                        isPermVisible:false,
                    })
                }}
                >
                 <PermEditForm
                  menuInfo={this.state.menuInfo}
                  patchMenuInfo={(checkedKeys)=>{
                     this.setState({
                         menuInfo:checkedKeys
                     })
                 }} detailInfo={this.state.detailInfo}  wrappedComponentRef={(inst) => this.permEditForm = inst }/>
                </Modal>
                <Modal
                title="用户授权"
                width={800}
                visible={this.state.isUserVisible}
                onOk={this.handleUserSubmit}
                onCancel={()=>{
                    this.setState({
                        isUserVisible:false,
                    })
                }}
                >
                <RoleAuthForm 
                wrappedComponentRef={(inst) => this.userAuthForm = inst }
                detailInfo={this.state.detailInfo}
                targetKeys={this.state.targetKeys}
                mockData={this.state.mockData}
                patchUserInfo={(targetKeys) => {
                    this.setState({
                        targetKeys: targetKeys
                    })}}
                />
                 
                </Modal>
                
            </div>
        );
    }
}
class RoleForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span:10}
        };
        
        
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name'   )(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                
                <FormItem label="状态" {...formItemLayout}>
                    {
                        
                        getFieldDecorator('state')(
                        <Select>
                            <Option value={1}>启用</Option>
                            <Option value={0}>未启用</Option>
                        </Select>
                    )}
                </FormItem>
                
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);
class PermEditForm extends React.Component{
    renderTreeNodes=(data)=>{
      return data.map((item)=>{
            if(item.children){
                return <TreeNode title={item.title} key={item.key}>
                {
                    this.renderTreeNodes(item.children)
                }
                </TreeNode>
            } else{
                return <TreeNode {...item}/>
            }   

        })
    }
    onCheck=(checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys)

    }
    render(){
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:18}
        }
        const detail_info = this.props.detailInfo;
        const menu_info = this.props.menuInfo;
        const {getFieldDecorator} =this.props.form;
        return(<div>
                
        
                <Form layout="horizontal">
                    <FormItem label="角色名称"{...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>

                    </FormItem>
                    <FormItem label="状态"{...formItemLayout}>
                        {
                            getFieldDecorator('status',{
                                initialValue:"1"
                            })(
                                <Select>
                                    <Option value="1">启用</Option>
                                    <Option value="0">未启用</Option>
                                </Select>
                            )
                        }

                    </FormItem>
                    <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{
                        this.onCheck(checkedKeys)
                    }} 
                    checkedKeys={menu_info}
                                      >
                        <TreeNode title="权限设置" key="platform_all">
                            {this.renderTreeNodes(menuList)}
                        </TreeNode>
                    </Tree>

                </Form>


        </div>)
    }
}
PermEditForm = Form.create({})(PermEditForm);
class RoleAuthForm extends React.Component{
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
      }
      handleChange=(targetKeys)=>{
          this.props.patchUserInfo(targetKeys)

      }
    
    render(){
        const detail_info = this.props.detailInfo;
        const formItemLayout={
            labelCol:{span:5},
            wrapperCol:{span:18}
        }
        
        return(<div>
                
        
                <Form layout="horizontal">
                    <FormItem label="角色名称"{...formItemLayout}>
                    <Input disabled placeholder={detail_info.role_name}/>
                
                    </FormItem>
                    <FormItem label="选择用户"{...formItemLayout}>
                    <Transfer
                    listStyle={{width:200,height:400}}
                    dataSource={this.props.mockData}
                    titles={['待选用户','已选用户']}
                    showSearch
                    searchPlaceholder='输入用户名'
                    filterOption={this.filterOption}
                    targetKeys={this.props.targetKeys}
                    render={item=>item.title}
                    onChange={this.handleChange}
                    />
                    </FormItem>

                </Form>


        </div>)
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm);
