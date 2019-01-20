import React from 'react';
import {Card,Table,Modal,message,Button, Badge} from  'antd';
import axios from './../../axios/index'
import Utils  from './../../utils/utils'    
export default class BasicTable extends React.Component{
    state={
        dataSource2:[]

    }
    params={
        page:1
    }
    componentDidMount(){
       this.request();
    }
    //获取动态mock数据
    request=()=>{
        let _this=this;
        axios.ajax({
            url:'/table/high/list',
            data:{
                params:{
                    page:this.params.page
                }
            }
        }).then(
            (res)=>{
                if(res.code==0){
                    res.result.list.map((item,index) => {
                        item.key = index;
                    })
                }
                this.setState({
                    dataSource2:res.result.list,
                    selectedRowKeys:null,
                    selectedRows:[],
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page=current;
                        this.request();

                    })

                    })
                })
            }
        onRowClick =(record,index)=>{
            let selectKey=[index];
            Modal.info({
                title:"信息",
                content:(`用户名：${record.userName},用户爱好：${record.hobby}`)
            })
            this.setState({
                selectedRowKeys:selectKey,
                selectedItem:record
            })

            }
            //多选删除动作
            handleDelete=(item)=>{
                let id=item.id;
                Modal.confirm({
                    title:"确认",
                    content:'您确定要删除吗？',
                    onOk:()=>{
                        message.success('删除成功');
                        this.request();
                    }
                })
         }
    
        
        handleChange = (pagination, filters, sorter)=>{
            console.log("::" + sorter)
            this.setState({
                sortOrder:sorter.order
            })
        }
    
    render(){
        const columns=[{
            title:'id',
            key:'id',
            width:80,
            dataIndex:'id'
        },{
            title:'姓名',
            key:'userName',
            width:80,
            dataIndex:'userName'
        },{
            title: '性别',
            key: 'sex',
            width:80,
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
        },{
            title:'状态',
            key:'state',
            width:80,
            dataIndex:'state',
            render(state){
                let config={
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'北大才子',
                        '4':'百度FE',
                        '5':'创业者'
                }
                return config[state];
            } 
        },{
            title:'爱好',
            key:'hobby',
            width:80,
            dataIndex:'hobby',
            render(ab){
                let config={
                    '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                }
                return config[ab];
            }
         },
            {
                title: '生日',
                key: 'birthday',
                width: 120,
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                key: 'address',
                width: 120,
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                key: 'time',
                width: 80,
                dataIndex: 'time'
            }]
            const columns2=[{
                title:'id',
                key:'id',
                width:80,
                fixed:'left',
                dataIndex:'id'
            },{
                title:'姓名',
                key:'userName',
                width:80,
                fixed:'left',
                dataIndex:'userName'
            },{
                title: '性别',
                key: 'sex',
                width:80,
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },{
                title:'状态',
                key:'state',
                width:80,
                dataIndex:'state',
                render(state){
                    let config={
                            '1':'咸鱼一条',
                            '2':'风华浪子',
                            '3':'北大才子',
                            '4':'百度FE',
                            '5':'创业者'
                    }
                    return config[state];
                } 
            },{
                title:'爱好',
                key:'hobby',
                width:80,
                dataIndex:'hobby',
                render(ab){
                    let config={
                        '1': '游泳',
                            '2': '打篮球',
                            '3': '踢足球',
                            '4': '跑步',
                            '5': '爬山',
                            '6': '骑行',
                            '7': '桌球',
                            '8': '麦霸'
                    }
                    return config[ab];
                }
             },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },  {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },  {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },  {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '生日',
                    key: 'birthday',
                    width: 120,
                    dataIndex: 'birthday'
                },
                {
                    title: '地址',
                    key: 'address',
                    width: 120,
                    fixed:'right',
                    dataIndex: 'address'
                },
                {
                    title: '早起时间',
                    key: 'time',
                    width: 80,
                    fixed:'right',
                    dataIndex: 'time'
                }]
                const columns3=[{
                    title:'id',
                    key:'id',
                    dataIndex:'id'
                },{
                    title:'姓名',
                    key:'userName',
                    dataIndex:'userName'
                },
                {
                    title:'年龄',
                    key:'age',
                    dataIndex:'age',
                    sorter:(a,b)=>{
                        return a.age-b.age;
                    },
                    sortOrder:this.state.sortOrder
                },{
                    title: '性别',
                    key: 'sex',
                    dataIndex: 'sex',
                    render(sex){
                        return sex ==1 ?'男':'女'
                    }
                },{
                    title:'状态',
                    key:'state',
                    dataIndex:'state',
                    render(state){
                        let config={
                                '1':'咸鱼一条',
                                '2':'风华浪子',
                                '3':'北大才子',
                                '4':'百度FE',
                                '5':'创业者'
                        }
                        return config[state];
                    } 
                },{
                    title:'爱好',
                    key:'hobby',
                    dataIndex:'hobby',
                    render(ab){
                        let config={
                            '1': '游泳',
                            '2': '打篮球',
                            '3': '踢足球',
                            '4': '跑步',
                            '5': '爬山',
                            '6': '骑行',
                            '7': '桌球',
                            '8': '麦霸'
                        }
                        return config[ab];
                    }
                 },
                    {
                        title: '生日',
                        key: 'birthday',
                        dataIndex: 'birthday'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        dataIndex: 'address'
                    },
                    {
                        title: '早起时间',
                        key: 'time',
                        dataIndex: 'time'
                    }]
                    const columns4=[{
                        title:'id',
                        dataIndex:'id'
                    },{
                        title:'姓名',
                       
                        dataIndex:'userName'
                    },
                    {
                        title:'年龄',
                      
                        dataIndex:'age',
                    },{
                        title: '性别',
                       
                        dataIndex: 'sex',
                        render(sex){
                            return sex ==1 ?'男':'女'
                        }
                    },{
                        title:'状态',
                      
                        dataIndex:'state',
                        render(state){
                            let config={
                                    '1':<Badge/>,
                                    '2':'风华浪子',
                                    '3':'北大才子',
                                    '4':'百度FE',
                                    '5':'创业者'
                            }
                            return config[state];
                        } 
                    },{
                        title:'状态',
                     
                        dataIndex:'hobby',
                        render(ab){
                            let config={
                                '1': <Badge status="success" text="成功"/>,
                                '2': <Badge status="error" text="报错"/>,
                                '3':  <Badge status="default" text="正常"/>,
                                '4':  <Badge status="warning" text="警告"/>,
                                '5': <Badge status="processing" text="进行中"/>,
                                '6': '骑行',
                                '7': '桌球',
                                '8': '麦霸'
                            }
                            return config[ab];
                        }
                     },
                        {
                            title: '生日',
                        
                            dataIndex: 'birthday'
                        },
                        {
                            title: '地址',
                         
                            dataIndex: 'address'
                        },
                        {
                            title: '操作',
                            render:(text,item)=>{
                                return <Button size="small" onClick={(item) => {this.handleDelete(item)}}>删除</Button>
                            }
                        }]
            const {selectedRowKeys} =this.state;
            const rowSelection={
                type :'radio',
                selectedRowKeys
            }

            const rowCheckSelection={
                type :'checkbox',
                selectedRowKeys,
                onChange:(selectedRowKeys,selectedRows)=>{
                    // let ids =[];
                    // selectedRows.map((item)=>{
                    //     ids.push(item.id)

                    // })
                    this.setState({
                        selectedRowKeys,
                        selectedRows
                        // selectedIds:ids
                    })
                }
            }
        return(<div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{y:240}}

                    />
                </Card>
                <Card title="左侧固定" style={{margin:'10px 0'}}>
                    <Table
                        bordered
                        columns={columns2}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        scroll={{x:2500}}
                    />
                </Card>
                <Card title="表格排序" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns3}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns4}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                       
                       
                    />
                </Card>
                
                
                

            
        </div>)
    
    }
}