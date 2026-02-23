import DashboardNav from "@/components/DashboardNav";
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { Head, Link } from "@inertiajs/react";
import { CalendarDays, ClipboardEdit, ClipboardList, FileText, Star, User } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Penelitian = {
  uuid: string;
  title: string;
  ringkasan: string;
  tahun: number;
  tahun_pelaksanaan: number;
  target_luaran: string;
  status: string;
  rekomendasi: string;
  skor_kualitas: number;
  skor_rab: number;
  catatan_umum: string;
  catatan_rab: string;
  created_at: string;
  reviewer_id: number;
};

type Reviewer = {
  name: string;
  email: string;
};

type Props = {
  penelitian: Penelitian;
  reviewer: Reviewer;
};

const TABS = [
  { key: "penelitian", label: "Penelitian",  icon: <FileText className="h-4 w-4" /> },
  { key: "penilaian",  label: "Penilaian",   icon: <Star className="h-4 w-4" /> },
  { key: "catatan",    label: "Catatan",      icon: <ClipboardList className="h-4 w-4" /> },
  { key: "reviewer",   label: "Reviewer",     icon: <User className="h-4 w-4" /> },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function StatusBadge({ status }: { status: string }) {
  const n = status.toLowerCase();
  const cfg = n.includes("setuj")
    ? { cls: "bg-emerald-100 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" }
    : n.includes("tolak")
    ? { cls: "bg-rose-100 text-rose-700 ring-rose-200", dot: "bg-rose-500" }
    : n.includes("revisi")
    ? { cls: "bg-amber-100 text-amber-700 ring-amber-200", dot: "bg-amber-500" }
    : { cls: "bg-gray-100 text-gray-600 ring-gray-200", dot: "bg-gray-400" };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${cfg.cls}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

function ScoreBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = pct >= 75 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-400" : "bg-rose-400";

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">
          {value} <span className="font-normal text-gray-400">/ {max}</span>
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</dt>
      <dd className="text-sm text-gray-800">{children}</dd>
    </div>
  );
}

function NoteBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</p>
      <div className="min-h-[80px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700 whitespace-pre-line">
        {value || <span className="italic text-gray-400">Tidak ada catatan.</span>}
      </div>
    </div>
  );
}

export default function HasilReview({ penelitian, reviewer }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("penelitian");

  const formattedDate = new Date(penelitian.created_at).toLocaleString("id-ID", {
    day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  const avgScore = ((penelitian.skor_kualitas + penelitian.skor_rab) / 2).toFixed(1);

  return (
    <AppHeaderLayout
      breadcrumbs={[
        { title: "Dashboard Dosen", href: "/dashboard/dosen" },
        { title: "Perbaikan Usulan", href: "/pt-penelitian/perbaikan" },
        { title: "Hasil Review", href: "#" },
      ]}
    >
      <Head title="Hasil Review Proposal Penelitian" />
      <DashboardNav />

      <div className=" bg-gray-50">
        <div className="mx-auto px-4 py-10">

          {/* Heading */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hasil Review Proposal</h1>
              <p className="mt-1 text-sm text-gray-500">
                Tinjauan dan penilaian dari reviewer atas usulan penelitian Anda.
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <Link
                href={`/pt-penelitian/${penelitian.uuid}/edit`}
                className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-400"
              >
                <ClipboardEdit className="h-4 w-4" />
                Perbaiki RAB
              </Link>
            </div>
          </div>

          {/* Card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

            {/* Tab nav */}
            <div className="flex gap-1 overflow-x-auto border-b border-gray-200 px-6 pt-5">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "inline-flex items-center gap-1.5 whitespace-nowrap rounded-t-lg border-b-2 px-4 py-2 text-sm font-medium transition",
                    activeTab === tab.key
                      ? "border-indigo-600 text-indigo-700"
                      : "border-transparent text-gray-500 hover:text-indigo-600",
                  )}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="p-6">

              {activeTab === "penelitian" && (
                <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Field label="Judul Penelitian">
                      <span className="font-medium text-gray-900">{penelitian.title}</span>
                    </Field>
                  </div>
                  <Field label="Tahun Pengajuan">{penelitian.tahun}</Field>
                  <Field label="Tahun Pelaksanaan">{penelitian.tahun_pelaksanaan}</Field>
                  <Field label="Status"><StatusBadge status={penelitian.status} /></Field>
                  <Field label="Rekomendasi"><StatusBadge status={penelitian.rekomendasi} /></Field>
                  <div className="sm:col-span-2">
                    <Field label="Ringkasan">
                      <span className="whitespace-pre-line leading-relaxed">{penelitian.ringkasan}</span>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="Target Luaran">
                      <span className="whitespace-pre-line leading-relaxed">{penelitian.target_luaran}</span>
                    </Field>
                  </div>
                </dl>
              )}

              {activeTab === "penilaian" && (
                <div className="space-y-5">
                  <ScoreBar label="Skor Kualitas Penelitian" value={penelitian.skor_kualitas} />
                  <ScoreBar label="Skor RAB" value={penelitian.skor_rab} />
                  <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50 px-5 py-4">
                    <span className="text-sm font-medium text-indigo-700">Rata-rata Skor</span>
                    <span className="text-2xl font-bold text-indigo-600">{avgScore}</span>
                  </div>
                </div>
              )}

              {activeTab === "catatan" && (
                <div className="space-y-5">
                  <NoteBox label="Catatan Umum" value={penelitian.catatan_umum} />
                  <NoteBox label="Catatan RAB"  value={penelitian.catatan_rab} />
                </div>
              )}

              {activeTab === "reviewer" && (
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">
                    {reviewer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{reviewer.name}</p>
                    <p className="text-sm text-gray-500">{reviewer.email}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formattedDate}
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </AppHeaderLayout>
  );
}