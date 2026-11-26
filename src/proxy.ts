
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/middleware";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Require authentication for the admin dashboard.
    if (pathname.startsWith("/admindashboard")) {
        return await updateSession(request);
    }

    // Keep other pages publicly accessible.
    return NextResponse.next({
        request,
    });
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    ],
};
