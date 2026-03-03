
import Link from 'next/link';
import { ArrowRight, Code, Cpu, Database } from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans selection:bg-lab-red selection:text-white">

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Abstract Background */}
                <div className="absolute top-0 inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-lab-red/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 relative z-10 flex flex-col items-center text-center">
                    <div className="mb-6 px-4 py-1.5 rounded-full border border-lab-red/30 bg-lab-red/10 text-lab-gold text-xs font-semibold uppercase tracking-wider">
                        Selamat Datang di Portal Resmi
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                        Laboratorium <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lab-red to-red-500">Algoritma</span> & Pemrograman
                    </h1>

                    <p className="max-w-2xl text-lg md:text-xl text-gray-400 mb-10 leading-relaxed">
                        Platform terpusat untuk mahasiswa, asisten laboratorium, dan dosen.
                        Akses modul pembelajaran, latihan koding, dan informasi praktikum dalam satu tempat.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/learn"
                            className="group px-8 py-4 bg-lab-red hover:bg-red-800 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-lab-red/25 flex items-center gap-2"
                        >
                            Mulai Belajar Coding
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/aslab"
                            className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl font-medium transition-all duration-300 backdrop-blur-sm"
                        >
                            Lihat Daftar Aslab
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        href="/file"
                        icon={<Database className="text-green-400" size={32} />}
                        title="File"
                        desc="Template laporan dan file penunjang praktikum."
                    />
                    <FeatureCard
                        href="/modul"
                        icon={<Code className="text-lab-gold" size={32} />}
                        title="Modul Praktikum"
                        desc="Akses modul praktikum untuk semua kelas."
                    />
                    <FeatureCard
                        href="/jadwal"
                        icon={<Cpu className="text-blue-400" size={32} />}
                        title="Jadwal Praktikum"
                        desc="Informasi jadwal dan link Google Drive per kelas."
                    />
                    <FeatureCard
                        href="/aplikasi"
                        icon={<Code className="text-purple-400" size={32} />}
                        title="Aplikasi Koding"
                        desc="Download tools dan aplikasi penunjang coding."
                    />
                </div>
            </div>

        </div>
    );
}

function FeatureCard({ icon, title, desc, href }: { icon: React.ReactNode, title: string, desc: string, href: string }) {
    return (
        <Link href={href} className="block h-full">
            <div className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-lab-red/30 hover:bg-[#161616] transition-all duration-300 group h-full flex flex-col items-start text-left">
                <div className="mb-4 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-lab-red transition-colors">{title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                    {desc}
                </p>
            </div>
        </Link>
    )
}
