export default (response) => {
  const { errors } = response;
  throw errors || response;
};
