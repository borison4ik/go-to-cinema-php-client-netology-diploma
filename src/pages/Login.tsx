import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { api } from '../API/callToServer';

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

    api.get('/sanctum/csrf-cookie').then(() => {
      api.post('/api/admin/login', obj).then((response) => {
        if (response.data.error) {
          console.log('error', response.data.error);
        } else {
          auth.logIn(response.data);
          setIsLoading(false);
          reset();
          navigate('/admin');
        }
      });
    });
  });

  if (auth.user?.token) {
    return <Navigate to='/admin' />;
  }

  return (
    <>
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
          </div>
        </section>
      </main>
    </>
  );
};
