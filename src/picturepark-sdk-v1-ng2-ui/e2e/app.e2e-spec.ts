import { PictureparkSdkV1Ng2UiPage } from './app.po';

describe('picturepark-sdk-v1-ng2-ui App', () => {
  let page: PictureparkSdkV1Ng2UiPage;

  beforeEach(() => {
    page = new PictureparkSdkV1Ng2UiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
