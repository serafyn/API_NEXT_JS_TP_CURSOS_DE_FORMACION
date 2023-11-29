import React, { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "../../components/Layout";
import { Container, Row } from "react-bootstrap";
import axios from "axios";
import { toast } from 'react-toastify';

export default function Index() {
  const { user, error, isLoading } = useUser();


  useEffect(() => {
    if (user) {
      const { nickname, name, sub } = user;
      const userData = { nickname, name, sub };
      axios.post('/api/auth/registroAuth', userData)
        .then(response => {
          console.log('Respuesta del servidor:', response.data);
        })
        .catch(error => {
          console.error('Error en la petición POST:', error);
        });
    }
  }, [user]); // Ejecutar solo cuando el valor de 'user' cambie


  return (
    <Layout>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <h1>Curso de desarrollo seguro</h1>
          {user && ( // Verificar si 'user' existe y no es null
            <ul>
              <li>{user.nickname}</li>
              <li>{user.name}</li>
              <li>{user.sub}</li>
              <li><a href="/api/auth/logout">Cerrar sesión</a></li>
            </ul>
          )}
        </Row>
      </Container>
    </Layout>
  );
}
