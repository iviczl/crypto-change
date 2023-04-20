function Login() {
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="text-center">Login</div>
          <div className="row justify-content-center">
            <div className="col-3">
              <label htmlFor="userName" className="form-label">
                User name
              </label>
              <input type="text" className="form-control" id="userName" />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" id="password" />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-3">
              <button type="button" className="btn btn-primary gap-2">
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
