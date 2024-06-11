import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { useEffect } from "react";
import { getSession, sessionStorage } from "./.server/session";
import toast, { Toaster } from "react-hot-toast";
import { createClient } from "./.server/supabase";

export async function loader({ request }) {
  let session = await getSession(request);
  let toastMessage = session.get('toastMessage');

  let { supabase, headers } = createClient(request);
  // let { data: { user }, error } = await supabase.auth.getUser();

  let { data, error } = await supabase.auth.getSession();
  let user = data.session?.user;

  console.log({ user });


  if (error) {
    throw error;
  }


  let allHeaders = {
    ...Object.fromEntries(headers.entries()),
    "Set-Cookie": await sessionStorage.commitSession(session)
  }
  return json({ toastMessage, user }, {
    headers: allHeaders
  });
}

export function Layout({ children }) {
  let { toastMessage, user } = useLoaderData();

  useEffect(() => {
    if (!toastMessage) {
      return;
    }
    const { message, type } = toastMessage;

    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        throw new Error(`${type} is not handled`);
    }
  }, [toastMessage]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-[#9574AE]">
        <header className="absolute top-10 left-0 right-0 px-6">
          <div className="w-full flex justify-end">
            {user ?
              <div className="flex gap-2 items-center">
                <p className="text-white">Signed in as {user.email}</p>
                <form
                  method="post"
                  action="/logout"
                  className="bg-red-500 hover:bg-red-400 transition ease-in-out duration-300 text-white px-4 py-2 rounded"
                >
                  <button type="submit">Log out</button>
                </form>
              </div>
              : <Link to="/login" className="bg-white hover:bg-gray-300 transition ease-in-out duration-300 px-4 py-2 rounded text-gray-800">Log in</Link>
            }
          </div>
        </header>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Toaster />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
