import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { dbHandle } from './modules/firestore';
import { routerInclude, runMessageRouter } from './modules/router';
import { sessionRoutes } from './controller/sessionRoutes';
import { lbRoutes } from './controller/leaderboardRoutes';
import { userRoutes } from './controller/userRoutes';

console.log('This is the background page.');

dbHandle();

routerInclude(sessionRoutes);
routerInclude(lbRoutes);
routerInclude(userRoutes);

runMessageRouter();
