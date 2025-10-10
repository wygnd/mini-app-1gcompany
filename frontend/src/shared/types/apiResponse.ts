export interface ApiResponse<T> {
	error: string | null;
	refundsFromApi: T
}