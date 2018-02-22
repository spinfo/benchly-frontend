import Vue from 'vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import VResource from 'vue-resource'

import App           from './App.vue'
import Workflow      from './Workflow.vue'
import WorkflowIndex from './WorkflowIndex.vue'
import Login         from './Login.vue'
import BlyUtil       from './util.js'

Vue.use(VueRouter)
Vue.use(VModal)
Vue.use(VResource)

// setup components
import ModuleCategory         from './workflow-editor/ModuleCategory.vue'
import Module                 from './workflow-editor/Module.vue'
import ModulePropertiesEditor from './workflow-editor/ModulePropertiesEditor.vue'
import WorkflowEditor         from './workflow-editor/WorkflowEditor.vue'
import Pagination             from './Pagination.vue'
Vue.component('module-category', ModuleCategory)
Vue.component('module', Module)
Vue.component('module-properties-editor', ModulePropertiesEditor)
Vue.component('workflow-editor', WorkflowEditor)
Vue.component('pagination', Pagination)

const Jobs = { template: '<div><h2>Jobs</h2></div>' }

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/workflows',
        component: WorkflowIndex,
        props: (route) => ({
            offset: BlyUtil.parsePositiveInt(route.query.offset, 0),
            limit: BlyUtil.parsePositiveInt(route.query.limit, 10)
        })
    },
    {
        path: '/workflows/new',
        component: Workflow
    },
    {
        path: '/workflows/:versionId',
        component: Workflow,
        props: true
    },
    {
        path: '/workflows/:versionId/version/:id',
        component: Workflow,
        props: true
    },
    {
        path: '/jobs',
        component: Jobs
    }
]

const router = new VueRouter({
    routes: routes
})

new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})
