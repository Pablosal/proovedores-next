export const handleChange = (e, stat, fn) => {
  fn({ ...stat, [e.target.name]: e.target.value });
  console.log(stat);
};
