import { Injectable, EventEmitter, OnInit } from '@angular/core';

@Injectable()
export class LanguageService implements OnInit {

  private language: string;
  public languageChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    this.setLanguage('es');
  }

  setLanguage(language: string): void {
    this.language = language;
    this.languageChanged.emit(language);
  }

  getLanguage() {
    return this.language;
  }
}
