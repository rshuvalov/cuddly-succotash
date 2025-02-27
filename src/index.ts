// import './instrument';

import config from './config';
import { db } from './db';
import { app } from './app';

(async () => {
  await db.init();

  app.listen(config.port, () => console.log(`Listening on port ${config.port}`));
})();
