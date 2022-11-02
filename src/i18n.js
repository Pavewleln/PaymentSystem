import i18n from 'i18next'
import {initReactI18next} from "react-i18next";
import en from '../src/trans/en.json'
import ru from '../src/trans/ru.json'

const resources = {
    en: {
        translation: en
    },
    ru: {
        translation: ru
    }
}

i18n.use(initReactI18next).init({
    resources,
    lng: JSON.parse(localStorage.getItem('language')),
    fallbackLng: 'ru'
})

export default i18n;