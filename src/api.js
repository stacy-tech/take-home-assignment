/**
 * Throughout this file are blocks of comments containing keywords
 * prefixed with `@`. These are JSDoc comments, and they help us
 * describe variables, functions, and other aspects of our code.
 * @see: https://jsdoc.app/
 */

/**
 * An individual piece of artwork found at the `/artworks/search/` endpoint.
 * @typedef {Object} Artwork
 * @property {number} _score
 * @property {string | null} artist_title
 * @property {string} date_display
 * @property {string} image_id
 * @property {{alt_text: string, height: number, width: number}} thumbnail
 * @property {string} title
 */

/**
 * The response from the `/artworks/search/` endpoint. Includes an array of
 * artworks, as well as some `config`, `info`, and `pagination` metadata.
 * @typedef {Object} AICSearchResponse
 * @property {Object} config
 * @property {Array<Artwork>} data
 * @property {Object} info
 * @property {Object} pagination
 * @property {null} preference
 */

/**
 * Search the Chicago Institute of Art's `/artworks/search/` endpoint
 * and get a Promise containing the JSON-encoded response.
 * @param {string} query
 * @returns {Promise<AICSearchResponse>}
 */
export async function searchArtworks(query) {
	/**
	 * Get data from `ARTWORKS_SEARCH_RESULT.json`, whuch is served by our
	 * local server.
	 * TODO: replace with path to `/artworks/search/` endpoint,
	 * as described in README.md.
	 */

	// Define the API endpoint with the user's query
	const requestUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(query)}&query[term][is_public_domain]=true&fields=artist_title,date_display,image_id,thumbnail.alt_text,thumbnail.width,thumbnail.height,title`;
	/**
	 * We know the API serves JSON data, but
	 * it's a good idea to explicitly request JSON anyway.
	 * */
	const headers = { Accept: 'application/json' };
	try {
		// Fetching data from the API
		const response = await fetch(requestUrl, { headers });
		// Check the fetch response
		if (!response.ok) throw new Error('Network response was not ok');
		// Parse and return the Json data
		return response.json();
	} catch (error) {
		console.error('Error fetching artworks:', error);
		throw error; //Rethrew the error for further handling
	}
}
