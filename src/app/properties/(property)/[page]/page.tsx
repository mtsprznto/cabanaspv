"use client";

import { Error404, Footer, Header, Property, TransitionPage } from "@/components";
import { dataProperties } from "@/components/Properties/Properties.data";
import { useParams } from "next/navigation";

export default function Page() {
  const router = useParams();
  const propertyId = router.page;
  const filteredPage = dataProperties.find(
    (property) => property.id === Number(propertyId)
  );

  return (
    <>
      <TransitionPage></TransitionPage>
      <Header></Header>
      {filteredPage ? <Property house={filteredPage}></Property> : <Error404></Error404>}
        <Footer></Footer>
    </>
  );
}
