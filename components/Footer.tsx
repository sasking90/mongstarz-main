import React, { useState } from 'react';
import { LegalModal } from './LegalModal';
import { LEGAL_DATA } from '../legalData';

export const Footer: React.FC = () => {
    const [modalState, setModalState] = useState<{ isOpen: boolean; type: string | null }>({
        isOpen: false,
        type: null,
    });

    const openModal = (type: string) => {
        setModalState({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null });
    };

    const currentContent = modalState.type ? LEGAL_DATA[modalState.type as keyof typeof LEGAL_DATA] : null;

    return (
        <>
            <footer className="bg-slate-900 text-slate-300 py-12 lg:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Legal Links */}
                    <div className="flex flex-wrap gap-3 lg:gap-5 justify-center mb-8">
                        <button
                            onClick={() => openModal('advertiserTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            광고주 이용약관
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            onClick={() => openModal('userTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            회원 이용약관
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            onClick={() => openModal('locationTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            위치정보 이용
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            onClick={() => openModal('privacyPolicy')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            개인정보처리방침
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            onClick={() => openModal('privacyCollection')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            개인정보 수집 및 이용
                        </button>
                        <span className="text-slate-600">|</span>
                        <button
                            onClick={() => openModal('thirdPartyOffer')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium"
                        >
                            개인정보 제3자 제공
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="text-center space-y-2">
                        <p className="text-sm lg:text-base font-bold text-slate-200">관리책임자 최정우</p>
                        <p className="text-sm lg:text-base">대전광역시 서구 둔산동 이안빌딩 6층</p>
                        <p className="text-sm lg:text-base">
                            email :{' '}
                            <a
                                href="mailto:help@mongstarz.com"
                                className="text-violet-400 hover:text-violet-300 transition-colors underline"
                            >
                                help@mongstarz.com
                            </a>
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="mt-8 pt-6 border-t border-slate-700 text-center">
                        <p className="text-sm text-slate-500">© 2025 MONGSTARZ. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            {/* Modal */}
            {currentContent && (
                <LegalModal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    title={currentContent.title}
                    content={currentContent.content}
                />
            )}
        </>
    );
};
