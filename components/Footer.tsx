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
            <footer className="bg-slate-900 text-slate-300 py-16 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    {/* Legal Links */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-10 lg:mb-12">
                        <button
                            onClick={() => openModal('advertiserTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            광고주 이용약관
                        </button>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <button
                            onClick={() => openModal('userTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            회원 이용약관
                        </button>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <button
                            onClick={() => openModal('locationTerms')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            위치정보 이용
                        </button>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <button
                            onClick={() => openModal('privacyPolicy')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            개인정보처리방침
                        </button>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <button
                            onClick={() => openModal('privacyCollection')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            개인정보 수집 및 이용
                        </button>
                        <span className="text-slate-700 hidden sm:inline">|</span>
                        <button
                            onClick={() => openModal('thirdPartyOffer')}
                            className="text-sm lg:text-base hover:text-white transition-colors font-medium text-slate-400"
                        >
                            개인정보 제3자 제공
                        </button>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-3 mb-10 lg:mb-12">
                        <p className="text-lg lg:text-xl font-bold text-slate-200">관리책임자 최정우</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm lg:text-base text-slate-400">
                            <span>대전광역시 서구 둔산동 이안빌딩 6층</span>
                            <span className="hidden sm:inline w-1 h-1 bg-slate-600 rounded-full"></span>
                            <span>
                                email :{' '}
                                <a
                                    href="mailto:help@mongstarz.com"
                                    className="text-violet-400 hover:text-violet-300 transition-colors underline decoration-violet-400/30 hover:decoration-violet-300"
                                >
                                    help@mongstarz.com
                                </a>
                            </span>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="pt-8 border-t border-slate-800 w-full max-w-3xl">
                        <p className="text-xs lg:text-sm text-slate-500 font-medium">© 2025 MONGSTARZ. All rights reserved.</p>
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
