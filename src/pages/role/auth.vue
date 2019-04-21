<template>


    <div>

        <Row style="padding:5px;">

            <Col span="8" offset="8" >
                <Tree ref="tree" :data="treeData" show-checkbox></Tree>
            </Col>

        </Row>


        <Row style="margin-top:3em;">
            <Col span="8" offset="8" >
                <Button type="success" @click="add" style="margin-right:8em;">保存</Button>
                <Button @click="cancel">取消</Button>

            </Col>
        </Row>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                roleId:this.$route.query.roleId,
                selectedNode:null,
                treeData: [

                ],
                dataList: []
            }
        },
        mounted() {


            this.listByRole(true)



        },
        methods: {
            initTreeData(dataList,isInit=false){

                this.treeData=[];
                let root={
                    title:'资源',
                    code:'0',
                    expand:true,
                    children:[],
                    resourceId:'',
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
                                checked:child.checked,
                                resourceId:child._id

                            })
                        }
                        root.children.push({
                            title:data.name,
                            code:data.code,
                            expand:true,
                            children:childrenArray,
                            checked:data.checked,
                            resourceId:data._id
                        })


                    }else{
                        root.children.push({
                            title:data.name,
                            expand:true,
                            code:data.code,
                            checked:data.checked,
                            resourceId:data._id
                        })
                    }
                }

                this.treeData.push(root)


            },
            listByRole(isInit=false) {
                this.http.get('resources/listByRole', {
                    params:{
                        userId:this.$store.state.userId,
                        roleId:this.roleId
                    }
                }).then(data => {

                    this.initTreeData(data,isInit)
                })
            },
            add() {

                let nodes=this.$refs.tree.getCheckedNodes();
                if(nodes && nodes.length>0){

                    let resourceIdArray=[]
                    nodes.forEach((item)=>{resourceIdArray.push(item.resourceId)})

                    this.http.post('roles/auth',{
                        opUserId:this.$store.state.userId,
                        roleId:this.roleId,
                        resourceIdArray:resourceIdArray
                    }).then(()=>{
                        this.$Message.success("授权成功")
                        this.cancel()

                    }).catch(error=>{
                        this.$Message.error(error)
                    })

                }else{
                    this.$Message.error("请先选择资源")
                }

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
            cancel(){
              this.$router.push('/role/list')
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
