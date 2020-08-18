import IMailProvider from '../models/IMailProvider';

interface IMessagee {
  to: string;
  body: string;
}
export default class FakeMailProvider implements IMailProvider {
  private message: IMessagee[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.message.push({
      to,
      body,
    });
  }
}
