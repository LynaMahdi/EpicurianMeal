import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import './detailR.css'
import { useHistory } from "react-router-dom";
const Detail = ({user,updateUser}) => {
  const [details, setDetails] = useState({});
  const history = useHistory();

  const params = useParams();
  const checkSession = () => {
    // Retrieve the stored value from sessionStorage
    const userEmail = sessionStorage.getItem('userEmail');
    console.log(userEmail)

    if (userEmail==null) {
      history.push('/connexion')
    } 
  };
  
  useEffect(() => {
    checkSession();
  }, []);
  const fetchDetails = async () => {
    const apiKey='23fb7cfb07dd46dfa99a286c28fa825c'
    const apiKey3='0a99dc9c27874eb2af7712643ff4d1b8';
    const apiKey2='821d2d6c62504983bf8d8dd394444d37'
    const apiKey4='3210da7ed0e5412fad84b8d8b8757610'


    const resp = await fetch(  
        `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${apiKey3}`
    );
    const data = await resp.json();

    return data;
  };

  useEffect(() => {
    let isMounted = true;

    fetchDetails().then((data) => {
      if (isMounted) setDetails(data);
      console.log({details})
    });
    return () => {
      isMounted = false;
    };
  }, [params.id]);

 

  return (
    <>
    <Navbar user={user} updateUser={updateUser}/>
    <h3>{details.title}</h3>
    <Wrapper>
      <div>

        <img src={details.image} alt={details.title} />
      </div>

      <Info>
      <h2>Abstract</h2>

         <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
          </div>
           {/*<h2>Ingredients</h2>
          
          <ul>
            {details.extendedIngredients.map(({ id, original }) => (
              <li key={id}>{original}</li>
            ))}
          </ul>*/}

          <h2>Instructions</h2>

          <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>


      </Info>
    </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
  margin: 10rem inherit 5rem;
  display: flex;
  background-color:#f7cdc3;

  @media (max-width: 1068px) {
    flex-direction: column;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: #fff;
  }


 
  ul {
    margin-bottom: 5rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  img{
    margin-left: 50px;
    border-radius: 16px;
    margin-top: 50px

  }
  p {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8rem;
    color: black;

    &:first-child {
      margin-top: 2rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: #fff;
  border: 2px solid #000;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 4rem;
  width: 50%;
  @media (max-width: 1068px) {
    margin-top: 3rem;
    margin-left: 1rem;
  }
`;

export default Detail;
