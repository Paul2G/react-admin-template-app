import { createRoot } from "react-dom/client";

import "~/config/i18n";
import "~/styles/app.css";
import "~/styles/tailwind.css";
import "@phosphor-icons/web/thin/style.css";
import "@phosphor-icons/web/light/style.css";
import "@phosphor-icons/web/bold/style.css";
import "@phosphor-icons/web/regular/style.css";
import "@phosphor-icons/web/duotone/style.css";

import { RouterProvider } from "react-router";

import router from "~/config/router.tsx";

const root = document.getElementById("root");

createRoot(root!).render(<RouterProvider router={router} />);
