import { getImage, getImageSchema } from "./mod";
import yargs from "yargs";
require("perish");

async function go() {
  const cliArgs = yargs
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
  });
}

go();
