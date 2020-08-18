import { container } from 'tsyringe';

import IStorageProvider from './StorrageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorrageProvider/implementations/DiskSttorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

import IMailTemplateProvider from './MailTremplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTremplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider),
);
