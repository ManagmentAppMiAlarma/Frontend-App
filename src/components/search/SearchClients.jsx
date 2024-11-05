// ClientSearch.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Global } from "../../helpers";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const fetchClients = async (searchTerm) => {
  if (!searchTerm || searchTerm.length < 2) return [];
  const response = await fetch(
    `${Global.endpoints.backend}clients/search?search=${searchTerm}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener los datos");
  }

  return response.json();
};

const SearchClients = ({ onClientSelect, order }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients", searchTerm],
    queryFn: () => fetchClients(searchTerm),
    enabled: !!searchTerm,
  });

  const handlePrefetch = () => {
    if (searchTerm) {
      queryClient.prefetchQuery({
        queryKey: ["clients", searchTerm],
        queryFn: () => fetchClients(searchTerm),
      });
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectClient = (client) => {
    if (order) {
      onClientSelect(client);
      setSearchTerm(`${client.firstname} ${client.lastname}`);
      setIsSearching(false);
    } else {
      navigate(`/inicio/clientes/${client.clientNumber}`);
    }
  };

  return (
    <div className="relative group">
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-500 transition-colors group-hover:text-red-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsSearching(true)}
          onMouseEnter={handlePrefetch}
          placeholder="Buscar cliente por nombre, apellido, razón social o dirección..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 ease-in-out"
        />
      </div>

      {isSearching && searchTerm.length >= 2 && (
        <div className="absolute z-[1000] w-full mt-1 bg-gray-800 rounded-lg shadow-lg border border-gray-700 max-h-60 overflow-y-auto transition-opacity duration-300 ease-in-out">
          {isLoading ? (
            <div className="p-3 text-gray-400 text-center">Cargando...</div>
          ) : error ? (
            <div className="p-3 text-red-400 text-center">
              Error: {error.message}
            </div>
          ) : clients && clients.length > 0 ? (
            clients.map((client) => {
              return (
                <div
                  key={client.id}
                  className="p-3 hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                  onClick={() => handleSelectClient(client)}
                >
                  <div className="font-medium text-white">
                    {client?.businessName ||
                      `${client?.firstname} ${client?.lastname}`}
                  </div>
                  {client?.businessName && (
                    <div className="text-sm text-gray-400">
                      {client?.firstname} {client?.lastname}
                    </div>
                  )}
                  <div className="text-sm text-gray-500">{client?.address}</div>
                </div>
              );
            })
          ) : (
            <div className="p-3 text-gray-400 text-center">
              No se encontraron resultados
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchClients;
