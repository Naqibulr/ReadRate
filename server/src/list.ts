//@ts-ignore
import { Author } from './author';
import { Book } from './book';

export class List {
  name: String;
  objectList: any[];

  constructor(name: String, objectList: any[]) {
    this.name = name;
    this.objectList = objectList;
  }

  addObject(o: any): void {
    this.objectList.push(o);
  }

  /*
   * Search function that returns books or authors
   * @param String searchTerm
   * @return Array filtered objectList
   */
  search(searchTerm: string): any[] {
    return this.objectList.filter((obj) => {
      return Object.keys(obj).some((key) => {
        const val = obj[key];
        if (
          typeof val === 'object' &&
          val !== null &&
          (val instanceof Author || val instanceof Book)
        ) {
          return Object.keys(val).some((key) => {
            //@ts-ignore
            const valinside = val[key];
            return (
              typeof valinside === 'string' &&
              valinside.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
          });
        }
        return (
          typeof val === 'string' && val.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );
      });
    });
  }
}
