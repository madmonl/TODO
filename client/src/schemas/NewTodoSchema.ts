import * as yup from 'yup';

export default yup.object().shape({
  name: yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required'),
  deadline: yup.string()
    .required('Required'),
  implementors: yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('Required')
});
