export interface ApiResponse<T> {
	error: string | null;
	result: T
}