import React, { useEffect, useState } from 'react';
import * as S from './Forge.style';
import refineSound from '../assets/refine.mp3';
import refineAnimation from '../assets/refine.gif';

const Forge = () => {
  const [level, setLevel] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [maxLevel, setMaxLevel] = useState(0);
  const [showDimmed, setShowDimmed] = useState(false);
  const [success, setSuccess] = useState<boolean>();
  const [reload, setReload] = useState(false);

  const successChance = 1 - 0.05 * level;

  const formatChance = (chance: number) => {
    return (chance * 100).toFixed(0) + '%';
  };

  const audio = new Audio(refineSound);
  audio.onended = () => {
    setReload(!reload);
  };

  useEffect(() => {
    setShowDimmed(false);
  }, [reload]);

  useEffect(() => {
    if (success === undefined) return;
    if (success) setLevel(level + 1);
    else setLevel(level - 1);

    setLogs([
      ...logs,
      `${level} 단계에서 ${formatChance(
        success ? successChance : 1 - successChance
      )}의 확률로 강화에 ${success ? '성공' : '실패'}했어요.`,
    ]);
  }, [reload]);

  const handleTryButtonClick = () => {
    setShowDimmed(true);
    audio.play();
    const dice = Math.random();
    const succeed = dice <= successChance;
    setSuccess(succeed);
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
          <S.RefineAnimation src={refineAnimation} zIndex={11} />
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
