import { Separator } from "@/components/ui/separator";

export function FullHistory() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[800px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-orange-600 font-bold tracking-widest uppercase text-xs block mb-2">
            Perjalanan Panjang
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Sejarah Berdirinya Pura Giri Kusuma
          </h2>
        </div>

        {/* Long Form Content - styled for readability (Prose) */}
        <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-serif md:font-sans">
          
          {/* Chapter 1 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 sans-serif">1981: Cikal Bakal di F-189</h3>
            <p>
              Sebelum memiliki tempat ibadah sendiri, pendidikan agama Hindu bagi anak-anak di Sorowako 
              dilakukan secara sederhana. Pelajaran agama diberikan oleh <strong>Bapak Dr. Made Suardha</strong>, 
              yang saat itu mengajar anak-anak beliau sendiri dan beberapa anak lain yang belum bersekolah.
            </p>
            <p className="mt-4">
              Pada Februari 1981, muncul gagasan untuk membentuk wadah organisasi. Bertempat di rumah 
              <strong> Bapak Made Toestha (F-189)</strong>, para sesepuh seperti Bapak Agus Widana, 
              Bapak Made Sinut, Bapak Nengah Gabra, dan Bapak Wayan Sukarta berkumpul. Saat itu, 
              jumlah warga hanya sekitar <strong>17 Kepala Keluarga</strong>.
            </p>
            <p className="mt-4">
              Dalam pertemuan itulah, Bapak Dr. Made Suardha memberikan nama <strong>"Banjar Giri Manik"</strong>. 
              Banjar ini menjadi wadah komunikasi, arisan, dan suka-duka bagi perantau Hindu di Sorowako, 
              Wasuponda, dan Wawondula.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Chapter 2 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 sans-serif">1984: Pertanyaan yang Mengubah Segalanya</h3>
            <p>
              Kegiatan rutin terus berjalan dari rumah ke rumah. Namun, pada sebuah pertemuan di rumah 
              Pak Nyoman Gelgel di Wawondula, Bapak Made Sinut melontarkan pertanyaan sederhana yang 
              menggugah semangat semua orang:
            </p>
            <blockquote className="border-l-4 border-orange-500 pl-6 italic text-slate-800 bg-orange-50 py-4 pr-4 my-6 rounded-r-lg">
              "Kapan kita bisa punya sebuah Pura di Sorowako?"
            </blockquote>
            <p>
              Pertanyaan itu menjadi pemicu. Setelah survei lokasi, ditemukanlah area di <strong>Bukit Salonsa</strong> 
              atas petunjuk Bapak R. Musu (Direktur PT Inco saat itu).
            </p>
          </div>

          <Separator className="my-8" />

          {/* Chapter 3 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 sans-serif">Semangat "Ngeruak" & Parang</h3>
            <p>
              Pada tanggal <strong>15 Mei 1984</strong>, upacara <em>Ngeruak</em> (pembukaan lahan) dimulai, 
              dipimpin oleh Bapak I.B. Tantra. Ini adalah masa-masa terberat namun paling indah dalam ingatan.
            </p>
            <p className="mt-4">
              Warga membabat hutan belantara hanya mengandalkan alat sederhana: <strong>parang, gergaji, dan cangkul</strong>. 
              Pekerjaan ini dilakukan setiap sore sepulang kerja dari tambang, serta seharian penuh di hari Sabtu dan Minggu. 
              Melihat kesungguhan warga, manajemen perusahaan akhirnya turun tangan memberikan bantuan alat berat.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Chapter 4 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 sans-serif">1985-1989: Gotong Royong Dana</h3>
            <p>
              Tantangan terbesar adalah dana. Warga memulai dengan kas nol rupiah. Namun kreativitas muncul dalam keterbatasan. 
              Berbagai acara digelar untuk menggalang dana:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-orange-500">
              <li><strong>Bali Nite:</strong> Pagelaran seni yang diadakan dua kali (Februari 1985 & April 1987).</li>
              <li><strong>Motor Rally & Cross:</strong> Ajang olahraga yang menarik perhatian masyarakat luas.</li>
              <li><strong>Bazar Makanan:</strong> Ibu-ibu Banjar bergotong royong memasak dan menjual makanan.</li>
            </ul>
            <p className="mt-4">
              Semua dilakukan dengan semangat kebersamaan yang luar biasa, melibatkan seluruh elemen warga tanpa kenal lelah.
            </p>
          </div>

          <Separator className="my-8" />

          {/* Chapter 5 */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 sans-serif">1989: Berdiri Megah</h3>
            <p>
              Setelah perjuangan panjang tanpa target waktu yang pasti, Pura Giri Kusuma akhirnya selesai. 
              Pada bulan Oktober 1989, bertepatan dengan <strong>Purnamaning Kapat</strong>, Pura ini dipelaspas 
              oleh Ida Pedanda dari Tegal Denpasar dan diresmikan oleh Bapak BN Wahyu.
            </p>
            <p className="mt-4">
              Hari ini, Pura Giri Kusuma bukan hanya tempat ibadah, melainkan monumen hidup dari keringat, 
              air mata, dan semangat gotong royong para perintisnya.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}