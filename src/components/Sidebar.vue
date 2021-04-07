<template>
    <div class="navbar">
        <div class="element">
            <router-link to="/">Home</router-link>
            <!-- <img src="../assets/logo.png"/> -->
        </div>
        <div class="element">
            <router-link to="/about">About</router-link>
            <!-- <img src="../assets/logo.png"/> -->
        </div>
        <div class="element">
            <router-link to="/teacherlist">Teacher List</router-link>
            <!-- <img src="../assets/logo.png"/> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.navbar {
    height: 70px;
    width: 50%;
    display: flex;
    justify-content: center;
    background: pink;
    margin-left: auto;
}
.element {
    //padding:20px 40px 20px 40px;
    background-color: #318ce7;
    display: block;
    border-right: 1px solid gray;
    transition: all 0.35s linear;
    height: 100%;
    width: 100%;
    :last-child {
        border-right: none;
    }
    &:hover,
    &:focus {
        box-shadow: inset 0 0 0 2em var(--hover);
    }
    &:hover {
        //transform:rotate(360deg);
        height: 105%;
        width: 105%;
    }
    a {
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100%;
        width: 100%;
        text-align: center;
    }
}
.element a.router-link-exact-active {
    color: white;
}
</style>
