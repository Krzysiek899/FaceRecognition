export interface AuthPayload {
    client_id: string,
    user_id: string,
    image: Blob
}

export interface RegisterResponse {
    status: string,
    client_id: string
}

export interface LoginResponse {
    status: string,
}