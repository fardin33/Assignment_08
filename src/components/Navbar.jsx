"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = authClient.useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "#products" },
    { name: "My Profile", href: "/profile" },
  ];

  const logout = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const handleNavClick = (link) => {
    setActive(link.name);
    setIsOpen(false);

    if (link.href.startsWith("#")) {
      setTimeout(() => {
        const section = document.querySelector(link.href);
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const navItemClass = (linkName) =>
    `relative rounded-full px-5 py-2 transition ${
      active === linkName ? "text-black" : "text-white hover:text-amber-400"
    }`;

  return (
    <header className="fixed left-0 top-4 z-50 w-full">
      <nav className="relative mx-auto flex w-[92%] sm:w-[88%] md:w-[80%] lg:w-[70%] xl:w-[65%] max-w-285 items-center justify-between rounded-full border border-white/15 bg-white/10 px-6 lg:px-8 py-3 text-white shadow-2xl shadow-black/20 backdrop-blur-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-black">
          <span className="rounded-full bg-amber-400 p-2 text-teal-950 shadow-lg shadow-amber-500/20">
            <ShoppingBag size={20} />
          </span>
          SunCart
        </Link>

        {/* Large Screen View */}
        <div className="hidden items-center gap-2 text-sm font-bold md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <button
                key={link.name}
                onClick={() => handleNavClick(link)}
                className={navItemClass(link.name)}
              >
                {active === link.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-yellow-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link)}
                className={navItemClass(link.name)}
              >
                {active === link.name && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-yellow-500"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ),
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {session ? (
            <button
              onClick={logout}
              className="rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/15"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-teal-950 shadow-lg shadow-amber-500/20"
            >
              Login
            </Link>
          )}

          {/* Mobile View */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-white/15 p-2 text-white md:hidden"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-18 w-full rounded-3xl border border-white/15 bg-teal-950/90 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) =>
                  link.href.startsWith("#") ? (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link)}
                      className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                        active === link.name
                          ? "bg-amber-400 text-teal-950"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => handleNavClick(link)}
                      className={`rounded-2xl px-4 py-3 text-sm font-bold transition ${
                        active === link.name
                          ? "bg-amber-400 text-teal-950"
                          : "text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
