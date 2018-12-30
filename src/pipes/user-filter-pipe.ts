import { Pipe, PipeTransform } from '@angular/core';

/*
* Custom pipe to filter user list by username
*/

@Pipe({
  name: 'userListFilter',
})
export class UserListFilterPipe implements PipeTransform {
  /**
   * Takes a list and filter by username
   */
  transform(usersList: any[], username: string) {
    return usersList.filter((user) => user.username.trim().toLowerCase() == username.trim().toLowerCase());
  }
}