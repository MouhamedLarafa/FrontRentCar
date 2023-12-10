import {Car} from "./car";
import { User } from "./User";

export class Location {
  id!:number;
  startDate!:Date;
  endDate!:Date;
  price!:number;
  user!: User;
  car !: Car;
  status!: string;
}
