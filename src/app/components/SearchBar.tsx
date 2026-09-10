"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/app/hooks/useDebounce";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [inputValue, setInputValue] = useState(searchParams.get("q") ?? "");

    const debouncedValue = useDebounce(inputValue, 400);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedValue.trim()) {
        params.set("q", debouncedValue);
        } else {
        params.delete("q");
        }

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, [debouncedValue]);

    return (
        <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search a show..."
        className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
}
