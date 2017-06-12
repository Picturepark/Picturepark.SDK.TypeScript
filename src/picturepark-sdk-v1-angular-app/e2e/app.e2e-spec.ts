import { PictureparkSdkV1Ng2AppPage } from './app.po';

describe('picturepark-sdk-v1-angular-app App', () => {
  let page: PictureparkSdkV1Ng2AppPage;

  beforeEach(() => {
    page = new PictureparkSdkV1Ng2AppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
