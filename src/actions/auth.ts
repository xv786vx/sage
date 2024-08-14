'use server'

import { db } from "@/lib/db";
import { signIn, signOut } from "../../auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email,
            },
        })
        return user
    } catch (error) {
        console.log(error)
        return null
    }
}

export const login = async(provider: string) => {
    await signIn(provider, {redirectTo: "/dashboard"});

    revalidatePath("/dashboard")
}

export const logout = async () => {
    await signOut({redirectTo: "/"})
    revalidatePath("/")
}

export const loginWithCreds = async(formData: FormData) => {
    const rawFormData = { 
        email: formData.get("email"),
        password: formData.get("password"),
        role: "ADMIN",
        redirectTo: "/dashboard",
    }

    // 4 debugging purposes
    const existingUser = await getUserByEmail(formData.get("email") as string)
    console.log(existingUser)

    try {
        await signIn("credentials", rawFormData)
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid credentials!"}
                default:
                    return {error: "Something went wrong!"}
            }
        }

        throw error
    }

    revalidatePath("/dashboard")

}