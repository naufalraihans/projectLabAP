import Link from 'next/link';
import { ArrowLeft, Download, Terminal, Code } from 'lucide-react';

export default function AplikasiPage() {
    const apps = [
        {
            name: "Visual Studio Code",
            desc: "Code editor populer dengan ekstensi lengkap.",
            href: "https://code.visualstudio.com/download",
            icon: <Code size={32} className="text-blue-500" />
        },
        {
            name: "Python 3.12",
            desc: "Bahasa pemrograman wajib untuk praktikum.",
            href: "https://www.python.org/downloads/",
            icon: <Terminal size={32} className="text-yellow-400" />
        },
        {
            name: "MinGW-w64",
            desc: "Compiler C/C++ untuk Windows.",
            href: "https://www.mingw-w64.org/downloads/",
            icon: <Terminal size={32} className="text-gray-400" />
        },
        {
            name: "Git SCM",
            desc: "Version control system untuk kolaborasi.",
            href: "https://git-scm.com/downloads",
            icon: <Terminal size={32} className="text-orange-500" />
        },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Aplikasi Koding</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Tools dan aplikasi esensial untuk mendukung kegiatan praktikum.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {apps.map((app, idx) => (
                        <a
                            key={idx}
                            href={app.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-8 bg-[#111] border border-white/5 rounded-2xl flex items-start gap-6 group hover:bg-[#161616] hover:border-purple-500/30 transition-all duration-300"
                        >
                            <div className="bg-white/5 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                {app.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{app.name}</h3>
                                <p className="text-gray-400 mb-4 text-sm leading-relaxed">{app.desc}</p>
                                <div className="flex items-center text-purple-400 font-medium text-sm group-hover:underline decoration-purple-400/30 underline-offset-4">
                                    <Download size={16} className="mr-2" />
                                    Download Sekarang
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
