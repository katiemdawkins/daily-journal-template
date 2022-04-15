export const getEntryTags = () => {
    return fetch("http://localhost:8088/entrytags")
    .then(res => res.json())
};