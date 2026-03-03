import Link from 'next/link';
import { ArrowLeft, BookOpen, Download } from 'lucide-react';

export default function ModulPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lab-red to-orange-500">Modul Praktikum</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Unduh modul praktikum untuk pembelajaran.
                    </p>
                </div>

                <div className="grid md:grid-cols-1 gap-6">
                    <div className="p-8 bg-[#111] border border-white/5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:border-lab-red/30 transition-all duration-300 group">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-lab-red/10 flex items-center justify-center text-lab-red group-hover:scale-110 transition-transform">
                                <BookOpen size={32} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Modul Praktikum Lengkap</h3>
                                <p className="text-gray-400">Panduan lengkap praktikum Algoritma & Pemrograman.</p>
                            </div>
                        </div>
                        <a
                            href="https://raw.githubusercontent.com/naufalraihans/projectLabAP/master/public/modul/MODUL%20FULL%20FIX.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="px-6 py-3 bg-lab-red hover:bg-red-700 text-white rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-lg shadow-lab-red/20"
                        >
                            <Download size={20} />
                            Download PDF
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
