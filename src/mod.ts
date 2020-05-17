import p from "puppeteer";
import * as z from "zod";
export const getImageSchema = z.object({
  url: z.string(),
  filename: z.string(),
  viewport: z.object({}).nonstrict().optional(), // infer<Viewport>;
});
export type GetImage = z.infer<typeof getImageSchema>;
export async function getImage({ url, filename, viewport }: GetImage) {
  const browser = await p.launch({
    headless: process.env.NODE_ENV === "development" ? false : true,
    args: [
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--allow-running-insecure-content",
    ],
  });
  const page = await browser.newPage();
  const viewportOpts = {
    isMobile: true,
    width: 600,
    height: 800,
    // width: 1072,
    // height: 1448,
    isLandscape: false,
    ...viewport,
  };
  await page.setViewport(viewportOpts);
  await page.goto(url, { waitUntil: "networkidle0" });
  await new Promise((res) => setTimeout(res, 1000));
  await page.screenshot({
    path: filename,
    clip: {
      x: 0,
      y: 0,
      width: viewportOpts.width,
      height: viewportOpts.height,
    },
  });
  await browser.close();
}
