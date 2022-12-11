import React, { useEffect, useRef, useState } from 'react';
import mob00Animation from '../assets/mob00.gif';
import mob00HitImg from '../assets/mob00hit.png';
import mob00DieAnimation from '../assets/mob00die.gif';
import { mob00DieSound, mob00HitSound } from '../constants/constants';
import * as S from './Dungeon.style';

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

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== ' ') return;
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

  return (
    <>
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
    </>
  );
};
