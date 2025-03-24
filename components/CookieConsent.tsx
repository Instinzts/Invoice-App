// "use client";

// import {
//   AlertDialog,
//   AlertDialogPortal,
//   AlertDialogContent,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogAction,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { useState, useEffect } from "react";

// export default function CookieConsent() {
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const accepted = localStorage.getItem("cookie-accepted");
//     if (!accepted) {
//       setOpen(true);
//     }
//   }, []);

//   const handleAccept = () => {
//     localStorage.setItem("cookie-accepted", "true");
//     setOpen(false);
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogPortal>
//         <AlertDialogContent className="fixed bottom-4 left-4 transform -translate-x-1 !top-auto !translate-y-0 z-50">
//           <AlertDialogTitle>Cookie Policy</AlertDialogTitle>
//           <AlertDialogDescription>
//             We use cookies to improve your experience. By using our site, you agree to our use of cookies.
//           </AlertDialogDescription>
//           <AlertDialogAction asChild>
//             <Button className="flex flex-col px-4 py-2 border border-[1px]" onClick={handleAccept}>Accept</Button>
//           </AlertDialogAction>
//         </AlertDialogContent>
//       </AlertDialogPortal>
//     </AlertDialog>
//   );
// }
