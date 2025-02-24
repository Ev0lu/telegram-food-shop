import { getToken, isTokenExpired, setToken } from "@/app/app"
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const apiUrl: string = 'https://bot5ka.ru/api/v1/'

export async function fetchApi<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, init)
  return await response.json()
}

export async function fetchApiResponse(
  path: string,
  init?: RequestInit,
) {
  const response = await fetch(`${apiUrl}${path}`, init)
  return response
}

export async function getUserInfo(id: string) {
  return await fetchApiResponse(`users/${id}`, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export async function getUserInfoAboutOrders(id: string) {
  return await fetchApiResponse(`users/orders/${id}`, {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: apiUrl,
  prepareHeaders: (headers) => {
    if (isTokenExpired('access')) setToken('access', null);
    const token = getToken('access');
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    return headers;
  },
});