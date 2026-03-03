import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import assistantsData from './data.json';

export default function AslabPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-gray-100 font-sans p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Kembali ke Beranda
                </Link>

                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-lab-gold to-yellow-500">Daftar Asisten</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Tim Asisten Laboratorium Algoritma & Pemrograman.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assistantsData.map((aslab) => (
                        <div key={aslab.id} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-lab-gold/30 transition-all duration-300 group">
                            <div className="aspect-[3/4] relative overflow-hidden bg-white/5">
                                <img
                                    src={`/aslab/${aslab.id}.png`}
                                    alt={aslab.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-lab-gold transition-colors">{aslab.name}</h3>
                                <p className="text-gray-400 font-mono text-sm">{aslab.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
