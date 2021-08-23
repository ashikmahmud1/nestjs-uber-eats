import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from '../dtos/create-restaurant.dto';
import { UpdateRestaurantDto } from '../dtos/update-restaurant.dto';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurants: Repository<Restaurant>,
  ) {}
  // access the database
  getAll(): Promise<Restaurant[]> {
    return this.restaurants.find();
  }

  createRestaurant(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>{
      // difference between create and save
      const newRestaurant = this.restaurants.create(createRestaurantDto);

      return this.restaurants.save(newRestaurant)
  }

  updateRestaurant({id, data}: UpdateRestaurantDto){
    // difference between create and save

    return this.restaurants.update(id, {...data});
}
}
