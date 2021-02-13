export interface ErrorInterface {
  errorStatusCode: number;
  errorDetail?: string[];
  message: string;
  stack?: string;
}
