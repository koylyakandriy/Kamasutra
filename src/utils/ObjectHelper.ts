export const updateObjectInArray = (
  items: any,
  itemId: any,
  objPropName: any,
  newObjProp: any
) => {
  return items.map((user: any) => {
    if (user[objPropName] === itemId) {
      return { ...user, ...newObjProp };
    }
    return user;
  });
};
