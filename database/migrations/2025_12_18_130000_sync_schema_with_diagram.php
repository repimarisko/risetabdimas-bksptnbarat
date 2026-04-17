<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $this->syncRefTables();
        $this->syncUsers();
        $this->syncPenelitian();
        $this->syncLuaran();
    }

    private function syncRefTables(): void
    {
        Schema::table('ref_skema', function (Blueprint $table) {
            if (! Schema::hasColumn('ref_skema', 'lama_tahun_max')) {
                $table->integer('lama_tahun_max')->nullable()->after('multi_tahun');
            }
            if (! Schema::hasColumn('ref_skema', 'kewajiban_luaran')) {
                $table->text('kewajiban_luaran')->nullable()->after('anggota_max');
            }
            if (! Schema::hasColumn('ref_skema', 'status_aktif')) {
                $table->boolean('status_aktif')->nullable()->after('kewajiban_luaran');
            }
        });

        Schema::table('ref_fokus', function (Blueprint $table) {
            if (! Schema::hasColumn('ref_fokus', 'bidang')) {
                $table->string('bidang', 255)->nullable()->after('uuid');
            }
        });

        Schema::table('ref_tkt', function (Blueprint $table) {
            if (! Schema::hasColumn('ref_tkt', 'deskripsi')) {
                $table->text('deskripsi')->nullable()->after('level');
            }
        });

        Schema::table('ref_komponen_biaya', function (Blueprint $table) {
            if (! Schema::hasColumn('ref_komponen_biaya', 'kelompok')) {
                $table->string('kelompok', 100)->nullable()->after('id_komponen_rab');
            }
            if (! Schema::hasColumn('ref_komponen_biaya', 'satuan')) {
                $table->string('satuan', 50)->nullable()->after('nama_komponen');
            }
            if (! Schema::hasColumn('ref_komponen_biaya', 'harga_satuan_max')) {
                $table->double('harga_satuan_max')->nullable()->after('satuan');
            }
        });

        if (! Schema::hasTable('ref_global_status')) {
            Schema::create('ref_global_status', function (Blueprint $table) {
                $table->increments('id');
                $table->string('jenis', 255)->nullable();
                $table->string('status', 255)->nullable();
                $table->timestamps();
            });
        }
    }

    private function syncUsers(): void
    {
        if (! Schema::hasTable('user_detail')) {
            Schema::create('user_detail', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->foreignId('id_user')->constrained('users')->cascadeOnDelete();
                $table->string('nama_lengkap', 150)->nullable();
                $table->date('tanggal_lahir')->nullable();
                $table->string('tempat_lahir', 100)->nullable();
                $table->text('alamat')->nullable();
                $table->char('nik', 16)->nullable();
                $table->char('nip', 18)->nullable();
                $table->char('nuptk', 16)->nullable();
                $table->string('hp', 20)->nullable();
                $table->boolean('status_aktif')->default(true);
                $table->string('sinta_id', 50)->nullable();
                $table->string('scopus_id', 50)->nullable();
                $table->string('sinta_link', 255)->nullable();
                $table->string('scopus_link', 255)->nullable();
                $table->string('photo_path', 255)->nullable();
                $table->timestamps();

                $table->unique('id_user');
            });
        }

        if (! Schema::hasTable('reviewer')) {
            Schema::create('reviewer', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->foreignId('id_user')->nullable()->constrained('users')->cascadeOnDelete();
                $table->string('email', 255)->nullable();
                $table->timestamps();
            });
        }

        Schema::table('dosen', function (Blueprint $table) {
            if (! Schema::hasColumn('dosen', 'id_prodi')) {
                $table->string('id_prodi', 100)->nullable()->after('id_user');
            }
            if (! Schema::hasColumn('dosen', 'status_aktif')) {
                $table->boolean('status_aktif')->default(true)->after('uuid_pt');
            }
        });
    }

    private function syncPenelitian(): void
    {
        Schema::table('pt_penelitian', function (Blueprint $table) {
            if (! Schema::hasColumn('pt_penelitian', 'judul')) {
                $table->string('judul', 500)->nullable()->after('title');
            }
            if (! Schema::hasColumn('pt_penelitian', 'abstrak')) {
                $table->text('abstrak')->nullable()->after('judul');
            }
            if (! Schema::hasColumn('pt_penelitian', 'tahun_anggaran')) {
                $table->integer('tahun_anggaran')->nullable()->after('tahun');
            }
            if (! Schema::hasColumn('pt_penelitian', 'lama_kegiatan')) {
                $table->integer('lama_kegiatan')->nullable()->after('tahun_anggaran');
            }
            if (! Schema::hasColumn('pt_penelitian', 'id_status')) {
                $table->unsignedInteger('id_status')->nullable()->after('status');
            }
        });

        if (! Schema::hasTable('_detail_penelitian')) {
            Schema::create('_detail_penelitian', function (Blueprint $table) {
                $table->bigIncrements('id');
                $table->string('id_penelitian', 100);
                $table->string('file_kontrak', 255)->nullable();
                $table->string('file_proposal', 255)->nullable();
                $table->string('file_lampiran', 255)->nullable();
                $table->string('file_kesanggupan', 255)->nullable();
                $table->timestamps();

                $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
            });
        }

        // if (! Schema::hasTable('pt_anggota_dosen')) {
        //     Schema::create('pt_anggota_dosen', function (Blueprint $table) {
        //         $table->bigIncrements('id');
        //         $table->string('id_penelitian', 100);
        //         $table->foreignId('id_user')->nullable()->constrained('users')->cascadeOnDelete();
        //         $table->string('peran', 50)->nullable();
        //         $table->boolean('status_aktif')->default(true);
        //         $table->boolean('persetujuan')->default(false);
        //         $table->text('tugas')->nullable();

        //         $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
        //     });
        // }

        // if (! Schema::hasTable('pt_anggota_mahasiswa')) {
        //     Schema::create('pt_anggota_mahasiswa', function (Blueprint $table) {
        //         $table->bigIncrements('id');
        //         $table->foreignId('id_user')->nullable()->constrained('users')->cascadeOnDelete();
        //         $table->string('id_penelitian', 100);
        //         $table->string('nama', 255)->nullable();
        //         $table->string('peran', 50)->nullable();
        //         $table->boolean('status_aktif')->default(true);
        //         $table->boolean('persetujuan')->default(false);
        //         $table->text('tugas')->nullable();

        //         $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
        //     });
        // }

        // if (! Schema::hasTable('pt_rab_detail')) {
        //     Schema::create('pt_rab_detail', function (Blueprint $table) {
        //         $table->bigIncrements('id');
        //         $table->string('id_penelitian', 100);
        //         $table->unsignedInteger('id_komponen_biaya');
        //         $table->integer('tahun_ke')->nullable();
        //         $table->string('uraian_item', 255)->nullable();
        //         $table->double('volume')->nullable();
        //         $table->string('satuan', 50)->nullable();
        //         $table->double('harga_satuan')->nullable();
        //         $table->double('total_harga')->nullable();
        //         $table->text('keterangan')->nullable();
        //         $table->timestamp('created_at')->nullable();
        //         $table->timestamp('updated_at')->nullable();

        //         $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
        //         $table->foreign('id_komponen_biaya')->references('id')->on('ref_komponen_biaya')->cascadeOnDelete();
        //     });
        // }

        if (! Schema::hasTable('pt_penugasan_review')) {
            Schema::create('pt_penugasan_review', function (Blueprint $table) {
                $table->uuid('id')->primary(); // ← ganti bigIncrements
                $table->string('id_penelitian', 100);
                $table->string('id_jenis_penugasan', 100);
                $table->foreignId('id_reviewer')->constrained('reviewer')->cascadeOnDelete();
                $table->date('tanggal_penugasan')->nullable();
                $table->date('batas_waktu')->nullable();
                $table->string('status_review', 50)->nullable();
                $table->timestamps();

                $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
            });
        }

        // if (! Schema::hasTable('pt_nilai_review')) {
        //     Schema::create('pt_nilai_review', function (Blueprint $table) {
        //         $table->bigIncrements('id');
        //         $table->string('id_penugasan', 36); // ← ganti unsignedBigInteger
        //         $table->string('kriteria', 255)->nullable();
        //         $table->float('bobot')->nullable();
        //         $table->float('skor')->nullable();
        //         $table->float('nilai_akhir')->nullable();
        //         $table->text('catatan')->nullable();
        //         $table->timestamps();

        //         $table->foreign('id_penugasan')->references('id')->on('pt_penugasan_review')->cascadeOnDelete();
        //     });
        // }

        if (! Schema::hasTable('pt_dokumen')) {
            Schema::create('pt_dokumen', function (Blueprint $table) {
                $table->string('id', 100)->primary();
                $table->string('id_penelitian', 100);
                $table->string('jenis_dokumen', 50)->nullable();
                $table->string('nama_file', 255)->nullable();
                $table->text('path_file')->nullable();
                $table->timestamp('tgl_upload')->nullable();
                $table->timestamps();

                $table->foreign('id_penelitian')->references('uuid')->on('pt_penelitian')->cascadeOnDelete();
            });
        }
    }

    private function syncLuaran(): void
    {
        if (! Schema::hasTable('ref_luaran')) {
            Schema::create('ref_luaran', function (Blueprint $table) {
                $table->increments('id');
                $table->string('nama_luaran', 255)->nullable();
                $table->timestamp('created_at')->nullable();
                $table->unsignedInteger('created_by')->nullable();
                $table->timestamp('updated_at')->nullable();
            });
        }

        if (! Schema::hasTable('luaran_per_skema')) {
            Schema::create('luaran_per_skema', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('id_ref_luaran')->nullable();
                $table->string('skema_id', 100)->nullable();
                $table->string('jenis_luaran', 255)->nullable();
                $table->timestamp('created_at')->nullable();
                $table->unsignedInteger('created_by')->nullable();
                $table->timestamp('updated_at')->nullable();

                $table->foreign('id_ref_luaran')->references('id')->on('ref_luaran')->nullOnDelete();
                $table->foreign('skema_id')->references('uuid')->on('ref_skema')->nullOnDelete();
            });
        }

        if (! Schema::hasTable('luaran_file')) {
            Schema::create('luaran_file', function (Blueprint $table) {
                $table->increments('id');
                $table->string('nama_luaran', 255)->nullable();
                $table->unsignedInteger('luaran_id')->unique();
                $table->string('nama_file', 255)->nullable();
                $table->string('file_path', 255)->nullable();
                $table->timestamp('created_at')->nullable();
                $table->unsignedInteger('created_by')->nullable();
                $table->timestamp('updated_at')->nullable();

                $table->foreign('luaran_id')->references('id')->on('luaran_per_skema')->cascadeOnDelete();
            });
        }

        if (! Schema::hasTable('luaran_buku')) {
            Schema::create('luaran_buku', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('luaran_id')->unique();
                $table->string('judul_buku', 255)->nullable();
                $table->timestamps();

                $table->foreign('luaran_id')->references('id')->on('luaran_per_skema')->cascadeOnDelete();
            });
        }

        if (! Schema::hasTable('luaran_jurnal')) {
            Schema::create('luaran_jurnal', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('luaran_id')->unique();
                $table->string('judul', 255)->nullable();
                $table->string('nama_jurnal', 255)->nullable();
                $table->string('issn', 255)->nullable();
                $table->string('lembaga_pengindeks', 255)->nullable();
                $table->string('urn', 255)->nullable();
                $table->string('status_artikel', 255)->nullable();
                $table->string('status_penulis', 255)->nullable();
                $table->string('file_artikel', 255)->nullable();
                $table->string('bukti_status', 255)->nullable();
                $table->timestamps();

                $table->foreign('luaran_id')->references('id')->on('luaran_per_skema')->cascadeOnDelete();
            });
        }

        if (! Schema::hasTable('luaran_media_massa')) {
            Schema::create('luaran_media_massa', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('luaran_id')->unique();
                $table->string('nama_media', 255)->nullable();
                $table->string('file_upload', 255)->nullable();
                $table->timestamp('created_at')->nullable();
                $table->unsignedInteger('created_by')->nullable();
                $table->timestamp('updated_at')->nullable();

                $table->foreign('luaran_id')->references('id')->on('luaran_per_skema')->cascadeOnDelete();
            });
        }

        if (! Schema::hasTable('luaran_seminar')) {
            Schema::create('luaran_seminar', function (Blueprint $table) {
                $table->increments('id');
                $table->unsignedInteger('luaran_id')->unique();
                $table->string('sptb', 255)->nullable();
                $table->decimal('presentase', 8, 2)->nullable();
                $table->string('file_upload', 255)->nullable();
                $table->timestamp('created_at')->nullable();
                $table->unsignedInteger('created_by')->nullable();
                $table->timestamp('updated_at')->nullable();

                $table->foreign('luaran_id')->references('id')->on('luaran_per_skema')->cascadeOnDelete();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('luaran_seminar');
        Schema::dropIfExists('luaran_media_massa');
        Schema::dropIfExists('luaran_jurnal');
        Schema::dropIfExists('luaran_buku');
        Schema::dropIfExists('luaran_file');
        Schema::dropIfExists('luaran_per_skema');
        Schema::dropIfExists('ref_luaran');

        Schema::dropIfExists('pt_dokumen');
        Schema::dropIfExists('pt_nilai_review');
        Schema::dropIfExists('pt_penugasan_review');
        Schema::dropIfExists('pt_rab_detail');
        Schema::dropIfExists('pt_anggota_mahasiswa');
        Schema::dropIfExists('pt_anggota_dosen');
        Schema::dropIfExists('_detail_penelitian');

        Schema::dropIfExists('reviewer');
        Schema::dropIfExists('user_detail');
        Schema::dropIfExists('ref_global_status');

        Schema::table('pt_penelitian', function (Blueprint $table) {
            if (Schema::hasColumn('pt_penelitian', 'id_status')) {
                $table->dropColumn('id_status');
            }
            if (Schema::hasColumn('pt_penelitian', 'lama_kegiatan')) {
                $table->dropColumn('lama_kegiatan');
            }
            if (Schema::hasColumn('pt_penelitian', 'tahun_anggaran')) {
                $table->dropColumn('tahun_anggaran');
            }
            if (Schema::hasColumn('pt_penelitian', 'abstrak')) {
                $table->dropColumn('abstrak');
            }
            if (Schema::hasColumn('pt_penelitian', 'judul')) {
                $table->dropColumn('judul');
            }
        });

        Schema::table('dosen', function (Blueprint $table) {
            if (Schema::hasColumn('dosen', 'status_aktif')) {
                $table->dropColumn('status_aktif');
            }
            if (Schema::hasColumn('dosen', 'id_prodi')) {
                $table->dropColumn('id_prodi');
            }
        });

        Schema::table('ref_komponen_biaya', function (Blueprint $table) {
            if (Schema::hasColumn('ref_komponen_biaya', 'harga_satuan_max')) {
                $table->dropColumn('harga_satuan_max');
            }
            if (Schema::hasColumn('ref_komponen_biaya', 'satuan')) {
                $table->dropColumn('satuan');
            }
            if (Schema::hasColumn('ref_komponen_biaya', 'kelompok')) {
                $table->dropColumn('kelompok');
            }
        });

        Schema::table('ref_tkt', function (Blueprint $table) {
            if (Schema::hasColumn('ref_tkt', 'deskripsi')) {
                $table->dropColumn('deskripsi');
            }
        });

        Schema::table('ref_fokus', function (Blueprint $table) {
            if (Schema::hasColumn('ref_fokus', 'bidang')) {
                $table->dropColumn('bidang');
            }
        });

        Schema::table('ref_skema', function (Blueprint $table) {
            if (Schema::hasColumn('ref_skema', 'status_aktif')) {
                $table->dropColumn('status_aktif');
            }
            if (Schema::hasColumn('ref_skema', 'kewajiban_luaran')) {
                $table->dropColumn('kewajiban_luaran');
            }
            if (Schema::hasColumn('ref_skema', 'lama_tahun_max')) {
                $table->dropColumn('lama_tahun_max');
            }
        });
    }
};
