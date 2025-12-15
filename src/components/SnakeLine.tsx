"use client";

import { useMemo, useState, useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { TechIcons } from './TechIcons';
import { RoadmapModal } from './RoadmapModal';

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

export function SnakeLine() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [deviconData, setDeviconData] = useState<Record<string, string>>({});
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);
  const [animationCounter, setAnimationCounter] = useState(0);
  const [isLineVisible, setIsLineVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string>('');

  useEffect(() => {
    // Загружаем данные цветов Devicon
    fetch('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.json')
      .then(response => response.json())
      .then((data: DeviconIcon[]) => {
        const colorMap: Record<string, string> = {};
        data.forEach(icon => {
          colorMap[icon.name] = icon.color;
        });

        // Добавляем fallback цвета для технологий без цвета в devicon.json
        colorMap.html5 = colorMap.html5 || '#E34F26';
        colorMap.css3 = colorMap.css3 || '#1572B6';
        colorMap.html = colorMap.html || '#E34F26';
        colorMap.css = colorMap.css || '#1572B6';
        colorMap.tailwindcss = colorMap.tailwindcss || '#06B6D4';
        colorMap.tailwind = colorMap.tailwind || '#06B6D4';
        colorMap.nextjs = colorMap.nextjs || '#000000';
        colorMap.next = colorMap.next || '#000000';
        colorMap['next.js'] = colorMap['next.js'] || '#000000';

        setDeviconData(colorMap);
      })
      .catch(error => console.error('Failed to load devicon colors:', error));

    // Устанавливаем реальные размеры только на клиенте
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Инициализация AOS
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
      mirror: false,
      offset: 50,
    });

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { pathData, markers, progressPath, progressColor } = useMemo(() => {
    const isMobile = dimensions.width < 768; // Проверяем, является ли устройство мобильным

    if (isMobile) {
      // Вертикальная линия по центру для мобильных устройств
      const amplitude = 20; // меньшая амплитуда для мобильных
      const frequency = 0.02; // частота волны
      const height = dimensions.height;
      const centerX = dimensions.width / 2;
      const segments = 40; // количество сегментов линии

      // Создаем вертикальную волнообразную линию
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const y = (height / segments) * i;
        const x = Math.sin(y * frequency) * amplitude + centerX;
        points.push(`${x},${y}`);
      }

      // Создаем чекпоинты для 9 технологий (снизу вверх, каждые ~8% высоты)
      const markers: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 9; i++) { // 92%, 84%, 76%, ..., 28%
        const percent = 100 - (i + 1) * 8; // 92, 84, 76, ..., 28
        const y = (height * percent) / 100;
        const x = Math.sin(y * frequency) * amplitude + centerX;
        markers.push({ x, y });
      }

    // Создаем линию прогресса до hovered чекпоинта
    let progressPath = '';
    let progressColor = 'rgba(255,255,255,0.8)';

    if (hoveredMarker !== null && hoveredMarker >= 0 && hoveredMarker < markers.length) {
      // Находим цвет технологии для этого чекпоинта
      const techIndex = hoveredMarker;
      if (techIndex < 9) {
        const languages = [
          'HTML', 'CSS', 'JavaScript', 'Git', 'TypeScript', 'React', 'Tailwind', 'Vite', 'Next.js'
        ];
        const techName = languages[techIndex].toLowerCase();

        const fallbacks: Record<string, string> = {
          'html': '#E34F26',
          'css': '#1572B6',
          'javascript': '#F7DF1E',
          'typescript': '#3178C6',
          'react': '#61DAFB',
          'tailwindcss': '#06B6D4',
          'tailwind': '#06B6D4',
          'vite': '#646CFF',
          'next.js': '#000000',
          'nextjs': '#000000',
          'next': '#000000',
          'git': '#F05032'
        };

        progressColor = deviconData[techName] || fallbacks[techName] || '#3ddac1';
      }

      // Создаем линию прогресса, следуя форме основной snake-линии
      const progressPoints = [];

      // Находим индекс сегмента основной линии, соответствующий чекпоинту
      const markerY = markers[hoveredMarker].y;
      const segmentIndex = Math.round((markerY / dimensions.height) * segments);

      // Добавляем точки основной линии от начала до сегмента чекпоинта
      for (let i = 0; i <= segmentIndex && i < points.length; i++) {
        progressPoints.push(points[i]);
      }

      // Добавляем финальную точку чекпоинта
      if (progressPoints.length > 0) {
        progressPoints.push(`${markers[hoveredMarker].x},${markers[hoveredMarker].y}`);
      }

      progressPath = progressPoints.length > 1 ? `M ${progressPoints.join(' L ')}` : '';
    }

    return {
      pathData: `M ${points.join(' L ')}`,
      markers,
      progressPath,
      progressColor
    };
    } else {
      // Горизонтальная линия для десктопных устройств
      const amplitude = 40; // амплитуда изгиба
      const frequency = 0.015; // частота волны
      const width = dimensions.width;
      const centerY = dimensions.height / 2;
      const segments = 60; // количество сегментов линии

      // Создаем статичную волнообразную линию
      const points = [];
      for (let i = 0; i <= segments; i++) {
        const x = (width / segments) * i;
        const y = Math.sin(x * frequency) * amplitude + centerY;
        points.push(`${x},${y}`);
      }

      // Создаем чекпоинты для 9 технологий (каждые ~4% ширины)
      const markers: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < 9; i++) { // 4%, 8%, 12%, ..., 36%
        const percent = (i + 1) * 4; // 4, 8, 12, ..., 36
        const x = (width * percent) / 100;
        const y = Math.sin(x * frequency) * amplitude + centerY;
        markers.push({ x, y });
      }

      // Создаем линию прогресса до hovered чекпоинта для десктопа
      let progressPath = '';
      let progressColor = 'rgba(255,255,255,0.8)';

      if (hoveredMarker !== null && hoveredMarker >= 0 && hoveredMarker < markers.length) {
        const techIndex = hoveredMarker;
        if (techIndex < 9) {
          const languages = [
            'HTML', 'CSS', 'JavaScript', 'Git', 'TypeScript', 'React', 'Tailwind', 'Vite', 'Next.js'
          ];
          const techName = languages[techIndex].toLowerCase();

          const fallbacks: Record<string, string> = {
            'html': '#E34F26',
            'css': '#1572B6',
            'javascript': '#F7DF1E',
            'typescript': '#3178C6',
            'react': '#61DAFB',
            'tailwindcss': '#06B6D4',
            'tailwind': '#06B6D4',
            'vite': '#646CFF',
            'next.js': '#000000',
            'nextjs': '#000000',
            'next': '#000000',
            'git': '#F05032'
          };

          progressColor = deviconData[techName] || fallbacks[techName] || '#3ddac1';
        }

        // Создаем линию прогресса, следуя форме основной snake-линии
        const progressPoints = [];

        // Находим индекс сегмента основной линии, соответствующий чекпоинту
        const markerX = markers[hoveredMarker].x;
        const segmentIndex = Math.round((markerX / dimensions.width) * segments);

        // Добавляем точки основной линии от начала до сегмента чекпоинта
        for (let i = 0; i <= segmentIndex && i < points.length; i++) {
          progressPoints.push(points[i]);
        }

        // Добавляем финальную точку чекпоинта
        if (progressPoints.length > 0) {
          progressPoints.push(`${markers[hoveredMarker].x},${markers[hoveredMarker].y}`);
        }

        progressPath = progressPoints.length > 1 ? `M ${progressPoints.join(' L ')}` : '';
      }

      return {
        pathData: `M ${points.join(' L ')}`,
        markers,
        progressPath,
        progressColor
      };
    }
  }, [dimensions, hoveredMarker, deviconData]);

  const handleIconClick = (techName: string) => {
    setSelectedTech(techName);
    setIsModalOpen(true);
    setTimeout(() => {
      AOS.refresh();
    }, 200);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Заголовок */}
      <div className={`absolute z-[70] ${
        dimensions.width < 768
          ? 'top-4 right-4 text-right'
          : 'top-8 left-1/2 transform -translate-x-1/2 text-center'
      }`}>
        <h1 className={`font-bold mb-2 drop-shadow-lg ${
          dimensions.width < 768 ? 'text-2xl text-white' : 'text-4xl md:text-6xl'
        }`}>
          {dimensions.width < 768 ? (
            <span className="text-white">Frontend Roadmap</span>
          ) : (
            <>
          <span className="text-[#3ddac1]">Fronten</span>
          <span className="text-white">d</span>
          {' '}
          <span className="text-white">Roadmap</span>
            </>
          )}
        </h1>
        <p className={`drop-shadow-md ${
          dimensions.width < 768 ? 'text-sm text-white' : 'text-lg md:text-xl'
        }`}>
          {dimensions.width < 768 ? (
            <span className="text-white">by igorao79</span>
          ) : (
            <>
          <span className="text-[#3ddac1]">b</span>
          <span className="text-white">y</span>{' '}
          <span className="text-white">igorao79</span>
            </>
          )}
        </p>
      </div>

      {/* SVG линия */}
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0 pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))' }}
      >
        <defs>
          <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3ddac1" />
            <stop offset="55%" stopColor="#3ddac1" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.9)" />
            <stop offset="75%" stopColor="rgba(255,255,255,1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.9)" />
          </linearGradient>

          <style>
            {`
              @keyframes drawLine {
                from {
                  stroke-dashoffset: 1000;
                }
                to {
                  stroke-dashoffset: 0;
                }
              }

              .progress-line {
                transition: none;
              }
            `}
          </style>
        </defs>

        <path
          d={pathData}
          stroke="url(#snakeGradient)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'blur(0.5px)',
          }}
        />

        {/* Линия прогресса */}
        {isLineVisible && progressPath && (
          <path
            key={`progress-${hoveredMarker}`}
            d={progressPath}
            stroke={progressColor}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.9"
            className="progress-line"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.3))',
              strokeDasharray: '1000',
              strokeDashoffset: '1000',
              animation: 'drawLine 0.8s ease-out forwards',
            }}
          />
        )}

        {/* Чекпоинты */}
        {markers.slice(0, 9).map((marker, index) => {
          const isMobile = dimensions.width < 768;
          const isOnGreenSide = isMobile
            ? marker.y < dimensions.height * 0.55 // Для мобильных: зеленая сторона - верхняя половина
            : marker.x < dimensions.width * 0.55; // Для десктопа: зеленая сторона - левая половина

          const markerColor = isOnGreenSide ? '#3ddac1' : 'rgba(255,255,255,0.6)';
          const markerOpacity = isOnGreenSide ? 0.9 : 0.8;

          return (
            <g key={`marker-${index}`}>
              <line
                x1={isMobile ? marker.x - 15 : marker.x}
                y1={isMobile ? marker.y : marker.y - 15}
                x2={isMobile ? marker.x + 15 : marker.x}
                y2={isMobile ? marker.y : marker.y + 15}
                stroke={markerColor}
                strokeWidth="2"
                opacity={markerOpacity}
              />
              <circle
                cx={marker.x}
                cy={marker.y}
                r="3"
                fill={markerColor}
                opacity={markerOpacity}
              />
            </g>
          );
        })}
      </svg>

      {/* Иконки технологий */}
      <TechIcons
        dimensions={dimensions}
        hoveredMarker={hoveredMarker}
        setHoveredMarker={setHoveredMarker}
        setIsLineVisible={setIsLineVisible}
        animationCounter={animationCounter}
        setAnimationCounter={setAnimationCounter}
        deviconData={deviconData}
        onIconClick={handleIconClick}
      />

      {/* Модальное окно */}
      <RoadmapModal
        isOpen={isModalOpen}
        selectedTech={selectedTech}
        onClose={handleModalClose}
      />
    </div>
  );
}