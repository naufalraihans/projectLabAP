import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

export default function JadwalPage() {
    // Placeholder links for Google Drive Folders
    const classes = [
        { name: "Teknik Elektro", href: "https://docs.google.com/spreadsheets/d/1tC03OquH5jbKQrKlrKVHaU3CBT92SwVB/edit?usp=sharing&ouid=102145574220169337817&rtpof=true&sd=true", color: "text-blue-400", border: "hover:border-blue-400/50" },
        { name: "Teknik Sistem Energi", href: "https://docs.google.com/spreadsheets/d/1v_6_aL0rUah45jnGxYKakRC2E9pnJZn1/edit?usp=sharing&ouid=102145574220169337817&rtpof=true&sd=true", color: "text-yellow-400", border: "hover:border-yellow-400/50" },
        { name: "Teknik Tenaga Listrik", href: "https://sites.google.com/view/lab-ap-itpln/home?authuser=0", color: "text-green-400", border: "hover:border-green-400/50" },
        { name: "Teknologi Elektro", href: "https://docs.google.com/spreadsheets/d/1ddkwtD006nvsSJALKH84mut0m7SL0rVgOw3INDPh8K8/edit?gid=1398971844#gid=1398971844", color: "text-purple-400", border: "hover:border-purple-400/50" },
        { name: "Kelas Karyawan", href: "https://docs.google.com/spreadsheets/d/1ddkwtD006nvsSJALKH84mut0m7SL0rVgOw3INDPh8K8/edit?gid=1398971844#gid=1398971844", color: "text-red-400", border: "hover:border-red-400/50" },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Jadwal Praktikum</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Pilih kelas untuk melihat jadwal dan akses folder drive praktikum.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 gap-4">
                    {classes.map((cls, idx) => (
                        <a
                            key={idx}
                            href={cls.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`p-6 bg-[#111] border border-white/5 rounded-2xl flex items-center justify-between group transition-all duration-300 ${cls.border}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center ${cls.color} group-hover:scale-110 transition-transform`}>
                                    <Calendar size={24} />
                                </div>
                                <span className="text-lg font-bold text-white group-hover:text-white transition-colors">{cls.name}</span>
                            </div>
                            <div className="flex items-center text-gray-500 group-hover:text-white transition-colors gap-2">
                                <span className="text-sm hidden md:block">Buka folder drive</span>
                                <ExternalLink size={20} />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
