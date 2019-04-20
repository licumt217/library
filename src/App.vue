<template>
    <div id="app">
        <div class="layout" :class="{'layout_notlogin':!isLogin}">
            <Layout>
                <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed"
                       style="min-height: 1768px;" :class="{'hidden':!isLogin}">
                    <Menu :active-name="activeMenuName" theme="dark" width="auto" :class="menuitemClasses">

                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                权限管理
                            </template>
                            <MenuItem name="1-3" to="/resource/list">资源管理</MenuItem>
                            <MenuItem name="1-2">角色管理</MenuItem>
                            <MenuItem name="1-1">人员管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people" />
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>



                        <MenuItem :name="menu.order" :to="menu.url" v-for="menu in menuList">
                            <Icon :type="menu.icon"></Icon>
                            <span>{{menu.name}}</span>
                        </MenuItem>

                    </Menu>











                </Sider>
                <Layout :class="{'layout_notlogin':!isLogin}">
                    <Header :style="{padding: 0}" class="layout-header-bar" :class="{'hidden':!isLogin}">
                        <Row>
                            <Col span="4">
                                <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}"
                                      type="md-menu" size="24"></Icon>
                            </Col>
                            <Col span="6" offset="14">

                                <Menu mode="horizontal" active-name="1" @on-select="operate" style="display: inline-block;float: right">
                                    <Submenu name="3">
                                        <template slot="title">
                                            <Icon type="ios-stats"/>
                                            个人中心
                                        </template>
                                        <MenuGroup title="个人设置" >
                                            <MenuItem name="logout" >退出登录</MenuItem>
                                            <MenuItem name="passModify">修改密码</MenuItem>
                                        </MenuGroup>
                                    </Submenu>
                                </Menu>
                                <div style="float: right" @click="go2UserDetail">
                                    <Avatar icon="ios-person" style="background-color: #87d068" /> {{username}}
                                </div>

                            </Col>
                        </Row>


                    </Header>
                    <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                        <router-view></router-view>
                    </Content>
                </Layout>
            </Layout>
        </div>

        <Pass ref="pass" :isShow="isShowPassModifyModal"></Pass>

    </div>
</template>

<script>
    import Pass from './components/PasswordModify'
    export default {
        name: 'app',
        data() {
            return {
                isCollapsed: false,
                isShowPassModifyModal:false,
            }
        },
        components:{
          Pass
        },
        computed: {

            menuList(){
                return this.$store.state.menuList;
            },
            activeMenuName(){
                return this.$store.state.activeMenuName;
            },
            username(){
                return this.$store.state.username;
            },
            isLogin() {
                return this.$store.state.isLogin;
            },
            rotateIcon() {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses() {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {

            collapsedSider() {
                this.$refs.side1.toggleCollapse();
            },

            operate(name){

                if(name==='logout'){

                    this.$store.commit('reset')
                    this.$router.push('/login')

                }else if(name==='passModify'){
                    this.$refs.pass.show();
                }

            },
            go2UserDetail(){
                this.$router.push('/user/detail')
            }

        },
        mounted() {

            if (!this.isLogin) {
                this.$router.push('/login')
            }
        }
    }
</script>

<style>
    body {
        overflow: hidden;
    }

    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout_notlogin {
        border: none;
        background: #fff !important;
    }

    .layout-header-bar {
        background: #fff !important;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
    }

    .layout-logo-left {
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }

    .menu-icon {
        transition: all .3s;
    }

    .rotate-icon {
        transform: rotate(-90deg);
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }

    .hidden {
        display: none;
    }
    .ivu-menu-horizontal.ivu-menu-light:after{
        width: auto!important;
    }
     .ivu-menu-horizontal .ivu-menu-submenu {
        float: right!important;
         display: inline-block!important;
    }

</style>
