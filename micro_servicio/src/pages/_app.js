import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // ComponentDidMount equivalent
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <UserProvider>
      <div>
        <Component {...pageProps} /> {/* Renderizar el componente principal */}
        <ToastContainer /> {/* Renderizar el contenedor de notificaciones de Toastify */}
      </div>
    </UserProvider>
  );
}
