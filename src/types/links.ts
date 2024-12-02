type Link = {
    path: string;
    name: string;
    component?: any;
    routes?: Link[];
    noTranslate?: boolean;
    last?: boolean;
}


export default Link;