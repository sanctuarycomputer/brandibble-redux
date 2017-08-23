export default (obj, path='') => path.length ? path.split('.').reduce((acc, part) => acc && acc[part], obj) : obj;
