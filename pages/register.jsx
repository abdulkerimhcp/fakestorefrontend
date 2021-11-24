import Layout from "../components/layout";
import Link from "next/link";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";
export default function Register({ client }) {
  const ADD_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
      register(registerInput: $registerInput) {
        id
        email
        token
        username
        createdAt
      }
    }
  `;
  const [addUser, { data }] = useMutation(ADD_USER);
  const registerUser = (event) => {
    event.preventDefault();
    const registerInput = {
      username: event.target.elements.username.value,
      password: event.target.elements.password.value,
      email: event.target.elements.email.value,
      confirmPassword: event.target.elements.password.value,
    };
    addUser({ variables: { registerInput: registerInput } });
    alert("Kayıt Başarılı");
    Router.push('/login')
  };
  return (
    <Layout>
      <h1 className="text-center mt-5">Kayıt</h1>
      <div className="container col-3 mb-5">
        <form method="POST" onSubmit={registerUser}>
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
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Şifre
            </label>
            <input type="password" className="form-control" name="password" />
          </div>
          <div classNameName="mb-2">
            Giriş Yapmak için
            <Link href="/login">
              <a>Tıklayınız.</a>
            </Link>
          </div>
          <button type="submit" className="btn btn-primary" redirect="/login">
            Kaydet
          </button>
        </form>
      </div>
    </Layout>
  );
}
