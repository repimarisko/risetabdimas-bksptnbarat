<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ReviewPtPenelitianController extends Controller
{
    public function indexSkema()
    {
        $userid = $this->getUserId();
        $skema = DB::table('pt_penugasan_review')
            ->join('pt_penelitian', 'pt_penugasan_review.id_penelitian', '=', 'pt_penelitian.uuid')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->join('reviewer', 'pt_penugasan_review.id_reviewer', '=', 'reviewer.id')
            ->select(
                'ref_skema.nama',
                'ref_skema.nama_singkat',
                'ref_skema.uuid as id_skema'
            )
            ->selectRaw('
                COUNT(pt_penugasan_review.id) as total_penugasan,
                COUNT(CASE WHEN pt_penugasan_review.status_review = "pending" THEN 1 END) as pending,
                COUNT(CASE WHEN pt_penugasan_review.status_review = "selesai" THEN 1 END) as selesai
            ')
            ->where('ref_skema.jenis_skema', 'penelitian')
            ->where('reviewer.id_user', $userid)
            ->where('pt_penugasan_review.id_jenis_penugasan', 1)
            ->groupBy(
                'ref_skema.uuid',
                'ref_skema.nama',
                'ref_skema.nama_singkat'
            )
            ->get();

        // echo "<pre>";
        // print_r($skema);
        // echo "</pre>";
        // die();


        // vardump session
        // Note: In Laravel, you can inspect the session via the request() helper or session() helper.
        // Example using request()
        // echo "<pre>";
        // print_r(session()->all());
        // echo "</pre>";
        // die();
        return Inertia::render('penelitian/penugasanReview/index-reviewer', [
            'skema' => $skema,
        ]);
    }

    public function listPenugasan($id_skema)
    {
        $userid = $this->getUserId();

        $penelitian = DB::table('pt_penugasan_review')
            ->join('pt_penelitian', 'pt_penugasan_review.id_penelitian', '=', 'pt_penelitian.uuid')
            ->leftJoin('pt_review_administrasi', 'pt_penugasan_review.id', '=', 'pt_review_administrasi.id_penugasan') // ✅ fix
            ->join('reviewer', 'pt_penugasan_review.id_reviewer', '=', 'reviewer.id')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->leftJoin('user_detail as peneliti_detail', 'peneliti_detail.id_user', '=', 'pt_penelitian.created_by')
            ->leftJoin('user_detail as reviewer_detail', 'reviewer_detail.id_user', '=', 'reviewer.id_user')
            ->select(
                'pt_penugasan_review.id as id_penugasan',
                'pt_penelitian.uuid as id_penelitian',
                'pt_review_administrasi.status_review',
                'pt_review_administrasi.hasil',
                'pt_penugasan_review.tanggal_penugasan',
                'pt_penugasan_review.batas_waktu',
                'ref_skema.uuid as id_skema',
                'reviewer.id as reviewer_id',
                'reviewer.id_user as reviewer_user_id',
                'pt_penelitian.title',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'ref_skema.nama as skema_nama',
                'ref_skema.nama_singkat as skema_nama_singkat',
                'peneliti_detail.nama_lengkap as peneliti_nama_lengkap',
                'peneliti_detail.nuptk as nuptk',
                'reviewer_detail.nama_lengkap as reviewer_nama_lengkap',
                'reviewer_detail.nuptk as reviewer_nuptk'
            )
            ->where('reviewer.id_user', $userid)
            ->where('ref_skema.jenis_skema', 'penelitian')
            ->where('pt_penugasan_review.id_jenis_penugasan', 1)
            ->where('pt_penelitian.id_skema', $id_skema)
            ->get();



        // echo "<pre>";
        // print_r($penelitian);
        // echo "</pre>";
        // die();
        return Inertia::render('penelitian/penugasanReview/list-penugasan-administrasi', ['penelitian' => $penelitian,]);
    }

    public function nilaiAdministrasi($id_penugasan)
    {
        $userid = $this->getUserId();

        // Ambil reviewer berdasarkan user login
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();

        if (!$reviewer) {
            abort(403, 'Data reviewer tidak ditemukan.');
        }

        // Validasi penugasan milik reviewer ini
        $penugasan = DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->where('id_reviewer', $reviewer->id)
            ->where('id_jenis_penugasan', 1)
            ->first();
        // echo "<pre>";
        // print_r($penugasan);
        // echo "</pre>";
        // die();
        if (!$penugasan) {
            abort(404, 'Data penugasan tidak ditemukan atau bukan milik Anda.');
        }

        // Ambil pertanyaan administrasi
        $pertanyaan = DB::table('ref_pertanyaan_administrasi')
            ->select('id', 'nomor_urut', 'pertanyaan')
            ->where('is_active', 1)
            ->orderBy('nomor_urut')
            ->get();

        // Cek apakah sudah pernah disubmit sebelumnya
        $review = DB::table('pt_review_administrasi')
            ->where('id_penugasan', $id_penugasan)
            ->first();

        $detail = $review
            ? DB::table('pt_review_administrasi_detail')
            ->where('id_review', $review->id)
            ->get()
            ->keyBy('id_pertanyaan')
            : collect();

        return Inertia::render('penelitian/penugasanReview/nilai-administrasi', [
            'pertanyaans'  => $pertanyaan,
            'review'       => $review,
            'detail'       => $detail,
            'id_penugasan' => $id_penugasan,
            'penugasan' => $penugasan
        ]);
    }

    public function simpanNilai(Request $request, $id_penugasan)
    {
        $userid = $this->getUserId();

        // Ambil reviewer berdasarkan user login
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();

        if (!$reviewer) {
            return back()->withErrors(['error' => 'Data reviewer tidak ditemukan.']);
        }

        // Validasi penugasan milik reviewer ini
        $penugasan = DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->where('id_reviewer', $reviewer->id)
            ->first();

        if (!$penugasan) {
            return back()->withErrors(['error' => 'Data penugasan tidak ditemukan atau bukan milik Anda.']);
        }

        $request->validate([
            'jawaban'  => 'required|array',
            'hasil'    => 'required|in:Lolos,Tidak Lolos',
            'komentar' => 'nullable|string',
            'status'   => 'required|in:Draft,Selesai',
        ]);

        // Cek apakah review sudah ada
        $review = DB::table('pt_review_administrasi')
            ->where('id_penugasan', $id_penugasan)
            ->first();




        if (!$review) {
            $id_review = (string) \Illuminate\Support\Str::uuid();

            DB::table('pt_review_administrasi')->insert([
                'id'            => $id_review,
                'id_penugasan'  => $id_penugasan,
                'hasil'         => $request->hasil,
                'komentar'      => $request->komentar,
                'status_review' => $request->status,
                'created_at'    => now(),
                'created_by'    => $userid,
            ]);
        } else {
            $id_review = $review->id;

            DB::table('pt_review_administrasi')
                ->where('id', $id_review)
                ->update([
                    'hasil'         => $request->hasil,
                    'komentar'      => $request->komentar,
                    'status_review' => $request->status,
                    'updated_at'    => now(),
                ]);
        }


        // Insert/update detail jawaban per pertanyaan
        foreach ($request->jawaban as $id_pertanyaan => $jawaban) {
            $existing = DB::table('pt_review_administrasi_detail')
                ->where('id_review', $id_review)
                ->where('id_pertanyaan', $id_pertanyaan)
                ->first();

            if ($existing) {
                DB::table('pt_review_administrasi_detail')
                    ->where('id', $existing->id)
                    ->update(['jawaban' => $jawaban]);
            } else {
                DB::table('pt_review_administrasi_detail')->insert([
                    'id'            => (string) \Illuminate\Support\Str::uuid(), // ✅ generate manual
                    'id_review'     => $id_review,
                    'id_pertanyaan' => $id_pertanyaan,
                    'jawaban'       => $jawaban,
                ]);
            }
        }

        return redirect()->back()->with('success', 'Review berhasil disimpan.');
    }

    public function selesaikanReview(Request $request, $id_penugasan)
    {
        $userid = $this->getUserId();
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();

        if (!$reviewer) {
            return back()->withErrors(['error' => 'Data reviewer tidak ditemukan.']);
        }

        $penugasan = DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->where('id_reviewer', $reviewer->id)
            ->first();

        if (!$penugasan) {
            return back()->withErrors(['error' => 'Data penugasan tidak ditemukan.']);
        }
        $id_skema = DB::table('pt_penelitian')
            ->where('uuid', $penugasan->id_penelitian)
            ->value('id_skema');
        // var_dump($id_skema);
        // die();
        // Update status di pt_review_administrasi
        DB::table('pt_review_administrasi')
            ->where('id_penugasan', $id_penugasan)
            ->update([
                'status_review' => 'Selesai',
                'updated_at'    => now(),
            ]);

        // ✅ Update juga status di pt_penugasan_review
        DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->update([
                'status_review' => 'Selesai',
                'updated_at'    => now(),
            ]);

        return redirect()->route('reviewer.pt-penelitian.listPenugasanAdministrasi', [
            'id_skema' => $id_skema
        ])->with('success', 'Review berhasil disimpan.');
    }
    public function detail($id_penelitian)
    {
        $penelitian = DB::table('pt_penelitian')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->leftJoin('ref_tkt', 'pt_penelitian.id_tkt', '=', 'ref_tkt.uuid')
            ->leftJoin('ref_sdg', 'pt_penelitian.id_sdg', '=', 'ref_sdg.uuid')
            ->leftJoin('ref_fokus', 'pt_penelitian.id_fokus', '=', 'ref_fokus.uuid')
            ->select(
                'pt_penelitian.uuid',
                'pt_penelitian.title',
                'pt_penelitian.tahun',
                'pt_penelitian.ringkasan',
                'pt_penelitian.proposal_path',    // ✅
                'pt_penelitian.proposal_filename', // ✅
                'pt_penelitian.lampiran_path',    // ✅
                'pt_penelitian.lampiran_filename', // ✅
                'pt_penelitian.tahun_pelaksanaan',
                'pt_penelitian.ringkasan',
                'ref_skema.uuid as id_skema',
                'ref_skema.nama as nama_skema',
                'ref_tkt.tkt',
                'ref_tkt.level as level_tkt',
                'ref_sdg.sdg',
                'ref_sdg.level as level_sdg',
                'ref_fokus.fokus',
                'pt_penelitian.created_by',
                'pt_penelitian.created_at',
                'pt_penelitian.updated_at',
            )
            ->where('pt_penelitian.uuid', $id_penelitian)
            ->first();

        if (! $penelitian) {
            abort(404, 'Penelitian tidak ditemukan.');
        }

        // Ambil ketua peneliti
        $ketua = DB::table('pt_penelitian_anggotas')
            ->join('dosen', 'pt_penelitian_anggotas.dosen_uuid', '=', 'dosen.uuid')
            ->join('user_detail', 'dosen.id_user', '=', 'user_detail.id_user')
            ->leftJoin('ref_perguruan_tinggi', 'dosen.uuid_pt', '=', 'ref_perguruan_tinggi.uuid')
            ->select(
                'dosen.uuid as dosen_uuid',
                'dosen.nidn',
                'user_detail.nama_lengkap',
                'user_detail.nuptk',
                'ref_perguruan_tinggi.nama as nama_pt',
            )
            ->where('pt_penelitian_anggotas.penelitian_uuid', $id_penelitian)
            ->where('pt_penelitian_anggotas.peran', 'like', '%Ketua%')
            ->first();

        // Ambil semua anggota
        $anggota = DB::table('pt_penelitian_anggotas')
            ->join('dosen', 'pt_penelitian_anggotas.dosen_uuid', '=', 'dosen.uuid')
            ->join('user_detail', 'dosen.id_user', '=', 'user_detail.id_user')
            ->leftJoin('ref_perguruan_tinggi', 'dosen.uuid_pt', '=', 'ref_perguruan_tinggi.uuid')
            ->select(
                'pt_penelitian_anggotas.peran',
                'pt_penelitian_anggotas.tugas',
                'dosen.nidn',
                'user_detail.nama_lengkap',
                'user_detail.nuptk',
                'ref_perguruan_tinggi.nama as nama_pt',
            )
            ->where('pt_penelitian_anggotas.penelitian_uuid', $id_penelitian)
            ->get();

        $rabQuery = fn($table) => DB::table($table)
            ->leftJoin('ref_komponen_biaya', $table . '.id_komponen', '=', 'ref_komponen_biaya.id')
            ->leftJoin('ref_komponen_rab', 'ref_komponen_biaya.id_komponen_rab', '=', 'ref_komponen_rab.id')
            ->select(
                $table . '.uuid',
                $table . '.nama_item',
                $table . '.jumlah_item',
                $table . '.harga_satuan',
                $table . '.total_biaya',
                'ref_komponen_rab.nama as nama_komponen_rab',
            )
            ->where($table . '.id_penelitian', $id_penelitian)
            ->whereNull($table . '.deleted_at')
            ->get();

        $penelitian->ketua       = $ketua;
        $penelitian->anggota     = $anggota;
        $penelitian->rab_tahun_1 = $rabQuery('pt_rab_tahun_1');
        $penelitian->rab_tahun_2 = $rabQuery('pt_rab_tahun_2');
        $penelitian->rab_tahun_3 = $rabQuery('pt_rab_tahun_3');
        $penelitian->rab_tahun_4 = $rabQuery('pt_rab_tahun_4');
        // dump($penelitian);
        $penelitian->proposal_url = $penelitian->proposal_path
            ? route('reviewer.pt-penelitian.download', ['id_penelitian' => $id_penelitian, 'type' => 'proposal'])
            : null;

        $penelitian->lampiran_url = $penelitian->lampiran_path
            ? route('reviewer.pt-penelitian.download', ['id_penelitian' => $id_penelitian, 'type' => 'lampiran'])
            : null;
        return Inertia::render('penelitian/penugasanReview/detail', [
            'penelitian' => $penelitian,
        ]);
    }

    public function download($id_penelitian, $type)
    {
        $userid   = $this->getUserId();
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();

        if (!$reviewer) {
            return back()->withErrors(['error' => 'Data reviewer tidak ditemukan.']);
        }

        $penugasan = DB::table('pt_penugasan_review')
            ->where('id_penelitian', $id_penelitian)
            ->where('id_reviewer', $reviewer->id)
            ->first();

        if (!$penugasan) {
            abort(403, 'Anda tidak ditugaskan sebagai reviewer untuk penelitian ini.');
        }

        $penelitian = DB::table('pt_penelitian')
            ->where('uuid', $id_penelitian)
            ->select('proposal_path', 'proposal_filename', 'lampiran_path', 'lampiran_filename')
            ->first();

        if (!$penelitian) {
            abort(404, 'Penelitian tidak ditemukan.');
        }

        // ✅ Samakan pola dengan contoh
        $type     = $type === 'lampiran' ? 'lampiran' : 'proposal';
        $path     = $type === 'proposal' ? $penelitian->proposal_path     : $penelitian->lampiran_path;
        $filename = $type === 'proposal' ? ($penelitian->proposal_filename ?? 'proposal.pdf')
            : ($penelitian->lampiran_filename ?? 'lampiran.pdf');

        abort_if(!$path, 404);

        // ✅ Pakai disk public seperti contoh
        $disk = Storage::disk('public');

        abort_if(!$disk->exists($path), 404);

        // ✅ Pakai response()->download() dengan full path
        return response()->download($disk->path($path), $filename);
    }


    // REVIEW SUBSTANSI PENELITIAN
    public function indexSkemaSubstansi()
    {
        $userid = $this->getUserId();
        $skema = DB::table('pt_penugasan_review')
            ->join('pt_penelitian', 'pt_penugasan_review.id_penelitian', '=', 'pt_penelitian.uuid')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->join('reviewer', 'pt_penugasan_review.id_reviewer', '=', 'reviewer.id')
            ->select(
                'ref_skema.nama',
                'ref_skema.nama_singkat',
                'ref_skema.uuid as id_skema'
            )
            ->selectRaw('
                COUNT(pt_penugasan_review.id) as total_penugasan,
                COUNT(CASE WHEN pt_penugasan_review.status_review = "pending" THEN 1 END) as pending,
                COUNT(CASE WHEN pt_penugasan_review.status_review = "selesai" THEN 1 END) as selesai
            ')
            ->where('ref_skema.jenis_skema', 'penelitian')
            ->where('reviewer.id_user', $userid)
            ->where('pt_penugasan_review.id_jenis_penugasan', 2)
            ->groupBy(
                'ref_skema.uuid',
                'ref_skema.nama',
                'ref_skema.nama_singkat'
            )
            ->get();

        // echo "<pre>";
        // print_r($skema);
        // echo "</pre>";
        // die();
        return Inertia::render('penelitian/penugasanReview/index-reviewer-substansi', [
            'skema' => $skema,
        ]);
    }
    // ─── List Penugasan Substansi ─────────────────────────────────────────────────
    public function listPenugasanSubstansi($id_skema)
    {
        $userid = $this->getUserId();

        $penelitian = DB::table('pt_penugasan_review')
            ->join('pt_penelitian', 'pt_penugasan_review.id_penelitian', '=', 'pt_penelitian.uuid')
            ->leftJoin('pt_review_substansi', 'pt_penugasan_review.id', '=', 'pt_review_substansi.id_penugasan')
            ->join('reviewer', 'pt_penugasan_review.id_reviewer', '=', 'reviewer.id')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->leftJoin('user_detail as peneliti_detail', 'peneliti_detail.id_user', '=', 'pt_penelitian.created_by')
            ->leftJoin('user_detail as reviewer_detail', 'reviewer_detail.id_user', '=', 'reviewer.id_user')
            ->select(
                'pt_penugasan_review.id as id_penugasan',
                'pt_penelitian.uuid as id_penelitian',
                'pt_review_substansi.status_review',
                'pt_review_substansi.nilai_akhir as hasil',
                'ref_skema.uuid as id_skema',
                'reviewer.id as reviewer_id',
                'reviewer.id_user as reviewer_user_id',
                'pt_penelitian.title',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'ref_skema.nama as skema_nama',
                'ref_skema.nama_singkat as skema_nama_singkat',
                'peneliti_detail.nama_lengkap as peneliti_nama_lengkap',
                'peneliti_detail.nuptk as nuptk',
                'reviewer_detail.nama_lengkap as reviewer_nama_lengkap',
                'reviewer_detail.nuptk as reviewer_nuptk'
            )
            ->where('reviewer.id_user', $userid)
            ->where('ref_skema.jenis_skema', 'penelitian')
            ->where('pt_penugasan_review.id_jenis_penugasan', 2)
            ->where('pt_penelitian.id_skema', $id_skema)
            ->get();

        return Inertia::render('penelitian/penugasanReview/list-penugasan-substansi', [
            'penelitian' => $penelitian,
        ]);
    }

    // ─── Tampilkan form penilaian substansi ───────────────────────────────────────
    public function nilaiSubstansi($id_penugasan)
    {
        $userid   = $this->getUserId();
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();
        if (!$reviewer) abort(403, 'Data reviewer tidak ditemukan.');

        $penugasan = DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->where('id_reviewer', $reviewer->id)
            ->where('id_jenis_penugasan', 2)
            ->first();
        if (!$penugasan) abort(404, 'Data penugasan tidak ditemukan atau bukan milik Anda.');

        $existingReview  = DB::table('pt_review_substansi')->where('id_penugasan', $id_penugasan)->first();
        $existingDetails = [];
        if ($existingReview) {
            $existingDetails = DB::table('pt_review_substansi_detail')
                ->where('id_review', $existingReview->id)
                ->get()->keyBy('id_pertanyaan')->toArray();
        }

        $pertanyaan = DB::table('ref_pertanyaan_skema')
            ->join('ref_jenis_pertanyaan', 'ref_pertanyaan_skema.uuid_jenis', '=', 'ref_jenis_pertanyaan.id')
            ->join('ref_skema', 'ref_pertanyaan_skema.uuid_skema', '=', 'ref_skema.uuid')
            ->select(
                'ref_pertanyaan_skema.id as id_pertanyaan',
                'ref_jenis_pertanyaan.jenis',
                'ref_pertanyaan_skema.pertanyaan',
                'ref_pertanyaan_skema.bobot'
            )
            ->orderBy('ref_jenis_pertanyaan.nomor_urut')
            ->get()
            ->map(function ($item) use ($existingDetails) {
                $detail         = $existingDetails[$item->id_pertanyaan] ?? null;
                $item->nilai    = $detail ? $detail->nilai    : null;
                $item->komentar = $detail ? ($detail->komentar ?? '') : '';
                return $item;
            });

        return Inertia::render('penelitian/penugasanReview/nilai-substansi', [
            'pertanyaans'     => $pertanyaan,
            'id_penugasan'    => $id_penugasan,
            'existing_review' => $existingReview ? [
                'id'            => $existingReview->id,
                'komentar'      => $existingReview->komentar,
                'nilai_akhir'   => $existingReview->nilai_akhir,
                'status_review' => $existingReview->status_review, // ← wajib untuk lock frontend
            ] : null,
        ]);
    }

    // ─── Simpan Draft ─────────────────────────────────────────────────────────────
    public function storeSubstansi(Request $request, $id_penugasan)
    {
        $request->validate([
            'komentar'                  => 'nullable|string|max:5000',
            'nilai_akhir'               => 'required|numeric|min:0',
            'penilaian'                 => 'required|array|min:1',
            'penilaian.*.id_pertanyaan' => 'required|string',
            'penilaian.*.bobot'         => 'required|numeric|min:0|max:100',
            'penilaian.*.nilai'         => 'required|integer|min:1|max:7',
            'penilaian.*.komentar'      => 'nullable|string|max:1000',
        ]);

        [$userid, $reviewer] = $this->getReviewer();
        $this->validatePenugasan($id_penugasan, $reviewer->id);

        // Tolak jika sudah Selesai
        $existing = DB::table('pt_review_substansi')->where('id_penugasan', $id_penugasan)->first();
        if ($existing && $existing->status_review === 'Selesai') {
            return back()->withErrors(['error' => 'Penilaian sudah ditandai Selesai dan tidak dapat diubah.']);
        }

        DB::beginTransaction();
        try {
            $reviewId = $this->upsertReview($existing, $id_penugasan, $request, $userid, 'Draft');
            $this->upsertDetail($reviewId, $request->penilaian);

            DB::table('pt_penugasan_review')->where('id', $id_penugasan)
                ->update(['status_review' => 'Draft', 'updated_at' => now()]);

            DB::commit();
            return redirect()->back()->with('success', 'Draft penilaian berhasil disimpan.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal menyimpan: ' . $e->getMessage()]);
        }
    }

    // ─── Tandai Selesai ───────────────────────────────────────────────────────────
    public function finalizeSubstansi(Request $request, $id_penugasan)
    {
        $request->validate([
            'komentar'                  => 'nullable|string|max:5000',
            'nilai_akhir'               => 'required|numeric|min:0',
            'penilaian'                 => 'required|array|min:1',
            'penilaian.*.id_pertanyaan' => 'required|string',
            'penilaian.*.bobot'         => 'required|numeric|min:0|max:100',
            'penilaian.*.nilai'         => 'required|integer|min:1|max:7',
            'penilaian.*.komentar'      => 'nullable|string|max:1000',
        ]);

        [$userid, $reviewer] = $this->getReviewer();
        $this->validatePenugasan($id_penugasan, $reviewer->id);

        $existing = DB::table('pt_review_substansi')->where('id_penugasan', $id_penugasan)->first();
        if ($existing && $existing->status_review === 'Selesai') {
            return back()->withErrors(['error' => 'Penilaian sudah ditandai Selesai.']);
        }

        DB::beginTransaction();
        try {
            $reviewId = $this->upsertReview($existing, $id_penugasan, $request, $userid, 'Selesai');
            $this->upsertDetail($reviewId, $request->penilaian);

            DB::table('pt_penugasan_review')->where('id', $id_penugasan)
                ->update(['status_review' => 'Selesai', 'updated_at' => now()]);

            DB::commit();
            return redirect()->back()->with('success', 'Penilaian berhasil ditandai Selesai.');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'Gagal memfinalisasi: ' . $e->getMessage()]);
        }
    }

    // ─── Private Helpers ──────────────────────────────────────────────────────────

    private function getReviewer(): array
    {
        $userid   = $this->getUserId();
        $reviewer = DB::table('reviewer')->where('id_user', $userid)->first();
        if (!$reviewer) abort(403, 'Data reviewer tidak ditemukan.');
        return [$userid, $reviewer];
    }

    private function validatePenugasan(string $id_penugasan, $reviewerId): void
    {
        $penugasan = DB::table('pt_penugasan_review')
            ->where('id', $id_penugasan)
            ->where('id_reviewer', $reviewerId)
            ->where('id_jenis_penugasan', 2)
            ->first();
        if (!$penugasan) abort(404, 'Data penugasan tidak ditemukan atau bukan milik Anda.');
    }

    private function upsertReview($existing, string $id_penugasan, Request $request, $userid, string $status): string
    {
        if ($existing) {
            DB::table('pt_review_substansi')->where('id', $existing->id)->update([
                'komentar'      => $request->komentar,
                'nilai_akhir'   => $request->nilai_akhir,
                'status_review' => $status,
                'updated_at'    => now(),
            ]);
            return $existing->id;
        }

        $reviewId = (string) Str::uuid();
        DB::table('pt_review_substansi')->insert([
            'id'            => $reviewId,
            'id_penugasan'  => $id_penugasan,
            'komentar'      => $request->komentar,
            'nilai_akhir'   => $request->nilai_akhir,
            'status_review' => $status,
            'created_by'    => $userid,
            'created_at'    => now(),
            'updated_at'    => now(),
        ]);
        return $reviewId;
    }

    private function upsertDetail(string $reviewId, array $penilaian): void
    {
        DB::table('pt_review_substansi_detail')->where('id_review', $reviewId)->delete();

        $details = array_map(fn($item) => [
            'id'            => (string) Str::uuid(),
            'id_review'     => $reviewId,
            'id_pertanyaan' => $item['id_pertanyaan'],
            'bobot'         => $item['bobot'],
            'nilai'         => $item['nilai'],
            'komentar'      => $item['komentar'] ?? null,
            'created_at'    => now(),
            'updated_at'    => now(),
        ], $penilaian);

        DB::table('pt_review_substansi_detail')->insert($details);
    }
    private function getUserId()
    {
        return optional(request()->user())->id;
    }
}
