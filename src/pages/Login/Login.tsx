import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.scss";

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginForm) => {
    const success = login(data.email, data.password);

    if (!success) {
      setError("root", { message: "Credenciales inválidas" });
      return;
    }

    navigate("/");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Inicio de sesión para prueba técnica</h2>

      {errors.root && <p className="error">{errors.root.message}</p>}

      <div className="field">
        <input placeholder="Email" {...register("email")} />
        <span>{errors.email?.message}</span>
      </div>

      <div className="field">
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password")}
        />
        <span>{errors.password?.message}</span>
      </div>

      <button type="submit">Entrar</button>

      <p className="info">
        Usa <strong> admin@test.com </strong> con la contraseña{" "}
        <strong> Admin123 </strong> para iniciar sesión como admin{" "}
      </p>

      <p className="info">
        Usa <strong> user@test.com </strong> con la contraseña{" "}
        <strong> User123 </strong> para iniciar sesión como usuario{" "}
      </p>
    </form>
  );
};

export default Login;
