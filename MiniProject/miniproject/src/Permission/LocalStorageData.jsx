const permissionCheck = (permissionvalue) => {
    const localStorageData = JSON.parse(localStorage.getItem('role'));

    console.log("LOCASTORAGEDATA____", localStorageData);

    if (localStorageData !== undefined && localStorageData !== null) {
        const hasPermission = localStorageData.data?. data?.role?.permission.some((data) =>
        data.name === permissionvalue
        );

        return hasPermission;
    } else {
        return false;
    }
};

export default permissionCheck;
