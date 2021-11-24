import Layout from "../components/layout";
import Link from "next/link";
import { useAuth } from "../auth";
import Router from "next/router";
export default function Login() {
  const { signIn } = useAuth();
  const loginUser = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;
    signIn({ username, password });
    Router.push("/");
  };

  return (
    <Layout>
      <h1 className="text-center mt-5">Giriş</h1>
      <div className="container col-3 mb-5">
        <form method="POST" onSubmit={loginUser}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Şifre
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <div className="mb-2">
            Kayıt olmak için
            <Link href="/register">
              <a>Tıklayınız.</a>
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Kaydet
          </button>
        </form>
      </div>
    </Layout>
  );
}
