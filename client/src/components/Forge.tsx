import React, { useEffect, useRef, useState } from 'react';
import * as S from './Forge.style';
import refineAnimationUrl from '../assets/refine.gif';
import {
  refineSound,
  refineSuccessSound,
  refineFailureSound,
  achievementSound,
  HOST,
} from '../constants/constants';
import { httpGet, httpPost } from '../utils/utils';
import refineSuccessAnimationUrl from '../assets/refine-success.gif';
import refineFailureAnimationUrl from '../assets/refine-failure.gif';

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

const generateLog = (chance: number, level: number, result: Results) => {
  return `${chance}%의 확률로 +${
    level + Number(result !== Results.SUCCESS)
  } 강화에 ${result === Results.SUCCESS ? '성공' : '실패'}했어요.`;
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
  achievement: boolean;
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
  const timeoutRef = useRef<any>(null);

  const [showSuccessEffect, setShowSuccessEffect] = useState(false);
  const [showFailureEffect, setShowFailureEffect] = useState(false);

  const successTimeoutRef = useRef<any>(0);
  const failureTimeoutRef = useRef<any>(0);

  const update = ({
    result,
    level,
    cost,
    chance,
    name,
    gold,
    filePath,
    prevChance,
    achievement,
  }: RefineResult) => {
    setLevel(level);
    setCost(cost);
    setChance(chance);
    setWeaponName(name);
    setGold(gold);
    setImageUrl(filePath);

    if (result === undefined) return;

    setLogs([...logs, generateLog(prevChance, level, result)]);
    result === Results.SUCCESS
      ? refineSuccessSound.play()
      : refineFailureSound.play();

    if (result === Results.SUCCESS) {
      clearTimeout(successTimeoutRef.current);
      setShowSuccessEffect(false);
      setTimeout(() => {
        setShowSuccessEffect(true);
      }, 100);
      successTimeoutRef.current = setTimeout(() => {
        setShowSuccessEffect(false);
      }, 800);
    } else {
      clearTimeout(failureTimeoutRef.current);
      setShowFailureEffect(false);
      setTimeout(() => {
        setShowFailureEffect(true);
      }, 100);
      failureTimeoutRef.current = setTimeout(() => {
        setShowFailureEffect(false);
      }, 800);
    }

    if (achievement) {
      clearTimeout(timeoutRef.current);
      setAchivement(false);
      setMaxLevel(level);
      setTimeout(() => {
        achievementSound().play();
        setAchivement(true);
      }, 100);
      timeoutRef.current = setTimeout(() => {
        setAchivement(false);
      }, 2000);
    }
  };

  const handleTryButtonClick = () => {
    setShowDimmed(true);
    refineSound.play();
    httpPostRefine().then((refineResult) => {
      setTimeout(() => {
        update(refineResult);
        setShowDimmed(false);
      }, 100);
    });
  };

  const [maxLevel, setMaxLevel] = useState(0);

  useEffect(() => {
    httpGetWeapon().then(update);
  }, []);

  const [achivement, setAchivement] = useState(false);

  return (
    <>
      <S.Forge>
        {achivement && <S.Achivement>{maxLevel}강 달성!</S.Achivement>}
        <S.LogsContainer>
          <S.Logs>
            {logs.map((log, idx) => (
              <div key={idx}>{log}</div>
            ))}
          </S.Logs>
        </S.LogsContainer>
        <S.WeaponSection>
          {showSuccessEffect && (
            <S.RefineSuccessAnimation src={refineSuccessAnimationUrl} />
          )}
          {showFailureEffect && (
            <S.RefineResultAnimation src={refineFailureAnimationUrl} />
          )}
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
