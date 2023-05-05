import React, { useEffect } from 'react';
import { Header } from '../components/layout/Header';
import { StepWrapper } from '../components/adminPanel/StepWrapper/StepWrapper';
import { HallsNameList } from '../components/adminPanel/step1/HallsNameList';
import { fechAdminPanel } from '../store/reducers/ActionCreators';
import { useAppDispatch } from '../hooks/redux';
import { ConfigureHalls } from '../components/adminPanel/step2/ConfigureHalls';
import { ConfigurePrice } from '../components/adminPanel/step3/ConfigurePrice';
import { FilmSessionsConfiguration } from '../components/adminPanel/step4/FilmSessionsConfiguration';
import { OpenSale } from '../components/adminPanel/step5/OpenSale';

export const AdminPanel = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fechAdminPanel());
  }, [dispatch]);

  return (
    <>
      <Header admin={true} />

      <main className='conf-steps'>
        <StepWrapper title='Управление залами'>
          <HallsNameList />
        </StepWrapper>

        <StepWrapper title='Конфигурация залов'>
          <ConfigureHalls />
        </StepWrapper>

        <StepWrapper title='Конфигурация цен'>
          <ConfigurePrice />
        </StepWrapper>

        <StepWrapper title='Сетка сеансов'>
          <FilmSessionsConfiguration />
        </StepWrapper>

        <StepWrapper title='Открыть продажи'>
          <OpenSale />
        </StepWrapper>
      </main>
    </>
  );
};
