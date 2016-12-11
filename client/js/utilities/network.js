import 'whatwg-fetch';

const getSystem = () => (
  fetch('/api/system')
    .then(res => res.json())
);

module.exports = getSystem;
