<template>


    <div>
        <Row>
            <Col span="4" offset="10">
                <div style="text-align: center;margin:2em auto;">
                    <h2>
                        用户登录
                    </h2>
                </div>
                <div style="text-align:center">
                    <Form ref='loginForm' :model="formItem" :label-width="80" :rules="rules">

                        <FormItem label="用户名" prop="username">
                            <Input prefix="ios-contact" v-model="formItem.username" placeholder="请输入用户名"/>
                        </FormItem>

                        <FormItem label="密码" prop="password">
                            <Input prefix="ios-lock" type="password" v-model="formItem.password" placeholder="请输入密码"/>
                        </FormItem>

                    </Form>
                </div>
                <div style="text-align: center">
                    <Button type="primary" @click="login">登录</Button>
                </div>
            </Col>
        </Row>
    </div>


</template>

<script>
    const md5=require('md5')
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
            }
        },
        computed: {
            isLogin() {
                return this.$store.state.isLogin;
            },
        },
        mounted() {
            if (this.isLogin) {
                this.$router.push('/user/list')
            }
        },
        methods: {
            login() {

                this.$refs.loginForm.validate((valid) => {
                    if (valid) {

                        this.formItem.password=md5(this.formItem.password)

                        this.http.post('users/login', {
                            username: this.formItem.username,
                            password: this.formItem.password
                        }).then((data) => {
                            this.$Message.success("登录成功")

                            this.$store.commit('isLogin', true)
                            this.$store.commit('userId', data._id)
                            this.$store.commit('username', data.username)
                            this.$store.commit('userInfo', data)


                            this.$router.push('/user/list')

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
</style>
