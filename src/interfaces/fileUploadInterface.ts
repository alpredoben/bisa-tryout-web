export interface I_UploadFileApiResponse {
  status: boolean;
  message: string;
  data: I_UploadFileResponse;
}

export interface I_UploadFileResponse {
 	file_id: string;
	file_name: string;
	file_url: string;
}

export interface I_UploadFileInput {
  file: File;
}