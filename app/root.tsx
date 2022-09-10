import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from "./components/Header";
import ThemeProvider from "./components/ThemeProvider";
import guess from './assets/guess.png';
import personal from './assets/personal.png';
import thebardabot from './assets/thebardabot.png';
import type { LinksFunction } from "@remix-run/react/dist/routeModules";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Tom Darneix Personal Website",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "preload", href: guess, as: 'image' }, { rel: "preload", href: personal, as: 'image' }, { rel: "preload", href: thebardabot, as: 'image' }];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider>
          <>
            <Header />
            <Outlet />
          </>
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
