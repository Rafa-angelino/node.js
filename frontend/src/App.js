
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react"
import axios from "axios";


import Form from "./components/Form.js";
import Grid from "./components/Grid.js";

import styles from "./index.css"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
const Title = styled.h2``;

const App = () => {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
    } catch(error) {
      toast.error(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <div className={styles}>
      
        <Container>
          <Title>Usuários</Title>
          <Form 
          onEdit={onEdit} 
          setOnEdit={setOnEdit} 
          getUsers={getUsers}
          />
          <Grid 
          users={users} 
          setUsers={setUsers} 
          setOnEdit={setOnEdit}/> 
        </Container>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      
    </div>
  );
};

export default App;
