import Footer from '../../components/footer/footer';
import LoginForm from '../../components/login-form/login-form';
import Header from '../../components/header/header';

const Login = ():JSX.Element => (
  <div className="user-page">
    <Header className="user-page__head">
      <h1 className="page-title user-page__title">Sign in</h1>
    </Header>

    <div className="sign-in user-page__content">
      <LoginForm />
    </div>

    <Footer />
  </div>
);

export default Login;
