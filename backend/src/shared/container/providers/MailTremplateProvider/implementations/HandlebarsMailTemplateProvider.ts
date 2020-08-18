import handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvidder from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvidder {
  public async parse({
    template,
    variable,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemaplate = handlebars.compile(template);

    return parseTemaplate(variable);
  }
}

export default HandlebarsMailTemplateProvider;
