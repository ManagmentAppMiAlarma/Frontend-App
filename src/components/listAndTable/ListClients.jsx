import React from "react";
import Client from "../cards/Client";
import PuffLoaderComponent from "../loadingComponent/PuffLoader";

const ListComponent = ({ isLoading, data }) => {
  return (
    <section className="container mx-auto mt-8 px-2 sm:hidden">
      {isLoading ? (
        <PuffLoaderComponent isLoading={isLoading} />
      ) : (
        data?.data?.map((client) => <Client client={client} key={client.id} />)
      )}
    </section>
  );
};

export default ListComponent;
