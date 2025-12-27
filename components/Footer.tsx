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
                    <div className="flex flex-col items-center space-y-6 mb-10 lg:mb-12 w-full max-w-4xl">
                        {/* Logo */}
                        <div className="mb-2">
                            <span className="text-2xl lg:text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                MONGSTARZ
                            </span>
                        </div>

                        {/* Company Details */}
                        <div className="flex flex-col items-center space-y-3 text-sm lg:text-base text-slate-400">
                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
                                <span className="font-semibold text-slate-200">(주)랜덤커넥션 (RANDOM CONNECTION)</span>
                                <span className="hidden sm:inline text-slate-700">|</span>
                                <span>CEO 최정우</span>
                            </div>

                            <div className="text-center px-4">
                                938, IAN BUILDING 6F, Dunsan-dong, Seo-gu, Daejeon, Republic of Korea
                            </div>

                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                                <span className="text-slate-300">010-8825-1279</span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs lg:text-sm text-slate-500">
                                <span>사업자번호 : 비공개</span>
                                <span className="hidden sm:inline text-slate-800">|</span>
                                <span>통신판매업번호 : 비공개</span>
                            </div>

                            <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 text-xs lg:text-sm">
                                <span className="text-slate-500">개인정보보호책임자</span>
                                <a href="mailto:sasking@naver.com" className="text-slate-400 hover:text-violet-400 transition-colors">
                                    sasking@naver.com
                                </a>
                            </div>
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
