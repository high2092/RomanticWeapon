import React from 'react';
import * as S from './Ranking.style';

interface Row {
  username: string;
  spec: string;
}

interface RankingProps {
  title: string;
  ranking: Row[];
}

export const Ranking = ({ title, ranking }: RankingProps) => {
  return (
    <S.RankingContainer>
      <S.Title>{title}</S.Title>
      <S.Ranking>
        {ranking.map(({ username, spec }, idx: any) => (
          <S.Row key={username}>
            <div>{idx + 1}</div>
            <div>{username}</div>
            <div>{spec}</div>
          </S.Row>
        ))}
      </S.Ranking>
    </S.RankingContainer>
  );
};
