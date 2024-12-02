// import { createI18n } from 'vue-i18n'
// import type { I18n, VueI18n } from 'vue-i18n'
// import { nextTick } from 'vue'

// // get all locales using

// interface LangObj {
//   [key: string]: any
// }

// const i18n = setupI18n()

// export const SUPPORT_LOCALES = ['vi', 'en'] as const

// export function setupI18n(options : {locale: string} = { locale: 'vi' }) {
//     const i18n = createI18n(options)
//     setI18nLanguage(options.locale)
//     return i18n
// }

// export async function loadLocaleMessages(locale: string) {
//     // load locale messages with dynamic import
//     const messages = await fetch('./locales/' + locale + '.json').then(res => res.json())

//     // set locale and locale message
//     i18n.global.setLocaleMessage(locale, messages.default)

//     return nextTick()
//   }



// export function setI18nLanguage(locale: string) {
//     if (i18n.mode === 'legacy') {
//       i18n.global.locale = locale
//     } else {
//         // @ts-ignore
//       (i18n).global.locale.value = locale
//     }
//     /**
//      * NOTE:
//      * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
//      * The following is an example for axios.
//      *
//      * axios.defaults.headers.common['Accept-Language'] = locale
//      */
//     document.querySelector('html')?.setAttribute('lang', locale)
//   }




// export default i18n


import { createI18n } from 'vue-i18n'
import type { I18n } from 'vue-i18n'




interface LangObj {
    [key: string]: string
}

const loadI18nLanguage = async (i18n: I18n, locale: string = 'default', forced: boolean = false) => {
    console.log(locale, i18n.global.availableLocales, i18n.global.locale)
    if (i18n.global.availableLocales.includes(locale) && !forced) {
        return
    }
    const json = localStorage.getItem(`locale`)
    const locales = json ? JSON.parse(json) : {}
    if (locales?.[locale] && !forced) {
        console.log(locales[locale])
        i18n.global.setLocaleMessage(locale, locales[locale])
        return
    }


    const messages = await fetch('/locales/' + locale + '.json').then(res => res.json())
    i18n.global.setLocaleMessage(locale, messages)
    localStorage.setItem(`locale`, JSON.stringify({
        ...locales,
        [locale]: messages
    }))
}

const setI18nLanguage = (i18n: I18n, locale: string) => {
    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale
    } else {
        // @ts-ignore
        i18n.global.locale.value = locale
    }
    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector('html')?.setAttribute('lang', locale)
}


const i18n = createI18n({
    legacy: false,
})


// loadLocaleMessages().then((messages) => {
//     i18n.global.setLocaleMessage('vi', messages.vi)
//     i18n.global.setLocaleMessage('en', messages.en)
// })


export default i18n
export { loadI18nLanguage, setI18nLanguage }