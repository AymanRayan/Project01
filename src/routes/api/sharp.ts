import sharp from 'sharp';


interface sharpData{
    width:number;
    height:number;
    from:string;
    to:string
  }
  //using sharp on the img
  async function resizing(params:sharpData) {
    try{
      await 
       sharp(params.from)//file name
      .resize(params.width,params.height)//resizing data
      .toFile(params.to);//save at
      return params.to;
    }catch(e){
       return "error at resizing the photo";
    }
  }



  export default resizing;