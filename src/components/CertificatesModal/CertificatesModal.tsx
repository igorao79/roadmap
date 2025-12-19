'use client';

import React, { useState } from 'react';

interface CertificatesModalProps {
  children?: React.ReactNode;
}

export const CertificatesModal: React.FC<CertificatesModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Сертификаты</h2>
            <p className="text-gray-600 mb-4">
              Здесь будут отображаться ваши сертификаты.
            </p>
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export const CertificatesModalTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const CertificatesModalPortal: React.FC = () => {
  return null;
};
