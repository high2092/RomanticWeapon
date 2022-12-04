import React, { useEffect, useState } from 'react';
import * as S from './Forge.style';
import refineAnimationUrl from '../assets/refine.gif';
import {
  refineSound,
  refineSuccessSound,
  refineFailureSound,
  HOST,
} from '../constants/constants';
import { httpPost } from '../utils/utils';
import weapon17ImgUrl from '../assets/weapon17.png';

const Results = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

type Results = typeof Results[keyof typeof Results];

const httpPostRefine = async () => {
  const response = await httpPost(`${HOST}/refine`, { weaponIdx: 1 });
  const result = await response.json();
  return result;
};

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
  [Results.FAILURE]: {
    Level: (level: number) => level - 1,
    Log: (successChance: number) =>
      `${formatChance(1 - successChance)}의 확률로 강화에 실패했어요.`,
    Sound: refineFailureSound,
  },
};

const dummyResponse = {
  result: 'SUCCESS' as Results,
  level: 17,
  cost: 5000,
  chance: 0.15,
  price: 200000,
  name: '레드 투 핸더',
  filePath: weapon17ImgUrl as string,
  gold: 100000,
};

interface Response {
  result: Results;
  level: number;
  cost: number;
  chance: number;
  price: number;
  name: string;
  filePath: string;
  gold: number;
}

const Forge = () => {
  const [level, setLevel] = useState<number>();
  const [logs, setLogs] = useState<string[]>([]);
  const [showDimmed, setShowDimmed] = useState(false);
  const [result, setResult] = useState<Results>();
  const [reload, setReload] = useState(false);
  const [weaponName, setWeaponName] = useState<string>();
  const [cost, setCost] = useState<number>();
  const [gold, setGold] = useState<number>();
  const [chance, setChance] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string>('');

  const update = ({
    result,
    level,
    cost,
    chance,
    name,
    gold,
    filePath,
  }: Response) => {
    setResult(result);
    setLevel(level);
    setCost(cost);
    setChance(chance);
    setWeaponName(name);
    setGold(gold);
    setImageUrl(filePath);
  };

  refineSound.onended = () => {
    setReload(!reload);
    // update(dummyResponse);
  };

  useEffect(() => {
    setShowDimmed(false);
  }, [reload]);

  useEffect(() => {
    if (result === undefined) return;

    setLogs([...logs, Assets[result].Log(chance!)]);
    Assets[result].Sound.play();
  }, [reload]);

  const handleTryButtonClick = () => {
    setShowDimmed(true);
    refineSound.play();
    httpPostRefine().then(update);
  };

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
        <S.WeaponSection>
          <S.WeaponImage src={imageUrl} />
          <S.SizedText fontSize="1.6rem">{weaponName}</S.SizedText>
          <S.SizedText fontSize="1.5rem">현재 재련 단계: +{level}</S.SizedText>
          <div>소지금: {gold}</div>
          <div>강화비용: {cost}</div>
          <div>
            <S.RefineButtonSection>
              <S.SizedText fontSize="1.3rem">
                {chance ? formatChance(chance) : ''}
              </S.SizedText>
              <S.RefineButton onClick={handleTryButtonClick}>
                강화
              </S.RefineButton>
            </S.RefineButtonSection>
          </div>
        </S.WeaponSection>
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
