<template>
    <Modal
            v-model="isShow"
            title="密码修改"
            >

        <Row>
            <Col span="18" offset="3">
                <Form ref="form" :model="formItem" :label-width="90" :rules="rules">

                    <FormItem label="原始密码" prop="password">
                        <Input v-model="formItem.password" placeholder="请输入原始密码"></Input>
                    </FormItem>

                    <FormItem label="新密码" prop="newPassword">
                        <Input v-model="formItem.newPassword" placeholder="请输入新密码"></Input>
                    </FormItem>

                    <FormItem label="确认新密码" prop="confirmPassword">
                        <Input v-model="formItem.confirmPassword" placeholder="请确认新密码"></Input>
                    </FormItem>

                </Form>
            </Col>

        </Row>
        <div slot="footer">
            <Button @click="hide">取消</Button>
            <Button type="primary" @click="ok">确定</Button>
        </div>

    </Modal>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                isShow:false,
                formItem: {
                    password:'',
                    newPassword:'',
                    confirmPassword:'',

                },
                rules:{
                    password:[{required:true,message:'原始密码不能为空',trigger:'blur'}],
                    newPassword:[{required:true,message:'新密码不能为空',trigger:'blur'}],
                    confirmPassword:[{required:true,message:'确认密码不能为空',trigger:'blur'}],
                }
            }
        },
        props: {
        },
        computed:{
        },
        methods: {
            show(){
                this.isShow=true;
            },
            ok() {
                this.$refs.form.validate((valid)=>{
                    if(valid){
                        setTimeout(()=>{
                            this.isShow=false;
                        },3000)
                    }




                })
            },
            hide(){
                this.isShow=false;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
