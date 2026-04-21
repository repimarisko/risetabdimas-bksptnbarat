import { type StepOneFieldKey, type StepOneRequirement } from './types';

export const STEPS = [
    { number: 1, label: 'Identitas Proposal' },
    { number: 2, label: 'Anggota & RAB' },
    { number: 3, label: 'Konfirmasi & Ajukan' },
] as const;

export const STEP_ONE_REQUIREMENTS: StepOneRequirement[] = [
    { key: 'judul', label: 'Judul Penelitian' },
    { key: 'id_skema', label: 'Skema' },
    { key: 'id_fokus', label: 'Bidang Fokus' },
    { key: 'ringkasan', label: 'Ringkasan Eksekutif' },
    { key: 'id_tkt', label: 'Level TKT' },
    { key: 'lama_waktu', label: 'Lama Waktu Pelaksanaan' },
    { key: 'tahun_pengajuan', label: 'Tahun Pengajuan' },
    { key: 'tahun_pelaksanaan', label: 'Tahun Pelaksanaan' },
    { key: 'proposal_file', label: 'File Unggah Proposal' },
];

export const STEP_ONE_KEYS = STEP_ONE_REQUIREMENTS.map(
    (requirement) => requirement.key,
);

export const STEP_ONE_KEY_SET = new Set<StepOneFieldKey>(STEP_ONE_KEYS);

export const PERAN_OPTIONS: string[] = [
    'Host',
    'Mitra',
    'Peneliti Pendamping',
];
