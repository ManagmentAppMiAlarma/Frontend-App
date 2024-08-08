export const generateUsername = (fullName) => {
  const nameParts = fullName.trim().split(" ");

  const firstname = nameParts[0];
  const lastname = nameParts[nameParts.length - 1];

  //   const initial = firstname.charAt(0).toLowerCase();
  //   const surname = lastname.toLowerCase();

  return {
    firstname,
    lastname,
  };
};
