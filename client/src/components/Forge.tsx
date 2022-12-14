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
import { goldAtom } from '../cores/store';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { Modal } from './common/Modal';

const Results = {
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

type Results = typeof Results[keyof typeof Results];

const httpPostRefine = async (body: any) => {
  const response = await httpPost(`${HOST}/refine`, body);
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

const PROTECT_SHIELD = 1;

const Forge = () => {
  const [level, setLevel] = useState<number>();
  const [logs, setLogs] = useState<string[]>([]);
  const [showDimmed, setShowDimmed] = useState(false);
  const [weaponName, setWeaponName] = useState<string>();
  const [cost, setCost] = useState<number>();
  const [gold, setGold] = useAtom(goldAtom);
  const [chance, setChance] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string>('');
  const timeoutRef = useRef<any>(null);

  const [showSuccessEffect, setShowSuccessEffect] = useState(false);
  const [showFailureEffect, setShowFailureEffect] = useState(false);

  const successTimeoutRef = useRef<any>(0);
  const failureTimeoutRef = useRef<any>(0);

  const [useProtectShield, setUseProtectShield] = useState(false);

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

  const handleTryButtonClick = async () => {
    const use = [];
    if (useProtectShield) use.push(PROTECT_SHIELD);
    try {
      const refineResult = await httpPostRefine({ use });
      setShowDimmed(true);
      refineSound.play();
      setTimeout(() => {
        update(refineResult);
        setShowDimmed(false);
      }, 100);
    } catch (error) {}
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
            프로텍트 쉴드:{' '}
            <input
              type="checkbox"
              checked={useProtectShield}
              onClick={() => {
                setUseProtectShield(!useProtectShield);
              }}
            />
          </div>
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
          <Modal
            element={<S.RefineAnimation src={refineAnimationUrl} />}
            zIndex={11}
            handleDimmedClick={() => {}}
          />
        </>
      )}
    </>
  );
};

export default Forge;
