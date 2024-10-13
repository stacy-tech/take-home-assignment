import React from 'react';

export function ImageDetailsPage({ artwork, onBack }) {
	const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
	return (
		<div>
			<button onClick={onBack}>Back</button>
			<h2>{artwork.title}</h2>
			<p>Artist: {artwork.artist_title || 'unknown'}</p>
			<p>Date: {artwork.date_display}</p>
			<img alt={artwork.thumbnail.alt_text} src={imageURL} />
		</div>
	);
}
