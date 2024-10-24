"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { Loader2, Upload, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

interface UserData {
    id: number;
    email: string;
    username: string;
    profileUrl: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    isVerified: boolean;
    subscription: "basic" | "gold" | "platinum";
}

export default function SettingsPage() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const { toast } = useToast();

    // Fetch user data when session is loaded
    useEffect(() => {
        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status]);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch("/api/user", {
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Email": session?.user?.email || "", // Ensure email exists
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }

            const data: UserData = await response.json();
            console.log(data);
            setUserData(data);
            setName(data.name);
            setUsername(data.username);
            setProfilePicture(data.profileUrl);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch user data. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const validateForm = () => {
        if (name.trim().length < 2) {
            toast({
                title: "Invalid Name",
                description: "Name must be at least 2 characters long.",
                variant: "destructive",
            });
            return false;
        }
        if (username.trim().length < 3) {
            toast({
                title: "Invalid Username",
                description: "Username must be at least 3 characters long.",
                variant: "destructive",
            });
            return false;
        }
        if (newPassword && newPassword.length < 8) {
            toast({
                title: "Invalid Password",
                description: "New password must be at least 8 characters long.",
                variant: "destructive",
            });
            return false;
        }
        if (newPassword && newPassword !== confirmPassword) {
            toast({
                title: "Password Mismatch",
                description: "New password and confirmation do not match.",
                variant: "destructive",
            });
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSaving(true);
        try {
            const profileResponse = await fetch("/api/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-User-Email": userData?.email || "",
                },
                body: JSON.stringify({
                    name,
                    username,
                    profileUrl: profilePicture,
                }),
            });

            if (!profileResponse.ok) {
                const errorData = await profileResponse.json();
                throw new Error(
                    errorData.message || "Failed to update profile"
                );
            }

            const updatedData: UserData = await profileResponse.json();
            setUserData(updatedData);

            if (newPassword) {
                const passwordResponse = await fetch("/api/change-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-User-Email": userData?.email || "",
                    },
                    body: JSON.stringify({
                        oldPassword: oldPassword ? oldPassword : "",
                        newPassword,
                    }),
                });

                if (!passwordResponse.ok) {
                    const errorData = await passwordResponse.json();
                    throw new Error(
                        errorData.message || "Failed to change password"
                    );
                }

                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }

            toast({
                title: "Success",
                description: "Settings updated successfully.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    error instanceof Error ? error.message : "Update failed.",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast({
                title: "File Too Large",
                description: "Profile picture must be less than 5MB.",
                variant: "destructive",
            });
            return;
        }

        // Create FormData
        const formData = new FormData();
        formData.append("profilePicture", file);

        try {
            const response = await fetch("/api/upload-profile", {
                method: "POST",
                headers: {
                    "X-User-Email": userData?.email || "",
                },
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Upload failed");
            }

            const data = await response.json();
            if (data.success) {
                setProfilePicture(data.profileUrl);
                toast({
                    title: "Success",
                    description: "Profile picture uploaded successfully.",
                });
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast({
                title: "Error",
                description:
                    "Failed to upload profile picture. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (isLoading || status === "loading") {
        return (
            <div className="min-h-screen  flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen  p-8">
            <div className="max-w-2xl mx-auto bg-background rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Settings</h1>
                    <div className="flex items-center space-x-2">
                        <Badge
                            variant={
                                userData?.isVerified ? "default" : "secondary"
                            }
                        >
                            {userData?.isVerified ? (
                                <>
                                    <Check className="w-4 h-4 mr-1" /> Verified
                                </>
                            ) : (
                                <>
                                    <X className="w-4 h-4 mr-1" /> Unverified
                                </>
                            )}
                        </Badge>
                        <Badge>{userData?.subscription}</Badge>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="profile-picture">Profile Picture</Label>
                        <div className="flex items-center space-x-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage
                                    src={profilePicture!}
                                    alt="Profile picture"
                                />
                                {userData && (
                                    <AvatarFallback>
                                        {userData.name?.charAt(0) ||
                                            userData.username?.charAt(0) ||
                                            "U"}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <Label
                                htmlFor="picture"
                                className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2"
                            >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload
                                <Input
                                    id="picture"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                />
                            </Label>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setName(e.target.value)}
                            placeholder="Enter your name"
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            required
                            minLength={3}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={userData?.email}
                            disabled
                            className="bg-muted"
                        />
                    </div>
                    <Separator />
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">
                            Change Password
                        </h2>
                        <div className="space-y-2">
                            <Label htmlFor="old-password">
                                Current Password
                            </Label>
                            <Input
                                id="old-password"
                                type="password"
                                value={oldPassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setOldPassword(e.target.value)}
                                placeholder="Enter current password"
                            />
                            <p className="text-sm text-gray-400 dark:opacity-25 ">
                                Leave blank if you login with some provider and
                                do not have password
                            </p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={newPassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                minLength={8}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                                Confirm New Password
                            </Label>
                            <Input
                                id="confirm-password"
                                type="password"
                                value={confirmPassword}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                minLength={8}
                            />
                        </div>
                    </div>
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="w-full"
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
