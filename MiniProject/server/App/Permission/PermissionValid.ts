const permissionCheck = (response: any, Permission: any) => {

    console.log("response",response)
    console.log("Permission",Permission)
  const varifiedData = response;
  console.log("dffwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwfd",varifiedData)
  const Permissionvalue = varifiedData[0].role.permission.some(
    (pre: any) => pre.name == Permission
  );

  return Permissionvalue;
};

export default permissionCheck;
