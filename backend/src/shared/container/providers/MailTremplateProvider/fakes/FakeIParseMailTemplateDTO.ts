import IMailTemplateProvidder from '../models/IMailTemplateProvider';

class FakeIParseMailTemplateDTO implements IMailTemplateProvidder {
  public async parse(): Promise<string> {
    return 'mail content';
  }
}

export default FakeIParseMailTemplateDTO;
