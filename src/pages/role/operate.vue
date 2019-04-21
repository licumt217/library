<template>
    <Row  style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="角色名称" prop="name">
                    <Input v-model="formItem.name" placeholder="输入角色名称" />
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

                },
                rules:{
                    name:[
                        {required:true,message:'角色名称不能为空',trigger:'blur'},
                        {max:40,message:'角色名称不能多于40字',trigger:'blur'}
                    ]
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

                        let url='roles/add';
                        if(this.isEdit){
                            url='roles/update'
                        }

                        this.http.post(url,this.formItem).then(()=>{
                            this.$router.push('/role/list')
                        }).catch(err=>{
                            this.$Message.error(err)
                        })

                    }
                });
            },
            go2List(){
                this.$router.push('/role/list')
            }
        }
    }
</script>
