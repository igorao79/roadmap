"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRef, useEffect } from "react";

type DotLottiePlayer = any;

export function BackgroundAnimation() {
  const dotLottieRef = useRef<DotLottiePlayer | null>(null);
  const frame = useRef(0);
  const direction = useRef(1);
  const raf = useRef<number | null>(null);

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
    <div className="fixed inset-0 z-50 bg-black pointer-events-none">
      <DotLottieReact
        src="/images/background.lottie"
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
          zIndex: 50,
          transform: "scale(1.3)",
        }}
      />
    </div>
  );
}
