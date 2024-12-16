// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {

    basePath: '/old',

    // reactStrictMode: true,  // Enables React Strict Mode for better development warnings
  
    // // Enable support for CSS modules and SCSS
    // sassOptions: {
    //   includePaths: ['./styles'],  // Optional: you can add paths for SCSS imports
    // },
  
    // // Optionally, enable Image Optimization (if you're using Next.js Image component)
    // images: {
    //   domains: ['example.com'], // Add any domains you load images from
    // },
  
    // // Optional: Force HTTPS redirection in production
    // async redirects() {
    //   return [
    //     {
    //       source: '/:path*', // Redirect all paths
    //       destination: 'https://sharplogicians.com/:path*', // Redirect to HTTPS
    //       permanent: true,
    //     },
    //   ];
    // },
  
    // You can also add other custom configuration here...
  };
  
  export default nextConfig;
