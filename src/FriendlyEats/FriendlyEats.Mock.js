import * as Search from "./Search";
import * as Data from "./Data";

export const getRandomCourse = () => {
  const category = Search.getRandomItem(Search.data.categories);
  const city = Search.getRandomItem(Search.data.cities);
  const price = Math.floor(Math.random() * 4) + 1;
  const photoID = Math.floor(Math.random() * 22) + 1;
  const photo = 'https://storage.googleapis.com/firestorequickstarts.appspot.com/food_' + photoID + '.png';
  
  return {
    category,
    price,
    photo,
    city,
    name: Search.getRandomItem(Search.data.name) + " " + Search.getRandomItem(Search.data.name2),
    numRatings: 0,
    avgRating: 0,
  };
}

export const addMockCourse = () => {
  const promises = [];
  for (let i = 0; i < 20; i++) {
    const data = getRandomCourse();
    const promise = Data.addCourse(data);

    if (!promise) {
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  return Promise.all(promises);
}

export const addMockRatings = async (courseID) =>  {
  const ratings = [];
  for (let r = 0; r < 10 * Math.random(); r++) {
    let rating = Search.data.ratings[
      parseInt(Search.data.ratings.length * Math.random())
    ];
    rating.userName = 'Bot (Web)';
    rating.timestamp = new Date();
    const res = await Data.addRating(courseID, rating);
    if (!res) {
      return Promise.reject();
    } else {
      ratings.push(rating);
    }
  }
  return ratings;
};
