import { PictureparkSdkV1SampleAngularPage } from './app.po';

describe('picturepark-sdk-v1-sample-angular App', () => {
  let page: PictureparkSdkV1SampleAngularPage;

  beforeEach(() => {
    page = new PictureparkSdkV1SampleAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
