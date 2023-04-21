function Login() {
  return (
    <>
      <div className="col-3 mx-auto">
        <div className="text-center display-6">Login</div>
        <div className="justify-content-center">
          <label htmlFor="userName" className="form-label">
            User name
          </label>
          <input type="text" className="form-control" id="userName" />
        </div>
        <div className="justify-content-center">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" />
        </div>
        <div className="col-3 mx-auto d-flex justify-content-center pt-4">
          <button type="button" className="btn btn-primary gap-2">
            Log in
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
