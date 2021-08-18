const multer=require('multer');
const fileStorageEngine= multer.diskStorage({
    destination:(req,file,cd)=>{
        cd(null,'./storage/songs' )
    },filename: (req,file,cd)=>{
        var filename=Date.now()+'_'+file.originalname
        cd(null,filename)
    }
})
const upload = multer({storage: fileStorageEngine});
module.exports=upload
