import 'dotenv/config';  // ← Add this line FIRST

import { PrismaClient } from '../src/generated/prisma/client.ts'
//import { PrismaClient } from '../generated/client.ts';

const prisma = new PrismaClient();

const userId ="d2e9db5a-9e8c-4b58-8249-8093a04d49b2";

const movies =[
    {
    title: "The Matrix",
    overview: "A computer hacker learns about the true nature of reality.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runTime: 136,
    posterURL: "https://example.com/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview:
      "A thief who steals corporate secrets through dream-sharing technology.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runTime: 148,
    posterURL: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker in a battle for Gotham's soul.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runTime: 152,
    posterURL: "https://example.com/darkknight.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, and others intertwine.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runTime: 154,
    posterURL: "https://example.com/pulpfiction.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runTime: 169,
    posterURL: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years.",
    releaseYear: 1994,
    genres: ["Drama"],
    runTime: 142,
    posterURL: "https://example.com/shawshank.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club.",
    releaseYear: 1999,
    genres: ["Drama"],
    runTime: 139,
    posterURL: "https://example.com/fightclub.jpg",
    createdBy: userId,
  },
  {
    title: "Forrest Gump",
    overview:
      "The presidencies of Kennedy and Johnson unfold through the perspective of an Alabama man.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runTime: 142,
    posterURL: "https://example.com/forrestgump.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview:
      "The aging patriarch of an organized crime dynasty transfers control to his son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runTime: 175,
    posterURL: "https://example.com/godfather.jpg",
    createdBy: userId,
  },
  {
    title: "Goodfellas",
    overview: "The story of Henry Hill and his life in the mob.",
    releaseYear: 1990,
    genres: ["Biography", "Crime", "Drama"],
    runTime: 146,
    posterURL: "https://example.com/goodfellas.jpg",
    createdBy: userId,
  },
];

const main = async () => {
    console.log("Seeding movies...");

    for (const movie of movies){
        await prisma.movie.create({
            data: movie,

        });
        console.log("created movie: ", movie.title);
    };
    console.log("seeding completed");
};

main().catch((err)=> {
    console.error(err)
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});