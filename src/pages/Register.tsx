import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Header } from '../components/layout/Header';
import { useAuth } from '../context/AuthContext';
import { api, csrf } from '../API/callToServer';
import { Button } from '../components/common/Button';

export interface SubmitForm {
  name: string;
  mail: string;
  pwd: string;
  confirmPwd: string;
}

export const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<SubmitForm>({
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    if (!isValid) return;

    const obj = {
      name: data.name,
      email: data.mail,
      password: data.pwd,
      password_confirmation: data.confirmPwd,
    };
    setIsLoading(true);
    csrf.get('sanctum/csrf-cookie').then(() => {
      api
        .post('admin/register', obj)
        .then((response) => {
          auth.logIn(response.data);
          reset();
          navigate('/admin');
        })
        .catch((err) => {
          console.log('error', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  });

  const password = watch('pwd');

  if (auth.user?.token) {
    return <Navigate to='/admin' />;
  }

  return (
    <>
      <Header admin={true} />

      <main>
        <section className='login'>
          <header className='login__header'>
            <h2 className='login__title'>Регистрация</h2>
          </header>
          <div className='login__wrapper'>
            <form className='login__form' onSubmit={onSubmit}>
              <label className='login__label' htmlFor='name'>
                Имя
                <input
                  className='login__input'
                  type='name'
                  placeholder='Администратор'
                  {...register('name', {
                    required: 'Поле обязательно для заполнения',
                  })}
                />
                {errors?.name && <p className='error'>{errors?.name?.message || 'Не корректно заполненное поле'}</p>}
              </label>
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
              <label className='login__label' htmlFor='confirmPwd'>
                Пароль
                <input
                  className='login__input'
                  type='password'
                  placeholder=''
                  {...register('confirmPwd', {
                    required: 'Поле обязательно для заполнения',
                    validate: (value) => value === password || 'Пароли не совпадают',
                  })}
                />
                {errors?.confirmPwd && <p className='error'>{errors?.confirmPwd?.message || 'Не корректно заполненное поле'}</p>}
              </label>
              <div className='text-center'>
                <Button btnStyle='accent' name='Зарегистрироваться' type='submit' disabled={isLoading} />
              </div>
            </form>
            <div className='text-center pt-30 fs-16'>
              <Link to={'/login'}>Авторизоваться</Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
