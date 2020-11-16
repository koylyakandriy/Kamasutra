import { InformActionsTypes } from "./redux-store";

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
type ActionsType = InformActionsTypes<typeof actions>;

const messagesReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/MESSAGES/SEND_MESSAGE":
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

export const actions = {
  sendMessageAction: (newMessageText: string) =>
    ({
      type: "SN/MESSAGES/SEND_MESSAGE",
      newMessageText,
    } as const),
};

export default messagesReducer;
