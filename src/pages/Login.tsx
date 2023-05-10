import { useForm } from "react-hook-form";
import { useAppDispatch } from "../hooks/useTypeSelector";
import { login as loginAction } from "../userReducer";
function Login() {
  const { register, handleSubmit, formState } = useForm({ mode: "all" });
  const { errors, isValid } = formState;
  const dispatch = useAppDispatch();
  const login = (values: { userName: string; password: string }) => {
    dispatch(loginAction(values));
  };
  return (
    <>
      <div className="col-3 mx-auto">
        <div className="text-center display-6">Login</div>
        <div className="justify-content-center pt-2">
          <div className="d-flex justify-content-between">
            <label htmlFor="userName" className="form-label">
              User name
            </label>
            <label className="form-label text-danger">
              {errors.userName && errors.userName.message}
            </label>
          </div>
          <input
            type="text"
            className="form-control"
            id="userName"
            {...register("userName", {
              required: "Required",
              pattern: {
                value: /^[a-zA-Z]{6,20}$/i,
                message: "User name must be 6-20 character long.",
              },
            })}
          />
        </div>
        <div className="justify-content-center pt-2">
          <div className="d-flex justify-content-between">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <label className="form-label text-danger">
              {errors.password && errors.password.message}
            </label>
          </div>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Required",
              pattern: {
                value: /^.{6,50}$/i,
                message: "Password must be 6-50 character long.",
              },
            })}
          />
        </div>
        <div className="col-3 mx-auto d-flex justify-content-center pt-4">
          <button
            type="button"
            className="btn btn-primary gap-2"
            onClick={handleSubmit(login)}
            disabled={!isValid}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
