/**
 * This file is the entry point for the EasyBill API.
 * @author José Mavárez
 * @author Uldren Gedde
 */

import ExpressAdapter from './adapters/expressAdapter';
import corsMiddleware from './middlewares/corsMiddleware';
import reqReceivedMiddleware from './middlewares/reqReceivedMiddleware';
import indexRouter from './routes/indexRouter';
import connectionDB from './db/mongoConnection';

const adapter = new ExpressAdapter({ portDefault: 8080 });

//! IIFE to connect to the database
(async () => {
    await connectionDB();
})();

adapter.middlewareJSON();
adapter.middlewareURLEncoded();
adapter.middlewarePersonalized({ middleware: corsMiddleware })
adapter.middlewarePersonalized({ middleware: reqReceivedMiddleware });

adapter.setRouteApp({ route: '/api', callbackRouter: indexRouter() });

adapter.startServer(() => {
    console.log(`Server started at http://localhost:${adapter.port}`);
});