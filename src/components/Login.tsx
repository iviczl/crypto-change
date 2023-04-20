function Login() {
  return (
    <>
      <span>Login</span>
      <div>
        <input type="text" className="form-control" placeholder="Username" />
        <input type="text" className="form-control" placeholder="Password" />
        <button type="button" className="btn btn-primary">
          Log in
        </button>
      </div>
    </>
  );
}

export default Login;
