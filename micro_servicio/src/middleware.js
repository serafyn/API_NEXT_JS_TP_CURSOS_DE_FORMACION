import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { parse } from "url";


// Función para verificar si la ruta está restringida
const checkAccess = (pathname) => {

    // Define los patrones de ruta que deseas restringir
    const restrictedPatterns = ["/inicio"];

    // Verifica si la ruta coincide con alguno de los patrones restringidos
    return restrictedPatterns.some((pattern) => pathname.startsWith(pattern));
};

export async function middleware(request) {

    const jwtCookie = request.cookies.get("COOKIE_TOKEN"); // Obtén el token JWT de las cookies
    const secret = process.env.COOKIE_SECRET; // Obtén el secreto para verificar el token
    const { pathname } = parse(request.nextUrl.href); // Obtiene la ruta de la URL


    // // Configuración de encabezados de seguridad para prevenir ciertos ataques
    // request.headers.set("X-Frame-Options", "DENY");
    // request.headers.set("X-XSS-Protection", "1; mode=block");
    // request.headers.set("Content-Security-Policy", "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval';");
    // request.headers.set("x-content-type-options", "nosniff");

    // Lógica para manejar el acceso a rutas restringidas
    if (checkAccess(pathname)) {
        if (!jwtCookie) {
            // Si no hay token, redirige a la página de expiración de sesión
            return NextResponse.redirect(new URL("/api/auth/login", request.nextUrl.origin));
        }
        try {
            await jwtVerify(jwtCookie.value, new TextEncoder().encode(secret));
            // Si el token es válido, permite el acceso
            return NextResponse.next();
        } catch (error) {
            // Si hay un error al verificar el token, redirige a la página de expiración de sesión
            return NextResponse.redirect(new URL("/api/auth/login", request.nextUrl.origin));
        }
    }

    // Lógica para manejar el acceso a la página de inicio de sesión
    if (request.nextUrl.pathname === "/api/auth/login") {
        if (jwtCookie) {
            try {
                await jwtVerify(jwtCookie.value, new TextEncoder().encode(secret));
                // Si el usuario ya está autenticado, redirige a la página principal
                return NextResponse.redirect(new URL("/", request.nextUrl.origin));
            } catch (error) {
                // Si hay un error al verificar el token, permite el acceso a la página de inicio de sesión
                return NextResponse.next();
            }
        }
        // Si no hay token, permite el acceso a la página de inicio de sesión
        return NextResponse.next();
    }

    // Lógica para manejar otras rutas que no están restringidas
    if (jwtCookie) {
        try {
            await jwtVerify(jwtCookie.value, new TextEncoder().encode(secret));
            // Si el token es válido, permite el acceso
            return NextResponse.next();
        } catch (error) {
            // Si hay un error al verificar el token, redirige a la página de inicio de sesión
            return NextResponse.redirect(new URL("/api/auth/login", request.nextUrl.origin));
        }
    }

    // Si no se cumple ninguna de las condiciones anteriores, permite el acceso
    return NextResponse.next();
}

export const config = {
    middleware: "middleware",
    matcher: (pathname) => checkAccess(pathname),
};
