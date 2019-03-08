const { isBinarySync } = require("istextorbinary");
const path = require("path");
const mockVars = require("./mockVars");
const {
  copyFile,
  mkdirp,
  readDirRecursive,
  readFile,
  writeFile
} = require("./utils/fs");
const { replaceVars } = require("./utils/replaceVars");

async function buildFile(fromPath, toPath) {
  const dir = path.dirname(toPath);

  await mkdirp(dir);

  const buf = await readFile(fromPath);
  const isBinary = isBinarySync(fromPath, buf);

  try {
    const contents = isBinary
      ? buf.toString("utf8")
      : replaceVars(fromPath, buf.toString("utf8"), mockVars);
    return writeFile(toPath, contents);
  } catch (err) {
    console.warn(
      `WARNING: Writing went wrong in: ${fromPath} (original error below)`
    );
    console.warn(err);
    return copyFile(fromPath, toPath);
  }
}

async function build() {
  const templateDir = path.resolve(__dirname, "../template");
  const buildDir = path.resolve(__dirname, "../build");

  console.log(`Read template directory...`);
  const files = await readDirRecursive(templateDir);
  const relativeFiles = files.map(f => path.relative(templateDir, f));

  console.log(`Start copying files...`);
  for (const f of relativeFiles) {
    await buildFile(path.resolve(templateDir, f), path.resolve(buildDir, f));
  }

  console.log(`Copied ${relativeFiles.length} files`);
}

build()
  .then(() => console.log("success"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
