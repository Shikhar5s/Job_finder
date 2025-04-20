 import * as Sentry from "@sentry/node"


Sentry.init({
  dsn: "https://5678a97654d07ebd40282d705a7a1a7b@o4509131020959744.ingest.us.sentry.io/4509139637501952",
  integrations:[
     nodeProfilingIntegration(),

     Sentry.mongooseIntegration()
  ],
  
});

