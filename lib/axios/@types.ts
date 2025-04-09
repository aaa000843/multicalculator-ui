import { AxiosError } from 'axios';

export type RequestError = AxiosError<{ message: string }>;
