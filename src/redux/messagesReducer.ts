const SEND_MESSAGE = "SEND_MESSAGE";

type MessageType = {
  id: number;
  message: string;
};

type DialogType = {
  id: number;
  name: string;
};

const initialState = {
  messageData: [
    { id: 1, message: "What is up?" },
    { id: 2, message: "Helllooooo man" },
    { id: 3, message: "Do you play football?" },
    { id: 4, message: "Nice to mmet you" },
  ] as Array<MessageType>,
  dialogData: [
    { name: "Andriy", id: 1 },
    { name: "Rulik", id: 2 },
    { name: "Julia", id: 3 },
    { name: "Stepan", id: 4 },
  ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;

const messagesReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      const newMessage = {
        id: 6,
        message: action.newMessageText,
      };

      return {
        ...state,
        messageData: [...state.messageData, newMessage],
      };

    default:
      return state;
  }
};

type SendMessageActionType = {
  type: typeof SEND_MESSAGE;
  newMessageText: string;
};

export const sendMessageAction = (
  newMessageText: string
): SendMessageActionType => ({
  type: SEND_MESSAGE,
  newMessageText,
});

export default messagesReducer;
