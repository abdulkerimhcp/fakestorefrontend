import Layout from "../components/layout";
import Card from "../components/card/card";


import { gql, useQuery } from "@apollo/client";
const productsData = gql`
  query Query {
    getProducts {
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
  }
`;

export default function Home() {
  const { data } = useQuery(productsData);
 
  return (
    <Layout>
      <div className="container h-100">
        <div className="row">
          {data?.getProducts.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
// https://imdb-api.com/en/API/MostPopularMovies/k_ujm0xtr6
