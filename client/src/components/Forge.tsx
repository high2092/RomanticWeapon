import React, { useEffect, useState } from 'react';
import * as S from './Forge.style';
import refineAnimationUrl from '../assets/refine.gif';
import {
  refineSound,
  refineSuccessSound,
  refineFailureSound,
} from '../constants/constants';
const Results = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;

type Results = typeof Results[keyof typeof Results];

const formatChance = (chance: number) => {
  return (chance * 100).toFixed(0) + '%';
};

const Assets = {
  [Results.SUCCESS]: {
    Level: (level: number) => level + 1,
    Log: (successChance: number) =>
      `${formatChance(successChance)}의 확률로 강화에 성공했어요.`,
    Sound: refineSuccessSound,
  },
  [Results.FAILED]: {
    Level: (level: number) => level - 1,
    Log: (successChance: number) =>
      `${formatChance(1 - successChance)}의 확률로 강화에 실패했어요.`,
    Sound: refineFailureSound,
  },
};

const Forge = () => {
  const [level, setLevel] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [maxLevel, setMaxLevel] = useState(0);
  const [showDimmed, setShowDimmed] = useState(false);
  const [result, setResult] = useState<Results>();
  const [reload, setReload] = useState(false);

  const successChance = 1 - 0.05 * level;

  refineSound.onended = () => {
    setReload(!reload);
  };

  useEffect(() => {
    setShowDimmed(false);
  }, [reload]);

  useEffect(() => {
    if (result === undefined) return;

    setLevel(Assets[result].Level(level));
    setLogs([...logs, Assets[result].Log(successChance)]);
    Assets[result].Sound.play();
  }, [reload]);

  const handleTryButtonClick = () => {
    setShowDimmed(true);
    refineSound.play();
    const dice = Math.random();
    const result = dice <= successChance ? Results.SUCCESS : Results.FAILED;
    setResult(result);
  };

  useEffect(() => {
    if (level > maxLevel) setMaxLevel(level);
  }, [level]);

  return (
    <>
      <S.Forge>
        <S.LogsContainer>
          <S.Logs>
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </S.Logs>
        </S.LogsContainer>
        <div>현재 최고 단계: {maxLevel}</div>
        <div>성공 확률: {formatChance(successChance)}</div>
        <div>
          <S.Level>{level}</S.Level>
          <button onClick={handleTryButtonClick}>강화</button>
        </div>
      </S.Forge>
      {showDimmed && (
        <>
          <Dimmed handleDimmedClick={() => {}} zIndex={10} />
          <S.RefineAnimation src={refineAnimationUrl} zIndex={11} />
        </>
      )}
    </>
  );
};

interface DimmedProps {
  zIndex: number;
  handleDimmedClick: () => void;
}

const Dimmed = ({ zIndex, handleDimmedClick }: DimmedProps) => {
  return <S.Dimmed onClick={handleDimmedClick} zIndex={zIndex} />;
};

export default Forge;
