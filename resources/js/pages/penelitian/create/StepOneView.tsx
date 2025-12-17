import {
    STEP_ONE_REQUIREMENTS,
} from './constants';
import {
    type FormDataState,
    type InputField,
    type SelectOption,
    type StepOneFieldKey,
} from './types';

type StepOneViewProps = {
    formData: FormDataState;
    skemaSelectOptions: SelectOption[];
    fokusSelectOptions: SelectOption[];
    sdgSelectOptions: SelectOption[];
    tktSelectOptions: SelectOption[];
    showStepOneErrors: boolean;
    hasStepOneError: (key: StepOneFieldKey) => boolean;
    getStepOneLabel: (key: StepOneFieldKey) => string;
    onInputChange: (field: InputField, value: string) => void;
    onFileChange: (
        field: 'proposal_file' | 'lampiran_file',
        file: File | null,
    ) => void;
    onNext: () => void;
};

export default function StepOneView({
    formData,
    skemaSelectOptions,
    fokusSelectOptions,
    sdgSelectOptions,
    tktSelectOptions,
    showStepOneErrors,
    hasStepOneError,
    getStepOneLabel,
    onInputChange,
    onFileChange,
    onNext,
}: StepOneViewProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Identitas Proposal Penelitian
            </h2>
            {showStepOneErrors ? (
                <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <p className="font-semibold">
                        Mohon lengkapi data berikut sebelum melanjutkan:
                    </p>
                    <ul className="mt-2 list-inside list-disc space-y-1">
                        {STEP_ONE_REQUIREMENTS.filter((requirement) =>
                            hasStepOneError(requirement.key),
                        ).map((requirement) => (
                            <li key={requirement.key}>{requirement.label}</li>
                        ))}
                    </ul>
                </div>
            ) : null}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Judul Penelitian <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={formData.judul}
                        onChange={(event) => onInputChange('judul', event.target.value)}
                        placeholder="Masukkan judul penelitian..."
                        data-step-one-field="judul"
                        aria-invalid={showStepOneErrors && hasStepOneError('judul')}
                        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                            showStepOneErrors && hasStepOneError('judul')
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : ''
                        }`}
                    />
                    {showStepOneErrors && hasStepOneError('judul') ? (
                        <p className="mt-2 text-sm text-red-600">
                            {getStepOneLabel('judul')} wajib diisi.
                        </p>
                    ) : null}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skema <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.id_skema}
                            onChange={(event) =>
                                onInputChange('id_skema', event.target.value)
                            }
                            data-step-one-field="id_skema"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('id_skema')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('id_skema')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih skema...</option>
                            {skemaSelectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {showStepOneErrors && hasStepOneError('id_skema') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('id_skema')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bidang Fokus <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.id_fokus}
                            onChange={(event) =>
                                onInputChange('id_fokus', event.target.value)
                            }
                            data-step-one-field="id_fokus"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('id_fokus')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('id_fokus')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih bidang fokus...</option>
                            {fokusSelectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {showStepOneErrors && hasStepOneError('id_fokus') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('id_fokus')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ringkasan Eksekutif <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={formData.ringkasan}
                        onChange={(event) =>
                            onInputChange('ringkasan', event.target.value)
                        }
                        placeholder="Tuliskan ringkasan eksekutif penelitian..."
                        rows={4}
                        data-step-one-field="ringkasan"
                        aria-invalid={showStepOneErrors && hasStepOneError('ringkasan')}
                        className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                            showStepOneErrors && hasStepOneError('ringkasan')
                                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                : ''
                        }`}
                    />
                    {showStepOneErrors && hasStepOneError('ringkasan') ? (
                        <p className="mt-2 text-sm text-red-600">
                            {getStepOneLabel('ringkasan')} wajib diisi.
                        </p>
                    ) : null}
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Keterkaitan dengan SDGs
                        </label>
                        <select
                            value={formData.id_sdg}
                            onChange={(event) => onInputChange('id_sdg', event.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        >
                            <option value="">Pilih SDG...</option>
                            {sdgSelectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Level TKT <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.id_tkt}
                            onChange={(event) => onInputChange('id_tkt', event.target.value)}
                            data-step-one-field="id_tkt"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('id_tkt')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('id_tkt')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih TKT...</option>
                            {tktSelectOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {showStepOneErrors && hasStepOneError('id_tkt') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('id_tkt')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Target Luaran
                    </label>
                    <textarea
                        value={formData.target_luaran}
                        onChange={(event) =>
                            onInputChange('target_luaran', event.target.value)
                        }
                        placeholder="Tuliskan target luaran penelitian Anda..."
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Lama Waktu Pelaksanaan <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.lama_waktu}
                            onChange={(event) =>
                                onInputChange('lama_waktu', event.target.value)
                            }
                            data-step-one-field="lama_waktu"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('lama_waktu')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('lama_waktu')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih...</option>
                            <option value="1">1 Tahun</option>
                            <option value="2">2 Tahun</option>
                            <option value="3">3 Tahun</option>
                            <option value="4">4 Tahun</option>
                        </select>
                        {showStepOneErrors && hasStepOneError('lama_waktu') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('lama_waktu')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tahun Pengajuan <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.tahun_pengajuan}
                            onChange={(event) =>
                                onInputChange('tahun_pengajuan', event.target.value)
                            }
                            data-step-one-field="tahun_pengajuan"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('tahun_pengajuan')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('tahun_pengajuan')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih tahun</option>
                            <option value={new Date().getFullYear()}>
                                {new Date().getFullYear()}
                            </option>
                        </select>
                        {showStepOneErrors && hasStepOneError('tahun_pengajuan') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('tahun_pengajuan')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tahun Pelaksanaan <span className="text-red-500">*</span>
                        </label>
                        <select
                            value={formData.tahun_pelaksanaan}
                            onChange={(event) =>
                                onInputChange('tahun_pelaksanaan', event.target.value)
                            }
                            data-step-one-field="tahun_pelaksanaan"
                            aria-invalid={
                                showStepOneErrors && hasStepOneError('tahun_pelaksanaan')
                            }
                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                                showStepOneErrors && hasStepOneError('tahun_pelaksanaan')
                                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                                    : ''
                            }`}
                        >
                            <option value="">Pilih tahun...</option>
                            {[...Array(2)].map((_, index) => {
                                const year = new Date().getFullYear() + index;
                                return (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                );
                            })}
                        </select>
                        {showStepOneErrors && hasStepOneError('tahun_pelaksanaan') ? (
                            <p className="mt-2 text-sm text-red-600">
                                {getStepOneLabel('tahun_pelaksanaan')} wajib dipilih.
                            </p>
                        ) : null}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        File Unggah Proposal <span className="text-red-500">*</span>
                    </label>
                    <div
                        data-step-one-field="proposal_file"
                        tabIndex={-1}
                        role="group"
                        aria-invalid={showStepOneErrors && hasStepOneError('proposal_file')}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all focus:outline-none ${
                            showStepOneErrors && hasStepOneError('proposal_file')
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-300 hover:border-indigo-500'
                        }`}
                    >
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(event) =>
                                onFileChange('proposal_file', event.target.files?.[0] ?? null)
                            }
                            className="hidden"
                            id="proposal-upload"
                        />
                        <label htmlFor="proposal-upload" className="cursor-pointer">
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
                                        : 'Klik untuk mengunggah atau drag and drop'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX (Maks. 10MB)
                                </p>
                            </div>
                        </label>
                    </div>
                    {showStepOneErrors && hasStepOneError('proposal_file') ? (
                        <p className="mt-2 text-sm text-red-600">
                            {getStepOneLabel('proposal_file')} wajib diunggah.
                        </p>
                    ) : null}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lampiran (jika ada)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-all">
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.zip"
                            onChange={(event) =>
                                onFileChange('lampiran_file', event.target.files?.[0] ?? null)
                            }
                            className="hidden"
                            id="lampiran-upload"
                        />
                        <label htmlFor="lampiran-upload" className="cursor-pointer">
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
                                        : 'Klik untuk mengunggah lampiran pendukung'}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    PDF, DOC, DOCX, ZIP (Maks. 20MB)
                                </p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end mt-8">
                <button
                    onClick={onNext}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Selanjutnya
                </button>
            </div>
        </div>
    );
}
