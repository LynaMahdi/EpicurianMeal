import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './profile.css'
import { useEffect , useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function Formulaire({ user, updateUser }) {

  const history = useHistory();
  const [newUserName, setNewUserName] = useState('');
  const [password, setPassword] = useState('');
  const [usemail,setEmail]=useState('')
  let email=sessionStorage.getItem('userEmail')
  let namee
  
  const checkSession = () => {
    // Retrieve the stored value from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    if (typeof JSON.parse(userEmail) === 'object'){
      setEmail(JSON.parse(userEmail).email)
      namee=JSON.parse(userEmail).name
      setNewUserName(JSON.parse(userEmail).name)
      
    }else{
    setEmail(userEmail)}
    if (userEmail==null) {
      history.push('/connexion')
    } 
  };
  
  useEffect(() => {
    checkSession();
  }, []);

  const [profil, setProfil] = useState([]);

  useEffect(() => {
      fetchUtili();
      setNewUserName(profil.nom || '' || namee );

  }, []);

  const fetchUtili = async () => {
    try {
        const userEmail =sessionStorage.getItem('userEmail');
        
        const response = await axios.get(`loczlhost/profil.php?userEmail=${userEmail}`);
        setProfil(response.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
    }
};

const handleChangeInformation = async () => {
  try {
    const userEmail = sessionStorage.getItem('userEmail');
    let fdata = new FormData();
    fdata.append("userEmail", userEmail);
    fdata.append("password", password);
    fdata.append("newUserName",newUserName);
    const response = await axios.post('https://linamahdi.alwaysdata.net/change-profil.php', fdata)
        console.log(response.data);
        console.log(newUserName)
        console.log(password)

    // Réinitialisez les champs du formulaire après la modification réussie du mot de passe
    setPassword('');
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe :', error);
    // Gérez les erreurs ou affichez un message à l'utilisateur
  }
};



  return (
<>
      <Navbar user={user} updateUser={updateUser} />
      <div className="Profil">
      <img className="Fav" src={require('./../images/Frame 138 (2).png')} alt='favoris' />

        <br></br>
      <div className="container rounded bg-white mt-5">
        <div className="row">
          <div className="col-md-4 border-right"></div>
          <div className="col-md-8">
            <div className="p-3 py-5">
              <div className="container">
                <div className="row mt-2">
                  <div className="col-md-6">
                    User Name            
                    <input
                        type="text"
                        className="form-control"
                        placeholder="first name"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                      />

                  </div>

                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    Email Adress
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      value={usemail}
                    />
                  </div>
                </div>

                <div className="row mt-3">

                    <div className="col-md-6">
                        Password
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Enter a new password"
                        onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>
                 </div>
                <div className="mt-5 text-right">
                  <button className="btn btn-primary profile-button" type="button"  onClick={handleChangeInformation}>
                    Save Profile
                  </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Formulaire;
