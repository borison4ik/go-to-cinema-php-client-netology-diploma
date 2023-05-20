import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Store } from 'react-notifications-component';

import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { api, csrf } from '../API/callToServer';
import { AdministratorLayot } from '../components/layout/AdministratorLayot';

export interface SubmitForm {
  mail: string;
  pwd: string;
}

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubmitForm>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;

    const obj = {
      email: data.mail,
      password: data.pwd,
    };
    setIsLoading(true);

    csrf.get('sanctum/csrf-cookie').then(() => {
      api
        .post('admin/login', obj)
        .then((response) => {
          auth.logIn(response.data);
          reset();
          navigate('/admin');
        })
        .catch((err) => {
          Store.addNotification({
            title: 'Упс!',
            message: err.response.data.message || err.response.data.error,
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            dismiss: {
              duration: 2000,
              onScreen: true,
            },
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  });

  if (auth.user?.token) {
    return <Navigate to='/admin' />;
  }

  return (
    <AdministratorLayot>
      <Header admin={true} />

      <main>
        <section className='login'>
          <header className='login__header'>
            <h2 className='login__title'>Авторизация</h2>
          </header>
          <div className='login__wrapper'>
            <form className='login__form' onSubmit={onSubmit}>
              <label className='login__label' htmlFor='mail'>
                E-mail
                <input
                  className='login__input'
                  type='mail'
                  placeholder='example@domain.xyz'
                  {...register('mail', {
                    required: 'Поле обязательно для заполнения',
                  })}
                />
                {errors?.mail && <p className='error'>{errors?.mail?.message || 'Не корректно заполненное поле'}</p>}
              </label>
              <label className='login__label' htmlFor='pwd'>
                Пароль
                <input
                  className='login__input'
                  type='password'
                  placeholder=''
                  {...register('pwd', {
                    required: 'Поле обязательно для заполнения',
                  })}
                />
                {errors?.pwd && <p className='error'>{errors?.pwd?.message || 'Не корректно заполненное поле'}</p>}
              </label>
              <div className='text-center'>
                <Button btnStyle='accent' name='Авторизоваться' type='submit' disabled={isLoading} />
              </div>
            </form>
            <div className='text-center pt-30 fs-16'>
              <Link to={'/admin/register'} relative='path'>
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </section>
      </main>
    </AdministratorLayot>
  );
};
