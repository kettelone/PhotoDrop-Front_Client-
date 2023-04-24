import axios from 'axios'

export async function uploadToS3(
	fileType: string,
	fileContents: File,
	presignedPostUrl: any
) {
	console.log(fileType)
	console.log(fileContents)
	console.log(presignedPostUrl)

	const formData = new FormData()
	formData.append('Content-Type', 'image/jpeg')
	console.log(formData)
	Object.entries(presignedPostUrl.data.fields).forEach(([ k, v ]) => {
		//@ts-ignore
		formData.append(k, v)
	})

	formData.append('file', fileContents) // The file has be the last element

	// console.log(formData)
	const response = await axios.post(presignedPostUrl.data.url, formData, {
		headers: { 'Content-Type': 'multipart/form-data' }
	})
	return response
	// return presignedPostUrl.filePath
}
