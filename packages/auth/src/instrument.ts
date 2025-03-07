import * as Sentry from '@sentry/node';
import config from './config';

Sentry.init({
  dsn: config.sentry.dsn,

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  integrations: [
    Sentry.captureConsoleIntegration({ levels: ['error'] }),
    Sentry.onUnhandledRejectionIntegration(),
    Sentry.onUncaughtExceptionIntegration(),
  ],
});
