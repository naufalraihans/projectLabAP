import Link from 'next/link';
import { ArrowLeft, FileText, FileDown, FolderOpen } from 'lucide-react';

const BASE_URL = "https://raw.githubusercontent.com/naufalraihans/projectLabAP/master/public";

const categories = [
    {
        title: "Template Laporan",
        color: "text-green-400",
        borderHover: "hover:border-green-400/30",
        items: [
            {
                name: "FORMAT LAPORAN AP",
                pdfUrl: `${BASE_URL}/laporan/FORMAT%20LAPORAN%20AP.pdf`,
                docxUrl: `${BASE_URL}/laporan/FORMAT%20LAPORAN%20AP.docx`,
            },
        ],
    },
    {
        title: "Template Lembar Kerja",
        color: "text-blue-400",
        borderHover: "hover:border-blue-400/30",
        items: [
            {
                name: "Lembar Kerja AP",
                pdfUrl: `${BASE_URL}/lembarKerja/Lembar%20Kerja%20AP%20(1).pdf`,
                docxUrl: `${BASE_URL}/lembarKerja/Lembar%20Kerja%20AP%20(1).docx`,
            },
        ],
    },
];

export default function FilePage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-6 md:p-12">
            <div className="max-w-5xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                            File Management
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Unduh template dan dokumen penting praktikum.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className={`bg-[#111] border border-white/5 rounded-2xl p-6 transition-all duration-300 ${cat.borderHover}`}
                        >
                            <h2 className={`text-xl font-bold mb-6 flex items-center gap-3 ${cat.color}`}>
                                <FolderOpen size={22} />
                                {cat.title}
                            </h2>
                            <div className="space-y-4">
                                {cat.items.map((item, itemIdx) => (
                                    <div
                                        key={itemIdx}
                                        className="p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/8 transition-colors"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <FileText className="text-gray-400 shrink-0" size={20} />
                                            <span className="font-medium text-white">{item.name}</span>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={item.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 text-red-400 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-200"
                                            >
                                                <FileDown size={15} />
                                                PDF
                                            </a>
                                            <a
                                                href={item.docxUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                download
                                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 text-blue-400 hover:text-blue-300 rounded-lg text-sm font-medium transition-all duration-200"
                                            >
                                                <FileDown size={15} />
                                                DOCX
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
