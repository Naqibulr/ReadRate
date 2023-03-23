//@ts-ignore
import { Author } from './author';
import { calculateAverageRating, computeAverage } from './average';
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
      if (searchTerm.includes('@@')) {
        let searchTermArray: string[] = searchTerm.split('@@');
        let yearFrom: number = searchTermArray[0] ? parseInt(searchTermArray[0]) : -10000;
        let yearTo: number = searchTermArray[1] ? parseInt(searchTermArray[1]) : 10000;
        if (Number.isNaN(yearFrom)) yearFrom = -10000;
        if (Number.isNaN(yearTo)) yearTo = 10000;
        if (obj.releaseYear) {
          return obj.releaseYear >= yearFrom && obj.releaseYear <= yearTo;
        }
      }

      if (searchTerm.includes('++') && obj.rating) {
        return (
          calculateAverageRating(obj.review) >= parseInt(searchTerm[searchTerm.indexOf('++') - 1])
        );
      }

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
            if (typeof valinside === 'number') {
              return valinside.toString().includes(searchTerm);
            }
            return (
              typeof valinside === 'string' &&
              valinside.toLowerCase().includes(searchTerm.trim().toLowerCase())
            );
          });
        }
        if (typeof val === 'number') {
          return val.toString().includes(searchTerm);
        }

        return (
          typeof val === 'string' && val.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );
      });
    });
  }
}
