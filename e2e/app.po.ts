import { browser, by, element } from 'protractor';

export class OurreviewPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('our-root h1')).getText();
  }
}
