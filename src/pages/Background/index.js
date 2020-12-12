import '../../assets/img/icon16.png';
import '../../assets/img/icon32.png';
import '../../assets/img/icon48.png';
import '../../assets/img/icon128.png';
import { routerInclude, runMessageRouter } from './modules/router';
import { sessionRoutes } from './controller/sessionRoutes';
import { lbRoutes } from './controller/leaderboardRoutes';
import { userRoutes } from './controller/userRoutes';
import { friendRoutes } from './controller/friendRoutes';
import { reactionRoutes } from './controller/reactionRoutes';

console.log('This is the background page.');

routerInclude(sessionRoutes);
routerInclude(lbRoutes);
routerInclude(reactionRoutes);
routerInclude(userRoutes);
routerInclude(friendRoutes);

runMessageRouter();
