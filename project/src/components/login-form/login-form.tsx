import SignInMessage from '../sign-in-message/sign-in-message';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { EMAIL_REGEXP, PASSWORD_REGEXP, LOGIN_FIELDS } from '../../const';
import { loginAction } from '../../store/slices/user-slice/user-slice';
import cn from 'classnames';

interface Field {
  value: string;
  regex: RegExp;
  error: boolean;
  errorText: string;
}


const LoginForm = ():JSX.Element => {
  const [formData, setFormData] = useState<Record<string, Field>>({
    email: {
      value: '',
      error: false,
      regex: EMAIL_REGEXP,
      errorText: 'Please enter a valid email address'
    },
    password: {
      value: '',
      error: false,
      regex: PASSWORD_REGEXP,
      errorText: 'Password should contain at least 1 letter and 1 number'
    },
  });

  const dispatch = useAppDispatch();

  const isFieldsGroupValid = Object.values(formData)
    .some((value) => value.error);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = e.target;

    setFormData({
      ...formData,
      [type]: {
        ...formData[type],
        error: !formData[type].regex.test(value),
        value: value,
      }
    });
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(loginAction({
      login: formData.email.value,
      password: formData.password.value,
    }));
  };


  return (
    <form action=""
      onSubmit={handleSubmit}
      className="sign-in__form"
    >
      {isFieldsGroupValid &&
        <SignInMessage>
          {formData.email.error && <p>Please enter a valid email address</p>}
          {formData.password.error && <p>We can’t recognize this email <br /> and password combination. Please try again.</p>}
        </SignInMessage>}

      <div className="sign-in__fields">
        {LOGIN_FIELDS.map(({name, type, value}) => (
          <div key={name} className={cn('sign-in__field', formData[type].error && 'sign-in__field--error')}>
            <input className="sign-in__input"
              type={type}
              placeholder={value}
              name={name}
              onChange={handleInputChange}
              id={name}
              required
            />
            <label className="sign-in__label visually-hidden" htmlFor={name}>{value}</label>
          </div>
        ))}

      </div>
      <div className="sign-in__submit">
        <button className="sign-in__btn"
          disabled={isFieldsGroupValid}
          type="submit"
        >Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
