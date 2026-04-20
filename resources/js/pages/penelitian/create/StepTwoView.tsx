import { useEffect, useMemo, useRef, useState } from 'react';

import { PERAN_OPTIONS } from './constants';
import {
    type DosenSelectOption,
    type KomponenSelectOption,
    type RabFormState,
    type RabItemEditableField,
    type RabKelompokOption,
    type SelectOption,
    type TeamMember,
} from './types';

type SearchableSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string; subtitle?: string | null }>;
    placeholder?: string;
    disabled?: boolean;
    emptyMessage?: string;
};

type StepTwoViewProps = {
    lamaWaktu: string;
    rab: RabFormState;
    anggotaTim: TeamMember[];
    perguruanSelectOptions: SelectOption[];
    dosenSelectOptions: DosenSelectOption[];
    komponenSelectOptions: KomponenSelectOption[];
    rabTotalsByYear: Record<number, number>;
    totalRab: number;
    tahunPelaksanaan: string[];
    kelompokOptions: RabKelompokOption[];
    kelompokLookup: Record<string, RabKelompokOption>;
    lockedKetuaDosenUuid?: string;
    skemaBudget?: { min: number | null; max: number | null };
    onBack: () => void;
    onNext: () => void;
    onAddAnggota: () => void;
    onRemoveAnggota: (index: number) => void;
    onAnggotaChange: (index: number, field: keyof TeamMember, value: string) => void;
    addRabItem: (year: number) => void;
    updateRabItem: (
        year: number,
        itemId: string,
        field: RabItemEditableField,
        value: string,
    ) => void;
    removeRabItem: (year: number, itemId: string) => void;
};

function SearchableSelect({
    value,
    onChange,
    options,
    placeholder = 'Pilih...',
    disabled = false,
    emptyMessage = 'Tidak ada hasil',
}: SearchableSelectProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = useMemo(
        () => options.find((option) => option.value === value),
        [options, value],
    );

    useEffect(() => {
        if (open) {
            setInputValue('');
            return;
        }

        setInputValue(selectedOption?.label ?? '');
    }, [selectedOption, open]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = useMemo(() => {
        const query = inputValue.trim().toLowerCase();
        if (!query) {
            return options;
        }

        return options.filter((option) => {
            const labelMatch = option.label.toLowerCase().includes(query);
            const subtitleMatch = (option.subtitle ?? '')
                .toLowerCase()
                .includes(query);
            return labelMatch || subtitleMatch;
        });
    }, [inputValue, options]);

    const handleSelect = (optionValue: string) => {
        const selected = options.find((option) => option.value === optionValue);
        onChange(optionValue);
        setInputValue(selected?.label ?? '');
        setOpen(false);
    };

    return (
        <div ref={containerRef} className="relative">
            <div className="relative">
                <input
                    type="text"
                    value={open ? inputValue : selectedOption?.label ?? ''}
                    onFocus={() => {
                        if (disabled) {
                            return;
                        }
                        setOpen(true);
                        setInputValue('');
                    }}
                    onChange={(event) => {
                        if (disabled) {
                            return;
                        }
                        setInputValue(event.target.value);
                        setOpen(true);
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                    className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
                <button
                    type="button"
                    onClick={() =>
                        !disabled &&
                        setOpen((prev) => {
                            const next = !prev;
                            if (next) {
                                setInputValue('');
                            }
                            return next;
                        })
                    }
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
                    tabIndex={-1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform ${
                            open ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </button>
            </div>
            {open && !disabled ? (
                <div className="absolute z-20 mt-1 max-h-52 w-full overflow-auto  border border-gray-200 bg-white ">
                    {filteredOptions.length ? (
                        filteredOptions.map((option) => {
                            const isSelected = option.value === value;
                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onMouseDown={(event) => event.preventDefault()}
                                    onClick={() => handleSelect(option.value)}
                                    className={`flex w-full flex-col items-start px-4 py-2 text-sm text-left transition hover:bg-indigo-50 ${
                                        isSelected
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-700'
                                    }`}
                                >
                                    <span className="font-medium">{option.label}</span>
                                    {option.subtitle ? (
                                        <span className="text-xs text-gray-500">
                                            {option.subtitle}
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })
                    ) : (
                        <div className="px-4 py-3 text-sm text-gray-500">
                            {emptyMessage}
                        </div>
                    )}
                </div>
            ) : null}
        </div>
    );
}

export default function StepTwoView({
    lamaWaktu,
    rab,
    anggotaTim,
    perguruanSelectOptions,
    dosenSelectOptions,
    komponenSelectOptions,
    rabTotalsByYear,
    totalRab,
    tahunPelaksanaan,
    kelompokOptions,
    kelompokLookup,
    lockedKetuaDosenUuid,
    onBack,
    onNext,
    onAddAnggota,
    onRemoveAnggota,
    onAnggotaChange,
    addRabItem,
    updateRabItem,
    removeRabItem,
}: StepTwoViewProps) {
    return (
        <div className="bg-white   p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Anggota Penelitian & RAB
            </h2>
            <div className="mb-6  border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Anggota selain ketua akan menerima permintaan persetujuan
                keikutsertaan. Proposal hanya dapat diajukan setelah seluruh anggota
                menyetujui permintaan tersebut.
            </div>
            <div className="space-y-8">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Anggota Penelitian (Dosen)
                        </h3>
                        <button
                            onClick={onAddAnggota}
                            className="px-4 py-2 bg-green-600 text-white text-sm font-medium  hover:bg-green-700 transition-colors"
                        >
                            + Tambah Anggota
                        </button>
                    </div>

                    {anggotaTim.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50  border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Belum ada anggota tim. Klik tombol di atas untuk menambah
                                anggota.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {anggotaTim.map((anggota, index) => {
                                const isKetuaLocked =
                                    lockedKetuaDosenUuid &&
                                    anggota.dosen_uuid === lockedKetuaDosenUuid &&
                                    anggota.peran === 'Ketua Peneliti';

                                return (
                                    <div
                                        key={index}
                                        className="border border-gray-200  p-4 bg-gray-50"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="flex-1 space-y-4">
                                                <div className="grid gap-4 md:grid-cols-4">
                                                    <div className="md:col-span-1">
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Perguruan Tinggi
                                                        </label>
                                                        <SearchableSelect
                                                            value={anggota.uuid_pt}
                                                            onChange={(ptValue) =>
                                                                onAnggotaChange(
                                                                    index,
                                                                    'uuid_pt',
                                                                    ptValue,
                                                                )
                                                            }
                                                            options={perguruanSelectOptions}
                                                            placeholder="Cari perguruan tinggi..."
                                                            emptyMessage="Perguruan tinggi tidak ditemukan"
                                                            disabled={isKetuaLocked}
                                                        />
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Pilih Dosen
                                                        </label>
                                                        <SearchableSelect
                                                            value={anggota.dosen_uuid}
                                                            onChange={(dosenValue) =>
                                                                onAnggotaChange(
                                                                    index,
                                                                    'dosen_uuid',
                                                                    dosenValue,
                                                                )
                                                            }
                                                            options={dosenSelectOptions.filter(
                                                                (dosen) =>
                                                                    dosen.uuid_pt === anggota.uuid_pt,
                                                            )}
                                                            placeholder={
                                                                anggota.uuid_pt
                                                                    ? 'Cari dosen...'
                                                                    : 'Pilih perguruan tinggi terlebih dahulu'
                                                            }
                                                            disabled={!anggota.uuid_pt || isKetuaLocked}
                                                            emptyMessage="Dosen tidak ditemukan"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Peran
                                                        </label>
                                                        <select
                                                            value={anggota.peran}
                                                            onChange={(event) =>
                                                                onAnggotaChange(
                                                                    index,
                                                                    'peran',
                                                                    event.target.value,
                                                                )
                                                            }
                                                            disabled={isKetuaLocked}
                                                            className="w-full px-3 py-2 text-sm  border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:bg-gray-100"
                                                        >
                                                            <option value="">Pilih peran...</option>
                                                            {PERAN_OPTIONS.filter((p) => isKetuaLocked || p !== 'Ketua Peneliti' || anggota.peran === 'Ketua Peneliti').map((peran) => (
                                                                <option key={peran} value={peran}>
                                                                    {peran}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="md:col-span-1">
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">
                                                            Tugas
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={anggota.tugas}
                                                            onChange={(event) =>
                                                                onAnggotaChange(
                                                                    index,
                                                                    'tugas',
                                                                    event.target.value,
                                                                )
                                                            }
                                                            placeholder="Contoh: Analisis Data"
                                                            className="w-full px-3 py-2 text-sm  border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => onRemoveAnggota(index)}
                                                className={`p-2 ${
                                                    isKetuaLocked
                                                        ? 'text-gray-300 cursor-not-allowed'
                                                        : 'text-red-600 hover:text-red-700'
                                                }`}
                                                disabled={Boolean(isKetuaLocked)}
                                                title={
                                                    isKetuaLocked
                                                        ? 'Pengusul otomatis sebagai ketua'
                                                        : 'Hapus anggota'
                                                }
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Rencana Anggaran Biaya (RAB)
                        </h3>
                        {skemaBudget && (skemaBudget.min || skemaBudget.max) ? (
                            <div className="text-sm font-medium px-4 py-2 bg-indigo-50 text-indigo-700  border border-indigo-100">
                                Pagu Anggaran:{' '}
                                {skemaBudget.min ? `Rp ${skemaBudget.min.toLocaleString('id-ID')}` : 'Rp 0'}{' '}
                                -{' '}
                                {skemaBudget.max ? `Rp ${skemaBudget.max.toLocaleString('id-ID')}` : 'Maksimal'}
                            </div>
                        ) : null}
                    </div>

                    {!lamaWaktu ? (
                        <div className="text-center py-8 bg-gray-50  border-2 border-dashed border-gray-300">
                            <p className="text-gray-500">
                                Silakan isi lama waktu pelaksanaan di langkah sebelumnya
                                terlebih dahulu.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {tahunPelaksanaan.map((label, index) => {
                                const year = index + 1;
                                const items = rab[year] ?? [];
                                const yearTotal = rabTotalsByYear[year] ?? 0;
                                const hasItems = items.length > 0;

                                return (
                                    <div
                                        key={year}
                                        className="border border-gray-200  p-4 bg-white shadow-sm"
                                    >
                                        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <h4 className="text-base font-semibold text-gray-900">{`RAB ${label}`}</h4>
                                                <p className="text-sm text-gray-500">
                                                    Catat rincian kebutuhan biaya untuk tahun ini per
                                                    komponen.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => addRabItem(year)}
                                                className="inline-flex items-center  bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                                            >
                                                + Tambah Baris
                                            </button>
                                        </div>

                                        {hasItems ? (
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-sm text-gray-900">
                                                    <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                                        <tr>
                                                            <th className="px-4 py-3 text-left">
                                                                Kelompok
                                                            </th>
                                                            <th className="px-4 py-3 text-left">
                                                                Komponen
                                                            </th>
                                                            <th className="px-4 py-3 text-left">
                                                                Nama Item
                                                            </th>
                                                            <th className="px-4 py-3 text-left">
                                                                Jumlah
                                                            </th>
                                                            <th className="px-4 py-3 text-left">
                                                                Harga Satuan
                                                            </th>
                                                            <th className="px-4 py-3 text-left">
                                                                Total Biaya
                                                            </th>
                                                            <th className="px-4 py-3 text-left">Aksi</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-gray-200">
                                                        {items.map((item) => (
                                                            <tr key={item.id}>
                                                                <td className="px-4 py-3">
                                                                    <select
                                                                        value={item.kelompok_id}
                                                                        onChange={(event) =>
                                                                            updateRabItem(
                                                                                year,
                                                                                item.id,
                                                                                'kelompok_id',
                                                                                event.target.value,
                                                                            )
                                                                        }
                                                                        className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                    >
                                                                        <option value="">Pilih kelompok...</option>
                                                                        {kelompokOptions.map((option) => (
                                                                            <option
                                                                                key={option.id}
                                                                                value={String(option.id)}
                                                                            >
                                                                                {`${option.kategori} - ${option.nama}`}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    {(() => {
                                                                        const selectedKelompok =
                                                                            kelompokLookup[item.kelompok_id];
                                                                        const filteredKomponen = selectedKelompok
                                                                            ? komponenSelectOptions.filter(
                                                                                  (option) =>
                                                                                      option.kelompokId ===
                                                                                      Number(selectedKelompok.id),
                                                                              )
                                                                            : [];

                                                                        return (
                                                                            <select
                                                                                value={item.id_komponen}
                                                                                onChange={(event) =>
                                                                                    updateRabItem(
                                                                                        year,
                                                                                        item.id,
                                                                                        'id_komponen',
                                                                                        event.target.value,
                                                                                    )
                                                                                }
                                                                                disabled={!item.kelompok_id}
                                                                                className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                            >
                                                                                <option value="">
                                                                                    {item.kelompok_id
                                                                                        ? 'Pilih komponen...'
                                                                                        : 'Pilih kelompok dulu'}
                                                                                </option>
                                                                                {filteredKomponen.map((option) => (
                                                                                    <option
                                                                                        key={option.value}
                                                                                        value={option.value}
                                                                                    >
                                                                                        {option.label}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                        );
                                                                    })()}
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="text"
                                                                        value={item.nama_item}
                                                                        onChange={(event) =>
                                                                            updateRabItem(
                                                                                year,
                                                                                item.id,
                                                                                'nama_item',
                                                                                event.target.value,
                                                                            )
                                                                        }
                                                                        placeholder="Contoh: Honor ketua peneliti"
                                                                        className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        step="any"
                                                                        value={item.jumlah_item}
                                                                        onChange={(event) =>
                                                                            updateRabItem(
                                                                                year,
                                                                                item.id,
                                                                                'jumlah_item',
                                                                                event.target.value,
                                                                            )
                                                                        }
                                                                        placeholder="0"
                                                                        className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        step="any"
                                                                        value={item.harga_satuan}
                                                                        onChange={(event) =>
                                                                            updateRabItem(
                                                                                year,
                                                                                item.id,
                                                                                'harga_satuan',
                                                                                event.target.value,
                                                                            )
                                                                        }
                                                                        placeholder="0"
                                                                        className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <input
                                                                        type="number"
                                                                        min="0"
                                                                        step="any"
                                                                        readOnly={true}
                                                                        value={item.total_biaya}
                                                                        onChange={(event) =>
                                                                            updateRabItem(
                                                                                year,
                                                                                item.id,
                                                                                'total_biaya',
                                                                                event.target.value,
                                                                            )
                                                                        }
                                                                        placeholder="0"
                                                                        className="w-full  border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                                    />
                                                                </td>
                                                                <td className="px-4 py-3">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeRabItem(year, item.id)}
                                                                        className=" border border-red-200 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
                                                                    >
                                                                        Hapus
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className=" border-2 border-dashed border-gray-300 py-8 text-center text-sm text-gray-500">
                                                Belum ada baris anggaran. Klik tombol "Tambah Baris"
                                                untuk menambahkan komponen biaya.
                                            </div>
                                        )}

                                        <div className="mt-4 flex justify-end text-sm">
                                            <span className="font-medium text-gray-700">
                                                Total {label}:
                                            </span>
                                            <span className="ml-2 font-semibold text-gray-900">
                                                Rp {yearTotal.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="bg-indigo-50  p-6 border border-indigo-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total RAB:
                                    </span>
                                    <span className="text-2xl font-bold text-indigo-600">
                                        Rp {totalRab.toLocaleString('id-ID')}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
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
                    onClick={onNext}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold  hover:bg-indigo-700 transition-colors"
                >
                    Selanjutnya
                </button>
            </div>
        </div>
    );
}
