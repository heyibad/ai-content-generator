"use client";

import { useState, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import CopyButton from "./CopyButton";
import { useSession } from "next-auth/react";

type TableData = {
    id: number;
    formData: string;
    aiResponse: string;
    toolName: string;
    createdAt: string;
    createdBy: string;
};

const HistoryTable = () => {
    const { data: session, status } = useSession();
    const [table, setTable] = useState<TableData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHistory = async () => {
            if (status === "loading" || !session?.user?.email) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/history", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: session.user.email }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log(responseData);
                
                if (responseData.error) {
                    throw new Error(responseData.error);
                }

                setTable(responseData.data || []);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : "Failed to fetch history");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [session?.user?.email, status]);

    if (loading) {
        return (
            <div className="w-full p-4 space-y-4">
                <div className="w-full h-8 bg-gray-200 animate-pulse rounded" />
                <div className="w-full h-8 bg-gray-200 animate-pulse rounded" />
                <div className="w-full h-8 bg-gray-200 animate-pulse rounded" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 text-red-500 border border-red-200 bg-red-50 rounded-md">
                Error: {error}
            </div>
        );
    }

  

    return (
        <div className="w-full overflow-x-auto border rounded-lg shadow-sm">
            <Table>
                <TableCaption className="p-4 text-sm text-gray-500">
                    Your AI-generated content history
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="w-[100px] font-semibold">ID</TableHead>
                        <TableHead className="min-w-[150px] font-semibold">Tool Name</TableHead>
                        <TableHead className="min-w-[200px] font-semibold">AI Response</TableHead>
                        <TableHead className="min-w-[150px] font-semibold">Created At</TableHead>
                        <TableHead className="w-[100px] font-semibold"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {table.length === 0 ? (
                        <TableRow>
                            <TableCell 
                                colSpan={7} 
                                className="text-center py-8 text-gray-500"
                            >
                                No history found
                            </TableCell>
                        </TableRow>
                    ) : (
                        table.map((row) => (
                            <TableRow 
                                key={row.id}
                                className="hover:bg-gray-50 transition-colors dark:hover:bg-gray-900"
                            >
                                <TableCell className="font-medium">{row.id}</TableCell>
                               <TableCell>{row.toolName.replace(/-/g, " ").toUpperCase()}</TableCell>
                                <TableCell className="max-w-[200px] truncate" title={row.aiResponse}>
                                    {row.aiResponse}
                                </TableCell>
                               
                                <TableCell>
                                    {new Date(row.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <CopyButton value={row.aiResponse} />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default HistoryTable;