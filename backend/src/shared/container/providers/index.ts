import { container } from 'tsyringe';

import IStorageProvider from './StorrageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorrageProvider/implementations/DiskSttorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
