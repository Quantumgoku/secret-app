import axios from "axios";

export function randomName() {
  const nameType = ["male", "female"][Math.floor(Math.random() * 2)];
  console.log({ nameType });
  return new Promise((resolve, reject) => {
    axios
      .get(`https://www.randomlists.com/data/names-${nameType}.json`)
      .then(({ data: { data } }) => {
        const name = data[Math.floor(Math.random() * data.length)];
        resolve(name);
      })
      .catch((error) => {
        console.log({ error });
        resolve();
      });
  });
}
