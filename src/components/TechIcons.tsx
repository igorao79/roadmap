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
  setAnimationCounter: (counter: number | ((prev: number) => number)) => void;
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

  const isMobile = dimensions.width < 768; // Проверяем, является ли устройство мобильным

  let amplitude: number;
  let frequency: number;
  let segments: number;
  let points: string[] = [];
  let markers: Array<{ x: number; y: number }> = [];

  if (isMobile) {
    // Вертикальная линия по центру для мобильных устройств
    amplitude = 20; // меньшая амплитуда для мобильных
    frequency = 0.02; // частота волны
    segments = 40; // количество сегментов линии

    // Создаем вертикальную волнообразную линию
    for (let i = 0; i <= segments; i++) {
      const y = (dimensions.height / segments) * i;
      const x = Math.sin(y * frequency) * amplitude + dimensions.width / 2;
      points.push(`${x},${y}`);
    }

    // Создаем чекпоинты для 9 технологий (снизу вверх, каждые ~8% высоты)
    for (let i = 0; i < 9; i++) { // 92%, 84%, 76%, ..., 28%
      const percent = 100 - (i + 1) * 8; // 92, 84, 76, ..., 28
      const y = (dimensions.height * percent) / 100;
      const x = Math.sin(y * frequency) * amplitude + dimensions.width / 2;
      markers.push({ x, y });
    }
  } else {
    // Горизонтальная линия для десктопных устройств
    amplitude = 40; // амплитуда изгиба
    frequency = 0.015; // частота волны
    segments = 60; // количество сегментов линии

    // Создаем статичную волнообразную линию
    for (let i = 0; i <= segments; i++) {
      const x = (dimensions.width / segments) * i;
      const y = Math.sin(x * frequency) * amplitude + dimensions.height / 2;
      points.push(`${x},${y}`);
    }

    // Создаем чекпоинты для 9 технологий (каждые ~4% ширины)
    for (let i = 0; i < 9; i++) { // 4%, 8%, 12%, ..., 36%
      const percent = (i + 1) * 4; // 4, 8, 12, ..., 36
      const x = (dimensions.width * percent) / 100;
      const y = Math.sin(x * frequency) * amplitude + dimensions.height / 2;
      markers.push({ x, y });
    }
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

  // Размещаем иконки рядом с метками
  languages.forEach((lang, index) => {
    if (index >= markers.length) return; // Не больше меток

    const marker = markers[index];

    if (isMobile) {
      // Для мобильных: чередуем слева-справа от вертикальной линии
      const isLeft = index % 2 === 0; // Чередуем: слева, справа, слева, справа...
      const offsetX = isLeft ? -80 : 40; // Смещение по X
      const finalX = marker.x + offsetX;
      const finalY = marker.y - 24; // Центрируем по Y

      iconPositions.push({
        ...lang,
        x: finalX,
        y: finalY,
        key: `marker-${index}`,
        isPeak: !isLeft // isPeak теперь означает "справа"
      });
    } else {
      // Для десктопа: над-под-над-под чередуясь
      const isAbove = index % 2 === 0; // Чередуем: над, под, над, под...
      const offsetDistance = isAbove ? 90 : 30; // Расстояние от линии
      const finalY = isAbove ? marker.y - offsetDistance : marker.y + offsetDistance;

      iconPositions.push({
        ...lang,
        x: marker.x - 24, // центрируем иконку
        y: finalY,
        key: `marker-${index}`,
        isPeak: isAbove
      });
    }
  });

  return (
    <>
      {/* Иконки языков программирования - могут получать клики для hover */}
      {iconPositions.map((icon, index) => {
        // Определяем, находится ли иконка на зеленой стороне линии (первые 55%)
        const isOnGreenSide = icon.x < dimensions.width * 0.55;
        const borderColor = isOnGreenSide ? '#3ddac1' : 'rgba(255,255,255,0.2)';
        const borderWidth = isOnGreenSide ? '2px' : '1px';

        const iconSize = isMobile ? 48 : 64; // Меньше размер на мобильных
        const iconFontSize = isMobile ? 32 : 42; // Меньше шрифт на мобильных

        return (
          <div
            key={icon.key}
            className="absolute flex items-center justify-center group cursor-pointer transition-all duration-300 pointer-events-auto"
            style={{
              left: `${icon.x - (isMobile ? 6 : 8)}px`, // Корректировка центрирования для мобильных
              top: `${icon.y}px`,
              zIndex: 70,
              width: `${iconSize}px`,
              height: `${iconSize}px`,
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

              // Скрываем линию сразу
                setHoveredMarker(null);
                setIsLineVisible(false);

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
                fontSize: `${iconFontSize}px`,
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



