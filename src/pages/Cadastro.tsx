import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "../styles/Cadastro.css";
import { calcularIdade } from "../utils/CalcularIdade";
import validarCPF from "../utils/ValidarCPF";
import BuscarCEP from "../utils/ApiViaCep";

const schema = z.object({
  nome: z
    .string()
    .min(1, "❌ Nome é obrigatório")
    .max(150, "❌ Máximo de 150 caracteres"),
  cpf: z
    .string()
    .min(14, "❌ CPF inválido")
    .max(14, "❌ CPF inválido")
    .refine(validarCPF, { message: "❌ CPF inválido" }),
  dataNascimento: z.string().min(1, "❌ Data de nascimento obrigatória"),
  email: z
    .string()
    .email("❌ E-mail inválido")
    .max(200, "❌ Máximo de 200 caracteres"),
  cep: z.string().min(8, "❌ CEP inválido").max(9, "❌ CEP inválido"),
  logradouro: z.string().min(1, "❌ Logradouro obrigatório"),
  bairro: z.string().min(1, "❌ Bairro obrigatório"),
  cidade: z.string().min(1, "❌ Cidade obrigatória"),
  estado: z.string().min(1, "❌ Estado obrigatório"),
});

type FormData = z.infer<typeof schema>;

const Cadastro: React.FC = () => {
  const [cadastroRealizado, setCadastroRealizado] = useState(false);
  const [dadosCadastrados, setDadosCadastrados] = useState<FormData | null>(
    null
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const cep = watch("cep");

  const formatNome = (nome: string) => nome.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ ]/g, "");

  const formatCPF = (cpf: string) =>
    cpf
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  const formatCEP = (cep: string) =>
    cep
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/^(\d{5})(\d)/, "$1-$2");

  const onSubmit = (data: FormData) => {
    const idade = calcularIdade(data.dataNascimento);
    const dadosComIdade = { ...data, idade };
    localStorage.setItem("dadosUsuario", JSON.stringify(dadosComIdade));
    setDadosCadastrados(dadosComIdade);
    setCadastroRealizado(true);
    reset(); // Limpa os campos após cadastro
  };

  const limparFormulario = () => {
    reset(); // Limpa os campos manualmente
    setCadastroRealizado(false);
  };

  return (
    <div className="container">
      <img
        src="/logo-cadastro.png"
        alt="Logo de Formulario com um lapis ao lado"
        className="logo"
      />
      <h2>Cadastro de Pessoas</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
        <BuscarCEP
          cep={cep}
          onSuccess={(data) => {
            setValue("logradouro", data.logradouro);
            setValue("bairro", data.bairro);
            setValue("cidade", data.cidade);
            setValue("estado", data.estado);
          }}
        />
        {[
          { label: "Nome", name: "nome", format: formatNome },
          {
            label: "CPF",
            name: "cpf",
            placeholder: "000.000.000-00",
            format: formatCPF,
          },
          { label: "Data de Nascimento", name: "dataNascimento", type: "date" },
          { label: "E-mail", name: "email", type: "email" },
          { label: "CEP", name: "cep", format: formatCEP },
          { label: "Logradouro", name: "logradouro" },
          { label: "Bairro", name: "bairro" },
          { label: "Cidade", name: "cidade" },
          { label: "Estado", name: "estado" },
        ].map(({ label, name, type = "text", placeholder, format }) => (
          <div
            key={name}
            className={`form-group ${
              errors[name as keyof FormData] ? "erro-ativo" : ""
            }`}
          >
            <label>{label}:</label>
            <input
              type={type}
              placeholder={placeholder}
              {...register(name as keyof FormData)}
              onChange={(e) =>
                format &&
                setValue(name as keyof FormData, format(e.target.value))
              }
              className={errors[name as keyof FormData] ? "erro-input" : ""}
            />
            {errors[name as keyof FormData] && (
              <span className="erro">
                {errors[name as keyof FormData]?.message}
              </span>
            )}
          </div>
        ))}

        <div className="form-group botao-container">
          <button type="submit">Cadastrar</button>
          <button
            type="button"
            onClick={limparFormulario}
            className="botao-limpar"
          >
            Limpar Formulário
          </button>
        </div>

        {cadastroRealizado && (
          <span className="sucesso">✅ Cadastro realizado com sucesso!</span>
        )}
      </form>

      {cadastroRealizado && dadosCadastrados && (
        <div className="dados-cadastrados">
          <h3>Dados Cadastrados</h3>
          <table className="tabela">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Idade</th>
                <th>Email</th>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{dadosCadastrados.nome}</td>
                <td>{dadosCadastrados.cpf}</td>
                <td>{dadosCadastrados.dataNascimento}</td>
                <td>{calcularIdade(dadosCadastrados.dataNascimento)}</td>
                <td>{dadosCadastrados.email}</td>
                <td>{dadosCadastrados.cep}</td>
                <td>{dadosCadastrados.logradouro}</td>
                <td>{dadosCadastrados.bairro}</td>
                <td>{dadosCadastrados.cidade}</td>
                <td>{dadosCadastrados.estado}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => window.location.reload()}>Voltar</button>
        </div>
      )}
    </div>
  );
};

export default Cadastro;
