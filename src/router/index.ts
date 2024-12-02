import { createRouter, createWebHistory } from 'vue-router'
import DashBoardLayout from "@/layout/DashBoardLayout.vue";

const dev = import.meta.env.DEV;
 
const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: {
            layout: DashBoardLayout
        }
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
        meta: {
            layout: DashBoardLayout
        }
    },
    // {
    //     path: '/exam-preview-print',
    //     name: 'exam-preview-print',
    //     component: () => import('../views/ExamPreviewPrintView.vue')
    // },

    {
        path: '/question',
        // name: 'question',
        component: () => import('@/views/QuestionView/Index.vue'),
        children: [
            {
                path: '',
                name: 'question-list',
                component: () => import('@/views/QuestionView/ListView.vue')
            },
            {
                path: 'add',
                name: 'question-add',
                component: () => import('@/views/QuestionView/AddView.vue'),
                props: route => ({ mode: 'add' }),
                children: [
                    {
                        path: 'single',
                        name: 'question-add-single',
                        component: () => import('@/views/QuestionView/Single/EditorView.vue'),
                        props: route => ({ mode: 'add' })
                    },
                ],
                meta: {
                    layout: DashBoardLayout
                }
            },
            // {
            //     path: 'single/add',
            //     name: 'question-add-single',
            //     component: () => import('@/views/QuestionView/QuestionSingleAddEditView.vue'),
            //     props: route => ({ mode: 'add' })
            // },
            {
                path: 'single',
                name: 'question-single',
                component: () => import('@/views/QuestionView/Single/ManagerView.vue'),
                props: route => ({ id: route.params.id }),
                children: [

                    {
                        path: ':id',
                        name: 'question-single-detail',
                        component: () => import('@/views/QuestionView/Single/[id].InfoView.vue'),
                        // props: route => ({ mode: 'view' })
                    },
                    {
                        path: ':id/edit',
                        name: 'question-edit-single',
                        component: () => import('@/views/QuestionView/Single/EditorView.vue'),
                        props: route => ({ mode: 'edit' })
                    }
                ]
            },
            // {
            //     path: 'group/add',
            //     name: 'question-add-group',
            //     component: () => import('@/views/QuestionView/Group/QuestionGroupAddView.vue'),
            //     // props: true,
            // },
            // {
            //     path: 'single/:id/:mode',
            //     name: 'question-single',
            //     component: () => import('@/views/QuestionView/QuestionSingleAddEditView.vue'),
            //     props: true,
            // },
            // {
            //     path: 'single/:id',
            //     name: 'question-single-detail',
            //     component: () => import('@/views/QuestionView/QuestionSingleAddEditView.vue')
            // }

        ],
        meta: {
            layout: DashBoardLayout
        }
    },
    // {
    //     path: '/question',
    //     component: () => import('@/views/QuestionBankView/index.vue'),
    //     meta: {
    //         layout: DashBoardLayout
    //     },
    //
    // },

    {
        name: 'exam',
        path: '/exam',
        component: () => import('@/views/ExamView/index.vue'),
        children: [
            {
                path: '',
                name: 'exam-list',
                component: () => import('@/views/ExamView/ExamListView.vue')
            },
            // {
            //     path: 'print-preview',
            //     name: 'exam-print-preview',
            //     component: () => import('@/views/ExamView/[id].ExamPrint.vue')
            // },
            {
                path: 'add',
                name: 'exam-add',
                component: () => import('@/views/ExamView/ExamAddView.vue')
            },
            {
                path: ':id/edit',
                name: 'exam-edit',
                component: () => import('@/views/ExamView/ExamEditView.vue'),
                props: route => ({ id: route.params.id })
            },
            {
                path: ':id',
                name: 'exam-info',
                component: () => import('@/views/ExamView/[id].ExamInfo.vue'),
            },
            {
                path: ':id/print',
                name: 'exam-print',
                component: () => import('@/views/ExamView/[id].ExamPrint.vue'),
            }
        ],
        meta: {
            layout: DashBoardLayout
        }
    },
    {
        name: 'subject',
        path: '/subject',
        component: () => import('@/views/SubjectView.vue'),
        meta: {
            layout: DashBoardLayout
        }
    },
    {
        name: 'setting',
        path: '/setting',
        component: () => import('@/views/SettingView.vue'),
        meta: {
            layout: DashBoardLayout
        }
    },
    {
        name: 'auth',
        path: '/auth',
        component: () => import('@/views/AuthView.vue'),
    },
    // {
    //     name: 'profile',
    //     path: '/profile',
    //     component: () => import('@/views/AuthView.vue'),
    // },
    // {
    //     path: '/dev',
    //     name: 'dev',
    //     component: () => import('@/views/DevView.vue')
    // }
]

dev && routes.push({
    path: '/dev',
    name: 'dev',
    component: () => import('@/views/DevView.vue'),
    meta: {
        layout: DashBoardLayout
    }
});

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {

    const token = sessionStorage.getItem('token');
    if (to.name !== 'auth' && !token) {
        next({ name: 'auth' })
    }

    return next()

})

export default router
