<template>


    <div>
        <Row style="padding:5px;">
            <Col span="2" offset="22">
                <Button type="success" @click="add">新增</Button>
            </Col>
        </Row>
        <Table stripe :columns="columns" :data="dataList"></Table>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '用户类型',
                        key: 'type',
                        render: (h, params) => {
                            return h('div', {}, params.row.type === 0 ? '学生' : params.row.type === 1 ? '学生' : '管理员')
                        }
                    },{

                        title: '学号',
                        key: 'studentNumber'
                    },
                    {
                        title: '工号',
                        key: 'jobNumber'
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
            this.getUserList()
        },
        methods: {
            getUserList() {
                this.http.get('users/list', {}).then(data => {
                    this.dataList = data;
                })
            },
            add() {
              this.$router.push('/user/add')
            },
            edit(params){
                this.$router.push({
                    path:'/user/add',
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

                        this.http.post('users/remove',{
                            _id:params.row._id
                        }).then(()=>{
                            this.$Message.success("删除成功")
                            this.getUserList()
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
