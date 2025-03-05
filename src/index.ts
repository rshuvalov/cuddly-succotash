// import './instrument';

import config from './config';
import { db } from './db';
import { kafka, rabbitmq } from './messaging';
import { app } from './app';

(async () => {
  await db.init();
  await kafka.init();
  await rabbitmq.init();

  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
})();
