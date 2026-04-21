import { useEffect, useMemo, useState } from 'react';
import { type FormDataState } from './types';

type StepDocumentsViewProps = {
    formData: FormDataState;
    existingProposalLabel?: string | null;
    existingLampiranLabel?: string | null;
    onFileChange: (
        field: 'proposal_file' | 'lampiran_file',
        file: File | null,
    ) => void;
    onBack: () => void;
    onNext: () => void;
};

export default function StepDocumentsView({
    formData,
    existingProposalLabel,
    existingLampiranLabel,
    onFileChange,
    onBack,
    onNext,
}: StepDocumentsViewProps) {
    const [proposalPreviewUrl, setProposalPreviewUrl] = useState<string | null>(null);
    const [lampiranPreviewUrl, setLampiranPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        let nextUrl: string | null = null;
        if (formData.proposal_file) {
            nextUrl = URL.createObjectURL(formData.proposal_file);
        }
        setProposalPreviewUrl(nextUrl);
        return () => nextUrl && URL.revokeObjectURL(nextUrl);
    }, [formData.proposal_file]);

    useEffect(() => {
        let nextUrl: string | null = null;
        if (formData.lampiran_file) {
            nextUrl = URL.createObjectURL(formData.lampiran_file);
        }
        setLampiranPreviewUrl(nextUrl);
        return () => nextUrl && URL.revokeObjectURL(nextUrl);
    }, [formData.lampiran_file]);

    const canPreviewProposal = useMemo(
        () => Boolean(proposalPreviewUrl || formData.proposal_file || existingProposalLabel),
        [proposalPreviewUrl, formData.proposal_file, existingProposalLabel],
    );
    const canPreviewLampiran = useMemo(
        () => Boolean(lampiranPreviewUrl || formData.lampiran_file || existingLampiranLabel),
        [lampiranPreviewUrl, formData.lampiran_file, existingLampiranLabel],
    );

    const openPreview = (url: string | null, label: string) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
            return;
        }
        window.alert(`Unggah ${label} terlebih dahulu untuk pratinjau.`);
    };

    return (
        <div className="bg-white  p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Dokumen Pendukung</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Unggah Proposal <span className="text-red-500">*</span>{' '}
                        <span className="ml-1 text-xs text-gray-500">(max 5 MB)</span>
                    </label>
                    {existingProposalLabel ? (
                        <p className="mb-2 text-sm text-gray-600">
                            Berkas aktif:{' '}
                            <span className="font-semibold">{existingProposalLabel}</span>. Unggah
                            baru jika ingin mengganti.
                        </p>
                    ) : null}
                    <div className="border-2 border-dashed  p-6 text-center transition-all focus:outline-none border-gray-300 hover:border-indigo-500">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(event) =>
                                onFileChange('proposal_file', event.target.files?.[0] ?? null)
                            }
                            className="hidden"
                            id="proposal-upload-doc"
                        />
                        <label htmlFor="proposal-upload-doc" className="cursor-pointer">
                            <div className="text-gray-600">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="mt-2 text-sm">
                                    {formData.proposal_file
                                        ? formData.proposal_file.name
                                        : existingProposalLabel ?? 'Klik untuk mengunggah atau drag and drop'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX (Maks. 5MB)
                                </p>
                                {canPreviewProposal ? (
                                    <button
                                        type="button"
                                        onClick={() => openPreview(proposalPreviewUrl, 'proposal')}
                                        className="mt-2 inline-flex items-center  bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                                    >
                                        Preview Proposal
                                    </button>
                                ) : null}
                            </div>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lampiran (opsional) <span className="text-xs text-gray-500">(max 10 MB)</span>
                    </label>
                    {existingLampiranLabel ? (
                        <p className="mb-2 text-sm text-gray-600">
                            Berkas aktif:{' '}
                            <span className="font-semibold">{existingLampiranLabel}</span>. Unggah
                            baru jika ingin mengganti.
                        </p>
                    ) : null}
                    <div className="border-2 border-dashed border-gray-300  p-6 text-center hover:border-indigo-500 transition-all">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.zip"
                            onChange={(event) =>
                                onFileChange('lampiran_file', event.target.files?.[0] ?? null)
                            }
                            className="hidden"
                            id="lampiran-upload-doc"
                        />
                        <label htmlFor="lampiran-upload-doc" className="cursor-pointer">
                            <div className="text-gray-600">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <p className="mt-2 text-sm">
                                    {formData.lampiran_file
                                        ? formData.lampiran_file.name
                                        : existingLampiranLabel ?? 'Klik untuk mengunggah lampiran pendukung'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX, ZIP (Maks. 10MB)
                                </p>
                                {canPreviewLampiran ? (
                                    <button
                                        type="button"
                                        onClick={() => openPreview(lampiranPreviewUrl, 'lampiran')}
                                        className="mt-2 inline-flex items-center  bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 hover:bg-indigo-100"
                                    >
                                        Preview Lampiran
                                    </button>
                                ) : null}
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    type="button"
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold  hover:bg-gray-50 transition-colors"
                >
                    Kembali
                </button>
                <button
                    type="button"
                    onClick={onNext}
                    className="px-8 py-3 bg-indigo-600 text-white font-semibold  hover:bg-indigo-700 transition-colors "
                >
                    Lanjut
                </button>
            </div>
        </div>
    );
}
