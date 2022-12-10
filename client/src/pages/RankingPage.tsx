import React from 'react';
import { Ranking } from '../components/Ranking';
import * as S from './RankingPage.style';

const dummyGoldRanking = [
  {
    username: '엄',
    spec: '$99999999',
  },
  {
    username: '하',
    spec: '$88888888',
  },
  {
    username: '하준',
    spec: '$9999999',
  },
];

const dummyRefineRanking = [
  {
    username: '하준',
    spec: '20강',
  },
  {
    username: '엄',
    spec: '18강',
  },
  {
    username: '하',
    spec: '18강',
  },
];

export const RankingPage = () => {
  return (
    <S.RankingPage>
      <S.Rankings>
        <Ranking title="골드" ranking={dummyGoldRanking} />
        <Ranking title="재련" ranking={dummyRefineRanking} />
      </S.Rankings>
    </S.RankingPage>
  );
};
