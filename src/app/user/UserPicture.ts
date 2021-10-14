export class UserPicture {

  id: number;
  name: string;
  type: string;
  picByte: any;

  constructor(id: number, name: string, type: string, picByte: any){
    this.id = id;
    this.name = name;
    this.type = type;
    this.picByte = picByte;
  }
}