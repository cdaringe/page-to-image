import { getImage, getImageSchema } from "./mod";
import yargs from "yargs";
require("perish");

async function go() {
  const cliArgs = yargs
  .option("width", {
    alias: "w",
    describe: "width",
    default: 600,
  })
  .option("height", {
    alias: "h",
    describe: "height",
    default: 800,
  })
    .option("url", {
      alias: "u",
      describe: "https://my.page",
      default: "https://cdaringe.github.io/rss-buddy",
    })
    .option("filename", {
      alias: "f",
      describe: "filename to write, e.g. /path/to/myimage.png",
      default: "out.png",
    }).argv;
  const args = getImageSchema.nonstrict().parse(cliArgs);
  await getImage({
    url: args.url,
    filename: args.filename,
    viewport: {
      width: args.width,
      height: args.height
    }
  });
}

go();
