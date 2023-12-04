import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import './profile.css'
function Formulaire({ user, updateUser }) {
  let email=sessionStorage.getItem('userEmail');
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
                    First Name              
                    <input
                      type="text"
                      className="form-control"
                      placeholder="first name"
                    />
                  </div>
                  <div className="col-md-6">
                    Last Name
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Doe"
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
                      value={email}
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
                        // Add value if necessary
                        />
                    </div>
                 </div>
                <div className="mt-5 text-right">
                  <button className="btn btn-primary profile-button" type="button">
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
