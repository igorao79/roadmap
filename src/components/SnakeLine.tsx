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

    // Создаем чекпоинты каждые 5% ширины (5%, 10%, 15%, ..., 95%)
    const markers: Array<{ x: number; y: number }> = [];
    for (let i = 1; i <= 19; i++) { // 5%, 10%, 15%, ..., 95%
      const percent = i * 5; // 5, 10, 15, 20, ..., 95
      const x = (width * percent) / 100;
      const y = Math.sin(x * frequency) * amplitude + centerY;
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

      // Создаем точки линии прогресса
      const progressPoints = [];
      const totalSegments = points.length - 1;
      const segmentIndex = Math.floor((hoveredMarker / (markers.length - 1)) * totalSegments);

      for (let i = 0; i <= segmentIndex && i < points.length; i++) {
        progressPoints.push(points[i]);
      }

      // Добавляем точку hovered чекпоинта
      if (progressPoints.length > 0) {
        const hoveredPoint = markers[hoveredMarker];
        progressPoints.push(`${hoveredPoint.x},${hoveredPoint.y}`);
      }

      progressPath = progressPoints.length > 1 ? `M ${progressPoints.join(' L ')}` : '';
    }

    return {
      pathData: `M ${points.join(' L ')}`,
      markers,
      progressPath,
      progressColor
    };
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
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center z-[70]">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
          <span className="text-[#3ddac1]">Fronten</span>
          <span className="text-white">d</span>
          {' '}
          <span className="text-white">Roadmap</span>
        </h1>
        <p className="text-lg md:text-xl drop-shadow-md">
          <span className="text-[#3ddac1]">b</span>
          <span className="text-white">y</span>{' '}
          <span className="text-white">igorao79</span>
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

              @keyframes hideLine {
                from {
                  stroke-dashoffset: 0;
                }
                to {
                  stroke-dashoffset: 1000;
                }
              }

              .progress-line {
                transition: opacity 0.3s ease-in-out;
              }

              .progress-line.hiding {
                animation: hideLine 0.5s ease-in forwards;
              }

              .progress-line.fade-out {
                opacity: 0;
                transition: opacity 0.5s ease-in;
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
            key={`progress-${hoveredMarker}-${animationCounter}`}
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
        {markers.map((marker, index) => {
          const isOnGreenSide = marker.x < dimensions.width * 0.55;
          const markerColor = isOnGreenSide ? '#3ddac1' : 'rgba(255,255,255,0.6)';
          const markerOpacity = isOnGreenSide ? 0.9 : 0.8;

          return (
            <g key={`marker-${index}`}>
              <line
                x1={marker.x}
                y1={marker.y - 15}
                x2={marker.x}
                y2={marker.y + 15}
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