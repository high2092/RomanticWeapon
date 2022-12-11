import React, { useEffect, useRef, useState } from 'react';
import mob00Animation from '../assets/mob00.gif';
import mob00HitImg from '../assets/mob00hit.png';
import * as S from './Dungeon.style';

const MIN = 0;
const MAX = 100;
const STEP = 1;

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
    console.log('diff:', hitBoxLeftRef.current - leftRef.current);

    setHixBoxLeft(Math.random() * MAX * 0.7);

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (!mobImageUrlRef || !mobImageUrlRef.current) return;
      mobImageUrlRef.current.src = mob00Animation;
    }, 600);
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
