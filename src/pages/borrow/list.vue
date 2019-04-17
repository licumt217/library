<template>


    <div>

        <!--此处改为@click不生效-->
        <Tabs @on-click="query">

            <TabPane label="在借列表" name="ing">
                <Table stripe :columns="columns" :data="dataList"></Table>
            </TabPane>

            <TabPane label="已还列表" name="done">
                <Table stripe :columns="columnsDone" :data="dataListDone"></Table>
            </TabPane>

            <Button type="success" @click="borrow" slot="extra" size="small">借阅</Button>

        </Tabs>



    </div>


</template>

<script>
    require('../../assets/js/datePrototype')



    export default {
        data() {
            return {
                backModal:false,
                activeTab:'ing',
                columns: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '书籍名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', {}, params.row.book.name)
                        }
                    },
                    {
                        title: '作者',
                        key: 'author',
                        render: (h, params) => {
                            return h('div', {}, params.row.book.author)
                        }
                    },
                    {
                        title: '借阅时间',
                        key: 'startTime',
                        render: (h, params) => {
                            return h('div', {}, new Date(Date.parse(params.row.startTime)).Format('yyyy/MM/dd hh:mm:ss'))
                        }
                    },
                    {
                        title: '到期时间',
                        key: 'endTime',
                        render: (h, params) => {
                            return h('div', {}, new Date(Date.parse(params.row.endTime)).Format('yyyy/MM/dd hh:mm:ss'))
                        }
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
                                            this.renew(params)
                                        }
                                    }
                                },'续借'),
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
                                            this.back(params)
                                        }
                                    }
                                },'归还')
                            ])
                        }
                    }

                ],
                columnsDone: [
                    {
                        type:'index',
                        width:60,
                        align:'center'
                    },
                    {
                        title: '书籍名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', {}, params.row.book.name)
                        }
                    },
                    {
                        title: '作者',
                        key: 'author',
                        render: (h, params) => {
                            return h('div', {}, params.row.book.author)
                        }
                    },
                    {
                        title: '借阅时间',
                        key: 'startTime',
                        render: (h, params) => {
                            return h('div', {}, new Date(Date.parse(params.row.startTime)).Format('yyyy/MM/dd hh:mm:ss'))
                        }
                    },
                    {
                        title: '到期时间',
                        key: 'endTime',
                        render: (h, params) => {
                            return h('div', {}, new Date(Date.parse(params.row.endTime)).Format('yyyy/MM/dd hh:mm:ss'))
                        }
                    },
                    {
                        title: '归还时间',
                        key: 'backTime',
                        render: (h, params) => {
                            return h('div', {}, new Date(Date.parse(params.row.backTime)).Format('yyyy/MM/dd hh:mm:ss'))
                        }
                    },



                ],
                dataList: [],
                dataListDone: []
            }
        },
        mounted() {
            this.query()
        },
        methods: {
            query(name='ing'){
                let state=0;

              if(name==='done'){
                  state=1;
              }
                this.http.get('borrows/list', {
                    params:{
                        "user":this.$store.state.userId,
                        "state":state
                    }
                }).then(data => {

                    if(name==='done'){
                        this.dataListDone = data;
                    }else{
                        this.dataList = data;
                    }
                })
            },
            borrow() {
              this.$router.push('/book/list')
            },
            back(params){
                this.$Modal.confirm({
                    title: '归还书籍',
                    content: '您确认归还此书籍吗？',
                    onOk: () => {
                        this.http.post('borrows/back',{
                            _id:params.row._id
                        }).then(()=>{
                            this.$Message.success("归还成功")
                            this.query();
                        }).catch(error=>{
                            this.$Message.error(error)
                        })
                    },
                    onCancel: () => {
                    }
                });



            },
            renew(params){
                this.$router.push({
                    path:'/borrow/operate',
                    query:{
                        opType:'renew',
                        bookId:params.row.book._id,
                        _id:params.row._id
                    }
                })
            },
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
