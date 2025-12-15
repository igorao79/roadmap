"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

type DotLottiePlayer = any;

export function BackgroundAnimation() {
  const [isMobile, setIsMobile] = useState(false);
  const dotLottieRef = useRef<DotLottiePlayer | null>(null);
  const frame = useRef(0);
  const direction = useRef(1);
  const raf = useRef<number | null>(null);

  useLayoutEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      console.log('Window width:', window.innerWidth, 'Is mobile:', mobile);
      setIsMobile(mobile);
    };

    checkMobile();
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      console.log('Resize - Window width:', window.innerWidth, 'Is mobile:', mobile);
      setIsMobile(mobile);
    };

    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const tick = () => {
    const anim = dotLottieRef.current;
    if (!anim) return;

    const total = anim.totalFrames;

    // Двигаем кадр
    frame.current += direction.current;

    // Дошли до конца → меняем направление
    if (frame.current >= total - 1) {
      direction.current = -1;
    }

    // Дошли до начала → меняем направление
    if (frame.current <= 0) {
      direction.current = 1;
    }

    anim.setFrame(frame.current);

    raf.current = requestAnimationFrame(tick);
  };

  const onLoaded = () => {
    console.log("LOTTIE LOADED");

    // Останавливаем внутренний авто-плеер
    dotLottieRef.current.stop();

    // Запускаем наш рендер вечно
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 bg-black pointer-events-none">
      <DotLottieReact
        key={isMobile ? 'mobile' : 'desktop'}
        src={isMobile ? "/images/backgroundm.lottie" : "/images/background.lottie"}
        autoplay={false} // важно: отключаем внутренний плейбек
        loop={false}
        dotLottieRefCallback={(player) => {
          if (player) {
            dotLottieRef.current = player;
            player.addEventListener("load", onLoaded);
          }
        }}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 40,
          transform: "scale(1.3)",
        }}
      />
    </div>
  );
}
