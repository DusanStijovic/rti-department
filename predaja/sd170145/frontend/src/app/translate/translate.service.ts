import { Inject, Injectable } from '@angular/core';
import { TRANSLATIONS } from './translations';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  private _currentLang: string;

  public get currentLang() {
    return this._currentLang;
  }

  constructor(@Inject(TRANSLATIONS) private _translations: any) {  }

  public use(lang: string): void{
    // console.log("ODA:" + lang);
    this._currentLang = lang;
  }

  private translate(key: string): string {
    let translation = key;
    //console.log("LANG:"+  this.currentLang)
    if(this._translations[this.currentLang] && this._translations[this.currentLang][key]){
      return this._translations[this.currentLang][key];
    }
    return translation;
  }

  public instant(key: string): string{
    return this.translate(key);
  }

}
