import { useState } from 'react';

import { searchArtworks } from '../api';

import { Footer } from './Footer';

import { ImageDetailsPage } from './ImageDetailsPage'; //Import the details page component
import { SearchForm } from './SearchForm';

import './App.css';

export function App() {
	const [results, setResults] = useState([]); // Initializ a state variable to to an empty array which will hold the fetch artwork data
	const [selectedArtwork, setSelectedArtwork] = useState(null); // state to hold the selected artwork
	function onSearchSubmit(query) {
		// Search for the users's query.
		searchArtworks(query)
			.then((json) => {
				console.log(json);
				setResults(json.data); // update results state with the fetch data
				setSelectedArtwork(null); // reset the selected artwork on every new search
			})
			.catch((error) => {
				console.error('Error fetching artworks:', error);
				setResults([]); //clear results on error
			});
	}
	// TODO: render the results, instead of logging them to the console.
	// NOTE: `searchArtworks` currently returns local data, so that we
	// don't make too many requests to the API! Once we've built out
	// our UI, we need to make real requests!
	// @see: ./src/api.js

	const handleSelectedArtwork = (artwork) => {
		setSelectedArtwork(artwork); // Set the selected artwork to display its details
	};

	const handleBack = () => {
		setSelectedArtwork(null); // Reset the selected artwork to go back to results
	};

	//Conditionally Rendering the results
	return (
		<div className="App">
			<h1>TCL Career Lab Art Finder</h1>
			<SearchForm onSearchSubmit={onSearchSubmit} />
			<div className="results">
				{selectedArtwork ? ( //checks if an artwork is selected
					<ImageDetailsPage artwork={selectedArtwork} onBack={handleBack} /> // Renders the details
				) : results.length > 0 ? (
					<ul>
						{results.map((artwork) => (
							<li key={artwork.image_id}>
								<button
									aria-label={`View details for ${artwork.title} by ${artwork.artist_title}`}
									className="artwork-button"
									onClick={() => handleSelectedArtwork(artwork)}
								>
									<strong>{artwork.title}</strong> by {artwork.artist_title}
								</button>
							</li>
						))}
					</ul>
				) : (
					<p>No results found. Please try another search.</p>
				)}
			</div>
			<Footer />
		</div>
	);
}
