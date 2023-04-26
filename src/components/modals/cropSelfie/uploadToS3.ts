import axios from 'axios'

export async function uploadToS3(fileContents: Blob, presignedPostUrl: any) {
	const formData = new FormData()
	// formData.append('Content-Type', 'multipart/form-data')
	Object.entries(presignedPostUrl.data.fields).forEach(([ k, v ]) => {
		//@ts-ignore
		formData.append(k, v)
	})

	formData.append('file', fileContents) // The file has be the last element
	for (var pair of formData.entries()) {
	}
	const response = await axios.post(presignedPostUrl.data.url, formData, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
	return response
}
