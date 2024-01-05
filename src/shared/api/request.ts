import { createEffect } from "effector";

interface Request {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  query?: URLSearchParams | Record<string, any>;
  body?: { json: unknown },
}

export const requestFx = createEffect(async (params: Request) => {
  const url = new URL(`/v1/${params.path}`, import.meta.env.VITE_BASE_URL)
  url.search = params.query instanceof URLSearchParams ? params.query.toString() : new URLSearchParams(params.query).toString()
  const body = params.body?.json ? JSON.stringify(params.body?.json) : undefined
  const headers = new Headers()
  if (params.body?.json) {
    headers.set('content-type', 'application/json')
  }
  const response = await fetch(url, {
    method: params.method,
    body,
    credentials: 'include',
    headers,
  })
  const isJson = response.headers.get('content-type')?.includes('application/json')
  if (response.ok) {
    if (isJson) {
      return response.json()
    }
  }
})



