import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Don't intercept auth callback routes
  const { pathname } = request.nextUrl;

  // Standard setup for the response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key must be defined in environment variables');
  }

  // Create Supabase client with cookie handling
  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          
          // Create a fresh response
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          
          // Set cookies on the response
          for (const { name, value, options } of cookiesToSet) {
            supabaseResponse.cookies.set(name, value, options);
          }
        },
      },
    },
  );

  // Fetch user session
  const { data: { user } } = await supabase.auth.getUser();


  // Define public and protected routes
  const publicRoutes = ['/', '/login', '/signup'];
  const protectedRoutes = ['/complete-profile', '/documents'];
  
  // Check if current path is protected or public
  const isProtectedRoute = protectedRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
  
  // CASE 1: User is not authenticated
  if (!user) {
    // If trying to access protected route, redirect to login
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    // If on public route, let them stay there
    return supabaseResponse;
  }
  
  // CASE 2: User is authenticated
  // Get isLoggedIn status from user metadata
  const isLoggedIn = !!user.user_metadata?.isLoggedin;
  
  // If user is on public routes and authenticated, redirect based on profile status
  if (isPublicRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/documents', request.url));
    }
    return NextResponse.redirect(new URL('/complete-profile', request.url));
  }
  
  // Handle protected routes for authenticated users
  if (pathname === '/complete-profile') {
    // Already on the complete-profile page, let them stay to complete their profile
    if (!isLoggedIn) {
      return supabaseResponse;
    } 
      // Profile is complete, redirect to documents
      return NextResponse.redirect(new URL('/documents', request.url));
  }
  
  if (pathname === '/documents' || pathname.startsWith('/documents/')) {
    // If profile is incomplete, redirect to complete-profile
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/complete-profile', request.url));
    } 
    // Profile is complete, let them access documents
    return supabaseResponse;
  }

  // For any other cases, return the response
  return supabaseResponse;
}