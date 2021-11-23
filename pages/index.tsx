import type { NextPage } from "next";
import NextLink from "next/link";
import { Center, Link } from "@chakra-ui/react";
import Layout from "../components/layout";
import TransactionList from "../components/TransactionList";

export type Transaction = {
  id: number;
  type: string;
  name: string;
  amount: number;
  currency: string;
  envelopeId: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

const transactions: Transaction[] = [
  {
    id: 1,
    type: "withdrawal",
    name: "purchase1",
    amount: 1000,
    currency: "JPY",
    envelopeId: 1,
    date: new Date("2021/11/18"),
    createdAt: new Date("2021/11/18"),
    updatedAt: new Date("2021/11/18"),
  },
  {
    id: 2,
    type: "deposit",
    name: "purchase2",
    amount: 2000,
    currency: "JPY",
    envelopeId: 2,
    date: new Date("2021/11/18"),
    createdAt: new Date("2021/11/18"),
    updatedAt: new Date("2021/11/18"),
  },
];

const Home: NextPage = () => {
  return (
    <Layout>
      <Center mt="4">
        <NextLink href="/new-purchase">
          <Link>Add New Purchase</Link>
        </NextLink>
      </Center>
      <TransactionList transactions={transactions} />
    </Layout>
  );
};

export default Home;
