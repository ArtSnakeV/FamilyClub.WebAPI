import { Suspense } from "react";
import AddEditManagerClient from "./AddEditManagerClient";

export default function AddManagerPage() {
    return (
        <Suspense fallback={<div className="p-8">Завантаження...</div>}>
            <AddEditManagerClient />
        </Suspense>
    );
}
