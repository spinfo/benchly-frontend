<template>
    <div id="app">
        <nav class="nav" tabindex="-1" onclick="this.focus()">
            <div class="container">
                <router-link class="pagename current" to="/">Benchly</router-link>
                <router-link to="/workflow">Workflow</router-link>
                <router-link to="/jobs">Jobs</router-link>
                <router-link to="/resources">Resources</router-link>
                <router-link to="/manage">Manage</router-link>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    }
}
</script>

<style>
    @import './assets/mincss.min.css'
</style>
