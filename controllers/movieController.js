const Movie = require('../models/Movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
    try {
        const { genres, minRating, maxRating } = req.query;
        const filter = {};

        // Filter by multiple genres using $in operator
        if (genres) {
            const genreList = genres.split(',').map(g => g.trim());
            if (genreList.length > 0) {
                filter.genre = { $in: genreList };
            }
        }

        // Filter by rating range using $gte and $lte operators
        if (minRating || maxRating) {
            filter.rating = {};
            if (minRating) filter.rating.$gte = parseFloat(minRating);
            if (maxRating) filter.rating.$lte = parseFloat(maxRating);
        }

        const movies = await Movie.find(filter).sort({ createdAt: -1 });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error: error.message });
    }
};

// Get top rated movies (limit 5)
exports.getTopRatedMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rating: -1 }).limit(5);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top rated movies', error: error.message });
    }
};

// Get recent movies (limit 6)
exports.getRecentMovies = async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }).limit(6);
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recent movies', error: error.message });
    }
};

// Get single movie by ID
exports.getMovieById = async (req, res) => {
    try {
        console.log('Fetching movie with ID:', req.params.id);
        const movie = await Movie.findById(req.params.id);
        console.log('Movie found:', movie);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        console.error('Error in getMovieById:', error);
        res.status(500).json({ message: 'Error fetching movie', error: error.message });
    }
};

// Get movies by user email
exports.getMoviesByUser = async (req, res) => {
    try {
        const movies = await Movie.find({ addedBy: req.params.email }).sort({ createdAt: -1 });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user movies', error: error.message });
    }
};

// Create new movie
exports.createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(400).json({ message: 'Error creating movie', error: error.message });
    }
};

// Update movie
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(400).json({ message: 'Error updating movie', error: error.message });
    }
};

// Delete movie
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error: error.message });
    }
};

// Get user's favorite movies (My Collection)
exports.getMyCollection = async (req, res) => {
    try {
        const { userEmail } = req.query;
        if (!userEmail) {
            return res.status(400).json({ message: 'User email is required' });
        }
        const movies = await Movie.find({ favoritedBy: userEmail }).sort({ createdAt: -1 });
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching favorite movies', error: error.message });
    }
};

// Add movie to favorites
exports.addToFavorites = async (req, res) => {
    try {
        const { userEmail } = req.body;
        if (!userEmail) {
            return res.status(400).json({ message: 'User email is required' });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if already favorited
        if (movie.favoritedBy.includes(userEmail)) {
            return res.status(400).json({ message: 'Movie already in your collection' });
        }

        // Add to favorites
        movie.favoritedBy.push(userEmail);
        await movie.save();

        res.json({ message: 'Movie added to your collection', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to favorites', error: error.message });
    }
};

// Remove movie from favorites
exports.removeFromFavorites = async (req, res) => {
    try {
        const { userEmail } = req.body;
        if (!userEmail) {
            return res.status(400).json({ message: 'User email is required' });
        }

        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Remove from favorites
        movie.favoritedBy = movie.favoritedBy.filter(email => email !== userEmail);
        await movie.save();

        res.json({ message: 'Movie removed from your collection', movie });
    } catch (error) {
        res.status(500).json({ message: 'Error removing from favorites', error: error.message });
    }
};
