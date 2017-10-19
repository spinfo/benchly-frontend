import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VModal from 'vue-js-modal'

import Workflow from './Workflow.vue'
import ModuleCategory from './ModuleCategory.vue'
import Module from './Module.vue'
import ModulePropertiesEditor from './ModulePropertiesEditor.vue'

Vue.use(VueRouter)
Vue.use(VModal)

Vue.component('module-category', ModuleCategory)
Vue.component('module', Module)
Vue.component('module-properties-editor', ModulePropertiesEditor)

const Jobs = { template: '<div><h2>Jobs</h2></div>' }

const routes = [
    { path: '/', redirect: '/workflow' },
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
