export interface Response {
	data: {
		user: {
			selfieUrl: string
			name: string
			phone: string
			email: string
		}
		albums: {
			albumID: string
			date: string
			isPaid: boolean
			location: string
			name: string
			url: string
		}[]
		allPhotos: {
			albumID: string
			photoID: string
			url: string
		}[]
	}
}
