import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Check } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import DashboardNav from '@/components/DashboardNav';
import { Head, router, usePage } from '@inertiajs/react';

type SkemaOptionPayload = {
    uuid: string;
    nama: string | null;
    nama_singkat: string | null;
};

type FokusOptionPayload = {
    uuid: string;
    fokus: string | null;
};

type SdgOptionPayload = {
    uuid: string;
    sdg: string | null;
    level: number | null;
};

type TktOptionPayload = {
    uuid: string;
    tkt: string | null;
    level: number | null;
};

type DosenOptionPayload = {
    uuid: string;
    nama: string | null;
    nidn: string | null;
    email: string | null;
    uuid_pt: string | null;
};

type PerguruanOptionPayload = {
    uuid: string;
    nama: string | null;
    nama_singkat: string | null;
};

type CreatePageProps = {
    skemaOptions: SkemaOptionPayload[];
    fokusOptions: FokusOptionPayload[];
    sdgOptions: SdgOptionPayload[];
    tktOptions: TktOptionPayload[];
    dosenOptions: DosenOptionPayload[];
    perguruanOptions: PerguruanOptionPayload[];
};

type SelectOption = {
    value: string;
    label: string;
};

type DosenSelectOption = {
    value: string;
    label: string;
    subtitle?: string | null;
    uuid_pt: string | null;
};

type SearchableSelectProps = {
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string; subtitle?: string | null }>;
    placeholder?: string;
    disabled?: boolean;
    emptyMessage?: string;
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
        if (!open) {
            setInputValue(selectedOption?.label ?? '');
        }
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
                        setInputValue(selectedOption?.label ?? '');
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                />
                <button
                    type="button"
                    onClick={() => !disabled && setOpen((prev) => !prev)}
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
                <div className="absolute z-20 mt-1 max-h-52 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
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
                                        isSelected ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700'
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
                        <div className="px-4 py-3 text-sm text-gray-500">{emptyMessage}</div>
                    )}
                </div>
            ) : null}
        </div>
    );
}

type RabValues = Record<string, number | null>;

type TeamMember = {
    uuid_pt: string;
    dosen_uuid: string;
    peran: string;
    tugas: string;
};

type FormDataState = {
    judul: string;
    id_skema: string;
    id_fokus: string;
    ringkasan: string;
    id_sdg: string;
    id_tkt: string;
    lama_waktu: string;
    tahun_pengajuan: string;
    tahun_pelaksanaan: string;
    proposal_file: File | null;
    lampiran_file: File | null;
    rab: RabValues;
    target_luaran: string;
};

type InputField = Exclude<
    keyof FormDataState,
    'proposal_file' | 'lampiran_file' | 'rab'
>;

export default function PenelitianCreate() {
    const {
        skemaOptions: rawSkemaOptions = [],
        fokusOptions: rawFokusOptions = [],
        sdgOptions: rawSdgOptions = [],
        tktOptions: rawTktOptions = [],
        dosenOptions: rawDosenOptions = [],
        perguruanOptions: rawPerguruanOptions = [],
    } = usePage<CreatePageProps>().props;

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [formData, setFormData] = useState<FormDataState>({
        judul: '',
        id_skema: '',
        id_fokus: '',
        ringkasan: '',
        id_sdg: '',
        id_tkt: '',
        lama_waktu: '',
        tahun_pengajuan: '',
        tahun_pelaksanaan: '',
        proposal_file: null,
        lampiran_file: null,
        rab: {} as RabValues,
        target_luaran: '',
    });

    const dosenLookup = useMemo(
        () =>
            rawDosenOptions.reduce<Record<string, DosenOptionPayload>>((acc, option) => {
                acc[option.uuid] = option;
                return acc;
            }, {}),
        [rawDosenOptions],
    );

    const dosenSelectOptions = useMemo<DosenSelectOption[]>(
        () =>
            rawDosenOptions.map((option) => ({
                value: option.uuid,
                label:
                    option.nama && option.nama.trim().length > 0
                        ? option.nama
                        : option.email ?? 'Dosen tanpa nama',
                subtitle: option.nidn,
                uuid_pt: option.uuid_pt,
            })),
        [rawDosenOptions],
    );

    const perguruanLookup = useMemo(() => {
        return rawPerguruanOptions.reduce<Record<string, PerguruanOptionPayload>>(
            (acc, option) => {
                acc[option.uuid] = option;
                return acc;
            },
            {},
        );
    }, [rawPerguruanOptions]);

    const perguruanSelectOptions = useMemo(() => {
        const availablePt = new Set(
            rawDosenOptions
                .map((option) => option.uuid_pt)
                .filter((value): value is string => Boolean(value)),
        );

        return rawPerguruanOptions
            .filter((option) => availablePt.size === 0 || availablePt.has(option.uuid))
            .map((option) => ({
                value: option.uuid,
                label:
                    option.nama_singkat && option.nama_singkat.trim().length > 0
                        ? `${option.nama_singkat} – ${option.nama ?? ''}`.trim()
                        : option.nama ?? 'Perguruan Tinggi',
            }));
    }, [rawPerguruanOptions, rawDosenOptions]);

    const [anggotaTim, setAnggotaTim] = useState<TeamMember[]>([]);

    const steps = [
        { number: 1, label: 'Identitas Proposal' },
        { number: 2, label: 'Anggota & RAB' },
        { number: 3, label: 'Konfirmasi & Ajukan' },
    ] as const;

    const handleInputChange = (field: InputField, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFileChange = (
        field: Extract<keyof FormDataState, 'proposal_file' | 'lampiran_file'>,
        file: File | null,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: file,
        }));
    };

    const handleAddAnggota = () => {
        setAnggotaTim((prev) => [...prev, { uuid_pt: '', dosen_uuid: '', peran: '', tugas: '' }]);
    };

    const handleRemoveAnggota = (index: number) => {
        setAnggotaTim((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAnggotaChange = (
        index: number,
        field: keyof TeamMember,
        value: string,
    ) => {
        setAnggotaTim((prev) => {
            const updated = [...prev];
            updated[index] = {
                ...updated[index],
                [field]: value,
            };
            if (field === 'uuid_pt') {
                updated[index].dosen_uuid = '';
            }
            return updated;
        });
    };

    const handleRabChange = (tahun: string, value: string) => {
        const numericValue = value === '' ? null : Number(value);

        setFormData((prev) => ({
            ...prev,
            rab: {
                ...prev.rab,
                [tahun]:
                    numericValue === null || Number.isNaN(numericValue)
                        ? null
                        : numericValue,
            },
        }));
    };

    const getTahunPelaksanaan = (): string[] => {
        const lama = Number.parseInt(formData.lama_waktu, 10) || 0;
        return Array.from({ length: lama }, (_, index) => `Tahun ${index + 1}`);
    };

    const handleNext = () => {
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const skemaSelectOptions = useMemo<SelectOption[]>(() => {
        return rawSkemaOptions
            .map((option) => {
                const parts = [option.nama_singkat, option.nama]
                    .map((part) => (part ?? '').trim())
                    .filter((part) => part.length > 0);

                return {
                    value: option.uuid,
                    label: parts.length > 0 ? parts.join(' - ') : 'Skema tanpa nama',
                };
            })
            .filter((option) => option.value);
    }, [rawSkemaOptions]);

    const fokusSelectOptions = useMemo<SelectOption[]>(() => {
        return rawFokusOptions
            .map((option) => ({
                value: option.uuid,
                label: (option.fokus ?? '').trim() || 'Fokus tanpa nama',
            }))
            .filter((option) => option.value);
    }, [rawFokusOptions]);

    const sdgSelectOptions = useMemo<SelectOption[]>(() => {
        return rawSdgOptions
            .map((option) => {
                const prefix =
                    option.level !== null && option.level !== undefined
                        ? `SDG ${option.level}`
                        : null;
                const labelParts = [prefix, option.sdg?.trim()].filter(
                    (part): part is string => Boolean(part && part.length > 0),
                );

                return {
                    value: option.uuid,
                    label:
                        labelParts.join(' - ') || option.sdg?.trim() || 'SDG tanpa nama',
                };
            })
            .filter((option) => option.value);
    }, [rawSdgOptions]);

    const tktSelectOptions = useMemo<SelectOption[]>(() => {
        return rawTktOptions
            .map((option) => {
                const prefix =
                    option.level !== null && option.level !== undefined
                        ? `TKT ${option.level}`
                        : null;
                const labelParts = [prefix, option.tkt?.trim()].filter(
                    (part): part is string => Boolean(part && part.length > 0),
                );

                return {
                    value: option.uuid,
                    label:
                        labelParts.join(' - ') || option.tkt?.trim() || 'TKT tanpa nama',
                };
            })
            .filter((option) => option.value);
    }, [rawTktOptions]);

    const getOptionLabel = useCallback(
        (options: SelectOption[], value: string) =>
            options.find((option) => option.value === value)?.label || '-',
        [],
    );

    const handleSubmit = () => {
        if (!formData.proposal_file) {
            window.alert('Mohon unggah file proposal sebelum mengajukan.');
            return;
        }

        const payload: Record<string, unknown> = {
            title: formData.judul,
            id_skema: formData.id_skema || null,
            id_tkt: formData.id_tkt || null,
            id_sdg: formData.id_sdg || null,
            id_fokus: formData.id_fokus || null,
            biaya_usulan_1: formData.rab['Tahun 1'] ?? null,
            biaya_usulan_2: formData.rab['Tahun 2'] ?? null,
            biaya_usulan_3: formData.rab['Tahun 3'] ?? null,
            biaya_usulan_4: formData.rab['Tahun 4'] ?? null,
            tahun: formData.tahun_pengajuan
                ? Number(formData.tahun_pengajuan)
                : null,
            tahun_pelaksanaan: formData.tahun_pelaksanaan
                ? Number(formData.tahun_pelaksanaan)
                : null,
            status: 'Draft',
            target_luaran: formData.target_luaran || null,
        };

        payload.proposal_file = formData.proposal_file;

        if (formData.lampiran_file) {
            payload.lampiran_file = formData.lampiran_file;
        }

        const anggotaPayload = anggotaTim
            .filter((anggota) => anggota.dosen_uuid)
            .map((anggota) => ({
                dosen_uuid: anggota.dosen_uuid,
                peran: anggota.peran || null,
                tugas: anggota.tugas || null,
            }));

        if (anggotaPayload.length > 0) {
            payload.anggota = anggotaPayload;
        }

        router.post('/pt-penelitian', payload, {
            onSuccess: () => {
                router.visit('/pt-penelitian');
            },
            onError: (errors) => {
                console.error('Gagal mengirim:', errors);
            },
        });
    };

    const peranOptions: string[] = [
        'Ketua Peneliti',
        'Anggota Peneliti',
        'Peneliti Pendamping',
    ];

    const totalRab = useMemo<number>(
        () =>
            Object.values(formData.rab).reduce<number>(
                (sum, value) => sum + (value ?? 0),
                0,
            ),
        [formData.rab],
    );

  return (
    <AppHeaderLayout
      breadcrumbs={[
        { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
        { title: 'Penelitian', href: '/pt-penelitian' },
      ]}
    >
      <Head title="Penelitian" />
      <DashboardNav />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          {currentStep !== 4 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="flex items-center justify-between mb-8">
              {steps.map((step, idx) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {currentStep > step.number ? <Check size={20} /> : step.number}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${
                      currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-4 transition-all ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

          {currentStep === 1 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Identitas Proposal Penelitian</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul Penelitian <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => handleInputChange('judul', e.target.value)}
                  placeholder="Masukkan judul penelitian..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skema <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.id_skema}
                    onChange={(e) => handleInputChange('id_skema', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih skema...</option>
                    {skemaSelectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bidang Fokus <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.id_fokus}
                    onChange={(e) => handleInputChange('id_fokus', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih bidang fokus...</option>
                    {fokusSelectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ringkasan Eksekutif <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.ringkasan}
                  onChange={(e) => handleInputChange('ringkasan', e.target.value)}
                  placeholder="Tuliskan ringkasan eksekutif penelitian..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keterkaitan dengan SDGs
                  </label>
                  <select
                    value={formData.id_sdg}
                    onChange={(e) => handleInputChange('id_sdg', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih SDG...</option>
                    {sdgSelectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
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
                    onChange={(e) => handleInputChange('id_tkt', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih TKT...</option>
                    {tktSelectOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Target Luaran
  </label>
  <textarea
    value={formData.target_luaran}
    onChange={(e) => handleInputChange('target_luaran', e.target.value)}
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
                    onChange={(e) => handleInputChange('lama_waktu', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih...</option>
                    <option value="1">1 Tahun</option>
                    <option value="2">2 Tahun</option>
                    <option value="3">3 Tahun</option>
                    <option value="4">4 Tahun</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Pengajuan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tahun_pengajuan}
                    onChange={(e) => handleInputChange('tahun_pengajuan', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">{`Pilih tahun`}</option>
                    <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tahun Pelaksanaan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.tahun_pelaksanaan}
                    onChange={(e) => handleInputChange('tahun_pelaksanaan', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  >
                    <option value="">Pilih tahun...</option>
                    {[...Array(2)].map((_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  File Unggah Proposal <span className="text-red-500">*</span>
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-all">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) =>
                      handleFileChange('proposal_file', e.target.files?.[0] ?? null)
                    }
                    className="hidden"
                    id="proposal-upload"
                  />
                  <label htmlFor="proposal-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm">
                        {formData.proposal_file ? formData.proposal_file.name : 'Klik untuk mengunggah atau drag and drop'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Maks. 10MB)</p>
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lampiran (jika ada)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-all">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.zip"
                    onChange={(e) =>
                      handleFileChange('lampiran_file', e.target.files?.[0] ?? null)
                    }
                    className="hidden"
                    id="lampiran-upload"
                  />
                  <label htmlFor="lampiran-upload" className="cursor-pointer">
                    <div className="text-gray-600">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <p className="mt-2 text-sm">
                        {formData.lampiran_file ? formData.lampiran_file.name : 'Klik untuk mengunggah lampiran pendukung'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, ZIP (Maks. 20MB)</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}

          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Anggota Penelitian & RAB</h2>
            
            <div className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Anggota Penelitian (Dosen)</h3>
                  <button
                    onClick={handleAddAnggota}
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Tambah Anggota
                  </button>
                </div>

                {anggotaTim.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Belum ada anggota tim. Klik tombol di atas untuk menambah anggota.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {anggotaTim.map((anggota, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="grid gap-4 md:grid-cols-4">
                              <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Perguruan Tinggi
                                </label>
                                <SearchableSelect
                                  value={anggota.uuid_pt}
                                  onChange={(ptValue) => handleAnggotaChange(index, 'uuid_pt', ptValue)}
                                  options={perguruanSelectOptions}
                                  placeholder="Cari perguruan tinggi..."
                                  emptyMessage="Perguruan tinggi tidak ditemukan"
                                />
                              </div>

                              <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Pilih Dosen
                                </label>
                                <SearchableSelect
                                  value={anggota.dosen_uuid}
                                  onChange={(dosenValue) => handleAnggotaChange(index, 'dosen_uuid', dosenValue)}
                                  options={dosenSelectOptions.filter((dosen) => dosen.uuid_pt === anggota.uuid_pt)}
                                  placeholder={
                                    anggota.uuid_pt
                                      ? 'Cari dosen...'
                                      : 'Pilih perguruan tinggi terlebih dahulu'
                                  }
                                  disabled={!anggota.uuid_pt}
                                  emptyMessage="Dosen tidak ditemukan"
                                />
                              </div>

                              <div className="md:col-span-1">
                                <label className="block text-xs font-medium text-gray-700 mb-1">
                                  Peran
                                </label>
                                <select
                                  value={anggota.peran}
                                  onChange={(e) => handleAnggotaChange(index, 'peran', e.target.value)}
                                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                >
                                  <option value="">Pilih peran...</option>
                                  {peranOptions.map(peran => (
                                    <option key={peran} value={peran}>{peran}</option>
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
                                  onChange={(e) => handleAnggotaChange(index, 'tugas', e.target.value)}
                                  placeholder="Contoh: Analisis Data"
                                  className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRemoveAnggota(index)}
                            className="text-red-600 hover:text-red-700 p-2"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rencana Anggaran Biaya (RAB)</h3>
                
                {!formData.lama_waktu ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-gray-500">Silakan isi lama waktu pelaksanaan di halaman sebelumnya terlebih dahulu.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {getTahunPelaksanaan().map((tahun, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          RAB {tahun}
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-3 text-gray-500">Rp</span>
                          <input
                            type="number"
                            value={formData.rab[tahun] ?? ''}
                            onChange={(e) => handleRabChange(tahun, e.target.value)}
                            placeholder="0"
                            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Total RAB:</span>
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
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}

          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Konfirmasi & Ajukan Proposal</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Identitas Proposal</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Judul Penelitian:</span>
                    <span className="flex-1 text-gray-900">{formData.judul || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Skema:</span>
                    <span className="flex-1 text-gray-900">
                      {getOptionLabel(skemaSelectOptions, formData.id_skema)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Bidang Fokus:</span>
                    <span className="flex-1 text-gray-900">
                      {getOptionLabel(fokusSelectOptions, formData.id_fokus)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Ringkasan:</span>
                    <span className="flex-1 text-gray-900">{formData.ringkasan || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Keterkaitan SDG:</span>
                    <span className="flex-1 text-gray-900">
                      {getOptionLabel(sdgSelectOptions, formData.id_sdg)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Level TKT:</span>
                    <span className="flex-1 text-gray-900">
                      {getOptionLabel(tktSelectOptions, formData.id_tkt)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Lama Waktu:</span>
                    <span className="flex-1 text-gray-900">{formData.lama_waktu ? `${formData.lama_waktu} Tahun` : '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Tahun Pengajuan:</span>
                    <span className="flex-1 text-gray-900">{formData.tahun_pengajuan || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Tahun Pelaksanaan:</span>
                    <span className="flex-1 text-gray-900">{formData.tahun_pelaksanaan || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">File Proposal:</span>
                    <span className="flex-1 text-gray-900">{formData.proposal_file?.name || '-'}</span>
                  </div>
                  <div className="flex">
                    <span className="w-48 font-medium text-gray-700">Lampiran:</span>
                    <span className="flex-1 text-gray-900">{formData.lampiran_file?.name || '-'}</span>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Anggota Penelitian</h3>
                {anggotaTim.length === 0 ? (
                  <p className="text-sm text-gray-500">Belum ada anggota tim ditambahkan.</p>
                ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-300">
                              <th className="text-left py-2 font-medium text-gray-700">No</th>
                              <th className="text-left py-2 font-medium text-gray-700">Nama Dosen</th>
                              <th className="text-left py-2 font-medium text-gray-700">Perguruan Tinggi</th>
                              <th className="text-left py-2 font-medium text-gray-700">Peran</th>
                              <th className="text-left py-2 font-medium text-gray-700">Tugas</th>
                            </tr>
                          </thead>
                          <tbody>
                            {anggotaTim.map((anggota, index) => {
                              const dosen = anggota.dosen_uuid ? dosenLookup[anggota.dosen_uuid] : undefined;
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
                                  <td className="py-3 text-gray-900">{index + 1}</td>
                                  <td className="py-3 text-gray-900">{namaDosen}</td>
                                  <td className="py-3 text-gray-900">{perguruanLabel}</td>
                                  <td className="py-3 text-gray-900">{anggota.peran || '-'}</td>
                                  <td className="py-3 text-gray-900">{anggota.tugas || '-'}</td>
                                </tr>
                              );
                            })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rencana Anggaran Biaya</h3>
                {Object.keys(formData.rab).length === 0 ? (
                  <p className="text-sm text-gray-500">Belum ada data RAB.</p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(formData.rab).map(([tahun, biaya]) => (
                      <div key={tahun} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">RAB {tahun}:</span>
                        <span className="text-gray-900">
                          Rp {(biaya ?? 0).toLocaleString('id-ID')}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-300 pt-3 mt-3">
                      <div className="flex justify-between font-semibold text-base">
                        <span className="text-gray-900">Total RAB:</span>
                        <span className="text-indigo-600">
                          Rp {totalRab.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-yellow-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Ajukan Proposal
              </button>
            </div>
          </div>
        )}

          {currentStep === 4 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Proposal Berhasil Diajukan!
            </h2>
            <p className="text-gray-600 mb-8">
              Kami akan memproses proposal penelitian Anda dalam beberapa hari.
            </p>
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    judul: '',
                    id_skema: '',
                    id_fokus: '',
                    ringkasan: '',
                    id_sdg: '',
                    id_tkt: '',
                    lama_waktu: '',
                    tahun_pengajuan: '',
                    tahun_pelaksanaan: '',
                    proposal_file: null,
                    lampiran_file: null,
                    rab: {} as RabValues,
                    target_luaran: '',
                  });
                  setAnggotaTim([]);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Buat Proposal Baru
              </button>
              <button
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Lihat Daftar Proposal
              </button>
            </div>
          </div>
          
          )}
        </div>
      </div>
    </AppHeaderLayout>
  );
}
