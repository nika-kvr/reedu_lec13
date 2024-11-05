#! /usr/bin/env node

// 1)Create a weather API CLI tool that:
// Takes a city name as input. eg: weather-api tbilisi        
// Fetches and displays the exact temperature in Celsius using this API endpoint:        
// API: https://api.openweathermap.org/data/2.5/weather?q={cityName}&units=metric&appid=895284fb2d2c50a520ea537456963d9c
// use: node-fetch and commander

import fetch from 'node-fetch'
import { Command } from 'commander'

const program = new Command()


program
  .command('get')
  .description('get weather by City name')
  .argument('<city>', 'city name')
  .action(async (city)=>{
      try{
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`)
        const parsedData = await data.json()
        console.log(`${city} - ${parsedData.main.temp}°C`)
    
      }catch(e){
        console.log(e, 'error')
      }
    }

  )
  
program.parse()


