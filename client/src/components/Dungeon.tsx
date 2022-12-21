import React, { useEffect, useRef, useState } from 'react';
import mob00Animation from '../assets/mob00.gif';
import mob00HitImg from '../assets/mob00hit.png';
import mob00DieAnimation from '../assets/mob00die.gif';
import { mob00DieSound, mob00HitSound } from '../constants/constants';
import * as S from './Dungeon.style';
import dummySkillIconUrl from '../assets/4211008.png';

const MIN = 0;
const MAX = 100;
const STEP = 1;

let MOB_HP = 1000;
const WEAPON_POWER = 100;

const mockHttpPostAttack = (hitpoint: number) => {
  const critical = 0.02 * (100 - Math.abs(hitpoint));
  const damage = WEAPON_POWER * critical;
  MOB_HP -= damage;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ hp: MOB_HP });
    }, 0);
  });
};

const useInterval = (callback: any, delay: number) => {
  const savedCallback = useRef<any>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const executeCallback = () => {
      savedCallback.current();
    };

    const timerId = setInterval(executeCallback, delay);

    return () => clearInterval(timerId);
  }, []);
};

export const Dungeon = () => {
  const mobImageUrlRef = useRef<HTMLImageElement | null>(null);
  const timeoutRef = useRef<any>(0);

  const [left, setLeft] = useState(0);
  const leftRef = useRef(0);

  const [direction, setDirection] = useState(1);

  const [hitBoxLeft, setHixBoxLeft] = useState(Math.random() * MAX * 0.7);
  const hitBoxLeftRef = useRef(hitBoxLeft);

  const [showDimmed, setShowDimmed] = useState(false);
  const showDimmedRef = useRef(showDimmed);

  useEffect(() => {
    showDimmedRef.current = showDimmed;
  }, [showDimmed]);

  // TODO: Ref 없애고 투명한 input 요소 + React.KeyboardEvent onKeyPress 이용하기
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== ' ') return;
    if (showDimmedRef.current) return;

    hit();
  };

  const hit = () => {
    if (!mobImageUrlRef || !mobImageUrlRef.current) return;
    mobImageUrlRef.current.src = mob00HitImg;

    const diff = hitBoxLeftRef.current - leftRef.current;
    console.log('diff:', diff);

    mockHttpPostAttack(diff).then(({ hp }: any) => {
      if (!mobImageUrlRef || !mobImageUrlRef.current) return;

      setHixBoxLeft(Math.random() * MAX * 0.7);

      let stiffen = 600;

      if (hp <= 0) {
        mobImageUrlRef.current.src = mob00DieAnimation;
        stiffen = 1200;
        MOB_HP = 1000;
        mob00DieSound().play();
        setShowDimmed(true);
      } else {
        mobImageUrlRef.current.src = mob00HitImg;
        mob00HitSound().play();
      }

      console.log('hp:', hp);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (!mobImageUrlRef || !mobImageUrlRef.current) return;
        mobImageUrlRef.current.src = mob00Animation;
      }, stiffen);
    });
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useInterval(() => {
    setLeft((left) => left + direction * STEP);

    if (left >= MAX) setDirection(-1);
    if (left <= MIN) setDirection(1);
  }, 10);

  useEffect(() => {
    leftRef.current = left;
  }, [left]);

  useEffect(() => {
    hitBoxLeftRef.current = hitBoxLeft;
  }, [hitBoxLeft]);

  const handleCardClick = (idx: number) => () => {
    console.log(idx);
    setShowDimmed(false);
  };

  const handleHitButtonClick = () => {
    hit();
  };

  return (
    <S.Dungeon>
      <S.Mob>
        <img src={mob00Animation} width="100" ref={mobImageUrlRef} />
      </S.Mob>
      <S.Bar>
        <S.Hit
          src="http://localhost:8080/image/weapon/weapon20.png"
          left={`${left}%`}
        />
        <S.HitBox left={`${hitBoxLeft}%`} />
      </S.Bar>
      <S.HitButton onClick={handleHitButtonClick}>HIT!</S.HitButton>
      {showDimmed && (
        <ReinforcementCardSelectionUI
          reinforcementCards={[]}
          handleCardClick={handleCardClick}
        />
      )}
    </S.Dungeon>
  );
};

const dummyReinforcementCards = [
  {
    idx: 1,
    title: '샤프 아이즈',
    imgUrl:
      'https://w.namu.la/s/84ad52c18ef5eb0f09ccf2d3eda0380c7f4881ae74f0b60a3af3925fa00617331de7159699db9ab455e133ad5e373d18ae6c37adf8d73f428f58a0e9f6ab169caa6c1e5bf33a425e33d0be3547c13706884ec9b2a8b3ed675bc1ea58d504946d',
    description: '크리티컬 확률이 5% 증가합니다.',
  },
  {
    idx: 4,
    title: '쉐도우 파트너',
    imgUrl: dummySkillIconUrl,
    description: '데미지 5%의 추가타가 발생합니다.',
  },
  {
    idx: 3,
    title: '퍼미에이트',
    imgUrl:
      'https://w.namu.la/s/b78e2f58c290a60520803c3afc679fa0e412263a50034fc16a9514fee4acb125900535db13f54b782d851bc36052bd8546e3066efffa6f60b2d1fa6e6114d3819e1f233595d05142c0be391b52e0321bf2932525ed3cac7136185ac7337dd549',
    description: '공격 대상의 방어율을 10% 무시합니다.',
  },
];

interface Card {
  idx: number;
  title: string;
  imgUrl: string;
  description: string;
}

interface ReinforcementCardSelectionUIProps {
  reinforcementCards: Card[];
  handleCardClick: (idx: number) => () => void;
}

export const ReinforcementCardSelectionUI = ({
  reinforcementCards,
  handleCardClick,
}: ReinforcementCardSelectionUIProps) => {
  return (
    <S.ReinforcementCardSelectionUI>
      {dummyReinforcementCards.map(({ idx, title, imgUrl, description }) => (
        <ReinforcementCard
          key={idx}
          idx={idx}
          title={title}
          imgUrl={imgUrl}
          description={description}
          handleCardClick={handleCardClick}
        />
      ))}
    </S.ReinforcementCardSelectionUI>
  );
};

interface ReinforcementCardProps {
  idx: number;
  imgUrl: string;
  title: string;
  description: string;
  handleCardClick: (idx: number) => () => void;
}

const ReinforcementCard = ({
  idx,
  title,
  imgUrl,
  description,
  handleCardClick,
}: ReinforcementCardProps) => {
  return (
    <S.ReinforcementCard onClick={handleCardClick(idx)}>
      <S.ReinforcementCardIcon src={imgUrl} />
      <S.ReinforcementCardTitle>{title}</S.ReinforcementCardTitle>
      <S.ReinforcementCardDescription>
        {description}
      </S.ReinforcementCardDescription>
    </S.ReinforcementCard>
  );
};
