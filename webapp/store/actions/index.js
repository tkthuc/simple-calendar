export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const UPDATE_SELECTED_DATE = 'UPDATE_SELECTED_DATE';

export function updateUserInfo( userInfo ) {
      return {
          type: UPDATE_USER_INFO,
          userInfo
      }
}

export function updateSelectedDate( {todos, date} ) {
      return {
          type: UPDATE_SELECTED_DATE,
          data: {todos, date}
      }
}