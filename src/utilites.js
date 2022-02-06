

const aaa = (createdAt) => {
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric'}
    const  releaseDate = date.toLocaleDateString("en-CA", options)
    return releaseDate;
}
export default aaa;