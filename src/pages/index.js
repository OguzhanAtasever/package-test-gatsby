import * as React from "react";
import fetch from "isomorphic-fetch";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import {
  RegisterContent,
  RegisterModal,
  authMiddleware,
} from "@beast-village/bv-register";
import { Payment, AddressContainer } from "@beast-village/checkout-package";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authMiddleware.concat(
    new HttpLink({
      uri: "http://localhost:4004/graphql",
      fetch,
    })
  ),
});

const IndexPage = () => {
  const [open, setOpen] = React.useState(false);
  console.log(process.env.REACT_APP_STRIPE_SECRET_KEY);

  return (
    <ApolloProvider client={client}>
      <main>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </Button>
        <RegisterModal
          open={open}
          setOpen={setOpen}
          onSuccess={(token) => {
            console.log("TOKEN => ", token);
          }}
        />
        <div
          style={{
            maxWidth: 600,
          }}
        >
          <RegisterContent />

          <Payment
            price={50}
            submitPayment={(payment) => {
              console.log(payment);
            }}
            customerEmail="oguz@real.dog"
          />
          <AddressContainer
            customer={{
              id: "63467f92450be000167fa41a",
              email: "oguz@real.dog",
            }}
          />
        </div>
      </main>
    </ApolloProvider>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
