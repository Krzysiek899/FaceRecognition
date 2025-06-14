import { useState } from "react";

export const useOrderSystem = () => {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{ id?: string; error?: string } | null>(null);

    const orderSystem = async (form: { company: string; email: string; redirect: string }) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/order-system/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    company_name: form.company,
                    contact_email: form.email,
                    redirect_uri: form.redirect,
                }),
            });

            const data = await res.json();
            setResponse(data);
            if (data.id) {
                alert(`Zamówienie utworzone! ID: ${data.id}`);
            } else {
                alert("Nie udało się utworzyć zamówienia.");
            }
        } catch {
            alert("Błąd połączenia z backendem.");
        } finally {
            setLoading(false);
        }
    };

    return { orderSystem, loading, response };
};
