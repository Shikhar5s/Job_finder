import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://eeee95787fc5ca7bb024f67aab5d1072@o4509131020959744.ingest.us.sentry.io/4509206491627520",
  integrations: [Sentry.mongooseIntegration()],
});