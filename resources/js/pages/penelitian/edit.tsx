import { useCallback, useMemo, useState } from 'react';

import { Check, X } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import DashboardNav from '@/components/DashboardNav';
import { Head, router, usePage } from '@inertiajs/react';
import StepOneView from './create/StepOneView';
import StepThreeView from './create/StepThreeView';
import StepTwoView from './create/StepTwoView';
import StepDocumentsView from './create/StepDocumentsView';
import { STEP_ONE_KEY_SET, STEP_ONE_REQUIREMENTS } from './create/constants';
import {
    type CreatePageProps,
    type DosenOptionPayload,
    type DosenSelectOption,
    type FormDataState,
    type InputField,
    type KomponenBiayaOptionPayload,
    type KomponenSelectOption,
    type PerguruanOptionPayload,
    type RabFormState,
    type RabItemEditableField,
    type RabItemForm,
    type RabKelompokOption,
    type SelectOption,
    type StepOneFieldKey,
    type TeamMember,
} from './create/types';
import { type SharedData } from '@/types';

type PenelitianAnggotaPayload = {
    uuid_pt: string | null;
    dosen_uuid: string | null;
    peran: string | null;
    tugas: string | null;
};

type PenelitianRabItemPayload = {
    id_komponen: number | null;
    nama_item: string;
    jumlah_item: number | null;
    harga_satuan: number | null;
    total_biaya: number | null;
};

type PenelitianRabPayload = {
    tahun: number;
    items: PenelitianRabItemPayload[];
};

type PenelitianEditPayload = {
    uuid: string;
    title: string | null;
    id_skema: string | null;
    id_fokus: string | null;
    id_sdg: string[] | null;
    id_tkt: string | null;
    ringkasan: string | null;
    target_luaran: string | null;
    tahun_pengajuan: number | null;
    tahun_pelaksanaan: number | null;
    lama_waktu: number | null;
    proposal_filename: string | null;
    lampiran_filename: string | null;
    rab: PenelitianRabPayload[];
    anggota: PenelitianAnggotaPayload[];
};

type PageProps = SharedData &
    CreatePageProps & {
        penelitian: PenelitianEditPayload;
    };

const generateLocalId = (): string => {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
        return crypto.randomUUID();
    }

    return `rab-${Math.random().toString(36).slice(2)}-${Date.now()}`;
};

export default function PenelitianEdit() {
    const {
        penelitian,
        skemaOptions: rawSkemaOptions = [],
        fokusOptions: rawFokusOptions = [],
        sdgOptions: rawSdgOptions = [],
        tktOptions: rawTktOptions = [],
        dosenOptions: rawDosenOptions = [],
        perguruanOptions: rawPerguruanOptions = [],
        komponenOptions: rawKomponenOptions = [],
        kelompokOptions: rawKelompokOptions = [],
    } = usePage<PageProps>().props;

    const hasExistingProposal = Boolean(penelitian.proposal_filename);
    const komponenKelompokMap = useMemo(() => {
        return rawKomponenOptions.reduce<Record<string, number | null>>((acc, option) => {
            acc[String(option.id)] = option.id_komponen_rab;
            return acc;
        }, {});
    }, [rawKomponenOptions]);

    const initialRabState = useMemo<RabFormState>(() => {
        const state: RabFormState = {};

        (penelitian.rab ?? []).forEach((entry) => {
            const items = entry.items ?? [];
            state[entry.tahun] = items.map((item, index) => ({
                id: `existing-${entry.tahun}-${index}-${item.nama_item}-${item.id_komponen ?? 'x'}`,
                kelompok_id: item.id_komponen
                    ? String(komponenKelompokMap[String(item.id_komponen)] ?? '')
                    : '',
                id_komponen: item.id_komponen ? String(item.id_komponen) : '',
                nama_item: item.nama_item ?? '',
                jumlah_item:
                    item.jumlah_item === null || item.jumlah_item === undefined
                        ? ''
                        : String(item.jumlah_item),
                harga_satuan:
                    item.harga_satuan === null || item.harga_satuan === undefined
                        ? ''
                        : String(item.harga_satuan),
                total_biaya:
                    item.total_biaya === null || item.total_biaya === undefined
                        ? ''
                        : String(item.total_biaya),
            }));
        });

        return state;
    }, [penelitian.rab, komponenKelompokMap]);

    const derivedLamaWaktu = useMemo(() => {
        if (penelitian.lama_waktu) {
            return penelitian.lama_waktu;
        }

        const tahunEntries = (penelitian.rab ?? []).map((entry) => entry.tahun);

        if (tahunEntries.length === 0) {
            return null;
        }

        return Math.max(...tahunEntries);
    }, [penelitian.lama_waktu, penelitian.rab]);

const safeInitialLamaWaktu =
    derivedLamaWaktu && Number.isFinite(derivedLamaWaktu)
        ? String(Math.min(derivedLamaWaktu, 4))
        : '';

const MAX_PROPOSAL_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_LAMPIRAN_SIZE = 10 * 1024 * 1024; // 10 MB

    const initialKetuaUuid = useMemo(() => {
        return penelitian.anggota?.find(a => a.peran === 'Ketua Peneliti')?.dosen_uuid;
    }, [penelitian.anggota]);

    const [formData, setFormData] = useState<FormDataState>(() => ({
        judul: penelitian.title ?? '',
        id_skema: penelitian.id_skema ?? '',
        id_fokus: penelitian.id_fokus ?? '',
        ringkasan: penelitian.ringkasan ?? '',
        id_sdg: penelitian.id_sdg ?? [],
        id_tkt: penelitian.id_tkt ?? '',
        lama_waktu: safeInitialLamaWaktu,
        tahun_pengajuan: penelitian.tahun_pengajuan
            ? String(penelitian.tahun_pengajuan)
            : '',
        tahun_pelaksanaan: penelitian.tahun_pelaksanaan
            ? String(penelitian.tahun_pelaksanaan)
            : '',
        proposal_file: null,
        lampiran_file: null,
        rab: initialRabState,
        target_luaran: penelitian.target_luaran ?? '',
    }));

    const [anggotaTim, setAnggotaTim] = useState<TeamMember[]>(() =>
        (penelitian.anggota ?? []).map((anggota) => ({
            uuid_pt: anggota.uuid_pt ?? '',
            dosen_uuid: anggota.dosen_uuid ?? '',
            peran: anggota.peran ?? '',
            tugas: anggota.tugas ?? '',
        })),
    );

    const [currentStep, setCurrentStep] = useState<number>(1);
    const [stepOneInvalidFields, setStepOneInvalidFields] = useState<StepOneFieldKey[]>([]);
    const [stepOneAttempted, setStepOneAttempted] = useState(false);

    const showStepOneErrors = stepOneAttempted && stepOneInvalidFields.length > 0;
    const hasStepOneError = (key: StepOneFieldKey): boolean =>
        stepOneInvalidFields.includes(key);
    const getStepOneLabel = (key: StepOneFieldKey): string =>
        STEP_ONE_REQUIREMENTS.find((item) => item.key === key)?.label ?? 'Kolom';

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

    const komponenSelectOptions = useMemo<KomponenSelectOption[]>(
        () =>
            rawKomponenOptions
                .map((option) => ({
                    value: String(option.id),
                    label:
                        option.nama_komponen && option.nama_komponen.trim().length > 0
                            ? option.nama_komponen
                            : `Komponen RAB ${option.id}`,
                    jenis: option.jenis,
                    kelompokId: option.id_komponen_rab ?? null,
                }))
                .sort((a, b) => a.label.localeCompare(b.label, 'id', { sensitivity: 'base' })),
        [rawKomponenOptions],
    );

    const komponenLookup = useMemo(
        () =>
            komponenSelectOptions.reduce<Record<string, string>>((acc, option) => {
                acc[option.value] = option.label;
                return acc;
            }, {}),
        [komponenSelectOptions],
    );

    const kelompokOptions = useMemo<RabKelompokOption[]>(
        () =>
            rawKelompokOptions
                .map((option) => ({
                    id: option.id,
                    kategori: option.kategori,
                    nama: option.nama,
                }))
                .sort((a, b) => a.id - b.id),
        [rawKelompokOptions],
    );

    const kelompokLookup = useMemo(
        () =>
            kelompokOptions.reduce<Record<string, RabKelompokOption>>((acc, item) => {
                acc[String(item.id)] = item;
                return acc;
            }, {}),
        [kelompokOptions],
    );

    const parseNumber = (value: string): number | null => {
        if (value === undefined || value === null) {
            return null;
        }

        const trimmed = value.toString().trim();

        if (trimmed === '') {
            return null;
        }

        const normalized = trimmed.replace(/,/g, '');
        const parsed = Number(normalized);

        return Number.isFinite(parsed) ? parsed : null;
    };

    const calculateItemTotal = (item: RabItemForm): number => {
        const explicitTotal = parseNumber(item.total_biaya);

        if (explicitTotal !== null) {
            return explicitTotal;
        }

        const jumlah = parseNumber(item.jumlah_item);
        const harga = parseNumber(item.harga_satuan);

        if (jumlah !== null && harga !== null) {
            return jumlah * harga;
        }

        return 0;
    };

    const handleInputChange = (field: InputField, value: string) => {
        setFormData((prev) => {
            let updatedRab = prev.rab;

            if (field === 'lama_waktu') {
                const maxYears = Number.parseInt(value, 10);

                if (Number.isFinite(maxYears) && maxYears > 0) {
                    const allowedYears = new Set(
                        Array.from({ length: Math.min(maxYears, 4) }, (_, index) => index + 1),
                    );

                    updatedRab = Object.fromEntries(
                        Object.entries(prev.rab)
                            .filter(([year]) => allowedYears.has(Number(year)))
                            .map(([year, items]) => [Number(year), items]),
                    ) as RabFormState;
                } else {
                    updatedRab = {};
                }
            }

            const next: FormDataState = {
                ...prev,
                [field]: value,
                rab: updatedRab,
            };

            if (stepOneAttempted && STEP_ONE_KEY_SET.has(field as StepOneFieldKey)) {
                const stepKey = field as StepOneFieldKey;
                setStepOneInvalidFields((prevInvalid) => {
                    const filtered = prevInvalid.filter((key) => key !== stepKey);
                    if (!isStepOneFieldFilled(next, stepKey)) {
                        return [...filtered, stepKey];
                    }
                    return filtered;
                });
            }

            return next;
        });
    };

    const handleFileChange = (
        field: Extract<keyof FormDataState, 'proposal_file' | 'lampiran_file'>,
        file: File | null,
    ) => {
        if (file) {
            const sizeLimit = field === 'proposal_file' ? MAX_PROPOSAL_SIZE : MAX_LAMPIRAN_SIZE;
            if (file.size > sizeLimit) {
                window.alert(
                    field === 'proposal_file'
                        ? 'Ukuran proposal maksimal 5 MB.'
                        : 'Ukuran lampiran maksimal 10 MB.',
                );
                return;
            }
        }

        setFormData((prev) => {
            const next: FormDataState = {
                ...prev,
                [field]: file,
            };

            if (stepOneAttempted && field === 'proposal_file') {
                const stepKey: StepOneFieldKey = 'proposal_file';
                setStepOneInvalidFields((prevInvalid) => {
                    const filtered = prevInvalid.filter((key) => key !== stepKey);
                    if (!isStepOneFieldFilled(next, stepKey)) {
                        return [...filtered, stepKey];
                    }
                    return filtered;
                });
            }

            return next;
        });
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

    const getTahunPelaksanaan = (): string[] => {
        const lama = Number.parseInt(formData.lama_waktu, 10) || 0;
        return Array.from({ length: lama }, (_, index) => `Tahun ${index + 1}`);
    };

    const isStepOneFieldFilled = (data: FormDataState, key: StepOneFieldKey): boolean => {
        if (key === 'proposal_file' && hasExistingProposal) {
            return true;
        }

        const value = data[key];

        if (value === null || value === undefined) {
            return false;
        }

        if (typeof value === 'string') {
            return value.trim().length > 0;
        }

        if (value instanceof File) {
            return true;
        }

        return Boolean(value);
    };

    const getMissingStepOneFields = (data: FormDataState): StepOneFieldKey[] =>
        STEP_ONE_REQUIREMENTS.filter(({ key }) => key !== 'proposal_file')
            .filter(({ key }) => !isStepOneFieldFilled(data, key))
            .map(({ key }) => key);

    const focusFirstInvalidStepOneField = useCallback((invalidKeys: StepOneFieldKey[]) => {
        if (invalidKeys.length === 0 || typeof window === 'undefined') {
            return;
        }

        const firstKey = invalidKeys[0];

        window.requestAnimationFrame(() => {
            const element = document.querySelector<HTMLElement>(
                `[data-step-one-field="${firstKey}"]`,
            );

            if (!element) {
                return;
            }

            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (typeof element.focus === 'function') {
                element.focus({ preventScroll: true });
                return;
            }

            const focusableChild = element.querySelector<HTMLElement>(
                'input, textarea, select, button, [tabindex]:not([tabindex="-1"])',
            );

            focusableChild?.focus({ preventScroll: true });
        });
    }, []);

    const activeSkema = useMemo(() => {
        return rawSkemaOptions.find((s) => s.uuid === formData.id_skema) ?? null;
    }, [rawSkemaOptions, formData.id_skema]);

    const skemaBudget = useMemo(() => {
        if (!activeSkema) return undefined;
        return {
            min: activeSkema.biaya_minimal ?? null,
            max: activeSkema.biaya_maksimal ?? null,
        };
    }, [activeSkema]);

    const handleNext = () => {
        if (currentStep === 1) {
            const missing = getMissingStepOneFields(formData);

            if (missing.length > 0) {
                setStepOneAttempted(true);
                setStepOneInvalidFields(missing);
                focusFirstInvalidStepOneField(missing);
                return;
            }

            setStepOneInvalidFields([]);
            setStepOneAttempted(false);
        }

        setCurrentStep((prev) => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const addRabItem = (year: number) => {
        setFormData((prev) => {
            const existingItems = prev.rab[year] ?? [];

            return {
                ...prev,
                rab: {
                    ...prev.rab,
                    [year]: [
                        ...existingItems,
                        {
                            id: generateLocalId(),
                            kelompok_id: '',
                            id_komponen: '',
                            nama_item: '',
                            jumlah_item: '',
                            harga_satuan: '',
                            total_biaya: '',
                        },
                    ],
                },
            };
        });
    };

    const updateRabItem = (
        year: number,
        itemId: string,
        field: RabItemEditableField,
        value: string,
    ) => {
        setFormData((prev) => {
            const existingItems = prev.rab[year] ?? [];

            const updatedItems = existingItems.map((item) => {
                if (item.id !== itemId) {
                    return item;
                }

                const nextItem: RabItemForm = {
                    ...item,
                    [field]: value,
                };

                if (field === 'kelompok_id') {
                    nextItem.id_komponen = '';
                }

                if (field === 'jumlah_item' || field === 'harga_satuan') {
                    const jumlah = parseNumber(nextItem.jumlah_item);
                    const harga = parseNumber(nextItem.harga_satuan);

                    if (jumlah !== null && harga !== null) {
                        const calculated = jumlah * harga;
                        nextItem.total_biaya = calculated ? calculated.toString() : '';
                    } else if (nextItem.total_biaya !== '') {
                        nextItem.total_biaya = '';
                    }
                }

                return nextItem;
            });

            return {
                ...prev,
                rab: {
                    ...prev.rab,
                    [year]: updatedItems,
                },
            };
        });
    };

    const removeRabItem = (year: number, itemId: string) => {
        setFormData((prev) => {
            const existingItems = prev.rab[year] ?? [];
            const filteredItems = existingItems.filter((item) => item.id !== itemId);

            return {
                ...prev,
                rab: {
                    ...prev.rab,
                    [year]: filteredItems,
                },
            };
        });
    };

    const rabTotalsByYear = useMemo<Record<number, number>>(() => {
        const totals: Record<number, number> = {};

        Object.entries(formData.rab).forEach(([yearKey, items]) => {
            const year = Number(yearKey);

            if (!Number.isFinite(year)) {
                return;
            }

            const list = items ?? [];
            const total = list.reduce((sum, item) => sum + calculateItemTotal(item), 0);

            if (list.length > 0 || total > 0) {
                totals[year] = total;
            }
        });

        return totals;
    }, [formData.rab]);

    const totalRab = useMemo(() => {
        return Object.values(rabTotalsByYear).reduce((sum, value) => sum + value, 0);
    }, [rabTotalsByYear]);

    const sortedRabYears = useMemo(() => {
        return Object.keys(formData.rab)
            .map((yearKey) => Number(yearKey))
            .filter((year) => Number.isFinite(year))
            .sort((a, b) => a - b);
    }, [formData.rab]);

    const hasRabEntries = useMemo(
        () => sortedRabYears.some((year) => (formData.rab[year]?.length ?? 0) > 0),
        [formData.rab, sortedRabYears],
    );

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
        if (!formData.proposal_file && !hasExistingProposal) {
            window.alert('Mohon unggah file proposal sebelum mengajukan.');
            return;
        }

        const lamaWaktuNumeric = Number.parseInt(formData.lama_waktu, 10);
        const yearsToProcess =
            Number.isFinite(lamaWaktuNumeric) && lamaWaktuNumeric > 0
                ? Math.min(lamaWaktuNumeric, 4)
                : 0;

        const rabPayload =
            yearsToProcess > 0
                ? Array.from({ length: yearsToProcess }, (_, index) => {
                      const year = index + 1;
                      const rawItems = formData.rab[year] ?? [];

                      const sanitizedItems = rawItems
                          .map((item) => {
                              const trimmedName = item.nama_item.trim();

                              if (trimmedName.length === 0) {
                                  return null;
                              }

                              const jumlah = parseNumber(item.jumlah_item);
                              const harga = parseNumber(item.harga_satuan);
                              let total = parseNumber(item.total_biaya);

                              if (total === null && jumlah !== null && harga !== null) {
                                  total = jumlah * harga;
                              }

                              return {
                                  id_komponen: item.id_komponen ? Number(item.id_komponen) : null,
                                  nama_item: trimmedName,
                                  jumlah_item: jumlah,
                                  harga_satuan: harga,
                                  total_biaya: total,
                              };
                          })
                          .filter(
                              (value): value is {
                                  id_komponen: number | null;
                                  nama_item: string;
                                  jumlah_item: number | null;
                                  harga_satuan: number | null;
                                  total_biaya: number | null;
                              } => value !== null,
                          );

                      if (sanitizedItems.length === 0) {
                          return null;
                      }

                      return {
                          tahun: year,
                          items: sanitizedItems,
                      };
                  }).filter(
                      (
                          entry,
                      ): entry is {
                          tahun: number;
                          items: Array<{
                              id_komponen: number | null;
                              nama_item: string;
                              jumlah_item: number | null;
                              harga_satuan: number | null;
                              total_biaya: number | null;
                          }>;
                      } => entry !== null,
                  )
                : [];

        const getYearTotal = (year: number): number | null => {
            const value = rabTotalsByYear[year];
            return typeof value === 'number' ? value : null;
        };

        const payload: Record<string, unknown> = {
            _method: 'put',
            title: formData.judul,
            id_skema: formData.id_skema || null,
            id_tkt: formData.id_tkt || null,
            id_sdg: formData.id_sdg.length > 0 ? formData.id_sdg : null,
            id_fokus: formData.id_fokus || null,
            ringkasan: formData.ringkasan || null,
            biaya_usulan_1: getYearTotal(1),
            biaya_usulan_2: getYearTotal(2),
            biaya_usulan_3: getYearTotal(3),
            biaya_usulan_4: getYearTotal(4),
            tahun: formData.tahun_pengajuan
                ? Number(formData.tahun_pengajuan)
                : null,
            tahun_pelaksanaan: formData.tahun_pelaksanaan
                ? Number(formData.tahun_pelaksanaan)
                : null,
            target_luaran: formData.target_luaran || null,
        };

        if (formData.proposal_file) {
            payload.proposal_file = formData.proposal_file;
        }

        if (formData.lampiran_file) {
            payload.lampiran_file = formData.lampiran_file;
        }

        if (rabPayload.length > 0) {
            payload.rab = rabPayload;
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

        router.post(`/pt-penelitian/${penelitian.uuid}`, payload as Record<string, any>, {
            onSuccess: () => {
                router.visit('/pt-penelitian');
            },
            onError: (errors) => {
                console.error('Gagal mengirim:', errors);
            },
        });
    };

    const tahunPelaksanaan = useMemo(() => getTahunPelaksanaan(), [formData.lama_waktu]);

    const handleClose = () => {
        router.visit('/pt-penelitian');
    };

    const timelineSteps = [
        { number: 1, label: 'Identitas Usulan' },
        { number: 2, label: 'Anggota & RAB' },
        { number: 3, label: 'Dokumen Pendukung' },
        { number: 4, label: 'Konfirmasi Usulan' },
    ] as const;

    const activeTimelineStep = currentStep;

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
                { title: 'Penelitian', href: '/pt-penelitian' },
                { title: 'Ubah Usulan', href: '#' },
            ]}
        >
            <Head title="Ubah Usulan Penelitian" />
            <DashboardNav />
            <div className="fixed inset-0 z-30 bg-gray-900/60 overflow-y-auto py-10">
                <div className="mx-auto max-w-7xl px-4">
                    <div
                        className="relative bg-gray-50 "
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            className="absolute right-4 top-4  bg-white p-2 text-gray-500  hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label="Tutup"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        <div className="px-4 py-6 sm:px-8">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        Ubah Usulan Penelitian
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-600">
                                        Perbarui data menggunakan langkah yang sama seperti saat
                                        mengajukan usulan baru.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white  p-6 mb-6">
                                <div className="flex items-center">
                                    {timelineSteps.map((step, index) => {
                                        const isActive = activeTimelineStep === step.number;
                                        const isCompleted = activeTimelineStep > step.number;
                                        return (
                                            <div key={step.number} className="flex-1 flex items-center">
                                                <div className="flex flex-col items-center w-full">
                                                    <div
                                                        className={`flex h-9 w-9 items-center justify-center  border text-sm font-semibold transition-all ${
                                                            isActive
                                                                ? 'bg-[#1d3b8b] text-white border-[#1d3b8b]'
                                                                : isCompleted
                                                                    ? 'bg-[#e5ebf7] text-[#1d3b8b] border-[#c2cce3]'
                                                                    : 'bg-[#c5ceda] text-white border-[#c5ceda]'
                                                        }`}
                                                    >
                                                        {step.number}
                                                    </div>
                                                    <span className="mt-2 text-xs font-semibold text-gray-700 text-center">
                                                        {step.label}
                                                    </span>
                                                </div>
                                                {index < timelineSteps.length - 1 ? (
                                                    <div
                                                        className={`mx-2 h-0.5 flex-1  ${
                                                            isCompleted ? 'bg-[#1d3b8b]' : 'bg-[#c5ceda]'
                                                        }`}
                                                    />
                                                ) : null}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {currentStep === 1 ? (
                                <StepOneView
                                    formData={formData}
                                    skemaSelectOptions={skemaSelectOptions}
                                    fokusSelectOptions={fokusSelectOptions}
                                    sdgSelectOptions={sdgSelectOptions}
                                    tktSelectOptions={tktSelectOptions}
                                    showStepOneErrors={showStepOneErrors}
                                    hasStepOneError={hasStepOneError}
                                    getStepOneLabel={getStepOneLabel}
                                    onInputChange={handleInputChange}
                                    onFileChange={handleFileChange}
                                    requirements={STEP_ONE_REQUIREMENTS}
                                    existingProposalLabel={penelitian.proposal_filename}
                                    existingLampiranLabel={penelitian.lampiran_filename}
                                    isEditing
                                    onNext={handleNext}
                                />
                            ) : null}

                            {currentStep === 2 ? (
                                <StepTwoView
                                    lamaWaktu={formData.lama_waktu}
                                    rab={formData.rab}
                                    anggotaTim={anggotaTim}
                                    perguruanSelectOptions={perguruanSelectOptions}
                                    dosenSelectOptions={dosenSelectOptions}
                                    komponenSelectOptions={komponenSelectOptions}
                                    rabTotalsByYear={rabTotalsByYear}
                                    totalRab={totalRab}
                                    tahunPelaksanaan={tahunPelaksanaan}
                                    kelompokOptions={kelompokOptions}
                                    kelompokLookup={kelompokLookup}
                                    lockedKetuaDosenUuid={initialKetuaUuid || undefined}
                                    skemaBudget={skemaBudget}
                                    onBack={handleBack}
                                    onNext={handleNext}
                                    onAddAnggota={handleAddAnggota}
                                    onRemoveAnggota={handleRemoveAnggota}
                                    onAnggotaChange={handleAnggotaChange}
                                    addRabItem={addRabItem}
                                    updateRabItem={updateRabItem}
                                    removeRabItem={removeRabItem}
                                />
                            ) : null}

                            {currentStep === 3 ? (
                                <StepDocumentsView
                                    formData={formData}
                                    existingProposalLabel={penelitian.proposal_filename}
                                    existingLampiranLabel={penelitian.lampiran_filename}
                                    onFileChange={handleFileChange}
                                    onBack={handleBack}
                                    onNext={handleNext}
                                />
                            ) : null}

                            {currentStep === 4 ? (
                                <StepThreeView
                                    formData={formData}
                                    rab={formData.rab}
                                    skemaSelectOptions={skemaSelectOptions}
                                    fokusSelectOptions={fokusSelectOptions}
                                    sdgSelectOptions={sdgSelectOptions}
                                    tktSelectOptions={tktSelectOptions}
                                    anggotaTim={anggotaTim}
                                    dosenLookup={dosenLookup}
                                    perguruanLookup={perguruanLookup}
                                    hasRabEntries={hasRabEntries}
                                    sortedRabYears={sortedRabYears}
                                    rabTotalsByYear={rabTotalsByYear}
                                    totalRab={totalRab}
                                    komponenLookup={komponenLookup}
                                    kelompokLookup={kelompokLookup}
                                    parseNumber={parseNumber}
                                    calculateItemTotal={calculateItemTotal}
                                    getOptionLabel={getOptionLabel}
                                    existingProposalLabel={penelitian.proposal_filename}
                                    existingLampiranLabel={penelitian.lampiran_filename}
                                    onBack={handleBack}
                                    onSubmit={handleSubmit}
                                />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}
