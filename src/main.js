import Vue from 'vue'
import VueRouter from 'vue-router'
import VModal from 'vue-js-modal'
import VResource from 'vue-resource'

import App           from './App.vue'
import Workflow      from './Workflow.vue'
import WorkflowIndex from './WorkflowIndex.vue'
import Login         from './Login.vue'
import JobNew        from './JobNew.vue'
import Job           from './Job.vue'
import JobIndex      from './JobIndex.vue'
import UserIndex     from './UserIndex.vue'
import UserNew       from './UserNew.vue'
import User          from './User.vue'
import StorageIndex  from './StorageIndex.vue'
import StorageNew    from './StorageNew.vue'
import StorageEdit   from './StorageEdit.vue'

import BlyUtil       from './util.js'

Vue.use(VueRouter)
Vue.use(VModal)
Vue.use(VResource)

// setup components
import ModuleCategory          from './workflow-editor/ModuleCategory.vue'
import Module                  from './workflow-editor/Module.vue'
import ModulePropertiesEditor  from './workflow-editor/ModulePropertiesEditor.vue'
import WorkflowEditor          from './workflow-editor/WorkflowEditor.vue'
import Pagination              from './Pagination.vue'
import StorageFileUploadButton from './StorageFileUploadButton.vue'

Vue.component('module-category', ModuleCategory)
Vue.component('module', Module)
Vue.component('module-properties-editor', ModulePropertiesEditor)
Vue.component('workflow-editor', WorkflowEditor)
Vue.component('pagination', Pagination)
Vue.component('storage-file-upload-button', StorageFileUploadButton)

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
        name: 'workflow-index',
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
        name: 'workflow-edit',
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
        name: 'job-index',
        path: '/jobs',
        component: JobIndex,
        props: (route) => ({
            offset: BlyUtil.parsePositiveInt(route.query.offset, 0),
            limit: BlyUtil.parsePositiveInt(route.query.limit, 10)
        })
    },
    {
        name: 'job',
        path: '/jobs/:id',
        component: Job,
        props: true
    },
    {
        name: 'job-new',
        path: '/workflows/:versionId/submit',
        component: JobNew,
        props: true
    },
    {
        name: 'user',
        path: '/users/:id',
        component: User,
        props: true
    },
    {
        name: 'user-new',
        path: '/users/new',
        component: UserNew
    },
    {
        name: 'user-index',
        path: '/users',
        component: UserIndex,
        props: (route) => ({
            offset: BlyUtil.parsePositiveInt(route.query.offset, 0),
            limit: BlyUtil.parsePositiveInt(route.query.limit, 10)
        })
    },
    {
        name: 'storage-index',
        path: '/storage',
        component: StorageIndex
    },
    {
        name: 'storage-new',
        path: '/storage/new',
        component: StorageNew
    },
    {
        name: 'storage-edit',
        path: '/storage/:id',
        component: StorageEdit,
        props: true
    },
]

const router = new VueRouter({
    routes: routes
})

new Vue({
    router: router,
    el: '#app',
    render: h => h(App)
})
