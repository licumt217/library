<template>
    <Row>
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="用户名" prop="username">
                    <Input v-model="formItem.username" placeholder="输入用户名" />
                </FormItem>


                <FormItem label="姓名" prop="name">
                    <Input v-model="formItem.name" placeholder="输入姓名" />
                </FormItem>



                <FormItem label="用户类型">
                    <Select v-model="formItem.type">
                        <Option value="0">学生</Option>
                        <Option value="1">教师</Option>
                        <Option value="2">管理员</Option>
                    </Select>
                </FormItem>


                <FormItem v-show="formItem.type==='0'" label="学号">
                    <Input v-model="formItem.studentNumber" placeholder="输入学号" />
                </FormItem>


                <FormItem v-show="formItem.type==='1'" label="工号">
                    <Input v-model="formItem.jobNumber" placeholder="输入工号" />
                </FormItem>


                <FormItem>
                    <Button type="primary" @click="add">确定</Button>
                    <Button style="margin-left: 8px" @click="go2UserList">返回</Button>
                </FormItem>
            </Form>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                opType:this.$route.query.opType,
                formItem: {
                    username: '',
                    name: '',
                    type: '0',//0,1,2
                    studentNumber: '',
                    jobNumber: '',

                },
                rules:{
                    username:[
                        {required:true,message:'用户名不能为空',trigger:'blur'},
                        {min:6,message:'用户名长度需大于等于6',trigger:'blur'}
                    ],name:[
                        {required:true,message:'姓名不能为空',trigger:'blur'},
                        {max:6,message:'姓名长度不能大于6',trigger:'blur'}
                    ],
                }
            }
        },
        mounted(){
          console.log(this.opType)
            if(this.opType==='edit'){
                this.formItem=this.$route.query.formItem;
            }
        },
        methods:{
            add(){
                this.$refs.addForm.validate(valid=>{
                    if(valid){
                        if(this.formItem.type==='0'){

                            if(!this.formItem.studentNumber){
                                this.$Message.error("学号不能为空")
                                return;
                            }
                        }else if(this.formItem.type==='1'){
                            if(!this.formItem.jobNumber){
                                this.$Message.error("工号不能为空")
                                return;
                            }
                        }

                        

                        this.http.post('users/add',{
                            username:this.formItem.username,
                            name:this.formItem.name,
                            type:this.formItem.type,
                            studentNumber:this.formItem.studentNumber,
                            jobNumber:this.formItem.jobNumber,
                        }).then(()=>{
                            this.$router.push('/user/list')
                        }).catch(err=>{
                            this.$Message.error(err)
                        })

                    }
                });
            },
            go2UserList(){
                this.$router.push('/user/list')
            }
        }
    }
</script>
