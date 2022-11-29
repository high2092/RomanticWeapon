import React, { useEffect, useState } from 'react';
import * as S from './Forge.style';

const Forge = () => {
  const [level, setLevel] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [maxLevel, setMaxLevel] = useState(0);

  const successChance = 1 - 0.05 * level;

  const formatChance = (chance: number) => {
    return (chance * 100).toFixed(0) + '%';
  };

  const handleTryButtonClick = () => {
    const dice = Math.random();
    const succeed = dice <= successChance;

    setLogs([
      ...logs,
      `${level} 단계에서 ${formatChance(successChance)}의 확률로 강화에 ${
        succeed ? '성공' : '실패'
      }했어요.`,
    ]);

    if (succeed) setLevel(level + 1);
    else setLevel(level - 1);
  };

  useEffect(() => {
    if (level > maxLevel) setMaxLevel(level);
  }, [level]);

  return (
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
  );
};

export default Forge;
