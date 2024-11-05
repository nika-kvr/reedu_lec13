#! /usr/bin/env node

// 2) Create a Car factory CLI tool that.
// Takes a car name, car price and car color
// add new car in cars.json
// delete car
// show all cars
// update car
// get car by id

import { Command } from 'commander'
import {writeFile, readFile} from './utils.js'


const program = new Command()

program
  .command('add')
  .description('add car in file')
  .argument('<name>', 'car name')
  .argument('<price>', 'car price')
  .argument('<color>', 'car color')
  .action(async (name,price,color)=>{
    try{
      const data = await readFile('cars.json', true)
      const lastId = data[data.length -1] ? data[data.length -1].id : 0
      const newCar = {
        id: String(Number(lastId) + 1),
        name,
        price,
        color
      }
      data.push(newCar)
      writeFile('cars.json', JSON.stringify(data))
      console.log('car added')
    }catch(e){
      console.log(e,'error')
    }
  })


program
  .command('delete')
  .description('deletes car by id')
  .argument('<id>')
  .action(async (id)=>{
    try{
      const data = await readFile('cars.json', true)
      const indexToDelete = data.findIndex(car => car.id === id);
      if (indexToDelete !== -1) {
        data.splice(indexToDelete, 1);
        writeFile('cars.json', JSON.stringify(data))
        console.log('car deleted')
        return
      }
      console.log('car not found')

    }catch(e){
      console.log(e,'error')
    }
  })


program
  .command('show')
  .description('shows all cars in file')
  .action(async ()=>{
    const data = await readFile('cars.json', true)
    console.log(data)
  })
  
program
  .command('update')
  .description('update car by id')
  .argument('<id>', 'car id')
  .argument('<name>', 'car name')
  .argument('<price>', 'car price')
  .argument('<color>', 'car color')
  .action(async (id,name,price,color)=>{
    try{
      const data = await readFile('cars.json', true)
      const indexToEdit = data.findIndex(car => car.id === id);
      if(indexToEdit !== -1){
        data[indexToEdit] = {
          id,
          name,
          price,
          color
        }
        await writeFile('cars.json', JSON.stringify(data))
        console.log('car updated')
        return
      }
      console.log('car not found')

    }catch(e){
      console.log(e,'error')
    }

  })


program
  .command('get')
  .description('get car by id')
  .argument('<id>', 'car id')
  .action(async (id)=>{
    try{
      const data = await readFile('cars.json', true)
      const car = data.find(car => car.id === id)
      if(car){
        console.log(car)
        return
      }
      console.log('car not found')

    }catch(e){
      console.log(e,'error')
    }
  })

program.parse()