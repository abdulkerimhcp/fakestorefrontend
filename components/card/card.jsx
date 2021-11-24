import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../auth";
import Router from "next/router";
import client from "../../apollo-client";
import { useState } from "react";
const shoppingCard = [];
export default function Card({ product }) {
  const { isSignedIn, userId } = useAuth();

  return (
    <>
      <div className="card col-3 mt-2 me-auto d-flex">
        <Image
          classNameName="m-1"
          layout="intrinsic"
          src={product.image}
          alt="Picture of the author"
          width={300}
          height={250}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <Link href="/productDetail">
            <h5 className="card-title fs-5 ">{product.title.slice(0, 50)}</h5>
          </Link>
          <p className="card-text fw-light">
            {product.description.slice(0, 100) + "..."}
          </p>
          <div className="d-flex justify-content-between">
            <a
              className={`btn ${
                isSignedIn() ? "btn-outline-danger" : "btn-outline-secondary"
              } btn-sm`}
              id={product.id}
              onClick={async (e) => {
                if (e.target.className === "btn btn-outline-secondary btn-sm") {
                  alert("Lütfen Giriş Yapınız");
                  Router.push("/login");
                } else {
                  const response = await axios.post(
                    "http://localhost:5000/",
                    {
                      query: `query Query($getProductId: ID!) {
                      getProduct(id: $getProductId) {
                        id
                        title
                        price
                        description
                        category
                        image
                        rating {
                          rate
                          count
                        }
                      }
                    }`,
                      variables: {
                        getProductId: e.target.id,
                      },
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  console.log(
                    userId,
                    response.data.data.getProduct.description
                  );
                  const res = await axios.post(
                    "http://localhost:5000/",
                    {
                      query: `mutation Mutation($userId: String!, $product: Productt) {
                        addWishlist(userId: $userId, product: $product) {
                          id
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
                      }`,
                      variables: {
                        userId: userId,
                        product: {
                          id: response.data.data.getProduct.id,
                          title: response.data.data.getProduct.title,
                          price: response.data.data.getProduct.price,
                          description:
                            response.data.data.getProduct.description,
                          category: response.data.data.getProduct.category,
                          image: response.data.data.getProduct.image,
                        },
                      },
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  console.log(res);
                }
              }}
            >
              Favorilere Ekle
            </a>

            <a
              id={product.id}
              className="btn btn-outline-dark btn-sm"
              onClick={async (e) => {
                const response = await axios.post(
                  "http://localhost:5000/",
                  {
                    query: `query Query($getProductId: ID!) {
                    getProduct(id: $getProductId) {
                      id
                      title
                      price
                      description
                      category
                      image
                      rating {
                        rate
                        count
                      }
                    }
                  }`,
                    variables: {
                      getProductId: e.target.id,
                    },
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                console.log(response.data.data.getProduct);
                shoppingCard.push(response.data.data.getProduct);
                localStorage.setItem(
                  "shoppingCard",
                  JSON.stringify(shoppingCard)
                );
                
             
              }}
            >
              Sepete Ekle
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
