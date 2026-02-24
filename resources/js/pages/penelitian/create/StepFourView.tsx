type StepFourViewProps = {
    onReset: () => void;
    onViewList: () => void;
};

export default function StepFourView({ onReset, onViewList }: StepFourViewProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">Proposal Berhasil Diajukan!</h2>
            <p className="mt-2 text-sm text-gray-600">
                Terima kasih. Anda dapat kembali ke daftar usulan atau membuat usulan baru.
            </p>
            <div className="mt-6 flex justify-center gap-3">
                <button
                    onClick={onViewList}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700"
                >
                    Lihat Daftar
                </button>
                <button
                    onClick={onReset}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                    Buat Usulan Baru
                </button>
            </div>
        </div>
    );
}
