import {HttpException, Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {catchError, firstValueFrom, map} from "rxjs";

@Injectable()
export class ApiService {
	constructor(
		private readonly httpService: HttpService,
	) {
	}

	public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
		return await this.request<T>('GET', url, undefined, config);
	}

	public async post<T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T> {
		return await this.request<T>('POST', url, data, config);
	}

	private async request<T, D = any>(
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
		url: string,
		data?: D,
		config?: AxiosRequestConfig
	): Promise<T> {
		try {
			return await firstValueFrom(
				this.httpService.request<T>({
					method,
					url,
					data,
					...config
				}).pipe(
					map((response: AxiosResponse<T>) => response.data),
					catchError(err => {
						throw new HttpException(err.response?.data || "External Api error", err.response?.status || 500);
					}),
				)
			)
		} catch (error) {
			throw error;
		}
	}
}