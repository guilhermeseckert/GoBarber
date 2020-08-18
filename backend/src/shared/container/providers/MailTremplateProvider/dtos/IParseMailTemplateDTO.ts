interface ITemplateVariable {
  [key: string]: string | number;
}
export default interface IParseMailTemplateDTO {
  template: string;
  variable: ITemplateVariable;
}
