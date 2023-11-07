import multer from "multer"; 
import { fileURLToPath } from "url";
import { dirname } from "path";

//Ahora uso fileURLToPath para obtener la ruta absoluta del archivo y dirname para obtener la ruta relativa
const __filename = fileURLToPath(import.meta.url);



export const __dirname = dirname(__filename);