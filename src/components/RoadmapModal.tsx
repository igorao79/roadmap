"use client";

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { languagesData } from '../data';

// Простая анимация стрелки
const arrowAnimationStyle = `
  @keyframes arrowPulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
`;

interface RoadmapModalProps {
  isOpen: boolean;
  selectedTech: string;
  onClose: () => void;
}

export function RoadmapModal({ isOpen, selectedTech, onClose }: RoadmapModalProps) {
  const [modalState, setModalState] = useState({
    isVisible: false,
    selectedCard: null as string | null,
    isFullscreen: false
  });

  // Управление scrollbar при открытии/закрытии модального окна
  useEffect(() => {
    if (isOpen) {
      // Скрываем scrollbar когда модальное окно открыто
      document.body.style.overflow = 'hidden';
      document.body.style.overscrollBehavior = 'none';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.overscrollBehavior = 'none';

      // Компенсируем исчезновение scrollbar
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;

      // Временно скрываем внутренние скроллы только на время анимации
      const modalContent = document.querySelector('.modal-content-scroll');
      if (modalContent) {
        (modalContent as HTMLElement).style.overflow = 'hidden';
      }

      // Восстанавливаем внутренний скролл после завершения анимации открытия
      setTimeout(() => {
        const modalContent = document.querySelector('.modal-content-scroll');
        if (modalContent) {
          (modalContent as HTMLElement).style.overflow = '';
        }
      }, 600); // После завершения анимации открытия
    } else {
      // Восстанавливаем scrollbar когда модальное окно закрыто
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';
    }

    // Очистка при размонтировании
    return () => {
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';
      document.body.style.paddingRight = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.overscrollBehavior = '';

      const modalContent = document.querySelector('.modal-content-scroll');
      if (modalContent) {
        (modalContent as HTMLElement).style.overflow = '';
      }
    };
  }, [isOpen]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    if (isOpen) {
      setModalState(prev => ({
        ...prev,
        isVisible: true,
        selectedCard: null,
        isFullscreen: false
      }));
    } else {
      // Даем время на анимацию закрытия
      const timer = setTimeout(() => {
        setModalState(prev => ({ ...prev, isVisible: false }));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Эффект для плавного открытия
  useEffect(() => {
    if (modalState.isVisible && !isOpen) {
      // Небольшая задержка для правильного применения начальных стилей
      const timer = setTimeout(() => {
        // Этот таймер очищается, но помогает браузеру применить стили
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [modalState.isVisible, isOpen]);

  if (!modalState.isVisible && !isOpen) return null;

  // Функция для получения цвета технологии
  const getTechColor = (techName: string) => {
    const languageData = languagesData[techName.toLowerCase()];
    return languageData?.color || '#3ddac1'; // fallback на зеленый
  };

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-600 ease-out-cubic ${
        modalState.isFullscreen
          ? 'backdrop-blur-md bg-black/10 opacity-100 visible'
          : `flex items-center justify-center ${
              isOpen ? 'backdrop-blur-md bg-black/10 opacity-100 visible' : 'backdrop-blur-0 bg-black/0 opacity-0 invisible'
            }`
      }`}
      style={{
        transitionProperty: 'opacity, backdrop-filter, background-color, visibility',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      <div
        className="backdrop-blur-xl bg-white/10 dark:bg-gray-900/20 border border-white/20 dark:border-gray-700/30 rounded-2xl shadow-2xl overflow-hidden"
        style={{
          position: modalState.isFullscreen ? 'fixed' : 'relative',
          top: modalState.isFullscreen ? '50%' : 'auto',
          left: modalState.isFullscreen ? '50%' : 'auto',
          right: modalState.isFullscreen ? '0' : 'auto',
          bottom: modalState.isFullscreen ? '0' : 'auto',
          width: modalState.isFullscreen ? '100vw' : '1200px',
          height: modalState.isFullscreen ? '100vh' : '800px',
          transform: modalState.isFullscreen
            ? 'translate(-50%, -50%) scale(1)'
            : isOpen ? 'scale(1)' : 'scale(0.95)',
          transition: 'all 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          transformOrigin: 'center',
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          {/* Кнопка закрытия */}
          <button
            onClick={() => onClose()}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold z-10"
          >
            ×
          </button>

          {/* Заголовок модального окна по центру */}
          <div className="text-center py-6 px-6 border-b border-gray-200 dark:border-gray-700 relative flex-shrink-0">
            {modalState.selectedCard && (
              <button
                onClick={() => setModalState(prev => ({
                  ...prev,
                  selectedCard: null,
                  isFullscreen: false
                }))}
                className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl font-bold flex items-center gap-2"
                title="Вернуться к списку тем"
              >
                ← Назад
              </button>
            )}
            <h2
              className={`text-4xl font-bold ${modalState.isFullscreen && !modalState.selectedCard ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              style={{ color: getTechColor(selectedTech) }}
              onClick={() => {
                if (modalState.isFullscreen && !modalState.selectedCard) {
                  setModalState(prev => ({ ...prev, isFullscreen: false }));
                }
              }}
              title={modalState.isFullscreen && !modalState.selectedCard ? "Свернуть" : ""}
            >
              {modalState.selectedCard || selectedTech}
            </h2>
          </div>

          {/* Содержимое дорожной карты с прокруткой */}
          <div
            className="flex-1 overflow-y-auto px-0 py-4 modal-content-scroll"
            style={{
              overscrollBehavior: 'contain',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(61, 218, 193, 0.3) transparent'
            }}
          >
            <RoadmapContent
              tech={selectedTech}
              selectedCard={modalState.selectedCard}
              onCardSelect={(card) => setModalState(prev => ({ ...prev, selectedCard: card }))}
              setModalState={setModalState}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Компонент дорожной карты
const RoadmapContent = ({
  tech,
  selectedCard,
  onCardSelect,
  setModalState
}: {
  tech: string;
  selectedCard: string | null;
  onCardSelect: (card: string | null) => void;
  setModalState: React.Dispatch<React.SetStateAction<{
    isVisible: boolean;
    selectedCard: string | null;
    isFullscreen: boolean;
  }>>;
}) => {
  // Детальный контент для каждой карточки
  const getDetailedContent = (title: string): React.ReactElement => {
    // Находим ID карточки по названию
    const languageData = languagesData[tech.toLowerCase()];
    if (!languageData) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Данные для языка {tech} не найдены
        </div>
      );
    }

    const card = languageData.cards.find(c => c.title === title);
    if (!card) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Детальная информация для «{title}» пока не готова
        </div>
      );
    }

    const content = languageData.content[card.id];
    if (!content) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Детальная информация для «{title}» пока не готова
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {content.map((section, index) => (
          <div key={index} className="w-full">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {section.title}
            </h4>

            {section.content && (
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {section.content}
              </p>
            )}

            {section.items && (
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )}

            {section.code && (
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{section.code}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const getRoadmapData = (techName: string) => {
    const languageData = languagesData[techName.toLowerCase()];
    if (!languageData) return [];

    return languageData.cards.map(card => ({
      title: card.title,
      description: card.description,
      level: card.level,
      duration: card.duration
    }));
  };

  const roadmapSteps = getRoadmapData(tech);

  if (roadmapSteps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Дорожная карта для {tech} пока не готова
      </div>
    );
  }

  // Если выбрана карточка, показываем детальную информацию
  if (selectedCard) {
    const cardData = roadmapSteps.find(step => step.title === selectedCard);
    if (!cardData) return null;

    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 shadow-lg border border-gray-200 dark:border-gray-600">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {cardData.title}
          </h3>

          <div className="mb-6">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded text-sm font-medium">
              {cardData.level}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm font-medium ml-2">
              {cardData.duration}
            </span>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
              {cardData.description}
            </p>

            {/* Детальный контент для каждой карточки */}
            {getDetailedContent(cardData.title)}
          </div>
        </div>
      </div>
    );
  }

  // Группируем блоки по 3 в ряд
  const rows: Array<Array<{ title: string; description: string; level: string; duration: string }>> = [];
  for (let i = 0; i < roadmapSteps.length; i += 3) {
    rows.push(roadmapSteps.slice(i, i + 3));
  }

  // Функция для расчета позиции блока в сетке
  const getBlockPosition = (rowIndex: number, colIndex: number, totalCols: number) => {
    const blockWidth = 280; // ширина блока
    const blockHeight = 140; // высота блока
    const marginX = 30; // горизонтальный отступ между блоками
    const marginY = 150; // вертикальный отступ между рядами

    // Центрируем блоки в ряду
    const totalRowWidth = totalCols * blockWidth + (totalCols - 1) * marginX;
    const startX = (800 - totalRowWidth) / 2; // центрируем по ширине контейнера

    const x = startX + colIndex * (blockWidth + marginX);
    const y = rowIndex * (blockHeight + marginY);

    return { x, y, width: blockWidth, height: blockHeight };
  };

  // Разные AOS анимации для блоков
  const aosAnimations = [
    'fade-up',
    'fade-down',
    'fade-left',
    'fade-right',
    'zoom-in',
    'zoom-in-up',
    'zoom-in-down',
    'flip-left',
    'flip-right',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right'
  ];


  return (
    <div className="relative" style={{ minHeight: '500px' }}>
      {/* Стили для анимации стрелок */}
      <style dangerouslySetInnerHTML={{ __html: arrowAnimationStyle }} />

      {/* Блоки дорожной карты */}
      <div className="relative z-10">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex justify-center items-center mb-12 relative">
            {/* Вертикальная линия между рядами */}
            {rowIndex > 0 && (
              <div
                className="absolute left-1/2 top-[-40px] w-0.5 h-10 bg-[#3ddac1] opacity-90 transform -translate-x-1/2 rounded-full"
                style={{ zIndex: 1 }}
              />
            )}
            {row.map((step, colIndex) => {
              const blockIndex = rowIndex * 3 + colIndex;
              const position = getBlockPosition(rowIndex, colIndex, row.length);

              return (
                <React.Fragment key={blockIndex}>
                  <div
                    className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 flex flex-col cursor-pointer"
                    style={{
                      width: `${position.width}px`,
                      height: `${position.height}px`,
                      flexShrink: 0
                    }}
                    data-aos={aosAnimations[blockIndex % aosAnimations.length]}
                    data-aos-delay={blockIndex * 100}
                    data-aos-duration="600"
                    data-aos-easing="ease-out-cubic"
                    onClick={() => {
                      setModalState(prev => ({ ...prev, isFullscreen: true }));
                      onCardSelect(step.title);
                    }}
                  >
                    {/* Номер блока */}
                    <div className="flex justify-between items-start p-3">
                      <div className="w-6 h-6 bg-[#3ddac1] rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {blockIndex + 1}
                      </div>
                    </div>

                    {/* Содержимое блока */}
                    <div className="flex-1 px-3 pb-3">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                        {step.description}
                      </p>
                      <div className="flex flex-col gap-1">
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1.5 py-0.5 rounded text-xs text-center">
                          {step.level}
                        </span>
                        <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded text-xs text-center">
                          {step.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Простая стрелка между карточками */}
                  {colIndex < row.length - 1 && (
                    <div className="flex items-center justify-center mx-6">
                      <div
                        className="text-[#3ddac1] text-2xl font-bold opacity-80"
                        style={{
                          animation: 'arrowPulse 2s ease-in-out infinite'
                        }}
                      >
                        →
                      </div>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
