import { Redirect, Route } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { cog, home, list,search  } from "ionicons/icons";

import Home from "./Feed";
import Lists from './Lists';
import ListDetail from './ListDetail';
import Settings from './Settings';
import Search from './Search'

const Tabs = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/tabs/home" render={() => <Home />} exact={true} />
        <Route path="/tabs/search" render={() => <Search />} exact={true} />
        <Route path="/tabs/lists" render={() => <Lists />} exact={true} />
        <Route path="/tabs/lists/:listId" render={() => <ListDetail />} exact={true} />
        <Route path="/tabs/settings" render={() => <Settings />} exact={true} />  
        <Route
          path="/tabs"
          render={() => <Redirect to="/tabs/home" />}
          exact={true}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tabs/search">
          <IonIcon icon={search} />
          <IonLabel>Search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tabs/lists">
          <IonIcon icon={list} />
          <IonLabel>Lists</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab4" href="/tabs/settings">
          <IonIcon icon={cog} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Tabs;
