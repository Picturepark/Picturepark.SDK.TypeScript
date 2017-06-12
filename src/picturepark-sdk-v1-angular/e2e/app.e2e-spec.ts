import { PictureparkSdkV1Ng2Page } from './app.po';

describe('picturepark-sdk-v1-angular App', () => {
  let page: PictureparkSdkV1Ng2Page;

  beforeEach(() => {
    page = new PictureparkSdkV1Ng2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
