const multer=require('multer');
const fileStorageEngine= multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'./storage/uploads' )
    },filename: (req,file,cd)=>{
        cd(null,Date.now()+'_'+file.originalname)
    }
})
const upload = multer({storage: fileStorageEngine});

module.exports=upload