"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Terminal, Home, Users, FileText, Code } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="h-16 border-b border-white/10 bg-lab-red text-white flex items-center px-4 md:px-8 shadow-lg sticky top-0 z-50">
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 relative flex items-center justify-center">
          <Image
            src="/logoLab.png"
            alt="Lab Logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm md:text-base tracking-wide text-white">
            LABORATORIUM
          </span>
          <span className="text-[10px] md:text-xs text-white/70 font-medium">
            ALGORITMA DAN PEMROGRAMAN
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <NavLink
          href="/"
          icon={<Home size={18} />}
          label="Home"
          active={isActive("/")}
        />
        <NavLink
          href="/aslab"
          icon={<Users size={18} />}
          label="Daftar Aslab"
          active={isActive("/aslab")}
        />
        <NavLink
          href="/file"
          icon={<FileText size={18} />}
          label="File"
          active={isActive("/file")}
        />
        <NavLink
          href="/learn"
          icon={<Code size={18} />}
          label="Learn"
          active={isActive("/learn")}
        />
        <NavLink
          href="https://praktikkan-lab-ap.vercel.app/index.html"
          icon={<Terminal size={18} />}
          label="Log in"
          active={false}
        />
      </div>

      {/* Mobile Menu Button - simplified for now */}
      <div className="md:hidden">
        {/* Add mobile menu logic here if needed */}
      </div>
    </nav>
  );
}

function NavLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-300 ${
        active
          ? "bg-black/30 text-lab-gold font-medium shadow-inner"
          : "hover:bg-white/10 text-white/90 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}
