<template>


    <div v-if="isShowLoginModal">
        <Modal v-model="isShowLoginModal" width="460" :closable="false" :mask-closable="false">
            <p slot="header" style="color:#f60;text-align:center">
                <!--<Icon type="ios-information-circle"></Icon>-->
                <span>登录</span>
            </p>
            <div style="text-align:center">
                <Form ref='loginForm' :model="formItem" :label-width="80" :rules="rules">

                    <FormItem label="用户名" prop="username">
                        <Input v-model="formItem.username" placeholder="请输入用户名"/>
                    </FormItem>

                    <FormItem label="密码" prop="password">
                        <Input v-model="formItem.password" placeholder="请输入密码"/>
                    </FormItem>

                    <!--<FormItem label="用户类型">-->
                    <!--<RadioGroup v-model="formItem.userType">-->
                    <!--<Radio label="student">学生</Radio>-->
                    <!--<Radio label="teacher">教师</Radio>-->
                    <!--<Radio label="admin">管理员</Radio>-->
                    <!--</RadioGroup>-->
                    <!--</FormItem>-->

                    <!--<FormItem v-show="formItem.userType==='student'" label="学号">-->
                    <!--<Input v-model="formItem.studentNumber" placeholder="请输入学号" />-->
                    <!--</FormItem>-->

                    <!--<FormItem v-show="formItem.userType==='teacher'"  label="工号">-->
                    <!--<Input v-model="formItem.jobNumber" placeholder="请输入工号" />-->
                    <!--</FormItem>-->


                </Form>
            </div>
            <div slot="footer" style="text-align: center">
                <Button type="primary" @click="login">登录</Button>
            </div>
        </Modal>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                formItem: {
                    username: '',
                    password: '',
                    // userType: 'student',
                    // studentNumber: '',
                    // jobNumber: '',
                },
                rules: {
                    username: [
                        {required: true, message: "用户名不能为空", trigger: "blur"},
                        {type: 'string', min: 6, message: '用户名长度不能少于6位', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: "密码不能为空", trigger: "blur"}
                    ],
                },
                isShowLoginModal: true
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if (this.isLogin === 'yes') {
                this.$router.push('/')
            }
        },
        methods: {
            login() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        this.http.post('users/login', {
                            username: this.formItem.username,
                            password: this.formItem.password
                        }).then(() => {
                            this.$Message.success("登录成功")
                            this.isShowLoginModal = false;

                            this.$store.commit('isLogin', 'yes')


                            this.$router.push('user/list')

                        }).catch(err => {
                            this.$Message.error(err)
                        })
                    }

                })

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
