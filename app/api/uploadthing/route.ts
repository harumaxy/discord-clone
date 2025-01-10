// Route handler のファイル名は route's' じゃなくて route

import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";


// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
	router: ourFileRouter,
});

