import type Link from "@/types/links";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { faHome, faFlask } from "@fortawesome/free-solid-svg-icons";

import { h, defineComponent, } from "vue";

import examSvg from '@/assets/icon/exam.svg';
import questionSvg from '@/assets/icon/question.svg';
import electronSvg from '@/assets/icon/electron.svg';


const dev = import.meta.env.DEV;


const links: Link[] = [

    {
        name: 'home',
        path: '/home',
        component:  defineComponent({
            render() {
                return  h(FontAwesomeIcon, { icon: faHome })
            }
        }),
    },
    {
        name: 'subject',
        path: '/subject',
        component: electronSvg,
    },
    {
        name: 'question.title',
        path: '/question',
        component: questionSvg,
    },
    {
        name: 'exam.title',
        path: '/exam',
        component: examSvg,
    },

]

dev && links.push({
    name: 'dev only',
    path: '/dev',
    noTranslate: true,
    component:  defineComponent({
        render() {
            return  h(FontAwesomeIcon, { icon: faFlask })
        }
    }),
});


export default links;