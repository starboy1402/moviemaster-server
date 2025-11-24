const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('./models/Movie');

const sampleMovies = [
    {
        title: "Inception",
        genre: "Sci-Fi",
        releaseYear: 2010,
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        rating: 8.8,
        duration: 148,
        plotSummary: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        posterUrl: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "The Dark Knight",
        genre: "Action",
        releaseYear: 2008,
        director: "Christopher Nolan",
        cast: "Christian Bale, Heath Ledger, Aaron Eckhart",
        rating: 9.0,
        duration: 152,
        plotSummary: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "Interstellar",
        genre: "Sci-Fi",
        releaseYear: 2014,
        director: "Christopher Nolan",
        cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        rating: 8.6,
        duration: 169,
        plotSummary: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        releaseYear: 1994,
        director: "Frank Darabont",
        cast: "Tim Robbins, Morgan Freeman",
        rating: 9.3,
        duration: 142,
        plotSummary: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        posterUrl: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "Pulp Fiction",
        genre: "Drama",
        releaseYear: 1994,
        director: "Quentin Tarantino",
        cast: "John Travolta, Uma Thurman, Samuel L. Jackson",
        rating: 8.9,
        duration: 154,
        plotSummary: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
        posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "Forrest Gump",
        genre: "Drama",
        releaseYear: 1994,
        director: "Robert Zemeckis",
        cast: "Tom Hanks, Robin Wright, Gary Sinise",
        rating: 8.8,
        duration: 142,
        plotSummary: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man.",
        posterUrl: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "The Matrix",
        genre: "Sci-Fi",
        releaseYear: 1999,
        director: "Lana Wachowski, Lilly Wachowski",
        cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        rating: 8.7,
        duration: 136,
        plotSummary: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    },
    {
        title: "Goodfellas",
        genre: "Drama",
        releaseYear: 1990,
        director: "Martin Scorsese",
        cast: "Robert De Niro, Ray Liotta, Joe Pesci",
        rating: 8.7,
        duration: 146,
        plotSummary: "The story of Henry Hill and his life in the mob, covering his relationship with his wife and his partners in crime.",
        posterUrl: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
        language: "English",
        country: "USA",
        addedBy: "admin@moviemaster.com"
    }
];

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/moviemaster');
        console.log('✅ Connected to MongoDB');

        // Clear existing movies
        await Movie.deleteMany({});
        console.log('🗑️  Cleared existing movies');

        // Insert sample movies
        await Movie.insertMany(sampleMovies);
        console.log('✅ Sample movies inserted successfully');

        await mongoose.connection.close();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();
