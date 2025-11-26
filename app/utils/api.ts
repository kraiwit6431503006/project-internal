const baseUrl = 'https://fe-test-api.midassoft.dev/'

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export async function request<T>(url: string, options?: {
  method?: HttpMethod
  data?: any
  headers?: Record<string, string>
}): Promise<T> {
  const { method = 'GET', data, headers = {} } = options || {}

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (data && method !== 'GET') {
    fetchOptions.body = JSON.stringify(data)
  }

  const response = await fetch(baseUrl + url, fetchOptions)

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`HTTP error! status: ${response.status}, message: ${text}`)
  }

  return (await response.json()) as T
}

// --- ช่วยให้เรียกแบบสั้น ---
export const get = <T>(url: string, headers?: Record<string, string>) => request<T>(url, { method: 'GET', headers })
export const post = <T>(url: string, data?: any, headers?: Record<string, string>) => request<T>(url, { method: 'POST', data, headers })
export const patch = <T>(url: string, data?: any, headers?: Record<string, string>) => request<T>(url, { method: 'PATCH', data, headers })
export const del = <T>(url: string, headers?: Record<string, string>) => request<T>(url, { method: 'DELETE', headers })
