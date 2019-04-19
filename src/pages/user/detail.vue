<template>
    <Row style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form :label-width="80">

                <FormItem label="用户名：" prop="username">
                    {{userInfo.username}}
                </FormItem>


                <FormItem label="姓名：" prop="name">
                    {{userInfo.name}}
                </FormItem>

                <FormItem label="用户类型：" prop="name">
                    <template v-if="userInfo.type===0">学生</template>
                    <template v-if="userInfo.type===1">教师</template>
                    <template v-if="userInfo.type===2">管理员</template>
                </FormItem>


                <FormItem v-show="userInfo.type===0" label="学号：">
                    {{userInfo.studentNumber}}
                </FormItem>


                <FormItem v-show="userInfo.type===1" label="工号：">
                    {{userInfo.jobNumber}}
                </FormItem>


            </Form>
        </Col>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                userInfo: this.$store.state.userInfo
            }
        },
        mounted(){
        },
        methods:{
        }
    }
</script>
