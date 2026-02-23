import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import DashboardNav from '@/components/DashboardNav';
import { Head, router, usePage } from '@inertiajs/react';

// --- Type Definitions sama seperti create.tsx ---
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
type KomponenBiayaOptionPayload = {
  id: number;
  nama_komponen: string | null;
  jenis: string | null;
  keterangan: string | null;
};
type RabItemForm = {
  id: string;
  id_komponen: string;
  nama_item: string;
  jumlah_item: string;
  harga_satuan: string;
  total_biaya: string;
};
type RabFormState = Partial<Record<number, RabItemForm[]>>;
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
  rab: RabFormState;
  target_luaran: string;
};
type RabItem = {
  id_komponen: number | null;
  nama_item: string;
  jumlah_item: number | null;
  harga_satuan: number | null;
  total_biaya: number | null;
};
type AnggotaItem = {
  dosen_uuid: string;
  peran: string | null;
  tugas: string | null;
  uuid_pt: string | null;
};
type PenelitianData = {
  uuid: string;
  title: string;
  id_skema: string | null;
  id_fokus: string | null;
  ringkasan: string | null;
  id_sdg: string | null;
  id_tkt: string | null;
  tahun: number | null;
  tahun_pelaksanaan: number | null;
  target_luaran: string | null;
  proposal_filename: string | null;
  lampiran_filename: string | null;
  anggota: AnggotaItem[];
  rab_tahun_1: RabItem[];
  rab_tahun_2: RabItem[];
  rab_tahun_3: RabItem[];
  rab_tahun_4: RabItem[];
};
type EditPageProps = {
  penelitian: PenelitianData;
  skemaOptions: SkemaOptionPayload[];
  fokusOptions: FokusOptionPayload[];
  sdgOptions: SdgOptionPayload[];
  tktOptions: TktOptionPayload[];
  dosenOptions: DosenOptionPayload[];
  perguruanOptions: PerguruanOptionPayload[];
  komponenOptions: KomponenBiayaOptionPayload[];
};

// --- SearchableSelect (helper component) ---
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
    if (!query) return options;
    return options.filter((option) => {
      const labelMatch = option.label.toLowerCase().includes(query);
      const subtitleMatch = (option.subtitle ?? '').toLowerCase().includes(query);
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
            if (disabled) return;
            setOpen(true);
            setInputValue('');
          }}
          onChange={(event) => {
            if (disabled) return;
            setInputValue(event.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-100"
        />
        <button
          type="button"
          onClick={() =>
            !disabled &&
            setOpen((prev) => {
              const next = !prev;
              if (next) setInputValue('');
              return next;
            })
          }
          className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-500"
          tabIndex={-1}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
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
  } = usePage<EditPageProps>().props;

  const [currentStep, setCurrentStep] = useState<number>(1);

  // --- Memoize Options for Selects for consistency & perf
  const skemaSelectOptions = useMemo(
    () =>
      rawSkemaOptions.map((opt) => ({
        value: opt.uuid,
        label: opt.nama_singkat || opt.nama || '-',
      })),
    [rawSkemaOptions],
  );
  const fokusSelectOptions = useMemo(
    () =>
      rawFokusOptions.map((opt) => ({
        value: opt.uuid,
        label: opt.fokus ?? '-',
      })),
    [rawFokusOptions],
  );
  const sdgSelectOptions = useMemo(
    () =>
      rawSdgOptions.map((opt) => ({
        value: opt.uuid,
        label: opt.sdg
          ? `SDG ${opt.level}: ${opt.sdg}`
          : opt.level != null
            ? `SDG ${opt.level}`
            : '-',
      })),
    [rawSdgOptions],
  );
  const tktSelectOptions = useMemo(
    () =>
      rawTktOptions.map((opt) => ({
        value: opt.uuid,
        label:
          opt.tkt
            ? `TKT ${opt.level}: ${opt.tkt}`
            : opt.level
            ? `TKT ${opt.level}`
            : '-',
      })),
    [rawTktOptions],
  );
  const perguruanSelectOptions = useMemo(
    () =>
      rawPerguruanOptions.map((opt) => ({
        value: opt.uuid,
        label: opt.nama_singkat || opt.nama || '-',
        subtitle: opt.nama,
      })),
    [rawPerguruanOptions],
  );
  // For SearchableSelect dosen (dosenSelectOptions must include uuid_pt for filter)
  const dosenSelectOptions = useMemo(
    () =>
      rawDosenOptions.map((dosen) => ({
        value: dosen.uuid,
        label: dosen.nama ?? dosen.email ?? '-',
        subtitle: dosen.nidn ?? dosen.email ?? undefined,
        uuid_pt: dosen.uuid_pt ?? '',
      })),
    [rawDosenOptions],
  );
  // Komponen select options
  const komponenSelectOptions = useMemo(
    () =>
      rawKomponenOptions.map((x) => ({
        value: String(x.id),
        label: x.nama_komponen ?? '-',
      })),
    [rawKomponenOptions]
  );
  // fast lookup: { [id_komponen as string]: nama_komponen }
  const komponenLookup = useMemo(() => {
    const lookup: Record<string, string> = {};
    rawKomponenOptions.forEach((x) => {
      if (x.id != null) lookup[String(x.id)] = x.nama_komponen ?? '-';
    });
    return lookup;
  }, [rawKomponenOptions]);
  // For confirmation table
  const dosenLookup = useMemo(() => {
    const obj: Record<string, DosenOptionPayload> = {};
    rawDosenOptions.forEach((d) => {
      obj[d.uuid] = d;
    });
    return obj;
  }, [rawDosenOptions]);
  const perguruanLookup = useMemo(() => {
    const obj: Record<string, PerguruanOptionPayload> = {};
    rawPerguruanOptions.forEach((x) => {
      obj[x.uuid] = x;
    });
    return obj;
  }, [rawPerguruanOptions]);

  // --- State ---
  // Initialize form data dari penelitian yang ada
  const [formData, setFormData] = useState<FormDataState>(() => {
    // Hitung lama waktu dari RAB yang ada
    const lamaWaktu = [
      penelitian.rab_tahun_1,
      penelitian.rab_tahun_2,
      penelitian.rab_tahun_3,
      penelitian.rab_tahun_4,
    ].filter((rab) => rab && rab.length > 0).length;

    return {
      judul: penelitian.title || '',
      id_skema: penelitian.id_skema || '',
      id_fokus: penelitian.id_fokus || '',
      ringkasan: penelitian.ringkasan || '', // Tidak ada di data lama. Saat edit, dikosongkan jika null.
      id_sdg: penelitian.id_sdg || '',
      id_tkt: penelitian.id_tkt || '',
      lama_waktu: lamaWaktu > 0 ? lamaWaktu.toString() : '',
      tahun_pengajuan: penelitian.tahun ? penelitian.tahun.toString() : '',
      tahun_pelaksanaan: penelitian.tahun_pelaksanaan
        ? penelitian.tahun_pelaksanaan.toString()
        : '',
      proposal_file: null,
      lampiran_file: null,
      rab: {} as RabFormState,
      target_luaran: penelitian.target_luaran || '',
    };
  });
  // Anggota
  const [anggotaTim, setAnggotaTim] = useState<TeamMember[]>(() => {
    return penelitian.anggota.map((anggota) => ({
      uuid_pt: anggota.uuid_pt || '',
      dosen_uuid: anggota.dosen_uuid,
      peran: anggota.peran || '',
      tugas: anggota.tugas || '',
    }));
  });
  // For error/validation in step one
  const [stepOneInvalidFields, setStepOneInvalidFields] = useState<string[]>([]);
  const [stepOneAttempted, setStepOneAttempted] = useState(false);

  // --- RAB: Initialize dari data penelitian ---
  useEffect(() => {
    const initialRab: RabFormState = {};
    [1, 2, 3, 4].forEach((year) => {
      const rabKey = `rab_tahun_${year}` as keyof PenelitianData;
      const rabData = penelitian[rabKey];
      if (rabData && Array.isArray(rabData) && rabData.length > 0) {
        const rabItems = rabData as RabItem[];
        initialRab[year] = rabItems.map((item) => ({
          id: generateLocalId(),
          id_komponen: item.id_komponen ? item.id_komponen.toString() : '',

          
          nama_item: item.nama_item || '',
          jumlah_item: item.jumlah_item ? item.jumlah_item.toString() : '',
          harga_satuan: item.harga_satuan ? item.harga_satuan.toString() : '',
          total_biaya: item.total_biaya ? item.total_biaya.toString() : '',
        }));
      }
    });
    setFormData((prev) => ({
      ...prev,
      rab: initialRab,
    }));
  }, [penelitian]);

  // --- Helper Functions ---
  const parseNumber = (value: string): number | null => {
    if (value === undefined || value === null) return null;
    const trimmed = value.toString().trim();
    if (trimmed === '') return null;
    const normalized = trimmed.replace(/,/g, '');
    const parsed = Number(normalized);
    return Number.isFinite(parsed) ? parsed : null;
  };
  const calculateItemTotal = (item: RabItemForm): number => {
    const explicitTotal = parseNumber(item.total_biaya);
    if (explicitTotal !== null) return explicitTotal;
    const jumlah = parseNumber(item.jumlah_item);
    const harga = parseNumber(item.harga_satuan);
    if (jumlah !== null && harga !== null) return jumlah * harga;
    return 0;
  };
  const getOptionLabel = (options: Array<{ value: string; label: string }>, value: string) => {
    return options.find((x) => x.value === value)?.label || '-';
  };

  // --- Step Wizard ---
  const steps = [
    { number: 1, label: 'Identitas Proposal' },
    { number: 2, label: 'Anggota & RAB' },
    { number: 3, label: 'Konfirmasi' },
  ];

  // --- Step One (Validasi) ---
  const STEP_ONE_REQUIREMENTS = [
    { key: 'judul', label: 'Judul Penelitian' },
    { key: 'id_skema', label: 'Skema' },
    { key: 'id_fokus', label: 'Bidang Fokus' },
    { key: 'ringkasan', label: 'Ringkasan Eksekutif' },
    { key: 'id_tkt', label: 'Level TKT' },
    { key: 'lama_waktu', label: 'Lama Waktu Pelaksanaan' },
    { key: 'tahun_pengajuan', label: 'Tahun Pengajuan' },
    { key: 'tahun_pelaksanaan', label: 'Tahun Pelaksanaan' },
    { key: 'proposal_file', label: 'Unggah Proposal' },
  ];
  const hasStepOneError = (key: string) => stepOneInvalidFields.includes(key);
  const getStepOneLabel = (key: string) =>
    STEP_ONE_REQUIREMENTS.find((x) => x.key === key)?.label ?? key;

  const showStepOneErrors = stepOneAttempted && stepOneInvalidFields.length > 0;

  // --- Handlers for input changes ---
  const handleInputChange = (field: keyof FormDataState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleFileChange = (field: 'proposal_file' | 'lampiran_file', value: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Anggota Tim Handlers ---
  const peranOptions = [
    'Ketua Peneliti',
    'Anggota Peneliti',
    'Peneliti Pendamping',
  ];
  const handleAddAnggota = () => {
    setAnggotaTim((prev) => [
      ...prev,
      {
        uuid_pt: '',
        dosen_uuid: '',
        peran: '',
        tugas: '',
      },
    ]);
  };
  const handleAnggotaChange = (
    index: number,
    field: keyof TeamMember,
    value: string,
  ) => {
    setAnggotaTim((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      // Reset dosen_uuid jika uuid_pt diganti
      if (field === 'uuid_pt') {
        next[index].dosen_uuid = '';
      }
      return next;
    });
  };
  const handleRemoveAnggota = (index: number) => {
    setAnggotaTim((prev) => prev.filter((_, i) => i !== index));
  };

  // --- RAB Handlers ---
  const addRabItem = (tahun: number) => {
    setFormData((prev) => {
      const currentTahunItems = prev.rab[tahun] ?? [];
      return {
        ...prev,
        rab: {
          ...prev.rab,
          [tahun]: [
            ...currentTahunItems,
            {
              id: generateLocalId(),
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
    tahun: number,
    itemId: string,
    field: keyof RabItemForm,
    value: string,
  ) => {
    setFormData((prev) => {
      const items = prev.rab[tahun] ?? [];
      return {
        ...prev,
        rab: {
          ...prev.rab,
          [tahun]: items.map((item) => {
            if (item.id !== itemId) return item;
  
            const nextItem: RabItemForm = { ...item, [field]: value };
  
            // Auto-hitung total_biaya saat jumlah atau harga berubah
            if (field === 'jumlah_item' || field === 'harga_satuan') {
              const jumlah = parseNumber(nextItem.jumlah_item);
              const harga = parseNumber(nextItem.harga_satuan);
  
              if (jumlah !== null && harga !== null) {
                const calculated = jumlah * harga;
                nextItem.total_biaya = calculated ? calculated.toString() : '';
              } else {
                nextItem.total_biaya = '';
              }
            }
  
            return nextItem;
          }),
        },
      };
    });
  };
  const removeRabItem = (tahun: number, itemId: string) => {
    setFormData((prev) => {
      const items = prev.rab[tahun] ?? [];
      return {
        ...prev,
        rab: {
          ...prev.rab,
          [tahun]: items.filter((item) => item.id !== itemId),
        },
      };
    });
  };

  // --- Get Array Tahun Pelaksanaan string ['Tahun 1', ...]
  const getTahunPelaksanaan = () => {
    const lama = parseInt(formData.lama_waktu || '0');
    if (!lama || lama < 1) return [];
    return Array.from({ length: Math.min(lama, 4) }, (_, i) => `Tahun ${i + 1}`);
  };

  // --- RAB Totals (by year & overall). Compute on every render.
  const rabTotalsByYear = useMemo(() => {
    const totals: Record<number, number> = {};
    [1, 2, 3, 4].forEach((year) => {
      const items = formData.rab[year] ?? [];
      totals[year] = items.reduce((sum, item) => {
        return sum + (calculateItemTotal(item) || 0);
      }, 0);
    });
    return totals;
  }, [formData.rab]);
  const totalRab = useMemo(() => {
    return [1, 2, 3, 4].reduce((sum, year) => sum + (rabTotalsByYear[year] || 0), 0);
  }, [rabTotalsByYear]);

  // --- Sorted RAB Year Indices for konfirmasi table ---
  const sortedRabYears = useMemo(() => {
    const lama = parseInt(formData.lama_waktu || '0');
    return Array.from({ length: Math.min(lama, 4) }, (_, i) => i + 1);
  }, [formData.lama_waktu]);
  const hasRabEntries = useMemo(
    () =>
      Object.values(formData.rab).some(
        (arr) => Array.isArray(arr) && arr.length > 0,
      ),
    [formData.rab]
  );

  // --- Navigasi Step Next/Back ---
  const validateStepOne = () => {
    // Cek required fields
    const invalidKeys: string[] = [];
    for (const req of STEP_ONE_REQUIREMENTS) {
      if (req.key === 'proposal_file') {
        // File upload wajib bila tidak ada file lama
        if (!formData.proposal_file && !penelitian.proposal_filename) {
          invalidKeys.push(req.key);
        }
      } else if (!formData[req.key as keyof FormDataState] || formData[req.key as keyof FormDataState]?.toString().trim() === '') {
        invalidKeys.push(req.key);
      }
    }
    setStepOneInvalidFields(invalidKeys);
    setStepOneAttempted(true);
    return invalidKeys.length === 0;
  };

  const handleNext = () => {
    // Validasi pada step 1
    if (currentStep === 1) {
      if (validateStepOne()) {
        setCurrentStep((prev) => prev + 1);
      }
    } else if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // --- SUBMIT (PUT) ---
  const handleSubmit = () => {
    const lamaWaktuNumeric = Number.parseInt(formData.lama_waktu, 10);
    const yearsToProcess =
      Number.isFinite(lamaWaktuNumeric) && lamaWaktuNumeric > 0
        ? Math.min(lamaWaktuNumeric, 4)
        : 0;

    // Proses RAB Payload per tahun
    const rabPayload =
      yearsToProcess > 0
        ? Array.from({ length: yearsToProcess }, (_, index) => {
            const year = index + 1;
            const rawItems = formData.rab[year] ?? [];
            const sanitizedItems = rawItems
              .map((item) => {
                const trimmedName = item.nama_item.trim();
                if (trimmedName.length === 0) return null;
                const jumlah = parseNumber(item.jumlah_item);
                const harga = parseNumber(item.harga_satuan);
                let total = parseNumber(item.total_biaya);
                if (total === null && jumlah !== null && harga !== null) {
                  total = jumlah * harga;
                }
                return {
                  id_komponen: item.id_komponen
                    ? Number(item.id_komponen)
                    : null,
                  nama_item: trimmedName,
                  jumlah_item: jumlah,
                  harga_satuan: harga,
                  total_biaya: total,
                };
              })
              .filter((value) => value !== null);
            if (sanitizedItems.length === 0) return null;
            return {
              tahun: year,
              items: sanitizedItems,
            };
          }).filter((entry) => entry !== null)
        : [];

    // Untuk biaya_usulan per tahun
    const rabTotals: Record<number, number> = {};
    rabPayload.forEach((entry: any) => {
      if (entry) {
        rabTotals[entry.tahun] = entry.items.reduce(
          (sum: number, item: any) => sum + (item.total_biaya ?? 0),
          0,
        );
      }
    });
    const getYearTotal = (year: number): number | null => {
      const value = rabTotals[year];
      return typeof value === 'number' ? value : null;
    };

    const payload: Record<string, any> = {
      title: formData.judul,
      id_skema: formData.id_skema || null,
      id_tkt: formData.id_tkt || null,
      id_sdg: formData.id_sdg || null,
      id_fokus: formData.id_fokus || null,
      biaya_usulan_1: getYearTotal(1),
      biaya_usulan_2: getYearTotal(2),
      biaya_usulan_3: getYearTotal(3),
      biaya_usulan_4: getYearTotal(4),
      tahun: formData.tahun_pengajuan ? Number(formData.tahun_pengajuan) : null,
      tahun_pelaksanaan: formData.tahun_pelaksanaan
        ? Number(formData.tahun_pelaksanaan)
        : null,
      target_luaran: formData.target_luaran || null,
      ringkasan: formData.ringkasan || null,
      _method: 'PUT',
    };

    // File upload opsional: hanya kirim jika ada file baru
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

    router.post(`/pt-penelitian/${penelitian.uuid}`, payload, {
      onSuccess: () => {
        setCurrentStep(4);
      },
      onError: (errors) => {
        console.error('Gagal update:', errors);
      },
    });
  };

  // --- UI ---
  return (
    <AppHeaderLayout
      breadcrumbs={[
        { title: 'Dashboard Dosen', href: '/dashboard/dosen' },
        { title: 'Penelitian', href: '/pt-penelitian' },
        { title: 'Edit', href: '#' },
      ]}
    >
      <Head title="Edit Proposal Penelitian" />
      <DashboardNav />
      <div className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-10">
          {/* Langkah Wizard */}
          {currentStep !== 4 && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
              <div className="flex items-center justify-between mb-8">
                {steps.map((step, idx) => (
                  <div key={step.number} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                          currentStep > step.number
                            ? 'bg-green-500 text-white'
                            : currentStep === step.number
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {currentStep > step.number ? <Check size={20} /> : step.number}
                      </div>
                      <span
                        className={`mt-2 text-xs font-medium ${
                          currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 transition-all ${
                          currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Step 1 */}
          {currentStep === 1 && (
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
                    onChange={(e) => handleInputChange('judul', e.target.value)}
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
                      onChange={(e) => handleInputChange('id_skema', e.target.value)}
                      data-step-one-field="id_skema"
                      aria-invalid={showStepOneErrors && hasStepOneError('id_skema')}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        showStepOneErrors && hasStepOneError('id_skema')
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : ''
                      }`}
                    >
                      <option value="">Pilih skema...</option>
                      {skemaSelectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
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
                      onChange={(e) => handleInputChange('id_fokus', e.target.value)}
                      data-step-one-field="id_fokus"
                      aria-invalid={showStepOneErrors && hasStepOneError('id_fokus')}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        showStepOneErrors && hasStepOneError('id_fokus')
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : ''
                      }`}
                    >
                      <option value="">Pilih bidang fokus...</option>
                      {fokusSelectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
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
                    onChange={(e) => handleInputChange('ringkasan', e.target.value)}
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
                      data-step-one-field="id_tkt"
                      aria-invalid={showStepOneErrors && hasStepOneError('id_tkt')}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        showStepOneErrors && hasStepOneError('id_tkt')
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : ''
                      }`}
                    >
                      <option value="">Pilih TKT...</option>
                      {tktSelectOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
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
                      data-step-one-field="lama_waktu"
                      aria-invalid={showStepOneErrors && hasStepOneError('lama_waktu')}
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
                      onChange={(e) => handleInputChange('tahun_pengajuan', e.target.value)}
                      data-step-one-field="tahun_pengajuan"
                      aria-invalid={showStepOneErrors && hasStepOneError('tahun_pengajuan')}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        showStepOneErrors && hasStepOneError('tahun_pengajuan')
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : ''
                      }`}
                    >
                      <option value="">Pilih tahun</option>
                      <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
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
                      onChange={(e) => handleInputChange('tahun_pelaksanaan', e.target.value)}
                      data-step-one-field="tahun_pelaksanaan"
                      aria-invalid={showStepOneErrors && hasStepOneError('tahun_pelaksanaan')}
                      className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${
                        showStepOneErrors && hasStepOneError('tahun_pelaksanaan')
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : ''
                      }`}
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
                    {showStepOneErrors && hasStepOneError('tahun_pelaksanaan') ? (
                      <p className="mt-2 text-sm text-red-600">
                        {getStepOneLabel('tahun_pelaksanaan')} wajib dipilih.
                      </p>
                    ) : null}
                  </div>
                </div>
                {/* --- Proposal file upload (show info filename lama) --- */}
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
                          {formData.proposal_file
                            ? formData.proposal_file.name
                            : penelitian.proposal_filename
                            ? (
                                <>
                                  <strong className="text-green-600">
                                    {penelitian.proposal_filename}
                                  </strong>
                                  {' '}
                                  <span className="italic text-xs text-gray-400">(file lama)</span>
                                </>
                              )
                            : 'Klik untuk mengunggah atau drag and drop'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Maks. 10MB)</p>
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
                          {formData.lampiran_file
                            ? formData.lampiran_file.name
                            : penelitian.lampiran_filename
                            ? (
                                <>
                                  <strong className="text-green-600">
                                    {penelitian.lampiran_filename}
                                  </strong>
                                  <span className="italic text-xs text-gray-400 ml-1">(file lama)</span>
                                </>
                              )
                            : 'Klik untuk mengunggah lampiran pendukung'}
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
          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Anggota Penelitian & RAB</h2>
              <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                Anggota selain ketua akan menerima permintaan persetujuan keikutsertaan. Proposal hanya dapat diajukan setelah seluruh anggota menyetujui permintaan tersebut.
              </div>
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
                {/* --- RAB --- */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rencana Anggaran Biaya (RAB)</h3>
                  {!formData.lama_waktu ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <p className="text-gray-500">Silakan isi lama waktu pelaksanaan di langkah sebelumnya terlebih dahulu.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {getTahunPelaksanaan().map((label, index) => {
                        const year = index + 1;
                        const items = formData.rab[year] ?? [];
                        const yearTotal = rabTotalsByYear[year] ?? 0;
                        const hasItems = items.length > 0;
                        return (
                          <div key={year} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <h4 className="text-base font-semibold text-gray-900">{`RAB ${label}`}</h4>
                                <p className="text-sm text-gray-500">
                                  Catat rincian kebutuhan biaya untuk tahun ini per komponen.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => addRabItem(year)}
                                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                              >
                                + Tambah Baris
                              </button>
                            </div>
                            {hasItems ? (
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-gray-900">
                                  <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                    <tr>
                                      <th className="px-4 py-3 text-left">Komponen</th>
                                      <th className="px-4 py-3 text-left">Nama Item</th>
                                      <th className="px-4 py-3 text-left">Jumlah</th>
                                      <th className="px-4 py-3 text-left">Harga Satuan</th>
                                      <th className="px-4 py-3 text-left">Total Biaya</th>
                                      <th className="px-4 py-3 text-left">Aksi</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-200">
                                    {items.map((item) => (
                                      <tr key={item.id}>
                                        <td className="px-4 py-3">
                                          <select
                                            value={item.id_komponen}
                                            onChange={(event) =>
                                              updateRabItem(year, item.id, 'id_komponen', event.target.value)
                                            }
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                          >
                                            <option value="">Pilih komponen...</option>
                                            {komponenSelectOptions.map((option) => (
                                              <option key={option.value} value={option.value}>
                                                {option.label}
                                              </option>
                                            ))}
                                          </select>
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="text"
                                            value={item.nama_item}
                                            onChange={(event) =>
                                              updateRabItem(year, item.id, 'nama_item', event.target.value)
                                            }
                                            placeholder="Contoh: Honor ketua peneliti"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="number"
                                            min="0"
                                            step="any"
                                            value={item.jumlah_item}
                                            onChange={(event) =>
                                              updateRabItem(year, item.id, 'jumlah_item', event.target.value)
                                            }
                                            placeholder="0"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="number"
                                            min="0"
                                            step="any"
                                            value={item.harga_satuan}
                                            onChange={(event) =>
                                              updateRabItem(year, item.id, 'harga_satuan', event.target.value)
                                            }
                                            placeholder="0"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <input
                                            type="number"
                                            readOnly
                                            min="0"
                                            step="any"
                                            value={item.total_biaya}
                                            onChange={(event) =>
                                              updateRabItem(year, item.id, 'total_biaya', event.target.value)
                                            }
                                            placeholder="0"
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                          />
                                        </td>
                                        <td className="px-4 py-3">
                                          <button
                                            type="button"
                                            onClick={() => removeRabItem(year, item.id)}
                                            className="rounded-md border border-red-200 px-3 py-1 text-sm text-red-600 transition hover:bg-red-50"
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
                              <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center text-sm text-gray-500">
                                Belum ada baris anggaran. Klik tombol &quot;Tambah Baris&quot; untuk menambahkan komponen biaya.
                              </div>
                            )}
                            <div className="mt-4 flex justify-end text-sm">
                              <span className="font-medium text-gray-700">Total {label}:</span>
                              <span className="ml-2 font-semibold text-gray-900">
                                Rp {yearTotal.toLocaleString('id-ID')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
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
          {/* Step 3 (Konfirmasi dan Submit) */}
          {currentStep === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Konfirmasi & Perbarui Proposal</h2>
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
                      <span className="flex-1 text-gray-900">
                        {formData.proposal_file?.name ||
                          penelitian.proposal_filename ||
                          '-'}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-48 font-medium text-gray-700">Lampiran:</span>
                      <span className="flex-1 text-gray-900">
                        {formData.lampiran_file?.name ||
                          penelitian.lampiran_filename ||
                          '-'}
                      </span>
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
                  {!hasRabEntries ? (
                    <p className="text-sm text-gray-500">Belum ada data RAB.</p>
                  ) : (
                    <div className="space-y-4">
                      {sortedRabYears.map((year) => {
                        const items = formData.rab[year] ?? [];
                        if (!items.length) return null;
                        const label = `Tahun ${year}`;
                        const yearTotal = rabTotalsByYear[year] ?? 0;
                        return (
                          <div
                            key={year}
                            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
                          >
                            <div className="mb-3 flex items-center justify-between">
                              <h4 className="text-sm font-semibold text-gray-900">{`RAB ${label}`}</h4>
                              <span className="text-sm font-semibold text-indigo-600">
                                Rp {yearTotal.toLocaleString('id-ID')}
                              </span>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="min-w-full text-sm text-gray-900">
                                <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
                                  <tr>
                                    <th className="px-4 py-2 text-left">Komponen</th>
                                    <th className="px-4 py-2 text-left">Nama Item</th>
                                    <th className="px-4 py-2 text-left">Jumlah</th>
                                    <th className="px-4 py-2 text-left">Harga Satuan</th>
                                    <th className="px-4 py-2 text-left">Total Biaya</th>
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
                                          {komponenLookup[item.id_komponen] ?? '-'}
                                        </td>
                                        <td className="px-4 py-2">{item.nama_item || '-'}</td>
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
                      <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-700">Total RAB Keseluruhan</span>
                          <span className="text-indigo-700">
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
                        Dengan memperbarui proposal ini, saya menyatakan bahwa:
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
                  Perbarui Proposal
                </button>
              </div>
            </div>
          )}
          {/* Step 4: Sukses */}
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
                Proposal Berhasil Diperbarui!
              </h2>
              <p className="text-gray-600 mb-8">
                Proposal penelitian Anda telah berhasil diperbarui.
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
                      rab: {} as RabFormState,
                      target_luaran: '',
                    });
                    setAnggotaTim([]);
                    setStepOneInvalidFields([]);
                    setStepOneAttempted(false);
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Buat Proposal Baru
                </button>
                <button
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                  onClick={() => router.visit('/pt-penelitian')}
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
