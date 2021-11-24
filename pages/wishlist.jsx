import Layout from "../components/layout";
import Card from "../components/card/card";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../auth";
import Image from "next/image";
import Link from "next/link";
const wishlistsData = gql`
  query Query($userId: String!) {
    getWishlist(userId: $userId) {
      userId
      product {
        id
        title
        price
        description
        category
        image
      }
    }
  }
`;
export default function Whishlist() {
  const { isSignedIn, userId } = useAuth();
  const { data } = useQuery(wishlistsData, { variables: { userId } });

  console.log(data?.getWishlist);
  return (
    <Layout>
      <div className="container h-100">
        <div className="row">
          {data?.getWishlist.map((product) => (
            <div className="card col-3 mt-2 me-auto d-flex">
              <Image
                classNameName="m-1"
                layout="intrinsic"
                src={product.product.image}
                alt="Picture of the author"
                width={300}
                height={250}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <Link href="/productDetail">
                  <h5 className="card-title fs-5 ">
                    {product.product.title.slice(0, 50)}
                  </h5>
                </Link>
                <p className="card-text fw-light">
                  {product.product.description.slice(0, 100) + "..."}
                </p>
                <div className="d-flex justify-content-between">
                  <a
                    className={`btn ${
                      isSignedIn()
                        ? "btn-danger"
                        : "btn-outline-secondary"
                    } btn-sm`}
                    id={product.id}
                  >
                    Favorilere Çıkar
                  </a>

                  <a className="btn btn-outline-dark btn-sm">Sepete Ekle</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
