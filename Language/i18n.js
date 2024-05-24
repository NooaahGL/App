import 'intl-pluralrules'
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en/translation.json';
import translationES from './es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      es: {
        translation: translationES,
      },
    },
    lng: 'en', 
    fallbackLng: 'es', // Establece el idioma de reserva
    interpolation: {
      escapeValue: false, // No escapa HTML en los archivos de traducción
    },
  });

export default i18n;
