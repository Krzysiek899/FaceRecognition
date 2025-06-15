import type { AuthPayload, LoginResponse, RegisterResponse } from "../models/models";

export const FaceAuthService = {
    
    async registerWithImage(payload: AuthPayload): Promise<RegisterResponse> {
        const formData = new FormData();
        formData.append('image', payload.image, 'face.png');
        formData.append('client_id', payload.client_id);
        formData.append('user_name', payload.user_name);
        
        const backendUrl = 'http://localhost:8000/';

        const response = await fetch(backendUrl + 'api/private/face-register/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        return await response.json();
    },
    
    async loginWithImage(payload: AuthPayload): Promise<LoginResponse> {
        const formData = new FormData();
        formData.append('image', payload.image, 'face.png');
        formData.append('client_id', payload.client_id);
        formData.append('user_name', payload.user_name);

        const backendUrl = 'http://localhost:8000/';

        const response = await fetch(backendUrl + 'api/private/face-login/', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        return await response.json();
    }

}