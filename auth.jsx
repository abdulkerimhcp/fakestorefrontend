import React, { useState, useContext, createContext } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from "@apollo/client";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [authToken, setAuthToken] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  const getAuthHeaders = () => {
    if (!authToken) return null;

    return {
      authorization: `Bearer ${authToken}`,
    };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: "http://localhost:5000",
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const signIn = async ({ username, password }) => {
    const client = createApolloClient();
    const LoginMutation = gql`
      mutation signin($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          id
          username
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    });

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
      setUserName(result.data.login.username);
      setUserId(result.data.login.id);
    }
  };

  const signOut = () => {
    setAuthToken(null);
  };

  return {
    setAuthToken,
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
    userName,
    userId,
  };
}
