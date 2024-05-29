import spanish from './es.json'
import catalan from './ca.json'
import english from './en.json'

const LANGUAGES = {
    SPANISH: 'es',
    CATALAN: 'ca',
    ENGLISH: 'es'
}

export const geti18n = ({ currentLocale = 'es' }) => {
    if (currentLocale === LANGUAGES.SPANISH) return spanish
    if (currentLocale === LANGUAGES.CATALAN) return catalan
    if (currentLocale === LANGUAGES.ENGLISH) return english
    // default
    return spanish
}