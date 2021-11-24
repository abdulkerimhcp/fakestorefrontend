import Layout from "../components/layout";
import Link from "next/link";
import Image from "next/image";
import SCard from "../components/ShoppingCard/ShoppingCard";
import { useState, useEffect } from "react";

export default function ShoppingCard() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const response = window.localStorage.getItem("shoppingCard");
    const product = JSON.parse(response);
    setProducts(product);
  }, []);

  return (
    <Layout>
      
      <div className="container">
        <h1 className="text-center">Sepet</h1>
        <div className="d-flex flex-column">
          {/* {products.map((product) => {
        <div className="row">
          <Image
            className="m-1"
            layout="intrinsic"
            src={product.image}
            alt="Picture of the author"
            width={20}
            height={20}
          />
          <Link href="/productDetail">
            <h5 className="card-title fs-5 ">{product.title.slice(0, 50)}</h5>
          </Link>
          <p className="card-text fw-light">
            {product.description.slice(0, 100) + "..."}
          </p>
          <p className="card-text fw-light">{product.price}</p>
        </div>;
      })} */}
          <div className="d-block">
            <form method="POST">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  İsim
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
                  Adres
                </label>
                <textarea type="text" className="form-control" name="adress" />
              </div>
              <button className="btn btn-sm btn-dark" onClick>
                Sipariş ver
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
