import {
    type DosenOptionPayload,
    type FormDataState,
    type PerguruanOptionPayload,
    type RabFormState,
    type RabItemForm,
    type RabKelompokOption,
    type SelectOption,
    type TeamMember,
} from './types';

type StepThreeViewProps = {
    formData: FormDataState;
    rab: RabFormState;
    skemaSelectOptions: SelectOption[];
    fokusSelectOptions: SelectOption[];
    sdgSelectOptions: SelectOption[];
    tktSelectOptions: SelectOption[];
    anggotaTim: TeamMember[];
    dosenLookup: Record<string, DosenOptionPayload>;
    perguruanLookup: Record<string, PerguruanOptionPayload>;
    hasRabEntries: boolean;
    sortedRabYears: number[];
    rabTotalsByYear: Record<number, number>;
    totalRab: number;
    komponenLookup: Record<string, string>;
    kelompokLookup: Record<string, RabKelompokOption>;
    parseNumber: (value: string) => number | null;
    calculateItemTotal: (item: RabItemForm) => number;
    getOptionLabel: (options: SelectOption[], value: string) => string;
    existingProposalLabel?: string | null;
    existingLampiranLabel?: string | null;
    onBack: () => void;
    onSubmit: () => void;
};

export default function StepThreeView({
    formData,
    rab,
    skemaSelectOptions,
    fokusSelectOptions,
    sdgSelectOptions,
    tktSelectOptions,
    anggotaTim,
    dosenLookup,
    perguruanLookup,
    hasRabEntries,
    sortedRabYears,
    rabTotalsByYear,
    totalRab,
    komponenLookup,
    kelompokLookup,
    parseNumber,
    calculateItemTotal,
    getOptionLabel,
    existingProposalLabel,
    existingLampiranLabel,
    onBack,
    onSubmit,
}: StepThreeViewProps) {
    return (
        <div className="bg-white  p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Konfirmasi & Ajukan Proposal
            </h2>

            <div className="space-y-6">
                <div className="border border-gray-200  p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Identitas Proposal
                    </h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Judul Penelitian:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.judul || '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">Skema:</span>
                            <span className="flex-1 text-gray-900">
                                {getOptionLabel(skemaSelectOptions, formData.id_skema)}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Bidang Fokus:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {getOptionLabel(fokusSelectOptions, formData.id_fokus)}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">Ringkasan:</span>
                            <span className="flex-1 text-gray-900">
                                {formData.ringkasan || '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Keterkaitan SDG:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {getOptionLabel(sdgSelectOptions, formData.id_sdg)}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Level TKT:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {getOptionLabel(tktSelectOptions, formData.id_tkt)}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Lama Waktu:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.lama_waktu
                                    ? `${formData.lama_waktu} Tahun`
                                    : '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Tahun Pengajuan:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.tahun_pengajuan || '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Tahun Pelaksanaan:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.tahun_pelaksanaan || '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                File Proposal:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.proposal_file?.name ||
                                    existingProposalLabel ||
                                    '-'}
                            </span>
                        </div>
                        <div className="flex">
                            <span className="w-48 font-medium text-gray-700">
                                Lampiran:
                            </span>
                            <span className="flex-1 text-gray-900">
                                {formData.lampiran_file?.name ||
                                    existingLampiranLabel ||
                                    '-'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="border border-gray-200  p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Anggota Penelitian
                    </h3>
                    {anggotaTim.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            Belum ada anggota tim ditambahkan.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-300">
                                        <th className="text-left py-2 font-medium text-gray-700">
                                            No
                                        </th>
                                        <th className="text-left py-2 font-medium text-gray-700">
                                            Nama Dosen
                                        </th>
                                        <th className="text-left py-2 font-medium text-gray-700">
                                            Perguruan Tinggi
                                        </th>
                                        <th className="text-left py-2 font-medium text-gray-700">
                                            Peran
                                        </th>
                                        <th className="text-left py-2 font-medium text-gray-700">
                                            Tugas
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anggotaTim.map((anggota, index) => {
                                        const dosen = anggota.dosen_uuid
                                            ? dosenLookup[anggota.dosen_uuid]
                                            : undefined;
                                        const namaDosen =
                                            dosen?.nama && dosen.nama.trim().length > 0
                                                ? dosen.nama
                                                : dosen?.email ?? '-';
                                        const perguruanLabel = anggota.uuid_pt
                                            ? perguruanLookup[anggota.uuid_pt]?.nama_singkat ??
                                              perguruanLookup[anggota.uuid_pt]?.nama ??
                                              '-'
                                            : '-';
                                        return (
                                            <tr key={index} className="border-b border-gray-200">
                                                <td className="py-3 text-gray-900">
                                                    {index + 1}
                                                </td>
                                                <td className="py-3 text-gray-900">
                                                    {namaDosen}
                                                </td>
                                                <td className="py-3 text-gray-900">
                                                    {perguruanLabel}
                                                </td>
                                                <td className="py-3 text-gray-900">
                                                    {anggota.peran || '-'}
                                                </td>
                                                <td className="py-3 text-gray-900">
                                                    {anggota.tugas || '-'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="border border-gray-200  p-6 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Rencana Anggaran Biaya
                    </h3>
                    {!hasRabEntries ? (
                        <p className="text-sm text-gray-500">Belum ada data RAB.</p>
                    ) : (
                        <div className="space-y-4">
                            {sortedRabYears.map((year) => {
                                const items = rab[year] ?? [];

                                if ((items?.length ?? 0) === 0) {
                                    return null;
                                }

                                const label = `Tahun ${year}`;
                                const yearTotal = rabTotalsByYear[year] ?? 0;

                                return (
                                    <div
                                        key={year}
                                        className=" border border-gray-200 bg-white p-4 "
                                    >
                                        <div className="mb-3 flex items-center justify-between">
                                            <h4 className="text-sm font-semibold text-gray-900">
                                                {`RAB ${label}`}
                                            </h4>
                                            <span className="text-sm font-semibold text-indigo-600">
                                                Rp {yearTotal.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full text-sm text-gray-900">
                                                <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                                    <tr>
                                                        <th className="px-4 py-2 text-left">
                                                            Kelompok
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Komponen
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Nama Item
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Jumlah
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Harga Satuan
                                                        </th>
                                                        <th className="px-4 py-2 text-left">
                                                            Total Biaya
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {items.map((item) => {
                                                        const jumlah = parseNumber(item.jumlah_item);
                                                        const harga = parseNumber(item.harga_satuan);
                                                        const total = calculateItemTotal(item);

                                                        return (
                                                            <tr key={item.id}>
                                                                <td className="px-4 py-2">
                                                                    {(() => {
                                                                        const kelompok =
                                                                            kelompokLookup[item.kelompok_id];
                                                                        return kelompok
                                                                            ? `${kelompok.kategori} - ${kelompok.nama}`
                                                                            : '-';
                                                                    })()}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {komponenLookup[item.id_komponen] ??
                                                                        '-'}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {item.nama_item || '-'}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {jumlah !== null
                                                                        ? jumlah.toLocaleString('id-ID')
                                                                        : '-'}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    {harga !== null
                                                                        ? `Rp ${harga.toLocaleString('id-ID')}`
                                                                        : '-'}
                                                                </td>
                                                                <td className="px-4 py-2">
                                                                    Rp {total.toLocaleString('id-ID')}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className=" border border-indigo-200 bg-indigo-50 p-4">
                                <div className="flex justify-between text-sm font-semibold">
                                    <span className="text-gray-700">
                                        Total RAB Keseluruhan
                                    </span>
                                    <span className="text-indigo-700">
                                        Rp {totalRab.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200  p-6">
                    <div className="flex items-start">
                        <svg
                            className="w-6 h-6 text-yellow-600 mt-0.5 mr-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Persetujuan</h4>
                            <p className="text-sm text-gray-700 mb-3">
                                Dengan mengajukan proposal ini, saya menyatakan bahwa:
                            </p>
                            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
                                <li>Semua informasi yang diberikan adalah benar dan akurat</li>
                                <li>Saya memahami konsekuensi jika memberikan informasi palsu</li>
                                <li>Saya telah berkonsultasi dengan semua anggota tim</li>
                                <li>Proposal ini adalah karya orisinal dan tidak plagiat</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={onBack}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold  hover:bg-gray-50 transition-colors"
                >
                    Kembali
                </button>
                <button
                    onClick={onSubmit}
                    className="px-8 py-3 bg-green-600 text-white font-semibold  hover:bg-green-700 transition-colors "
                >
                    Ajukan Proposal
                </button>
            </div>
        </div>
    );
}
