// import './instrument';

import config from './config';
import { db } from './db';
import { rabbitmq } from './messaging';
import { app } from './app';

(async () => {
  await db.init();
  await rabbitmq.init();

  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
})();
