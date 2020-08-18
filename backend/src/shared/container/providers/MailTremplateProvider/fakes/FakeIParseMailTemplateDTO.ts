import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

import IMailTemplateProvidder from '../models/IMailTemplateProvider';

class FakeIParseMailTemplateDTO implements IMailTemplateProvidder {
  public async parse({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeIParseMailTemplateDTO;
