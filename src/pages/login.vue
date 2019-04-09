<template>


    <Modal v-model="isShowLoginModal" width="460" :closable="false" :mask-closable="false">
        <p slot="header" style="color:#f60;text-align:center">
            <!--<Icon type="ios-information-circle"></Icon>-->
            <span>登录</span>
        </p>
        <div style="text-align:center">
            <Form :model="formItem" :label-width="80">

                <FormItem label="用户名">
                    <Input v-model="formItem.username" placeholder="请输入用户名"></Input>
                </FormItem>

                <FormItem label="密码">
                    <Input v-model="formItem.password" placeholder="请输入密码"></Input>
                </FormItem>

                <FormItem label="用户类型">
                    <RadioGroup v-model="formItem.userType">
                        <Radio label="student">学生</Radio>
                        <Radio label="teacher">教师</Radio>
                        <Radio label="admin">管理员</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem v-show="formItem.userType==='student'" label="学号">
                    <Input v-model="formItem.studentNumber" placeholder="请输入学号"></Input>
                </FormItem>

                <FormItem v-show="formItem.userType==='teacher'"  label="工号">
                    <Input v-model="formItem.jobNumber" placeholder="请输入工号"></Input>
                </FormItem>


            </Form>
        </div>
        <div slot="footer" style="text-align: center">
            <Button type="primary">登录</Button>
        </div>
    </Modal>



</template>

<script>
    export default {
        data() {
            return {
                formItem: {
                    username: '',
                    password: '',
                    userType: 'student',
                    studentNumber: '',
                    jobNumber: '',
                },
                isShowLoginModal:true
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
