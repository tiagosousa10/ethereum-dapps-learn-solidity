const fs = require("fs");
const path = require("path");

const config = {
  baseName: "RoboBots",
  imageBaseUrl:
    "ipfs://bafybeifej3ropuqc65rn4j3pgwv3px2ajk3rt3cuxl2jp44xviumtjbytq/",
  description: "RoboBots NFTs Collection, a unique collection of 31 NFTs.",
};

async function generateMetadata() {
  const imageDir = "./images";
  const metadataDir = "./metadata";

  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir);
  }

  const imageFiles = fs
    .readdirSync(imageDir)
    .filter((file) => /\.(png)$/i.test(file));

  imageFiles.forEach((filename, index) => {
    const tokenId = index;
    const imageName = path.parse(filename).name;

    const metadata = {
      name: config.baseName + `#${imageName}`,
      description: config.description,
      image: config.imageBaseUrl + `${tokenId}.png`,
      externalUrl: config.externalUrl,
    };

    const metadataPath = path.join(metadataDir, `${tokenId}.json`);

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  });
}

generateMetadata();
