import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import { useEffect } from "react";
import { AuthProvider } from '../auth'
export default function App({ Component, pageProps }) {
  
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
