import type Link from "@/types/links";

// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import { faFolder } from "@fortawesome/free-regular-svg-icons";
// import { faHome, faFlask } from "@fortawesome/free-solid-svg-icons";

// import { h, defineComponent, } from "vue";
import settingSvg from '@/assets/icon/setting.svg';
import helpSvg from '@/assets/icon/help.svg';

const links: Link[] = [
    {
        name: 'help',
        path: '/help',
        component: helpSvg,
    },
    {
        name: 'setting.title',
        path: '/setting',
        component: settingSvg,
        last: true,
    },
]




export default links;