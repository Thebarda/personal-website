import Header from '~/components/Header';

import ThemeProvider from "~/components/ThemeProvider";

export default function Index() {
  return (
    <ThemeProvider>
      <Header />
    </ThemeProvider>
  );
}
