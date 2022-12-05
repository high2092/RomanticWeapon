import React, { useEffect, useState } from 'react';
import * as S from './Forge.style';
import refineAnimationUrl from '../assets/refine.gif';
import {
  refineSound,
  refineSuccessSound,
  refineFailureSound,
  HOST,
} from '../constants/constants';
import { httpGet, httpPost } from '../utils/utils';

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
  return chance + '%';
};

const generateLog = (chance: number, result: Results) => {
  return `${chance}%의 확률로 강화에 ${
    result === Results.SUCCESS ? '성공' : '실패'
  }했어요.`;
};

interface RefineResult {
  result: Results;
  level: number;
  cost: number;
  chance: number;
  price: number;
  name: string;
  filePath: string;
  gold: number;
  prevChance: number;
}

const httpGetWeapon = async () => {
  const response = await httpGet(`${HOST}/weapon`);
  const weapon = await response.json();
  return weapon;
};

const Forge = () => {
  const [level, setLevel] = useState<number>();
  const [logs, setLogs] = useState<string[]>([]);
  const [showDimmed, setShowDimmed] = useState(false);
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
    prevChance,
  }: RefineResult) => {
    setLevel(level);
    setCost(cost);
    setChance(chance);
    setWeaponName(name);
    setGold(gold);
    setImageUrl(filePath);

    if (result === undefined) return;

    setLogs([...logs, generateLog(prevChance, result)]);
    result === Results.SUCCESS
      ? refineSuccessSound.play()
      : refineFailureSound.play();
  };

  const handleTryButtonClick = () => {
    setShowDimmed(true);
    refineSound.play();
    httpPostRefine().then((refineResult) => {
      setTimeout(() => {
        update(refineResult);
        setShowDimmed(false);
      }, 0);
    });
  };

  useEffect(() => {
    httpGetWeapon().then(update);
  }, []);

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
