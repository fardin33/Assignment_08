// import { Suspense } from "react";
// import LoginForm from "./LoginForm";

// export default function LoginPage() {
//   return (
//     <Suspense
//       fallback={
//         <main className="flex min-h-screen items-center justify-center px-4 text-white">
//           <div className="rounded-3xl border border-white/10 bg-white/10 px-8 py-6 backdrop-blur-xl">
//             Loading login...
//           </div>
//         </main>
//       }
//     >
//       <LoginForm />
//     </Suspense>
//   );
// }

import { Suspense } from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center px-4 text-white">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)] backdrop-blur-xl">
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-4 border-white/10" />
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-white border-r-white/70" />
            </div>
          </div>  
        </main>
      }
    >
      <LoginForm /> 
    </Suspense>
  );
}
