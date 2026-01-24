import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Login.scss";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { BiInfoCircle } from "react-icons/bi";

interface LoginForm {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email("Email inválido").required("El email es requerido"),
  password: yup.string().required("La contraseña es requerida"),
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
    <div className="login-page">
      <div className="login-container">
        <section className="login-info-section">
          <div className="info-content">
            <h1>Dragon Ball Wiki</h1>
            <p className="subtitle">Prueba Técnica Frontend</p>
            
            <div className="features">
              <div className="feature-item">
                <BiInfoCircle />
                <p>Explora personajes, transformaciones y planetas del universo Dragon Ball.</p>
              </div>
              <div className="feature-item">
                <BiInfoCircle />
                <p>Sistema de gestión con roles de Administrador y Usuario.</p>
              </div>
              <div className="feature-item">
                <BiInfoCircle />
                <p>Interfaz moderna construida con React y TypeScript.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="login-form-section">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-header">
              <h2>Bienvenido</h2>
              <p>Inicia sesión para continuar</p>
            </div>

            {errors.root && (
              <div className="error-banner">
                {errors.root.message}
              </div>
            )}

            <div className="field">
              <label>Correo Electrónico</label>
              <div className="input-wrapper">
                <HiOutlineMail className="input-icon" />
                <input 
                  type="email" 
                  placeholder="admin@test.com" 
                  {...register("email")} 
                />
              </div>
              {errors.email && <span className="error-text">{errors.email.message}</span>}
            </div>

            <div className="field">
              <label>Contraseña</label>
              <div className="input-wrapper">
                <HiOutlineLockClosed className="input-icon" />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
              </div>
              {errors.password && <span className="error-text">{errors.password.message}</span>}
            </div>

            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>

            <div className="credentials-info">
              <p className="info-title">Credenciales de prueba:</p>
              <div className="credential-box">
                <code>Admin: admin@test.com / Admin123</code>
                <code>User: user@test.com / User123</code>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

