"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Image from "next/image";

const STORAGE_KEY = "summer-store-profile";

const DEFAULT_AVATAR =
  "https://api.dicebear.com/9.x/adventurer/svg?seed=default-person";

// Step 1: localStorage, updated profile read function
function getSavedProfile() {
  try {
    if (typeof window === "undefined") return null;

    const profile = localStorage.getItem(STORAGE_KEY);
    return profile ? JSON.parse(profile) : null;
  } catch {
    return null;
  }
}

function getSafeImage(image) {
  if (!image || typeof image !== "string") {
    return DEFAULT_AVATAR;
  }

  const trimmedImage = image.trim();

  if (!trimmedImage) {
    return DEFAULT_AVATAR;
  }

  try {
    new URL(trimmedImage);
    return trimmedImage;
  } catch {
    return DEFAULT_AVATAR;
  }
}

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [savedProfile, setSavedProfile] = useState(null);
  const [imageError, setImageError] = useState(false);

  const user = session?.user;

  useEffect(() => {
    const loadProfile = () => {
      setSavedProfile(getSavedProfile());
      setImageError(false);
    };

    loadProfile();

    window.addEventListener("storage", loadProfile);
    window.addEventListener("focus", loadProfile);

    return () => {
      window.removeEventListener("storage", loadProfile);
      window.removeEventListener("focus", loadProfile);
    };
  }, [pathname]);

  const navbarProfile = useMemo(() => {
    const name =
      savedProfile?.name || user?.name || user?.email?.split("@")[0] || "User";

    const image = imageError
      ? DEFAULT_AVATAR
      : getSafeImage(savedProfile?.image || user?.image);

    return {
      name,
      image,
    };
  }, [
    savedProfile?.name,
    savedProfile?.image,
    user?.name,
    user?.email,
    user?.image,
    imageError,
  ]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "My Profile", href: "/profile" },
  ];

  const getActiveLink = () => {
    if (pathname === "/") return "Home";
    if (pathname.startsWith("/products")) return "Products";
    if (pathname.startsWith("/profile")) return "My Profile";
    if (pathname.startsWith("/UpdateProfile")) return "My Profile";

    return "";
  };

  const active = getActiveLink();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = async () => {
    await authClient.signOut();

    localStorage.removeItem(STORAGE_KEY);
    setSavedProfile(null);

    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  const handleNavClick = (link) => {
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
      active === linkName ? "text-teal-800" : "text-white hover:text-amber-400"
    }`;

  return (
    <header className="fixed left-0 top-3 z-50 w-full">
      <nav
        className={`relative mx-auto flex max-w-400 items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-3 text-white backdrop-blur-2xl transition-all duration-500 ease-in-out md:px-6 lg:px-8 ${
          isScrolled
            ? "w-[90%] md:w-[82%] lg:w-[78%]"
            : "w-[90%] md:w-[90%] lg:w-[85%]"
        }`}
      >
        <Link
          href="/"
          className="flex items-center gap-2 whitespace-nowrap text-xl font-black"
        >
          <span className="rounded-full bg-amber-400 p-2 text-teal-800 shadow-lg shadow-amber-500/20">
            <ShoppingBag size={20} />
          </span>

          <h2 className="bg-clip-text text-[18.5px] font-extrabold text-white md:text-[21.5px] lg:text-[24px]">
            Summer<span className="text-yellow-400">Store</span>
          </h2>
        </Link>

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
                    className="absolute inset-0 rounded-full bg-yellow-500 text-teal-800"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
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
                    className="absolute inset-0 rounded-full bg-yellow-500 text-teal-800"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10">{link.name}</span>
              </Link>
            ),
          )}
        </div>

        <div className="flex items-center gap-2">
          {session && (
            <Link
              href="/profile"
              className="hidden h-10 items-center gap-2 rounded-full bg-white/10 pl-1.5 pr-3 backdrop-blur-md transition hover:bg-white/15 md:flex"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-amber-400 text-teal-900">
                {navbarProfile.image ? (
                  <Image
                    src={navbarProfile.image}
                    alt={navbarProfile.name}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                    width={32}
                    height={32}
                    unoptimized
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <User size={17} />
                )}
              </div>

              <span className="max-w-24 truncate text-xs font-bold text-white lg:max-w-32">
                {navbarProfile.name}
              </span>
            </Link>
          )}

          {session ? (
            <button
              onClick={logout}
              className="hidden h-10 rounded-full bg-white/10 px-5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-teal-800 md:block"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden h-10 items-center rounded-full bg-amber-400 px-5 text-sm font-bold text-teal-800 shadow-lg shadow-amber-500/20 md:flex"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full border border-white/15 p-2 text-white md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="absolute left-0 top-18 w-full rounded-3xl border border-white/15 bg-teal-950/95 p-4 shadow-2xl backdrop-blur-2xl md:hidden"
            >
              <div className="flex min-h-75 flex-col">
                {session && (
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 transition hover:bg-white/15"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-amber-400 text-teal-900">
                      {navbarProfile.image ? (
                        <Image
                          src={navbarProfile.image}
                          alt={navbarProfile.name}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          width={44}
                          height={44}
                          unoptimized
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        <User size={20} />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold text-white/50">
                        Logged in as
                      </p>
                      <p className="truncate text-sm font-extrabold text-white">
                        {navbarProfile.name}
                      </p>
                    </div>
                  </Link>
                )}

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) =>
                    link.href.startsWith("#") ? (
                      <button
                        key={link.name}
                        onClick={() => handleNavClick(link)}
                        className={`rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
                          active === link.name
                            ? "bg-amber-400 text-teal-800"
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
                            ? "bg-amber-400 text-teal-800"
                            : "text-white/80 hover:bg-white/10"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ),
                  )}
                </div>

                <div className="mt-auto border-t border-white/10 pt-4">
                  {session ? (
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        logout();
                      }}
                      className="w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-extrabold text-teal-900 transition hover:bg-amber-300"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full rounded-2xl bg-amber-400 px-4 py-3 text-center text-sm font-extrabold text-teal-900 transition hover:bg-amber-300"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
