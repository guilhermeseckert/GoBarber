import { container } from 'tsyringe';

import IStorageProvider from './StorrageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorrageProvider/implementations/DiskSttorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
