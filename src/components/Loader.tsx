"use client";

import { useEffect, useState } from 'react';

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Имитируем загрузку контента (можно заменить на реальную логику загрузки)
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Даем время для fade-out анимации
      setTimeout(() => {
        setShowLoader(false);
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-800 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: 'linear-gradient(135deg, #ffffff 0%, #3ddac1 30%, #f0f8f6 50%, #3ddac1 70%, #ffffff 100%)',
        backgroundSize: '400% 400%',
        animation: isLoading ? 'gradientShift 6s linear infinite' : 'none',
      }}
    >
      {/* Лоадер в центре */}
      <div className="loader"></div>

      <style jsx>{`
        .loader {
          transform: rotateZ(45deg);
          perspective: 1000px;
          border-radius: 50%;
          width: 72px;
          height: 72px;
          color: #fff;
        }

        .loader:before,
        .loader:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1s spin linear infinite;
        }

        .loader:after {
          color: #3ddac1;
          transform: rotateY(70deg);
        }

        @keyframes spin {
          0%, 100% {
            box-shadow: .2em 0px 0 0px currentcolor;
          }
          12% {
            box-shadow: .2em .2em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 .2em 0 0px currentcolor;
          }
          37% {
            box-shadow: -.2em .2em 0 0 currentcolor;
          }
          50% {
            box-shadow: -.2em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -.2em -.2em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0px -.2em 0 0 currentcolor;
          }
          87% {
            box-shadow: .2em -.2em 0 0 currentcolor;
          }
        }
      `}</style>
    </div>
  );
}
