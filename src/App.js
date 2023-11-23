import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Connexion from './pages/connexion';
import {Helmet} from "react-helmet";
import Favoris from './pages/favoris';
import Home from './pages/home';
import Profil from './pages/profil';
import PageRecette from './pages/recettesT';
import Detail from './pages/detailR';
import Searched from './pages/searched';
import Inscription1 from './pages/inscription';
import Mdp from './pages/mdp_oublie';
import ResetMdp from './pages/reset-mdp';
function App() {

  const [user, setUser] = useState({});
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <>
    
     <Helmet>
          <meta charSet="utf-8" />
          <title>Epicurian Food</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="site web de recette culinaire" />

      </Helmet>
       <Router>
      <Switch>
      <Route path="/searched/:search" exact render={() => <Searched user={user} updateUser={updateUser} />} />
      <Route path='/' exact render={() => <Home user={user} updateUser={updateUser}/>} />
       <Route path='/connexion' exact render={() => <Connexion user={user} updateUser={updateUser} />} />
       <Route path='/inscription' exact component={Inscription1} />
       <Route path='/favoris' exact render={() => <Favoris user={user} updateUser={updateUser}/>}  />
       <Route path='/recettes'  exact render={() => <PageRecette user={user} updateUser={updateUser}/>}  />
       <Route path='/profil'  exact render={() => <Profil user={user} updateUser={updateUser}/>}  />
       <Route path='/recette/:name'  exact render={() => <Detail user={user} updateUser={updateUser}/>}  />
       <Route path='/Mot-de-passe-oublie'  exact render={() => <Mdp/>}  />
       <Route path='/Reset-Mot-de-passe-oublie'  exact render={() => <ResetMdp/>}  />

      </Switch></Router>

   </>
     
  );
}

export default App;