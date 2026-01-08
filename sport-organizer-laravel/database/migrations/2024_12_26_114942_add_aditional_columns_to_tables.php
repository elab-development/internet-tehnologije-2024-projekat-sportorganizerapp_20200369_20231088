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
        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->enum('vrsta_sporta', [
                'hokej', 'kosarka', 'vaterpolo', 'fudbal', 'ragbi', 'americki fudbal', 'stoni tenis', 
                'badminton', 'golf', 'kuglanje', 'bilijar', 'streljastvo', 'atletika', 'odbojka', 
                'rukomet', 'plivanje', 'skakanje u vodu', 'karate', 'dzudo', 'boks', 'mma', 'rvanje'
            ])->after('cena_karte');
        });

        Schema::table('tipovi', function (Blueprint $table) {
            $table->enum('rang_vaznosti', [
                'nizak', 'srednji', 'visok'
            ])->after('naziv');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('dogadjaji', function (Blueprint $table) {
            $table->dropColumn('vrsta_sporta');
        });

        Schema::table('tipovi', function (Blueprint $table) {
            $table->dropColumn('rang_vaznosti');
        });
    }
};
