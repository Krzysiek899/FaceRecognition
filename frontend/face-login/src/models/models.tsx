export interface AuthPayload {
    client_id: string,
    user_name: string,
    image: Blob
}

export interface RegisterResponse {
    status: string,
    client_id: string,
    error?: string
}

export interface LoginResponse {
    status: string,
    code: string
}