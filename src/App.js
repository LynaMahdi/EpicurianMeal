import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router ,Switch,Route, Redirect} from 'react-router-dom';
import Connexion from './pages/connexion';
import {Helmet} from "react-helmet";
import Favoris from './pages/favoris';
import Home from './pages/home';
import PageRecette from './pages/recettesT';
import Detail from './pages/detailR';
import Searched from './pages/searched';
import Inscription1 from './pages/inscription';
import Mdp from './pages/mdp_oublie';
import ResetMdp from './pages/reset-mdp';
import Formulaire from './pages/profil';
function App() {

  const [user, setUser] = useState({});
  const updateUser = (userData) => {
    setUser(userData);
  };

  const isAuthenticated = !!localStorage.getItem('userEmail'); // Vérifie si l'utilisateur est authentifié

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
      <Route path='/connexion' exact render={() => (isAuthenticated ? <Redirect to="/" /> : <Connexion user={user} updateUser={updateUser} />)} />
       <Route path='/inscription' exact component={Inscription1} />
       <Route path='/favoris' exact render={() => <Favoris user={user} updateUser={updateUser}/>}  />
       <Route path='/recettes'  exact render={() => <PageRecette user={user} updateUser={updateUser}/>}  />
       <Route path='/profile'  exact render={() => <Formulaire/>}  />
       <Route path='/recette/:name'  exact render={() => <Detail user={user} updateUser={updateUser}/>}  />
       <Route path='/Mot-de-passe-oublie'  exact render={() => <Mdp/>}  />
       <Route path='/Reset-Mot-de-passe-oublie'  exact render={() => <ResetMdp/>}  />

      </Switch></Router>

   </>
     
  );
}

export default App;