import profileReducer, {
  actions
} from "./profileReducer";

const state = {
  postData: [
    { id: 1, message: "How are you?", linksCount: 12 },
    { id: 2, message: "It's very well day", linksCount: 20 },
  ],
  profile: null,
  status: "",
};

test("new post should be added", () => {
  const action = actions.addPostAction("My first test");
  const newState = profileReducer(state, action);
  
  expect(newState.postData.length).toBe(3);
});

test("message of new post equals 'My first test'", () => {
  const action = actions.addPostAction("My first test");
  const newState = profileReducer(state, action);
  
  expect(newState.postData[2].message).toBe("My first test");
});

test("after delete length of posts should be removed ", () => {
  const action = actions.deletePostAction(2);
  const newState = profileReducer(state, action);
  
  expect(newState.postData.length).toBe(1);
});
