<template>


    <div>

        <Row style="padding:5px;">

            <Col span="8" offset="8" >
                <RadioGroup v-model="authRole._id" vertical>

                    <Radio label="none" >
                        <span>无</span>
                    </Radio>

                    <Radio :label="role._id" v-for="role in roleList">
                        <span>{{role.name}}</span>
                    </Radio>

                </RadioGroup>
            </Col>

        </Row>


        <Row style="margin-top:3em;">
            <Col span="8" offset="8" >
                <Button type="success" @click="auth" style="margin-right:8em;">保存</Button>
                <Button @click="cancel">取消</Button>

            </Col>
        </Row>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                authRole:{}, //所有用户的角色
                userId:this.$route.query.userId,
                roleList:[]
            }
        },
        mounted() {


            this.listRole()



        },
        methods: {
            listRole() {
                this.http.get('roles/list', {
                }).then(data => {
                    this.roleList=data;
                    this.getRoleByUserId()

                })
            },
            getRoleByUserId(){
                this.http.get('roles/getRoleByUserId', {
                    params:{
                        userId:this.userId
                    }
                }).then(data => {
                    this.authRole=data;

                })
            },
            auth() {

                if(this.authRole._id){
                    this.http.post('users/auth',{
                        userId:this.userId,
                        roleId:this.authRole._id,
                    }).then(()=>{
                        this.$Message.success("授权成功")
                        this.cancel()

                    }).catch(error=>{
                        this.$Message.error(error)
                    })
                }else{
                    this.$Message.warning("请先选择角色")
                }


            },
            cancel(){
              this.$router.push('/user/list')
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
