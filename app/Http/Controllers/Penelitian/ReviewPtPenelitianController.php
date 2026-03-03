<?php

namespace App\Http\Controllers\Penelitian;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

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
            ->where('pt_penelitian.id_skema', $id_skema)
            ->get();



        // echo "<pre>";
        // print_r($penelitian);
        // echo "</pre>";
        // die();
        return Inertia::render('penelitian/penugasanReview/list-penugasan', ['penelitian' => $penelitian,]);
    }
    public function nilai($id_penugasan)
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

        return Inertia::render('penelitian/penugasanReview/nilai', [
            'pertanyaans'  => $pertanyaan,
            'review'       => $review,
            'detail'       => $detail,
            'id_penugasan' => $id_penugasan,
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

        return redirect()->route('reviewer.pt-penelitian.listPenugasan', [
            'id_skema' => $id_skema
        ])->with('success', 'Review berhasil disimpan.');
    }

    public function detail($id_penelitian)
    {
        $penelitian = DB::table('pt_penelitian')
            ->join('ref_skema', 'pt_penelitian.id_skema', '=', 'ref_skema.uuid')
            ->select(
                'pt_penelitian.uuid',
                'pt_penelitian.title',
                'pt_penelitian.tahun',
                'pt_penelitian.tahun_pelaksanaan',
                'ref_skema.nama as nama_skema',
                'pt_penelitian.created_by',
                'pt_penelitian.created_at',
                'pt_penelitian.updated_at',
            )
            ->where('pt_penelitian.uuid', $id_penelitian)
            ->first();
        dd($penelitian);
        die();
        return Inertia::render('penelitian/penugasanReview/detail', ['penelitian' => $penelitian]);
    }



    private function getUserId()
    {
        return optional(request()->user())->id;
    }
}
