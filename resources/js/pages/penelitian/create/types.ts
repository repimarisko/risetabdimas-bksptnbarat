export type SkemaOptionPayload = {
    uuid: string;
    nama: string | null;
    nama_singkat: string | null;
    biaya_minimal: number | null;
    biaya_maksimal: number | null;
};

export type FokusOptionPayload = {
    uuid: string;
    fokus: string | null;
};

export type SdgOptionPayload = {
    uuid: string;
    sdg: string | null;
    level: number | null;
};

export type TktOptionPayload = {
    uuid: string;
    tkt: string | null;
    level: number | null;
};

export type DosenOptionPayload = {
    uuid: string;
    nama: string | null;
    nidn: string | null;
    email: string | null;
    uuid_pt: string | null;
};

export type PerguruanOptionPayload = {
    uuid: string;
    nama: string | null;
    nama_singkat: string | null;
};

export type KomponenBiayaOptionPayload = {
    id: number;
    id_komponen_rab: number | null;
    nama_komponen: string | null;
    jenis: string | null;
    keterangan: string | null;
};

export type CreatePageProps = {
    skemaOptions: SkemaOptionPayload[];
    fokusOptions: FokusOptionPayload[];
    sdgOptions: SdgOptionPayload[];
    tktOptions: TktOptionPayload[];
    dosenOptions: DosenOptionPayload[];
    perguruanOptions: PerguruanOptionPayload[];
    komponenOptions: KomponenBiayaOptionPayload[];
    kelompokOptions: RabKelompokOption[];
};

export type RabItemForm = {
    id: string;
    kelompok_id: string;
    id_komponen: string;
    nama_item: string;
    jumlah_item: string;
    harga_satuan: string;
    total_biaya: string;
};

export type RabFormState = Partial<Record<number, RabItemForm[]>>;
export type RabItemEditableField = Exclude<keyof RabItemForm, 'id'>;

export type SelectOption = {
    value: string;
    label: string;
};

export type DosenSelectOption = {
    value: string;
    label: string;
    subtitle?: string | null;
    uuid_pt: string | null;
};

export type TeamMember = {
    uuid_pt: string;
    dosen_uuid: string;
    peran: string;
    tugas: string;
};

export type FormDataState = {
    judul: string;
    id_skema: string;
    id_fokus: string;
    ringkasan: string;
    id_sdg: string[];
    id_tkt: string;
    lama_waktu: string;
    tahun_pengajuan: string;
    tahun_pelaksanaan: string;
    proposal_file: File | null;
    lampiran_file: File | null;
    rab: RabFormState;
    target_luaran: string;
};

export type InputField = Exclude<
    keyof FormDataState,
    'proposal_file' | 'lampiran_file' | 'rab'
>;

export type StepOneFieldKey = Extract<
    keyof FormDataState,
    | 'judul'
    | 'id_skema'
    | 'id_fokus'
    | 'ringkasan'
    | 'id_tkt'
    | 'lama_waktu'
    | 'tahun_pengajuan'
    | 'tahun_pelaksanaan'
    | 'proposal_file'
>;

export type StepOneRequirement = { key: StepOneFieldKey; label: string };

export type KomponenSelectOption = SelectOption & {
    jenis?: string | null;
    kelompokId?: number | null;
};

export type RabKelompokOption = {
    id: number;
    kategori: string;
    nama: string;
};
