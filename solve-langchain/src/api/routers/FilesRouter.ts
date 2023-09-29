import { File } from "api/models/DataModels.js";
import { FilesModel } from "api/models/FilesModel.js";
import { DocToVector } from "libs/docToVector.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "storage/files/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage, preservePath: true });

export function FilesRouter(app: any): void { 
  app.post("/file/upload", upload.any(), async (req: any, res: any) => {
    const uploadedFile = req.files[0];
    const botId = req.body.botId;
    const file: File = {
        user_id: 'fareedsurya',
        bot_id: botId,
        type: 'knowledge',
        filename: uploadedFile.filename,
        file_path:uploadedFile.path,
        created_at: new Date(),
        mimetype: uploadedFile.mimetype,
        size: uploadedFile.size
    };
    const result = await new FilesModel().write(file);
    res.json(result);
  });
  app.get("/files/:botId", async (req: any, res: any)=>{
    const botId = req.params.botId;
    const result = await new FilesModel().readByBotId(botId);
    res.json(result);
  })
  app.post("/file/addknowledge", async (req: any, res: any) => {
    const fileId = req.body.fileId;
    const file: File = await new FilesModel().readById(fileId);
    let result: any;
    try{
      console.log('process to add vectorstore:'+fileId);
        const vectorstore = await new DocToVector().createVectorstore(file.file_path, file.mimetype, fileId);
        const updatedFile: File = {
            filename: file.filename,
            mimetype: file.mimetype,
            user_id: file.user_id,
            file_path: file.file_path,
            vectorstore_path: 'storage/vectors/'+fileId
        };
        result = new FilesModel().updateById(updatedFile, fileId);
    }catch{
        result = new Error("Something wrong! Can't add the document to bot knowledge.");
    }finally{
        
    }    
    res.json(result);
  });
}
