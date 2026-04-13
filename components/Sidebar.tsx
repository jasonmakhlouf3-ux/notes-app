"use client";
import { useState } from "react";
import { Home as HomeIcon, FileText, Settings, Menu } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`${isOpen ? "w-44" : "w-20"} min-h-screen bg-zinc-800 p-4 text-white`}>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-6 flex items-center justify-center w-10 h-10 rounded-md hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        <Menu size={22} />
      </button>

      {isOpen && (
        <h2 className="text-center border-b border-zinc-700 pb-3 text-lg font-semibold mb-6">
          Menu
        </h2>
      )}

      <ul className="space-y-2">

        <li className={`rounded-lg transition-colors hover:bg-zinc-700 cursor-pointer ${isOpen ? "flex items-center gap-3 px-3 py-3" : "flex flex-col items-center gap-1 py-3"}`}>
        <Link href="/" className={`w-full ${isOpen ? "flex items-center gap-3" : "flex flex-col items-center gap-1"}`}>
            {isOpen ? (<><HomeIcon size={20} /><span>Home</span></>) : (<><HomeIcon size={24} /><span className="text-xs">Home</span></>)}
        </Link>
        </li>

        <li className={`rounded-lg transition-colors hover:bg-zinc-700 cursor-pointer ${isOpen ? "flex items-center gap-3 px-3 py-3" : "flex flex-col items-center gap-1 py-3"}`}>
        <Link href="/notes" className={`w-full ${isOpen ? "flex items-center gap-3" : "flex flex-col items-center gap-1"}`}>
            {isOpen ? (<><FileText size={20} /><span>Notes</span></>) : (<><FileText size={24} /><span className="text-xs">Notes</span></>)}
        </Link>
        </li>   

        <li className={`rounded-lg transition-colors hover:bg-zinc-700 cursor-pointer ${isOpen ? "flex items-center gap-3 px-3 py-3" : "flex flex-col items-center gap-1 py-3"}`}>
        <Link href="/settings" className={`w-full ${isOpen ? "flex items-center gap-3" : "flex flex-col items-center gap-1"}`}>
            {isOpen ? (<><Settings size={20} /><span>Settings</span></>) : (<><Settings size={24} /><span className="text-xs">Settings</span></>)}
        </Link>
        </li>

      </ul>
    </div>
  );
}