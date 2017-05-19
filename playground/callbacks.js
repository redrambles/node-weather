var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Ann'
    }; // This info would typically come from a database

    setTimeout(() => {
        callback(user);
    }, 3000);
};

getUser(31, (userObject) => {
    console.log(userObject);
});