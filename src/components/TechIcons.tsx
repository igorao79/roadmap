"use client";

import { useState, useEffect } from "react";
import "devicon/devicon.min.css";

// Типы для Devicon данных
interface DeviconIcon {
  name: string;
  color: string;
  tags: string[];
  versions: {
    svg: string[];
    font: string[];
  };
}

interface TechIconsProps {
  dimensions: { width: number; height: number };
  hoveredMarker: number | null;
  setHoveredMarker: (index: number | null) => void;
  setIsLineVisible: (visible: boolean) => void;
  animationCounter: number;
  setAnimationCounter: (counter: number) => void;
  deviconData: Record<string, string>;
  onIconClick: (techName: string) => void;
}

export function TechIcons({
  dimensions,
  hoveredMarker,
  setHoveredMarker,
  setIsLineVisible,
  animationCounter,
  setAnimationCounter,
  deviconData,
  onIconClick
}: TechIconsProps) {
  const languages = [
    { className: 'devicon-html5-plain colored', name: 'HTML' },
    { className: 'devicon-css3-plain colored', name: 'CSS' },
    { className: 'devicon-javascript-plain colored', name: 'JavaScript' },
    { className: 'devicon-git-plain colored', name: 'Git' },
    { className: 'devicon-typescript-plain colored', name: 'TypeScript' },
    { className: 'devicon-react-original colored', name: 'React' },
    { className: 'devicon-tailwindcss-plain colored', name: 'Tailwind' },
    { className: 'devicon-vite-plain colored', name: 'Vite' },
    { className: 'devicon-nextjs-plain colored', name: 'Next.js' }
  ];

  const amplitude = 40; // амплитуда изгиба
  const frequency = 0.015; // частота волны
  const segments = 60; // количество сегментов линии

  // Создаем статичную волнообразную линию
  const points = [];
  for (let i = 0; i <= segments; i++) {
    const x = (dimensions.width / segments) * i;
    const y = Math.sin(x * frequency) * amplitude + dimensions.height / 2;
    points.push(`${x},${y}`);
  }

  // Создаем чекпоинты каждые 5% ширины (5%, 10%, 15%, ..., 95%)
  const markers: Array<{ x: number; y: number }> = [];
  for (let i = 1; i <= 19; i++) { // 5%, 10%, 15%, ..., 95%
    const percent = i * 5; // 5, 10, 15, 20, ..., 95
    const x = (dimensions.width * percent) / 100;
    const y = Math.sin(x * frequency) * amplitude + dimensions.height / 2;
    markers.push({ x, y });
  }

  // Позиции для иконок над метками
  const iconPositions: Array<{
    className: string;
    name: string;
    x: number;
    y: number;
    key: string;
    isPeak: boolean;
  }> = [];

  // Размещаем иконки над метками: над-под-над-под чередуясь
  languages.forEach((lang, index) => {
    if (index >= markers.length) return; // Не больше меток

    const marker = markers[index];
    const isAbove = index % 2 === 0; // Чередуем: над, под, над, под...

    const offsetDistance = isAbove ? 90 : 30; // Расстояние от линии (еще больше поднял верхние иконки)
    const finalY = isAbove ? marker.y - offsetDistance : marker.y + offsetDistance;

    iconPositions.push({
      ...lang,
      x: marker.x - 24, // центрируем иконку
      y: finalY,
      key: `marker-${index}`,
      isPeak: isAbove
    });
  });

  return (
    <>
      {/* Иконки языков программирования - могут получать клики для hover */}
      {iconPositions.map((icon, index) => {
        // Определяем, находится ли иконка на зеленой стороне линии (первые 55%)
        const isOnGreenSide = icon.x < dimensions.width * 0.55;
        const borderColor = isOnGreenSide ? '#3ddac1' : 'rgba(255,255,255,0.2)';
        const borderWidth = isOnGreenSide ? '2px' : '1px';

        return (
          <div
            key={icon.key}
            className="absolute flex items-center justify-center group cursor-pointer transition-all duration-300 pointer-events-auto"
            style={{
              left: `${icon.x - 8}px`, // Корректировка центрирования
              top: `${icon.y}px`,
              zIndex: 70,
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: `${borderWidth} solid ${borderColor}`,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              opacity: 0.9,
              transition: 'border-color 0.3s ease',
            }}
            onClick={() => onIconClick(icon.name)}
            onMouseEnter={(e) => {
              if (!e.currentTarget) return;

              // Активируем линию прогресса для этого чекпоинта
              setAnimationCounter(prev => prev + 1);
              setIsLineVisible(true);
              setHoveredMarker(index);

              const iconElement = e.currentTarget.querySelector('i') as HTMLElement;
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;

              // Получаем оригинальный цвет технологии из загруженных данных
              const key = icon.name.toLowerCase();
              let iconColor = deviconData[key];

              // Отладка: если цвет не найден, используем fallback
              if (!iconColor) {
                console.log(`Color not found for ${key}, using fallback`);
                // Fallback цвета для технологий
                const fallbacks: Record<string, string> = {
                  'next.js': '#000000',
                  'nextjs': '#000000',
                  'next': '#000000',
                  'tailwind': '#06B6D4',
                  'tailwindcss': '#06B6D4'
                };
                iconColor = fallbacks[key];
              }

              if (iconColor) {
                // Применяем цвет к обводке
                e.currentTarget.style.borderColor = iconColor;
                // Меняем цвет иконки
                if (iconElement) {
                  iconElement.style.color = iconColor;
                }
              }

              // Показываем tooltip
              if (tooltip) tooltip.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget) return;

              // Начинаем плавное исчезновение линии
              const lineElement = document.querySelector('.progress-line');
              if (lineElement) {
                lineElement.classList.add('fade-out');
                setTimeout(() => {
                  setHoveredMarker(null);
                  setIsLineVisible(false);
                  if (lineElement) {
                    lineElement.classList.remove('fade-out');
                  }
                }, 500);
              } else {
                setHoveredMarker(null);
                setIsLineVisible(false);
              }

              const iconElement = e.currentTarget.querySelector('i') as HTMLElement;
              const tooltip = e.currentTarget.querySelector('.tooltip') as HTMLElement;

              // Возвращаем обводку
              e.currentTarget.style.borderColor = borderColor;
              // Возвращаем зеленый цвет иконки
              if (iconElement) {
                iconElement.style.color = '#3ddac1';
              }
              // Скрываем tooltip
              if (tooltip) tooltip.style.opacity = '0';
            }}
          >
            <i
              className={icon.className}
              style={{
                fontSize: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3ddac1', // Зеленый цвет по умолчанию
                transition: 'color 0.3s ease',
              }}
            />

            {/* Tooltip с названием */}
            <div
              className="tooltip absolute text-white text-sm font-medium px-2 py-1 rounded bg-black bg-opacity-75 whitespace-nowrap opacity-0 transition-opacity duration-300 pointer-events-none"
              style={{
                [icon.isPeak ? 'bottom' : 'top']: '70px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {icon.name}
            </div>
          </div>
        );
      })}
    </>
  );
}
