const SEND_MESSAGE = "SEND_MESSAGE";

const initialState = {
  messageData: [
    { id: 1, message: "What is up?" },
    { id: 2, message: "Helllooooo man" },
    { id: 3, message: "Do you play football?" },
    { id: 4, message: "Nice to mmet you" }
  ],
  dialogData: [
    { name: "Andriy", id: "1" },
    { name: "Rulik", id: "2" },
    { name: "Julia", id: "3" },
    { name: "Stepan", id: "4" }
  ],
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: 6,
        message: action.newMessageText
      };
 
      return {
        ...state,
        messageData: [...state.messageData, newMessage],
      };
      
    default:
      return state;
  }
};

export const sendMessageAction = (newMessageText) => ({
  type: SEND_MESSAGE,
  newMessageText
});

export default messagesReducer;
