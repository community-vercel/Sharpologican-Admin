// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {

    basePath: '/admin',

images: {
      // domains: [ "community-hazel.vercel.app","sharplogicians.com","sharplogicians.com/new","sharplogicians.comundefined","localhost:3000/new","localhost:3002","127.0.0.1", "127.0.0.1:8000","picsum.photos"],
      domains: [ "161.35.180.34"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "*.googleusercontent.com",
          port: "",
          pathname: "**",
        },
 
            {
              protocol: 'https', // Specify protocol (e.g., 'http' or 'https')
              hostname: 'sharplogicians.com', // Specify domain name
              port: '', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
            
            {
              protocol: 'https', // Specify protocol (e.g., 'http' or 'https')
              hostname: 'sharplogicians.comundefined', // Specify domain name
              port: '', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
            {
              protocol: 'https', // Specify protocol (e.g., 'http' or 'https')
              hostname: 'sharplogicians.comnull', // Specify domain name
              port: '', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
            
        
            {
              protocol: 'https', // Specify protocol (e.g., 'http' or 'https')
              hostname: 'sharplogicians.com/api', // Specify domain name
              port: '', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
    
            {
              protocol: 'http', // Specify protocol (e.g., 'http' or 'https')
              hostname: '127.0.0.1', // Specify domain name
              port: '8000', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
            {
              protocol: 'https', // Specify protocol (e.g., 'http' or 'https')
              hostname: 'sharplogicians.com"', // Specify domain name
              port: '', // Leave empty for default port
              pathname: '/**', // Allow all paths under this domain
            },
            {
  protocol: "http",
  hostname: "localhost",
  port: "8000",
  pathname: "/**",
},
{
  protocol: "http",
  hostname: "161.35.180.34",
  port: "8000",
  pathname: "/**",
}
      ],
      
    },



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

