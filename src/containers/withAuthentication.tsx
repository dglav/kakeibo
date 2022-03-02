import { Box } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Layout } from "../components/layout";
import { useUser } from "../hooks/useUser";

export const withAuthentication = (
  WrappedPage: NextPage
): ((props: any) => React.ReactElement) => {
  const RequiresAuthentication = (props: any): React.ReactElement => {
    const { result } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (result.isError) router.push("/signin");
    }, [result, router]);

    return result.isSuccess ? (
      <WrappedPage {...props} />
    ) : (
      <Layout>
        <Box>Loading...</Box>
      </Layout>
    );
  };

  return RequiresAuthentication;
};
