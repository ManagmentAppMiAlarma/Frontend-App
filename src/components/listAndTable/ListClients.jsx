import React from "react";
import Client from "../cards/Client";
import Skeleton from "../loadingSkeleton/Clients";

const ListComponent = ({ isLoading, data }) => {
  return (
    <section className="container mx-auto mt-8 px-2 sm:hidden">
      {isLoading ? (
        <ul>
          {[...Array(4)].map((_, index) => (
            <li key={index}>
              <Skeleton />
            </li>
          ))}
        </ul>
      ) : (
        data?.data?.map((client) => <Client client={client} key={client.id} />)
      )}
    </section>
  );
};

export default ListComponent;
