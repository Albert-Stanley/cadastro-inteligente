import { useEffect } from "react";
import axios from "axios";

interface BuscarCEPProps {
  cep: string;
  onSuccess: (data: {
    logradouro: string;
    bairro: string;
    cidade: string;
    estado: string;
  }) => void;
}

const BuscarCEP: React.FC<BuscarCEPProps> = ({ cep, onSuccess }) => {
  useEffect(() => {
    const buscarCEP = async () => {
      if (cep.length === 9) {
        try {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
          );

          if (!response.data.erro) {
            onSuccess({
              logradouro: response.data.logradouro,
              bairro: response.data.bairro,
              cidade: response.data.localidade,
              estado: response.data.uf,
            });
          } else {
            alert("CEP não encontrado!");
          }
        } catch (error) {
          console.error("Erro ao buscar CEP", error);
        }
      }
    };

    if (cep) buscarCEP();
  }, [cep, onSuccess]);

  return null;
};

export default BuscarCEP;
