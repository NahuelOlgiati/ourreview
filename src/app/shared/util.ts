import { Pager } from './model';

export class Util {

  public static getPager(totalItems: number, currentPage: number = 1): Pager {
    const totalPages = totalItems;
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // create an array of pages to ng-repeat in the pager control
    const pages = new Array(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return <Pager>{
      totalItems: totalItems,
      currentPage: currentPage,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  };

}
