import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { Button, Form } from "react-bootstrap";

import styles from "./login.module.css"

function Login() {

    const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const validatePassword = (passwordValue) => {
    if (passwordValue.length < 8) {
      return "Password must be at least 8 characters";
    } else {
      return true;
    }
  };

  const onSubmit = () => {
    navigate("/tasks")
  };

  return (
    <main className={styles.loginMain}>
      <div className={styles.loginContainer}>
        <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <Form.Control
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email"
            id="email"
          />

          {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <Form.Control
            {...register("password", {
              required: "Password is required",
              validate: validatePassword,
            })}
            type="password"
            placeholder="Password"
            id="password"
          />

          {errors.password && <p className={styles.errorMsg}>{errors.password.message}</p>}
        </div>

        <Button type="submit" variant="success">
          Login
        </Button>
      </form>
      </div>
    </main>
  );
}

export default Login;
