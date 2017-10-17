import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

import Workflow from './Workflow.vue'
import ModuleCategory from './ModuleCategory.vue'
import Module from './Module.vue'

Vue.use(VueRouter)

Vue.component('module-category', ModuleCategory)
Vue.component('module', Module)

const Jobs = { template: '<div><h2>Jobs</h2></div>' }

const routes = [
    { path: '/workflow', component: Workflow },
    { path: '/jobs',     component: Jobs }
]

const router = new VueRouter({
    routes: routes
})

new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})
