<template>


    <div>

        <Row style="padding:5px;">

            <Col span="4" >
                <Tree ref="tree" :data="treeData" @on-select-change="getListByParentCode"></Tree>
            </Col>


            <Col span="20" >
                <Row style="padding:5px;">
                    <Col span="2" offset="22">
                        <Button type="success" @click="add">新增</Button>
                    </Col>

                </Row>
                <Table stripe :columns="columns" :data="dataList"></Table>

            </Col>
        </Row>

    </div>


</template>

<script>
    export default {
        data() {
            return {
                selectedNode:null,
                treeData: [

                ],
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '资源名称',
                        key: 'name'
                    },
                    {
                        title: '资源编码',
                        key: 'code'
                    },
                    {
                        title: '地址',
                        key: 'url'
                    },
                    {
                        title: '资源图标',
                        key: 'icon'
                    },

                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button',{
                                    props:{
                                        type:'primary',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.edit(params)
                                        }
                                    }
                                },'编辑'),
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size:'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                        click:()=>{
                                            this.delete(params)
                                        }
                                    }
                                },'删除')
                            ])
                        }
                    }

                ],
                dataList: []
            }
        },
        mounted() {
            this.getByLevel(true)
        },
        methods: {
            initTreeData(dataList,isInit=false){

                this.treeData=[];
                let root={
                    title:'资源',
                    code:'0',
                    expand:true,
                    children:[],
                    selected:isInit
                }


                for(let i=0,len=dataList.length;i<len;i++){
                    let data=dataList[i];
                    if(data.children && data.children.length>0){

                        let children=data.children;
                        let childrenArray=[];
                        for(let j=0;j<children.length;j++){
                            let child=children[j];
                            childrenArray.push({
                                title:child.name,
                                code:child.code,
                                selected:this.selectedNode?this.selectedNode.code===child.code:false

                            })
                        }
                        root.children.push({
                            title:data.name,
                            code:data.code,
                            expand:true,
                            children:childrenArray,
                            selected:this.selectedNode?this.selectedNode.code===data.code:false
                        })


                    }else{
                        root.children.push({
                            title:data.name,
                            expand:true,
                            code:data.code,
                            selected:this.selectedNode?this.selectedNode.code===data.code:false
                        })
                    }
                }

                this.treeData.push(root)


            },
            /**
             * 点击左侧树节点加载数据到右侧表格
             */
            getListByParentCode(){


                   let node=this.$refs.tree.getSelectedNodes()[0];

                if(node){
                    this.selectedNode=node;
                    // alert(1,JSON.stringify(code))
                    this.http.get('resources/getChildrenAndSelf', {
                        params:{
                            code:node.code
                        }
                    }).then(data => {

                        this.dataList=data;

                    })
                }

            },
            getByLevel(isInit=false) {
                this.http.get('resources/listByLevel', {
                    params:{
                        userId:this.$store.state.userId
                    }
                }).then(data => {

                    this.initTreeData(data,isInit)
                    this.$nextTick(()=>{
                        this.getListByParentCode()
                    })
                })
            },
            add() {

                let nodes=this.$refs.tree.getSelectedNodes();
                if(nodes && nodes.length>0){
                    let node=nodes[0];
                    this.$router.push({
                        path:'/resource/operate',
                        query:{
                            parentCode:node.code,
                            parentTitle:node.title
                        }
                    })
                }else{
                    this.$Message.error("请先选择父级资源")
                }

                console.log(nodes)
              //
            },
            edit(params){
                this.$router.push({
                    path:'/resource/operate',
                    query:{
                        opType:'edit',
                        formItem:params.row
                    }
                })
            },
            delete(params){

                this.$Modal.confirm({
                    title: '您确认删除吗？',
                    content: '',
                    onOk: () => {

                        this.http.post('resources/remove',{
                            _id:params.row._id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getByLevel()

                        }).catch(error=>{
                            this.$Message.error(error)
                        })

                    },
                    onCancel: () => {
                    }
                });


            }
        }
    }
</script>

<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
