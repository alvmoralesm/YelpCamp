const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(err, "ERROR"));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp");
  console.log("SUCCESS");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "624fa2ba64ad9f22291d704a",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit corrupti, ut veritatis expedita eveniet fuga totam quibusdam aliquam maxime deserunt accusamus saepe, iure fugit est eligendi adipisci sunt tempora! Accusantium!",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dzuljpmwj/image/upload/v1649561266/YelpCamp/dkm5sh42ytr4naivsh0u.jpg",
          filename: "YelpCamp/sxjxmoxy8lfcjl5brvlt",
        },
        {
          url: "https://res.cloudinary.com/dzuljpmwj/image/upload/v1649561265/YelpCamp/fbcxd7y6iz1lltnzam0n.jpg",
          filename: "YelpCamp/rmoflnvrewiaplqj36dm",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
