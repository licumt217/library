<template>
    <Row  style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="书籍名称" prop="name">
                    <Input v-model="formItem.name" placeholder="输入书籍名称" />
                </FormItem>


                <FormItem label="作者" prop="author">
                    <Input v-model="formItem.author" placeholder="输入作者" />
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="operate">确定</Button>
                    <Button style="margin-left: 8px" @click="go2List">返回</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                isEdit:this.$route.query.opType==='edit',
                formItem: {
                    name: '',
                    author: '',

                },
                rules:{
                    name:[
                        {required:true,message:'书籍名称不能为空',trigger:'blur'},
                        {max:40,message:'书籍名称不能多于40字',trigger:'blur'}
                    ],auhtor:[
                        {max:20,message:'作者姓名长度不能大于20',trigger:'blur'}
                    ],
                }
            }
        },
        mounted(){
          console.log(this.opType)
            if(this.isEdit){
                this.formItem=this.$route.query.formItem;
            }
        },
        methods:{
            operate(){
                this.$refs.addForm.validate(valid=>{
                    if(valid){

                        let url='books/add';
                        if(this.isEdit){
                            url='books/update'
                        }

                        this.http.post(url,this.formItem).then(()=>{
                            this.$router.push('/book/list')
                        }).catch(err=>{
                            this.$Message.error(err)
                        })

                    }
                });
            },
            go2List(){
                this.$router.push('/book/list')
            }
        }
    }
</script>
