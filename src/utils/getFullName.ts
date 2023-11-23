import isEmpty from "lodash/isEmpty";

type User = {
    firstName?: string,
    lastName?: string,
    displayName?: string,
};

const getFullName = (user?: User) => {
    if (!user || isEmpty(user)) {
      return "-";
    }

    const fullName = [];

    if (user?.displayName) {
      return user.displayName;
    }

    if (user?.firstName) {
        fullName.push(user.firstName);
    }

    if (user?.lastName) {
        fullName.push(user.lastName)
    }

    return fullName.join(" ");
};

export { getFullName };
