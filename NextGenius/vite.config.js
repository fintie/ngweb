import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
export default defineConfig({base:"./",plugins:[react()],resolve:{alias:Object.fromEntries(["assets","components","views","content"].map(name=>[name,path.resolve("src",name)]))},build:{outDir:"dist",emptyOutDir:true}});
