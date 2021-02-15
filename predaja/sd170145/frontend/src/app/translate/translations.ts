import { InjectionToken } from '@angular/core';
import { LANG_ENGLESKI_NAME, LANG_ENGLESKI_TRANS } from './engleski';

import { LANG_SR_CIR_NAME, LANG_SR_CIR_TRANS } from './lan-srpski-cirilica';
import { LANG_SR_LAT_NAME, LANG_SR_LAT_TRANS } from './latn-srpski-latinica';


export const TRANSLATIONS = new InjectionToken('translations');

const dictionary: { [id: string]: object } = {
    [LANG_SR_LAT_NAME]: LANG_SR_LAT_TRANS,
    [LANG_SR_CIR_NAME]: LANG_SR_CIR_TRANS,
    [LANG_ENGLESKI_NAME]: LANG_ENGLESKI_TRANS
};

export const TRANSLATION_PROVIDERS = [
    { provide: TRANSLATIONS, useValue: dictionary }
];