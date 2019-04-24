<template>
    <Row  style="margin-top:3em;">
        <Col span="8" offset="8">
            <Form ref="addForm" :model="formItem" :label-width="80" :rules="rules">

                <FormItem label="父级资源" >
                    {{parentTitle}}
                </FormItem>

                <FormItem label="资源名称" prop="name">
                    <Input v-model="formItem.name" placeholder="输入资源名称" />
                </FormItem>


                <FormItem label="资源地址" prop="url">
                    <Input v-model="formItem.url" placeholder="输入资源地址" />
                </FormItem>

                <FormItem label="资源图标">
                    <Input v-model="formItem.icon" placeholder="输入资源图标" />
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
                parentTitle:this.$route.query.parentTitle,
                isEdit:this.$route.query.opType==='edit',
                formItem: {
                    name: '',
                    url: '',
                    icon: '',
                    opUserId:this.$store.state.userId,
                    parentCode:this.$route.query.parentCode

                },
                rules:{
                    name:[
                        {required:true,message:'资源名称不能为空',trigger:'blur'},
                        {max:20,message:'资源名称不能多于20字',trigger:'blur'}
                    ],url:[
                        {required:true,message:'资源地址不能为空',trigger:'blur'},
                        {max:40,message:'资源地址长度不能大于40',trigger:'blur'}
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

                        let url='resources/add';
                        if(this.isEdit){
                            url='resources/update'
                        }
                        if(!this.formItem.icon){
                         this.formItem.icon=undefined;
                        }
                        this.http.post(url,this.formItem).then(()=>{
                            this.$Message.success("添加成功！")
                            this.$router.push('/resource/list')
                        }).catch(err=>{
                            this.$Message.error(err)
                        })

                    }
                });
            },
            go2List(){
                this.$router.push('/resource/list')
            }
        }
    }
</script>
