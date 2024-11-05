import fs from 'fs/promises'

export const writeFile = async (path, data)=>{
  try{
    await fs.writeFile(path, data);

  }catch(e){
    console.log('error',e)
  }
}

export const readFile = async (path, convertData)=>{
  if(convertData){
    try{
      const data = await fs.readFile(path, 'utf-8')
      const parsedData = JSON.parse(data)
      return parsedData
    }catch(e){
      return []
    }
  }

}