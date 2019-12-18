import fetch from 'isomorphic-unfetch';
import {FormEvent} from 'react';

function Login() {
  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    const username: HTMLSelectElement | null = document.querySelector('[name="login-username"]');
    const password: HTMLSelectElement | null = document.querySelector('[name="login-password"]');
    const spinner: HTMLElement | null = document.getElementById('spinner');

    // show spinner while working
    if (spinner) spinner.classList.remove('uk-hidden');

    // API route that will handle signing in
    const url = '/api/authenticate/login';
    const data = {
      username: username ? username.value : null,
      password: password ? password.value : null,
    };


    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((response) => {
          const {state} = response;

          // hide spinner as work is essentially done
          if (spinner) spinner.classList.add('uk-hidden');

          if (state) {
            if ((process as any).browser && document && UIkit) {
              document.location.href = "/dashboard";
            }
          } else {
            if (document && UIkit) {
              UIkit['notification']({
                message: `Incorrect login, please try again.`,
                status: 'danger',
                pos: 'top-left',
                timeout: 5000,
              });
            }
          }
        });
  };

  return (
    <section className="auth-login">
      <p className="uk-text-center">Sign in to your account</p>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="uk-margin">
          <div className="uk-inline uk-width-1-1">
            <i className="uk-form-icon fa fa-user" />
            <input className="uk-input uk-form-large" name="login-username" type="text" autoComplete="username"
              placeholder="username" required />
          </div>
        </div>
        <div className="uk-margin">
          <div className="uk-inline uk-width-1-1">
            <i className="uk-form-icon fa fa-lock-alt" />
            <input className="uk-input uk-form-large" name="login-password" type="password"
              autoComplete="current-password" placeholder="password" required />
          </div>
        </div>
        <div className="uk-margin uk-text-right@s uk-text-center uk-text-small">
          <a href="#" uk-switcher-item="2">Forgot Password?</a>
        </div>
        <div className="uk-margin">
          <button className="uk-button bg-primary black uk-button-large uk-width-1-1">Login</button>
        </div>
        <div className="uk-text-small uk-text-center">
          Not registered? <a href="#" uk-switcher-item="1">Create an account</a>
        </div>
      </form>
    </section>
  );
}

export default Login;
