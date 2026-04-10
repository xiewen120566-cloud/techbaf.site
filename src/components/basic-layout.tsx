import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { PropsWithChildren } from "react";
import Script from "next/script";

import { Locale } from "@/i18n/routing";

import { Providers } from "./providers";

interface Props extends PropsWithChildren {
  locale: Locale;
}

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
        <Script
          id="google-gpt-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
window.googletag = window.googletag || {cmd: []};
googletag.cmd.push(function() {
  googletag.defineSlot(
    '/23344817886/4999',
    [[300, 250], [300, 50], [300, 100], [300, 31], [300, 75], [320, 50]],
    'div-gpt-ad-1775825598345-0'
  ).addService(googletag.pubads());
  googletag.defineSlot(
    '/23344817886/4999',
    [[300, 250], [300, 50], [300, 100], [300, 31], [300, 75], [320, 50]],
    'div-gpt-ad-1775825598345-1'
  ).addService(googletag.pubads());
  googletag.pubads().enableSingleRequest();
  googletag.enableServices();
});
            `,
          }}
        />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <div className="gpt-sticky-bottom">
              <div className="gpt-sticky-bottom__inner">
                <div
                  id="div-gpt-ad-1775825598345-0"
                  style={{ minWidth: "300px", minHeight: "31px" }}
                />
                <Script
                  id="google-gpt-display"
                  strategy="afterInteractive"
                  dangerouslySetInnerHTML={{
                    __html: `
googletag.cmd.push(function() { googletag.display('div-gpt-ad-1775825598345-0'); });
                    `,
                  }}
                />
              </div>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
