/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import ContextProvider from './components/ContextProvider';
import Admin from './pages/Admin';
import Menu from './pages/Admin/Menu';
import Ongoing from './pages/Admin/Ongoing';
import Transactions from './pages/Admin/Transactions';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import routes from './utils/routes';

const App = () => (
  <IonApp>
    <ContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path={routes.home} component={Home} />
          <Route exact path={`${routes.home}/:tableName`} component={Home} />
          <Route exact path={routes.cart} component={Cart} />
          <Route exact path={routes.login} component={Login} />

          <AuthRoute exact path={routes.admin} component={Admin} />
          <AuthRoute exact path={routes.adminOngoing} component={Ongoing} />
          <AuthRoute exact path={routes.adminHistory} component={Transactions} />
          <AuthRoute exact path={routes.adminMenu} component={Menu} />

          <Redirect exact from="/" to={routes.home} />
        </IonRouterOutlet>
      </IonReactRouter>
    </ContextProvider>
  </IonApp>
);

export default App;
