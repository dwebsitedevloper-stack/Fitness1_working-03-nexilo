import { Hono } from "hono";

const app = new Hono<{ Bindings: any }>();

export default app;
