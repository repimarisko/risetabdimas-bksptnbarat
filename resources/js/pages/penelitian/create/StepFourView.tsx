type StepFourViewProps = {
    onReset: () => void;
    onViewList?: () => void;
};

export default function StepFourView({
    onReset,
    onViewList,
}: StepFourViewProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="mb-6 flex justify-center">
                <div className="relative">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-16 h-16 text-green-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
                    <div
                        className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-300 rounded-full animate-pulse"
                        style={{ animationDelay: '0.3s' }}
                    />
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
                    onClick={onReset}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Buat Proposal Baru
                </button>
                <button
                    onClick={onViewList}
                    className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Lihat Daftar Proposal
                </button>
            </div>
        </div>
    );
}
