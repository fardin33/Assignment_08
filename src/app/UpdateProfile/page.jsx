// "use client";

// import { useMemo, useState } from "react";
// import { useRouter } from "next/navigation";
// import Lottie from "lottie-react";
// import { ArrowLeft, Check, ImageIcon, Save, User } from "lucide-react";
// import { authClient } from "@/lib/auth-client";
// import loadingAnimation from "@/assets/Insider-loading.json";
// import Image from "next/image";

// const STORAGE_KEY = "summer-store-profile";

// const avatarOptions = [
//   "https://api.dicebear.com/9.x/adventurer/svg?seed=ami",
//   "https://api.dicebear.com/9.x/bottts/svg?seed=robot",
//   "https://api.dicebear.com/9.x/avataaars/svg?seed=boy",
//   "https://api.dicebear.com/9.x/avataaars/svg?seed=girl",
//   "https://api.dicebear.com/9.x/fun-emoji/svg?seed=happy",
//   "https://api.dicebear.com/9.x/lorelei/svg?seed=pro",
//   "https://api.dicebear.com/9.x/personas/svg?seed=customer",
//   "https://api.dicebear.com/9.x/shapes/svg?seed=summer",
// ];

// function getSavedProfile() {
//   try {
//     if (typeof window === "undefined") return null;

//     const savedProfile = localStorage.getItem(STORAGE_KEY);

//     return savedProfile ? JSON.parse(savedProfile) : null;
//   } catch {
//     return null;
//   }
// }

// export default function UpdateProfilePage() {
//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();

//   const user = session?.user;

//   const [savedProfile] = useState(() => getSavedProfile());

//   const [formData, setFormData] = useState(() => ({
//     name: savedProfile?.name ?? "",
//     image: savedProfile?.image ?? "",
//   }));

//   const [isSaving, setIsSaving] = useState(false);

//   const displayName = formData.name || user?.name || "";
//   const displayImage = formData.image || user?.image || "";

//   const previewImage = useMemo(() => {
//     return displayImage || avatarOptions[0];
//   }, [displayImage]);

//   const handleNameChange = (event) => {
//     setFormData((prev) => ({
//       ...prev,
//       name: event.target.value,
//     }));
//   };

//   const handleImageChange = (event) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: event.target.value,
//     }));
//   };

//   const handleAvatarSelect = (avatar) => {
//     setFormData((prev) => ({
//       ...prev,
//       image: avatar,
//     }));
//   };

//   const handleCancel = () => {
//     router.push("/profile");
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     setIsSaving(true);

//     const updatedProfile = {
//       name: displayName || "Customer",
//       email: user?.email || savedProfile?.email || "",
//       image: previewImage,
//     };

//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));

//     setTimeout(() => {
//       router.push("/profile");
//     }, 2000);
//   };

//   if (isPending) {
//     return (
//       <main className="min-h-screen bg-[#042f2e] pt-32 text-white">
//         <section className="mx-auto w-11/12 max-w-7xl">
//           <div className="h-80 animate-pulse rounded-4xl border border-white/10 bg-white/10 backdrop-blur-md" />
//         </section>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-[#042f2e] pt-32 pb-20 text-white">
//       <section className="mx-auto w-11/12 max-w-7xl">
//         <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/10 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8">
//           <button
//             type="button"
//             onClick={handleCancel}
//             className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
//           >
//             <ArrowLeft size={16} />
//             Back to Profile
//           </button>

//           <div className="rounded-3xl border border-white/10 bg-black/10 p-6 text-center">
//             <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
//               Update Profile
//             </p>

//             <h1 className="mt-3 text-3xl font-black md:text-5xl">
//               Update{" "}
//               <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
//                 Information
//               </span>
//             </h1>

//             <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-6 text-white/60">
//               Change your name and profile image information from here.
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 space-y-6 rounded-3xl border border-white/10 bg-black/10 p-6"
//           >
//             <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
//               <div className="flex items-center gap-5">
//                 <div className="relative">
//                   <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
//                     <Image
//                       src={previewImage}
//                       alt="Profile preview"
//                       className="h-full w-full object-cover"
//                       width={96}
//                       height={96}
//                     />
//                   </div>

//                   <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
//                     <Check size={17} />
//                   </div>
//                 </div>

//                 <div>
//                   <h2 className="text-xl font-black text-white">
//                     {displayName || "Customer"}
//                   </h2>

//                   <p className="mt-1 text-sm font-bold text-yellow-300">
//                     {user?.email || savedProfile?.email || "No email found"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid gap-5 md:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-black text-white/80">
//                   Display Name
//                 </label>

//                 <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
//                   <User size={18} className="text-yellow-300" />

//                   <input
//                     type="text"
//                     name="name"
//                     value={displayName}
//                     onChange={handleNameChange}
//                     placeholder="Enter your name"
//                     className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-black text-white/80">
//                   Photo URL
//                 </label>

//                 <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
//                   <ImageIcon size={18} className="text-yellow-300" />

//                   <input
//                     type="text"
//                     name="image"
//                     value={displayImage}
//                     onChange={handleImageChange}
//                     placeholder="Enter profile image URL"
//                     className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <div className="mb-4 flex items-center justify-between gap-3">
//                 <p className="text-sm font-black text-white/80">
//                   Premium Default Avatars
//                 </p>

//                 <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
//                   Pro Choice
//                 </span>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 {avatarOptions.map((avatar) => {
//                   const isSelected = previewImage === avatar;

//                   return (
//                     <button
//                       key={avatar}
//                       type="button"
//                       onClick={() => handleAvatarSelect(avatar)}
//                       className={`h-14 w-14 overflow-hidden rounded-2xl border bg-white p-1 transition duration-300 hover:-translate-y-1 ${
//                         isSelected
//                           ? "border-green-400 shadow-lg shadow-green-500/30 ring-2 ring-green-400"
//                           : "border-white/10"
//                       }`}
//                     >
//                       <Image
//                         src={avatar}
//                         alt="Avatar option"
//                         className="h-full w-full rounded-xl object-cover"
//                         width={96}
//                         height={96}
//                       />
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="grid gap-4 md:grid-cols-[1fr_150px]">
//               <button
//                 type="submit"
//                 disabled={isSaving}
//                 className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-black text-white shadow-md shadow-gray-500/50 transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
//               >
//                 {isSaving ? (
//                   <span className="flex h-8 w-28 items-center justify-center">
//                     <Lottie
//                       animationData={loadingAnimation}
//                       loop
//                       className="h-18 w-30"
//                     />
//                   </span>
//                 ) : (
//                   <>
//                     <Save size={17} />
//                     Save Changes
//                   </>
//                 )}
//               </button>

//               <button
//                 type="button"
//                 onClick={handleCancel}
//                 disabled={isSaving}
//                 className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white/70 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import { ArrowLeft, Check, ImageIcon, Save, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import loadingAnimation from "@/assets/Insider-loading.json";
import Image from "next/image";

const STORAGE_KEY = "summer-store-profile";

// Step 1: Default profile image
// image path empty হলে এই default avatar show করবে
const DEFAULT_AVATAR =
  "https://api.dicebear.com/9.x/adventurer/svg?seed=default-person";

const avatarOptions = [
  DEFAULT_AVATAR,
  "https://api.dicebear.com/9.x/adventurer/svg?seed=ami",
  "https://api.dicebear.com/9.x/bottts/svg?seed=robot",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=boy",
  "https://api.dicebear.com/9.x/avataaars/svg?seed=girl",
  "https://api.dicebear.com/9.x/fun-emoji/svg?seed=happy",
  "https://api.dicebear.com/9.x/lorelei/svg?seed=pro",
  "https://api.dicebear.com/9.x/personas/svg?seed=customer",
  "https://api.dicebear.com/9.x/shapes/svg?seed=summer",
];

function getSavedProfile() {
  try {
    if (typeof window === "undefined") return null;

    const savedProfile = localStorage.getItem(STORAGE_KEY);

    return savedProfile ? JSON.parse(savedProfile) : null;
  } catch {
    return null;
  }
}

// Step 2: Safe image URL checker
// Empty, null, undefined, invalid string হলে default avatar return করবে
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

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [savedProfile] = useState(() => getSavedProfile());

  const [formData, setFormData] = useState(() => ({
    name: savedProfile?.name ?? "",
    image: savedProfile?.image ?? "",
  }));

  const [isSaving, setIsSaving] = useState(false);

  // Step 3: Image load fail করলে এই state true হবে
  const [imageError, setImageError] = useState(false);

  const displayName = formData.name || user?.name || "";

  // Step 4: input image না থাকলে user image, সেটাও না থাকলে default avatar
  const displayImage = formData.image || user?.image || "";

  const previewImage = useMemo(() => {
    if (imageError) {
      return DEFAULT_AVATAR;
    }

    return getSafeImage(displayImage);
  }, [displayImage, imageError]);

  const handleNameChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleImageChange = (event) => {
    const value = event.target.value;

    // Step 5: user image input change করলে previous image error reset হবে
    setImageError(false);

    setFormData((prev) => ({
      ...prev,
      image: value,
    }));
  };

  const handleAvatarSelect = (avatar) => {
    setImageError(false);

    setFormData((prev) => ({
      ...prev,
      image: avatar,
    }));
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsSaving(true);

    // if image path is empty Then It show default avatar :
    const safeImage = getSafeImage(formData.image || user?.image);

    const updatedProfile = {
      name: displayName || "Customer",
      email: user?.email || savedProfile?.email || "",
      image: safeImage,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));

    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#042f2e] pt-32 text-white">
        <section className="mx-auto w-11/12 max-w-7xl">
          <div className="h-80 animate-pulse rounded-4xl border border-white/10 bg-white/10 backdrop-blur-md" />
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#042f2e] pt-32 pb-20 text-white">
      <section className="mx-auto w-11/12 max-w-7xl">
        <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/10 p-5 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl md:p-8">
          <button
            type="button"
            onClick={handleCancel}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm font-bold text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </button>

          <div className="rounded-3xl border border-white/10 bg-black/10 p-6 text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-yellow-400">
              Update Profile
            </p>

            <h1 className="mt-3 text-3xl font-black md:text-5xl">
              Update{" "}
              <span className="bg-linear-to-r from-teal-300 to-yellow-300 bg-clip-text text-transparent">
                Information
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-6 text-white/60">
              Change your name and profile image information from here.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-6 rounded-3xl border border-white/10 bg-black/10 p-6"
          >
            <div className="rounded-3xl border border-yellow-400/20 bg-yellow-400/10 p-5">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                      width={96}
                      height={96}
                      // Step 7: image URL broken error Handle :
                      onError={() => setImageError(true)}
                    />
                  </div>

                  <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-lg">
                    <Check size={17} />
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black text-white">
                    {displayName || "Customer"}
                  </h2>

                  <p className="mt-1 text-sm font-bold text-yellow-300">
                    {user?.email || savedProfile?.email || "No email found"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-white/80">
                  Display Name
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <User size={18} className="text-yellow-300" />

                  <input
                    type="text"
                    name="name"
                    value={displayName}
                    onChange={handleNameChange}
                    placeholder="Enter your name"
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-white/80">
                  Photo URL Optional
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <ImageIcon size={18} className="text-yellow-300" />

                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleImageChange}
                    placeholder="Leave empty for default profile image"
                    className="w-full bg-transparent text-sm font-semibold text-white outline-none placeholder:text-white/30"
                  />
                </div>

                <p className="mt-2 text-xs font-semibold text-white/45">
                  Leave empty for default profile image
                </p>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-black text-white/80">
                  Premium Default Avatars
                </p>

                <span className="rounded-full bg-green-500 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
                  Pro Choice
                </span>
              </div>

              <div className="flex flex-wrap gap-3">
                {avatarOptions.map((avatar) => {
                  const isSelected = previewImage === avatar;

                  return (
                    <button
                      key={avatar}
                      type="button"
                      onClick={() => handleAvatarSelect(avatar)}
                      className={`h-14 w-14 overflow-hidden rounded-2xl border bg-white p-1 transition duration-300 hover:-translate-y-1 ${
                        isSelected
                          ? "border-green-400 shadow-lg shadow-green-500/30 ring-2 ring-green-400"
                          : "border-white/10"
                      }`}
                    >
                      <Image
                        src={avatar}
                        alt="Avatar option"
                        className="h-full w-full rounded-xl object-cover"
                        width={96}
                        height={96}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_150px]">
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal-700 px-6 py-3 text-sm font-black text-white shadow-md shadow-gray-500/50 transition duration-300 hover:-translate-y-1 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSaving ? (
                  <span className="flex h-8 w-28 items-center justify-center">
                    <Lottie
                      animationData={loadingAnimation}
                      loop
                      className="h-18 w-30"
                    />
                  </span>
                ) : (
                  <>
                    <Save size={17} />
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCancel}
                disabled={isSaving}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-black text-white/70 transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
