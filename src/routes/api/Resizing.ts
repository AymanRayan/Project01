import fs from 'fs';
import resizing from '../api/sharp';
import path from 'path';

//query data pattern
interface queryData{
  name?:string;
  width?:string;
  height?:string
}
//decleration of the img paths
const imgPath = path.resolve(__dirname,'../../../images');
const imgTemp = path.resolve(__dirname,'../../../images/Temp');

//validate the required data values
async function validateQueryData(params:queryData) : Promise <boolean | string> {
  let message:string='';
  if(!params.height || !params.width || !params.name){
    message ="name , width and height is needed data";
    return message;
  }
  const width:number =parseInt(params.width);
  const height:number =parseInt(params.height);
  const name:string=params.name;
  //check that the width and height is positve integer number
  if(Number.isNaN(width) || Number.isNaN(height) || width < 0 || height < 0){
    message="Width and height must be positive integer number";
    return message;

  }
 return false;
}


//creating new image by resizing fun
async function createNewImg(params:queryData) : Promise <Boolean | null | string>{
    //check from the data
    if(!params.height || !params.name || !params.width){
      return false;
    }else{
      //new file name
      const newPath :string = path.resolve(imgTemp,`${params.name}${params.height}x${params.width}.jpg`);
      
      //src name
      const oldPath :string = path.resolve(imgPath,`${params.name}.jpg`)

      //applying the resizing function
      return await resizing({
        width:parseInt(params.width),
        height:parseInt(params.height),
        from:oldPath,
        to:newPath
      });
    } 
}
//check that the imgname is avilable
async function isAvilable(params:queryData) : Promise<Boolean> {
  if(!params.name || params.name.includes('.') || params.name.includes('jpg')){
    return false;
 }else{
    let content =fs.readdirSync(imgPath);
    return content.includes(`${params.name}.jpg`);
  }
}

//find the img path
async function findImg(params:queryData) : Promise <string> {
    let pathImg:string;
    if(params.width && params.height){
       pathImg = path.resolve(imgTemp,`${params.name}${params.height}x${params.width}.jpg`);
    }else{
       pathImg =path.resolve(imgPath,`${params.name}.jpg`);
    }
     return pathImg;
}



export {createNewImg , findImg ,validateQueryData ,isAvilable};
