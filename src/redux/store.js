// import profileReducer from "./profileReducer";
// import messagesReducer from './messagesReducer';
//
// let store = {
//   _state: {
//     profilePage: {
//       postData: [
//         { id: 1, message: "How are you?", linksCount: 12 },
//         { id: 2, message: "It's very well day", linksCount: 20 }
//       ],
//       newPostText: "New post"
//     },
//     messagesPage: {
//       messageData: [
//         { id: 1, message: "What is up?" },
//         { id: 2, message: "Helllooooo man" },
//         { id: 3, message: "Do you play football?" },
//         { id: 4, message: "Nice to meet you" }
//       ],
//       dialogData: [
//         { name: "Andriy", id: "1" },
//         { name: "Rulik", id: "2" },
//         { name: "Julia", id: "3" },
//         { name: "Stepan", id: "4" }
//       ],
//       newMessageText: ""
//     }
//   },
//   _callSubscriber() {
//     console.log("rerender:");
//   },
//
//   getState() {
//     return this._state;
//   },
//   subscribe(observer) {
//     this._callSubscriber = observer;
//   },
//
//   dispatch(action) {
//     this._state.profilePage = profileReducer(this._state.profilePage, action);
//     this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
//
//     this._callSubscriber(this._state);
//   }
// };
//
// export default store;
// window.store = store;
