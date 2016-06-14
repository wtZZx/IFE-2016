import Vue from 'vue'
import App from '../components/App.vue'
import QuestionnaireList from '../components/QuestionnaireList.vue'
import Create from '../components/Create.vue'
import Join from '../components/Join.vue'

import VueRouter from 'vue-router'


Vue.use(VueRouter)

const router = new VueRouter()

router.map({
    '/App': {
        component: App
    },
    '/QuestionnaireList': {
        component: QuestionnaireList
    },
    '/Create': {
        component: Create
    },
    'Join/:index': {
        component: Join
    }
})

router.redirect({
    '*': '/QuestionnaireList'
})

router.start(App, '#app')