<template>
    <Row style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="书籍名称：" >
                    <span>{{formItem.name}}</span>
                </FormItem>


                <FormItem label="作者：" >
                    <span>{{formItem.author}}</span>
                </FormItem>


                <FormItem label="归还日期：" >
                    <DatePicker type="date" v-model="formItem.endTime" :options="endTimeOptions" placeholder="请输入归还日期" ></DatePicker>
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="operate">确定</Button>
                    <Button style="margin-left: 8px" @click="goBack">返回</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script>
    require('../../assets/js/datePrototype')
    export default {
        data () {
            return {
                isRenew:this.$route.query.opType==='renew',

                formItem: {
                    name: '',
                    author: '',
                    user:this.$store.state.userId,
                    endTime:new Date(),
                },
                rules:{
                },
                endTimeOptions:{
                    disabledDate(date){

                        return date.getTime()<new Date().getTime() || date.getTime()>new Date().add(30).getTime();
                    }
                },
                book:this.$route.query.bookId ,
            }
        },
        mounted(){
            if(!this.book){
                this.$Message.error("图书编号不能为空！")
                this.goBack()
                return;
            }
            if(this.isRenew){
                this.formItem._id=this.$route.query._id;
            }

            this.query();
        },
        methods:{
            goBack(){
                this.$router.go(-1)
            },
            query(){
                this.http.get('books/get',{
                    params:{
                        _id:this.book
                    }
                }).then((data)=>{

                    this.formItem.name=data.name;
                    this.formItem.author=data.author;

                }).catch(err=>{
                    this.$Message.error(err)
                })
            },
            operate(){

                if(this.formItem.endTime){
                    let url='borrows/add';
                    if(this.isRenew){
                        url='borrows/update'
                    }

                    this.formItem.book=this.book;

                    this.http.post(url,this.formItem).then(()=>{
                        this.$router.push({path:'/borrow/list'})
                    }).catch(err=>{
                        this.$Message.error(err)
                    })
                }else{


                    this.$Message.error("请选择归还日期！")
                }


            },
            go2List(){
                this.$router.push('/book/list')
            }
        }
    }
</script>
