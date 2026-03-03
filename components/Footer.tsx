import React from 'react';
import Link from 'next/link';
import { Github, Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#18181b] border-t border-white/10 pt-12 pb-8 text-sm">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h3 className="text-lg font-bold text-white tracking-wide">LABORATORIUM</h3>
                            <p className="text-lab-gold font-medium text-xs tracking-wider">ALGORITMA DAN PEMROGRAMAN</p>
                        </div>
                        <p className="text-gray-400 leading-relaxed max-w-xs">
                            Platform pembelajaran dan praktikum resmi Laboratorium Algoritma dan Pemrograman.
                            Membentuk talenta coding masa depan.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href="#" icon={<Github size={18} />} label="Github" />
                            <SocialLink href="#" icon={<Instagram size={18} />} label="Instagram" />
                            <SocialLink href="#" icon={<Mail size={18} />} label="Email" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Menu Navigasi</h4>
                        <ul className="space-y-3">
                            <FooterLink href="/" label="Beranda" />
                            <FooterLink href="/aslab" label="Tentang Aslab" />
                            <FooterLink href="/file" label="Dokumen & Modul" />
                            <FooterLink href="/learn" label="Platform Coding" />
                        </ul>
                    </div>

                    {/* Contact/Location */}
                    <div>
                        <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">Lokasi & Kontak</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex gap-3 items-start">
                                <MapPin size={18} className="text-lab-red mt-0.5 shrink-0" />
                                <span>
                                    Menara PLN <br />
                                    Jl. Lkr. Luar Barat Lantai 2, RT.1/RW.1, Duri Kosambi, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11750, <br />
                                    <br />
                                    Smart Electronic Systems Laboratory <br />
                                    Gedung C lantai 2. <br />
                                    Institut Teknologi PLN
                                    <br />
                                </span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <Mail size={18} className="text-lab-red shrink-0" />
                                <span>labalgoritmapemrograman@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Laboratorium Algoritma dan Pemrograman. All rights reserved.</p>
                    <p>yg bikin website ini adalah sang raja yaitu <span className="text-lab-red">Aslab AP</span></p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
    return (
        <a
            href={href}
            className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-lab-red hover:text-white transition-all duration-300"
            aria-label={label}
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, label }: { href: string, label: string }) {
    return (
        <li>
            <Link
                href={href}
                className="text-gray-400 hover:text-white hover:text-lab-gold transition-colors duration-200 block w-fit"
            >
                {label}
            </Link>
        </li>
    );
}
