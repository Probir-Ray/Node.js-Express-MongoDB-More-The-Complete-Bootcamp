const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("Could not find that file");
      resolve(data);
    });
  });
};

const writeFIlePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("The file could not write");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Bread: ${data}`);

    const resProOne = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resProTwo = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const resProThree = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([resProOne, resProTwo, resProThree]);
    const images = all.map((el) => el.body.message);
    console.log(images);

    await writeFIlePro("dog-image.txt", images.join("\n"));
    console.log("Random dog saved to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2: Ready";
};

(async () => {
  try {
    console.log("Will get dog pics!");
    const x = await getDogPic();
    console.log("Done getting dog pics!");
  } catch (err) {
    console.log("Error 💥💣🧨");
  }
})();
