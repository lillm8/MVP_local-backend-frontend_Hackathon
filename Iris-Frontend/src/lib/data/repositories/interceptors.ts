// Placeholder for request/response interceptors (e.g., auth tokens, error mapping)
export type RequestInterceptor = (
  input: RequestInfo,
  init?: RequestInit
) => Promise<[RequestInfo, RequestInit?]> | [RequestInfo, RequestInit?];
export type ResponseInterceptor = (
  response: Response
) => Promise<Response> | Response;

const requestInterceptors: RequestInterceptor[] = [];
const responseInterceptors: ResponseInterceptor[] = [];

export function addRequestInterceptor(interceptor: RequestInterceptor) {
  requestInterceptors.push(interceptor);
}

export function addResponseInterceptor(interceptor: ResponseInterceptor) {
  responseInterceptors.push(interceptor);
}

export async function runRequestInterceptors(
  input: RequestInfo,
  init?: RequestInit
) {
  let current: [RequestInfo, RequestInit?] = [input, init];
  for (const interceptor of requestInterceptors) {
    current = await interceptor(current[0], current[1]);
  }
  return current;
}

export async function runResponseInterceptors(response: Response) {
  let current = response;
  for (const interceptor of responseInterceptors) {
    current = await interceptor(current);
  }
  return current;
}
