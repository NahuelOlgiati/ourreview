import { OurreviewPage } from './app.po';

describe('ourreview App', () => {
  let page: OurreviewPage;

  beforeEach(() => {
    page = new OurreviewPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('our works!');
  });
});
