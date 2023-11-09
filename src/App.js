import './App.css';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Home from './pages/home';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import CC from './pages/j';
import {Helmet} from "react-helmet";

function App() {
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
      <Route path='/' exact component={Home} />

       <Route path='/connexion' exact component={Connexion} />
       <Route path='/inscription' exact component={CC} />

      </Switch></Router>

   </>
     
  );
}

export default App;