import {translations} from "./translations";
import type {bibleTranslation} from "./bible-translation";

export const loadTranslation =
    async (translation: string | null | any): Promise<bibleTranslation | unknown> => {
        if(!translations) {
            return null;
        }
        // Check if the translation exists in the translations map
        if (!translations.has(translation)) {
            throw new Error(`Translation ${translation} not found`);
        }
        return await import(`./bible-translations/${translation}.json`);
    };
