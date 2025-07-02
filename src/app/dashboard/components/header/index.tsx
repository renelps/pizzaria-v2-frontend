"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  async function handleLogout(){
    deleteCookie("session", { path: "/" })
    setIsOpen(false)
    router.replace("/")
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="flex items-center justify-center h-16 bg-black/70 relative z-50">
      <div className="max-w-7xl flex items-center justify-between w-full px-4">
        <Link
          href="/dashboard"
          className="text-lg sm:text-2xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
        >
          Pizzaria <span className="text-red-500">Oliveira</span>
        </Link>

        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className="hidden md:flex items-center gap-4 font-medium text-sm sm:text-lg text-white">
          <Link href="/dashboard/category">Nova categoria</Link>
          <Link href="/dashboard/menu">Cardápio</Link>
          <form className="flex items-center">
            <button onClick={handleLogout} >
              <FiLogOut size={24} />
            </button>
          </form>
        </nav>

        {isOpen && (
          <div
            ref={menuRef}
            className="absolute top-16 left-0 w-full bg-black/90 flex flex-col gap-4 p-4 text-white md:hidden items-center"
          >
            <Link href="/dashboard/category" onClick={() => setIsOpen(false)}>Nova categoria</Link>
            <Link href="/dashboard/menu" onClick={() => setIsOpen(false)}>Cardápio</Link>
            <button onClick={handleLogout} className="flex gap-2 items-center">
              <FiLogOut size={20} color="#fff" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}