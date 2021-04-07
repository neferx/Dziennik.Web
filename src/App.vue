<template>
    <div id="nav">
        <Sidebar />
        <PanelMenu id="user-nav" :model="items" />
    </div>
    <router-view />
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import PanelMenu from 'primevue/panelmenu'

export default {
    components: {
        Sidebar,
        PanelMenu,
    },
    data() {
        return {
            items: [
                {
                    label: 'User',
                    items: [
                        {
                            label: 'Login',
                            url: 'login',
                            icon: 'pi pi-fw pi-user',
                        },
                        {
                            label: 'Register',
                            url: '/register',
                            icon: 'pi pi-fw pi-user-plus',
                        },
                    ],
                },
            ],
        }
    },
}
</script>

<style lang="scss" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}

#nav {
    color: #2c3e50;
    font-weight: bold;
    justify-content: center;
    width: 100vw;
    height: 150px;
    display: flex;
    flex-direction: row;
    #user-nav {
        width: 130px;
        margin-left: auto;
    }
}
</style>
