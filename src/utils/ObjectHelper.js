export const updateObjectInArray = (items, itemId, objPropName, newObjProp) => {
  return items.map((user) => {
    if (user[objPropName] === itemId) {
      return { ...user, ...newObjProp };
    }
    return user;
  });
};
