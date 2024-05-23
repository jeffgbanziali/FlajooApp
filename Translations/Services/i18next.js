import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import English from "../English/English.json";
import French from "../French/French.json";
import Sango from "../Sango/Sango.json"



export const languageResources = {
    en: { translation: English },
    fr: { translation: French },
    sg: { translation: Sango }

};

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    fallbackLng: 'en',
    resources: languageResources,
});

export default i18next;