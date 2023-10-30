import './App.css';
import { BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import Home from './pages/home';
import Connexion from './pages/connexion';
import Inscription from './pages/inscription';
import Form from './pages/profil';
function App() {
  return (
    <>
       <Router>
      <Switch>

       <Route path='/' exact component={Home} />
       <Route path='/connexion' exact component={Connexion} />
       <Route path='/inscription' exact component={Inscription} />
      </Switch></Router>

   </>
     
  );
}

export default App;