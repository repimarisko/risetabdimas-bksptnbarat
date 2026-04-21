import DashboardNav from '@/components/DashboardNav';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { FileText, Download, BookOpen, Users, Calculator, File } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type RabItem = {
    uuid: string;
    nama_item: string;
    jumlah_item: number;
    harga_satuan: number;
    total_biaya: number;
    nama_komponen_rab: string | null;
};

type Anggota = {
    nama_lengkap: string;
    nuptk: string;
    nidn: string;
    peran: string;
    tugas: string | null;
    nama_pt: string | null;
};

type Ketua = {
    dosen_uuid: string;
    nidn: string;
    nama_lengkap: string;
    nuptk: string;
    nama_pt: string | null;
};

type Penelitian = {
    uuid: string;
    title: string;
    tahun: number;
    tahun_pelaksanaan: number;
    ringkasan: string | null;
    nama_skema: string;
    tkt: string;
    level_tkt: number;
    sdgs: { uuid: string; sdg: string; level: number }[];
    fokus: string;
    created_at: string;
    proposal_path: string | null;
    proposal_filename: string | null;
    lampiran_path: string | null;
    lampiran_filename: string | null;
    proposal_url: string | null;
    lampiran_url: string | null;
    ketua: Ketua | null;
    anggota: Anggota[];
    rab_tahun_1: RabItem[];
    rab_tahun_2: RabItem[];
    rab_tahun_3: RabItem[];
    rab_tahun_4: RabItem[];
};

type PageProps = { penelitian: Penelitian };
type TabKey = 'informasi' | 'tim' | 'rab' | 'dokumen';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const formatRupiah = (v: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v);

// ─── Sub Components ───────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div>
            <p className="text-xs text-gray-400 mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-gray-800">{value || '-'}</p>
        </div>
    );
}

function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'gray' }) {
    if (color === 'blue') {
        return (
            <span
                className="inline-flex items-center px-2 py-0.5 text-xs font-semibold border"
                style={{ backgroundColor: '#eef0f7', color: '#182e6b', borderColor: '#d4daf0' }}
            >
                {children}
            </span>
        );
    }
    return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold border bg-gray-100 text-gray-600 border-gray-200">
            {children}
        </span>
    );
}

// ─── RAB Table ────────────────────────────────────────────────────────────────

function RabTable({ tahun, items }: { tahun: number; items: RabItem[] }) {
    if (!items.length) return null;
    const total = items.reduce((s, i) => s + i.total_biaya, 0);
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-800">Tahun {tahun}</h3>
                <span
                    className="text-xs font-semibold px-2 py-0.5 border"
                    style={{ color: '#182e6b', backgroundColor: '#eef0f7', borderColor: '#d4daf0' }}
                >
                    {formatRupiah(total)}
                </span>
            </div>
            <div className="overflow-x-auto border border-gray-200">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200">
                            <th className="px-4 py-2.5 text-left w-8">No</th>
                            <th className="px-4 py-2.5 text-left">Komponen</th>
                            <th className="px-4 py-2.5 text-left">Nama Item</th>
                            <th className="px-4 py-2.5 text-right">Jumlah</th>
                            <th className="px-4 py-2.5 text-right">Harga Satuan</th>
                            <th className="px-4 py-2.5 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, i) => (
                            <tr key={item.uuid} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-2.5 text-gray-400 text-xs">{i + 1}</td>
                                <td className="px-4 py-2.5 text-gray-500">{item.nama_komponen_rab ?? '-'}</td>
                                <td className="px-4 py-2.5 font-medium text-gray-800">{item.nama_item}</td>
                                <td className="px-4 py-2.5 text-right text-gray-600">{item.jumlah_item}</td>
                                <td className="px-4 py-2.5 text-right text-gray-600">{formatRupiah(item.harga_satuan)}</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-gray-800">{formatRupiah(item.total_biaya)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── File Card ────────────────────────────────────────────────────────────────

function FileCard({ label, filename, url }: { label: string; filename: string | null; url: string | null }) {
    return (
        <div className="border border-gray-200 bg-white p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 bg-red-50 text-red-400 shrink-0">
                    <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-medium text-gray-700 truncate">
                        {filename ?? `${label.toLowerCase()}.pdf`}
                    </p>
                </div>
            </div>

            {url ? (
                <a
                    href={url}
                    download={filename ?? undefined}
                    className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: '#182e6b' }}
                >
                    <Download className="w-3.5 h-3.5" />
                    Download
                </a>
            ) : (
                <Badge color="gray">Belum Ada</Badge>
            )}
        </div>
    );
}

// ─── Tabs Config ──────────────────────────────────────────────────────────────

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'informasi', label: 'Informasi',  icon: BookOpen   },
    { key: 'tim',       label: 'Tim',        icon: Users      },
    { key: 'rab',       label: 'RAB',        icon: Calculator },
    { key: 'dokumen',   label: 'Dokumen',    icon: File       },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PenugasanReviewDetail() {
    const { penelitian } = usePage<PageProps>().props;
    const [activeTab, setActiveTab] = useState<TabKey>('informasi');

    const allRab = [
        { tahun: 1, items: penelitian.rab_tahun_1 ?? [] },
        { tahun: 2, items: penelitian.rab_tahun_2 ?? [] },
        { tahun: 3, items: penelitian.rab_tahun_3 ?? [] },
        { tahun: 4, items: penelitian.rab_tahun_4 ?? [] },
    ].filter(r => r.items.length > 0);

    const grandTotal = allRab.reduce(
        (sum, r) => sum + r.items.reduce((s, i) => s + i.total_biaya, 0), 0,
    );

    return (
        <AppHeaderLayout
            breadcrumbs={[
                { title: 'Dashboard',        href: '/dashboard' },
                { title: 'Penugasan Review', href: '/reviewer/pt-penelitian/penugasan' },
                { title: 'Detail',           href: '#' },
            ]}
        >
            <Head title="Detail Penelitian" />
            <DashboardNav />

            <div className="bg-gray-50">
                <div className="mx-auto px-4 py-8 space-y-5">

                    {/* ── Header ── */}
                    <div className="bg-white border border-gray-200 px-6 py-5">
                        <div className="flex items-start gap-4">
                            <div className="p-2.5 shrink-0 mt-0.5" style={{ backgroundColor: '#eef0f7', color: '#182e6b' }}>
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <Badge color="blue">{penelitian.nama_skema}</Badge>
                                </div>
                                <h1 className="text-base font-bold text-gray-900 leading-snug">{penelitian.title}</h1>
                                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                                    <span>Tahun Pengajuan: <strong className="text-gray-700">{penelitian.tahun}</strong></span>
                                    <span>Tahun Pelaksanaan: <strong className="text-gray-700">{penelitian.tahun_pelaksanaan}</strong></span>
                                    {penelitian.ketua && (
                                        <span>Ketua: <strong className="text-gray-700">{penelitian.ketua.nama_lengkap}</strong></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Tabs ── */}
                    <div className="bg-white border border-gray-200">
                        <div className="flex border-b border-gray-200">
                            {TABS.map(tab => {
                                const Icon = tab.icon;
                                const active = activeTab === tab.key;
                                return (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 -mb-px"
                                        style={
                                            active
                                                ? { borderColor: '#182e6b', color: '#182e6b' }
                                                : { borderColor: 'transparent', color: '#9ca3af' }
                                        }
                                    >
                                        <Icon className="w-4 h-4" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="p-6">

                            {/* ── Informasi ── */}
                            {activeTab === 'informasi' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-5">
                                        <InfoRow label="Skema"             value={penelitian.nama_skema} />
                                        <InfoRow label="Fokus Penelitian"  value={penelitian.fokus} />
                                        <InfoRow label="TKT"               value={`TKT ${penelitian.level_tkt} — ${penelitian.tkt}`} />
                                        <InfoRow label="SDG"               value={penelitian.sdgs?.map(s => `SDG ${s.level ?? '—'} — ${s.sdg}`).join(', ') ?? 'Belum ditentukan'} />
                                        <InfoRow label="Tahun Pengajuan"   value={penelitian.tahun} />
                                        <InfoRow label="Tahun Pelaksanaan" value={penelitian.tahun_pelaksanaan} />
                                    </div>
                                    {penelitian.ringkasan && (
                                        <div className="border-t border-gray-100 pt-5">
                                            <p className="text-xs text-gray-400 mb-2">Ringkasan</p>
                                            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                                                {penelitian.ringkasan}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* ── Tim ── */}
                            {activeTab === 'tim' && (
                                <div className="space-y-6">
                                    {penelitian.ketua && (
                                        <div>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Host</p>
                                            <div
                                                className="grid grid-cols-2 md:grid-cols-4 gap-5 p-4 border"
                                                style={{ backgroundColor: '#eef0f7', borderColor: '#d4daf0' }}
                                            >
                                                <InfoRow label="Nama"             value={penelitian.ketua.nama_lengkap} />
                                                <InfoRow label="NIDN"             value={penelitian.ketua.nidn} />
                                                <InfoRow label="NUPTK"            value={penelitian.ketua.nuptk} />
                                                <InfoRow label="Perguruan Tinggi" value={penelitian.ketua.nama_pt} />
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Anggota Tim</p>
                                        <div className="border border-gray-200 overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                    <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide border-b border-gray-200">
                                                        <th className="px-4 py-2.5 text-left w-8">No</th>
                                                        <th className="px-4 py-2.5 text-left">Nama</th>
                                                        <th className="px-4 py-2.5 text-left">NIDN</th>
                                                        <th className="px-4 py-2.5 text-left">Perguruan Tinggi</th>
                                                        <th className="px-4 py-2.5 text-left">Peran</th>
                                                        <th className="px-4 py-2.5 text-left">Tugas</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {!(penelitian.anggota ?? []).length ? (
                                                        <tr>
                                                            <td colSpan={6} className="px-4 py-6 text-center text-gray-400 italic text-xs">
                                                                Tidak ada data anggota
                                                            </td>
                                                        </tr>
                                                    ) : (
                                                        (penelitian.anggota ?? []).map((a, i) => (
                                                            <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                                                <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                                                                <td className="px-4 py-3 font-medium text-gray-800">{a.nama_lengkap}</td>
                                                                <td className="px-4 py-3 text-gray-500">{a.nidn || '-'}</td>
                                                                <td className="px-4 py-3 text-gray-500">{a.nama_pt || '-'}</td>
                                                                <td className="px-4 py-3 text-gray-500">
                                                                {a.peran || '-'}
                                                                </td>
                                                                <td className="px-4 py-3 text-gray-500">{a.tugas || '-'}</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── RAB ── */}
                            {activeTab === 'rab' && (
                                <div className="space-y-8">
                                    {!allRab.length ? (
                                        <p className="text-sm text-gray-400 italic">Tidak ada data RAB.</p>
                                    ) : (
                                        <>
                                            {allRab.map(r => (
                                                <RabTable key={r.tahun} tahun={r.tahun} items={r.items} />
                                            ))}
                                            <div className="flex justify-end pt-4 border-t border-gray-200">
                                                <div
                                                    className="flex items-center gap-3 px-5 py-2.5 text-white"
                                                    style={{ backgroundColor: '#182e6b' }}
                                                >
                                                    <span className="text-xs font-semibold uppercase tracking-wide opacity-70">Grand Total</span>
                                                    <span className="text-sm font-bold">{formatRupiah(grandTotal)}</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* ── Dokumen ── */}
                            {activeTab === 'dokumen' && (
                                <div className="space-y-3">
                                    <FileCard
                                        label="Proposal"
                                        filename={penelitian.proposal_filename}
                                        url={penelitian.proposal_url}
                                    />
                                    <FileCard
                                        label="Lampiran"
                                        filename={penelitian.lampiran_filename}
                                        url={penelitian.lampiran_url}
                                    />
                                </div>
                            )}

                        </div>
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}