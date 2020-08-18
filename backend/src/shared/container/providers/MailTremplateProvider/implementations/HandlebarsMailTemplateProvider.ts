import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvidder from '../models/IMailTemplateProvider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvidder {
  public async parse({
    file,
    variable,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemaplate = handlebars.compile(templateFileContent);

    return parseTemaplate(variable);
  }
}

export default HandlebarsMailTemplateProvider;
