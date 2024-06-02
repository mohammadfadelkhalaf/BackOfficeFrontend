// "use client";
// import { useRouter } from "next/navigation";
// import React, { useEffect } from "react";

// const WithAuth = (WrappedComponent: any) => {
//   const router = useRouter();
//   return (props: any) => {
//     // useEffect(() => {
//     //   const token = localStorage.getItem("token");
//     //   if (!token) {
//     //     router.replace("/");
//     //   }
//     // }, [router]);
//     const token = localStorage.getItem("token");
//     if (!token) {
//       router.replace("/");
//     }
//     return <WrappedComponent {...props} />;
//   };
// };

// export default WithAuth;

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const WithAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  // Set display name for better debugging
  Wrapper.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return Wrapper;
};

export default WithAuth;
